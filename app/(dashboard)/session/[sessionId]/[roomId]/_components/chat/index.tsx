"use client";
import React, { FC, useEffect, useState } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatHeader } from "./chat-header";
import { useSocket } from "@/components/socket-provider";
import { ChatMessage } from "@/types/session";

interface ChatProps {
  sessionId: string;
  roomId: string;
}

export const Chat: FC<ChatProps> = ({ roomId, sessionId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected || !socket) return;

    socket.on("receive_message", (data: ChatMessage) => {
      setMessages((messages) => [...messages, data]);
    });
  }, [isConnected, socket]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput roomId={roomId} sessionId={sessionId} />
    </div>
  );
};
