"use client";
import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Paperclip } from "lucide-react";
import React, { FC, useState, useRef } from "react";

interface ChatInputProps {
  sessionId: string;
  roomId: string;
}

export const ChatInput: FC<ChatInputProps> = ({ roomId, sessionId }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useSocket();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert("File size must be less than 10MB");
        return;
      }

      // Check file type (images only for now)
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only images (JPEG, PNG, GIF, WebP) are supported");
        return;
      }

      setSelectedFile(file);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:image/type;base64, prefix to get just the base64 data
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let messageData: any = {
      sessionId,
      roomId,
      message: input,
      type: "text",
    };

    // If file is selected, convert to base64 and add to message
    if (selectedFile) {
      try {
        const fileBase64 = await convertFileToBase64(selectedFile);
        messageData = {
          ...messageData,
          file: fileBase64,
          fileName: selectedFile.name,
          mimeType: selectedFile.type,
          type: "image", // Set type to image when file is attached
        };
      } catch (error) {
        console.error("Error converting file to base64:", error);
        alert("Error processing file");
        return;
      }
    }

    sendMessage(messageData);
    setInput("");
    setSelectedFile(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canSend = input.trim() || selectedFile;

  return (
    <div className="space-y-2">
      {/* File preview */}
      {selectedFile && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg text-sm">
          <div className="flex-1">
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
          >
            Remove
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* File attachment button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        {/* Message input */}
        <Input
          className="rounded-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message or attach an image..."
        />

        {/* Send button */}
        <Button size="icon" className="rounded-full" disabled={!canSend}>
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
};
