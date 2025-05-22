import { type ChatMessage as IChatMessage } from "@/types/session";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import { FileIcon } from "lucide-react";
import { useSession } from "next-auth/react";

interface ChatMessageProps {
  message: IChatMessage;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { type, message: content, timestamp, senderId } = message;
  const { data: session } = useSession();

  const isCurrentUser = senderId === session?.user.id;

  const renderContent = () => {
    switch (type) {
      case "image":
        return (
          <div className="relative h-48 w-48 overflow-hidden rounded-lg">
            <Image
              src={content}
              alt="Message image"
              fill
              className="object-cover"
            />
          </div>
        );
      case "file":
        return (
          <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
            <FileIcon className="h-4 w-4" />
            <a
              href={content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Download File
            </a>
          </div>
        );
      default:
        return <p className="text-sm">{content}</p>;
    }
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2",
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1 rounded-lg px-3 py-2",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {renderContent()}
        <span className="text-xs opacity-70">{format(timestamp, "HH:mm")}</span>
      </div>
    </div>
  );
};
