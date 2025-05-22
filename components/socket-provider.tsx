"use client";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useRef, createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SessionRequest } from "@/types/session";
import { Button } from "./ui/button";
import { connectionRequestToast } from "./connection-request-toast";
import { useRouter } from "next/navigation";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
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
  const [isConnected, setIsConnected] = React.useState(false);
  const websocket = useRef<Socket | null>(null);
  const router = useRouter();

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
      connectionRequestToast({ request: data });
    });
    socket.on("session_request_failed", ({ error }) => {
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

    socket.on("message_failed", ({ error }) => {
      toast.error(error || "Failed to send message!");
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
      socket.disconnect();
      websocket.current = null;
    };
  }, [session?.user.token]);

  return (
    <SocketContext.Provider value={{ socket: websocket.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
