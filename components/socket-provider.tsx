"use client";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useRef, createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { ChatMessage, SessionRequest } from "@/types/session";
import { connectionRequestToast } from "./connection-request-toast";
import { useRouter } from "next/navigation";

interface CallDetails {
  sessionId: string;
  channelName: string;
  mode: "video" | "audio";
  agoraAppId: string;
  agoraToken: string;
}

interface SendMessagePayload {
  sessionId: string;
  roomId: string;
  message: string;
}

interface JoinSessionPayload {
  sessionId: string;
  roomId: string;
}

interface RejectSessionPayload {
  sessionId: string;
  // reason: string;
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  messages: ChatMessage[];
  sendMessage: (values: SendMessagePayload) => void;
  joinSession: (values: JoinSessionPayload) => void;
  rejectSession: (values: RejectSessionPayload) => void;
  endSession: (sessionId: string) => void;
  isLoading: boolean;
  currentSession: SessionRequest | null;
  callDetails: CallDetails | null;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  sendMessage: ({}) => {},
  joinSession: ({}) => {},
  rejectSession: ({}) => {},
  messages: [],
  isLoading: false,
  currentSession: null,
  callDetails: null,
  endSession: () => {},
  connect: () => {},
  disconnect: () => {},
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within an SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [currentSession, setCurrentSession] =
    React.useState<SessionRequest | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const websocket = useRef<Socket | null>(null);
  const router = useRouter();
  const [callDetails, setCallDetails] = React.useState<CallDetails | null>(
    null
  );

  const joinSession = (values: JoinSessionPayload) => {
    const socket = websocket.current;
    if (!socket || !isConnected) {
      toast.error("Socket is not connected!");
      return;
    }
    socket.emit("join_session", {
      sessionId: values.sessionId,
      roomId: values.roomId,
    });
  };

  const endSession = (sessionId: string) => {
    const socket = websocket.current;
    if (!socket || !isConnected) {
      toast.error("Socket is not connected!");
      return;
    }
    socket.emit("end_session", {
      sessionId,
    });
    setMessages([]);
    setCallDetails(null);
    setCurrentSession(null);
  };

  const rejectSession = (values: RejectSessionPayload) => {
    const socket = websocket.current;
    if (!socket || !isConnected) {
      toast.error("Socket is not connected!");
      return;
    }
    socket.emit("reject_session", {
      sessionId: values.sessionId,
      reason: "Expert rejected your call request",
    });
  };

  const connect = () => {
    if (!session?.user.token || !process.env.NEXT_PUBLIC_BACKEND_URL) {
      toast.error("Authentication required or backend URL not configured!");
      return;
    }

    if (websocket.current?.connected) {
      toast.info("Already connected!");
      return;
    }

    websocket.current = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: {
        token: session.user.token,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
    });

    const socket = websocket.current;
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");
      toast.success("You're now online and ready to receive consultation requests! 🙏");
    });

    // Session request
    socket.on("session_request", (data: SessionRequest) => {
      console.log(data);
      setCurrentSession(data);
      connectionRequestToast({ request: data });
    });
    socket.on("session_request_failed", ({ error }) => {
      setCurrentSession(null);
      toast.error(error || "Session request failed!");
    });

    socket.on("join_session_failed", ({ error }) => {
      toast.error(error || "Failed to join session!");
    });

    socket.on(
      "joined_session",
      ({
        roomId,
        sessionId,
        mode,
      }: {
        sessionId: string;
        roomId: string;
        mode: "chat" | "video" | "call";
      }) => {
        router.push(`/session/${sessionId}/${roomId}?mode=${mode}`);
      }
    );

    socket.on("reject_session_failed", ({ error }) => {
      toast.error(error || "Failed to reject session!");
    });

    socket.on("session_ended", ({ reason }) => {
      setCurrentSession(null);
      setMessages([]);
      toast(reason || "Session ended successfully!");
      router.push("/");
    });

    socket.on("receive_message", (data: ChatMessage) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("message_failed", ({ error }) => {
      let prevMessages = [...messages];
      prevMessages.pop();
      setMessages(prevMessages);
      toast.error(error || "Failed to send message!");
    });

    socket.on("call_started", (values: CallDetails) => {
      setCallDetails(values);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("disconnected");
    });

    socket.on("connect_error", (error) => {
      setIsConnected(false);
      console.error("connection error:", error);
      toast.error("Connection error: " + error.message);
    });
  };

  const disconnect = () => {
    const socket = websocket.current;
    if (socket) {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("call_started");
      socket.off("session_request");
      socket.off("session_request_failed");
      socket.off("join_session_failed");
      socket.off("joined_session");
      socket.off("reject_session_failed");
      socket.off("session_ended");
      socket.off("receive_message");
      socket.off("message_failed");
      socket.disconnect();
      websocket.current = null;
      setIsConnected(false);
      setCurrentSession(null);
      setMessages([]);
      setCallDetails(null);
      toast.success("You're now offline. You won't receive consultation requests until you come back online. 👋");
    }
  };

  const sendMessage = (values: SendMessagePayload) => {
    const socket = websocket.current;
    if (!socket || !isConnected) {
      toast.error("Socket is not connected!");
      return;
    }
    setIsLoading(true);
    socket.emit("send_message", {
      sessionId: values.sessionId,
      roomId: values.roomId,
      message: values.message,
      type: "text",
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: values.message,
        messageId: `${Date.now()}-${Math.random()}`,
        senderId: session?.user.id || "unknown",
        senderName: session?.user.name || "Unknown User",
        timestamp: Date.now(),
        type: "text",
      },
    ]);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: websocket.current,
        isConnected,
        isLoading,
        messages,
        sendMessage,
        joinSession,
        rejectSession,
        currentSession,
        endSession,
        callDetails,
        connect,
        disconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
