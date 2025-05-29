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
  const [callDetails, setCallDetails] = React.useState<CallDetails | null>({
    agoraAppId: "b353b1b203dc4a698a4cab5632c64b69",
    agoraToken:
      "007eJxTYJj9We3UvooF0vn5fz4FHlgqc6BkWeVr5be5bFkCrD3nC/YoMCQZmxonGSYZGRinJJskmllaJJokJyaZmhkbJZuZJJlZijpZZDQEMjJsf7uBiZEBAkF8HoaS1OKS+OSMxLy81BwGBgDNPCPB",
    channelName: "test_channel",
    mode: "video",
    sessionId: "6838478ccd14e18229a798be",
  });

  console.log(callDetails);

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
    if (!session?.user.token || !process.env.NEXT_PUBLIC_BACKEND_URL) return;

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
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("call_started");
      socket.disconnect();
      websocket.current = null;
    };
  }, [session?.user.token]);

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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
