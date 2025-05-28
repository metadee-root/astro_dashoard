import { type ChatMessage as IChatMessage } from "@/types/session";
import React, { FC, useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-4">
      {messages.map((message, i) => (
        <ChatMessage key={message.messageId + i} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
