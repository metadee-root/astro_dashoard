"use client";
import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import React, { FC, useState } from "react";

interface ChatInputProps {
  sessionId: string;
  roomId: string;
}

export const ChatInput: FC<ChatInputProps> = ({ roomId, sessionId }) => {
  const [input, setInput] = useState("");
  const { sendMessage } = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendMessage({
      sessionId,
      roomId,
      message: input,
    });
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center
     gap-2.5"
    >
      <Input
        className="rounded-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <Button size="icon" className="rounded-full" disabled={!input}>
        <SendHorizonal />
      </Button>
    </form>
  );
};
