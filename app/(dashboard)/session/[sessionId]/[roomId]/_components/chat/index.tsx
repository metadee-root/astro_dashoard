"use client";
import React, { FC } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatHeader } from "./chat-header";
import { useSocket } from "@/components/socket-provider";

interface ChatProps {
  sessionId: string;
  roomId: string;
}

export const Chat: FC<ChatProps> = ({ roomId, sessionId }) => {
  const { messages } = useSocket();

  return (
    <div className="flex flex-col h-[calc(100svh-7rem)] space-y-4 w-full max-w-2xl mx-auto">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput roomId={roomId} sessionId={sessionId} />
    </div>
  );
};
