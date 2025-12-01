"use client";
import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Paperclip, XIcon } from "lucide-react";
import React, { FC, useState, useRef } from "react";
import Image from "next/image";

interface ChatInputProps {
  sessionId: string;
  roomId: string;
}

export const ChatInput: FC<ChatInputProps> = ({ roomId, sessionId }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only images (JPEG, PNG, GIF, WebP) are supported");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const convertFileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If file is selected, send as image with ArrayBuffer
    if (selectedFile) {
      try {
        const fileBuffer = await convertFileToArrayBuffer(selectedFile);
        const messageData = {
          sessionId,
          roomId,
          message: input,
          type: "image" as const,
          file: fileBuffer,
          fileName: selectedFile.name,
          mimeType: selectedFile.type,
        };
        sendMessage(messageData);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("Error processing file");
        return;
      }
    } else {
      // Send text message only
      const messageData = {
        sessionId,
        roomId,
        message: input,
        type: "text" as const,
      };
      sendMessage(messageData);
    }
    setInput("");
    setSelectedFile(null);

    // Clear file input and preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);

    // Revoke preview URL to free memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canSend = input.trim() || selectedFile;

  return (
    <div className="space-y-2">
      {/* File preview */}
      {selectedFile && (
        <div className="flex items-center gap-3 p-2 bg-muted rounded-lg text-sm">
          {/* Image preview thumbnail */}
          {previewUrl && (
            <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{selectedFile.name}</p>
            <p className="text-muted-foreground text-xs">
              {(selectedFile.size / 1024).toFixed(1)} KB •{" "}
              {selectedFile.type.split("/")[1].toUpperCase()}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveFile}
            className="flex-shrink-0"
          >
            <XIcon className="h-4 w-4" />
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
