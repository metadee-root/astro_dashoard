import { type ChatMessage as IChatMessage } from "@/types/session";
import React, { FC } from "react";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-4 pb-6">
      {messages.map((message, i) => (
        <ChatMessage key={message.messageId + i} message={message} />
      ))}
    </div>
  );
};
