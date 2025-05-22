"use client";
import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import React, { FC, useState } from "react";
import { toast } from "sonner";

interface ChatInputProps {
  sessionId: string;
  roomId: string;
}

export const ChatInput: FC<ChatInputProps> = ({ roomId, sessionId }) => {
  const [input, setInput] = useState("");
  const { socket, isConnected } = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket) {
      toast.error("Socket not connected");
    }
    if (!input) return;
    if (!isConnected || !socket) return;

    socket.emit("send_message", {
      sessionId,
      roomId,
      message: input,
      type: "text",
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
