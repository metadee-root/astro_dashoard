import { type ChatMessage as IChatMessage } from "@/types/session";
import { cn, formatRelativeTimeShort } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { FileIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

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
        return <p className="text-sm font-medium">{content}</p>;
    }
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2",
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className="w-fit max-w-md">
        <div
          className={cn(
            "flex flex-col rounded-xl px-4 py-2.5",
            isCurrentUser
              ? "bg-blue-500 text-primary-foreground rounded-br-none"
              : "bg-muted text-muted-foreground rounded-bl-none"
          )}
        >
          {renderContent()}

          <p
            className={cn(
              "text-[10px] font-medium opacity-70",
              isCurrentUser ? "text-right" : "text-left"
            )}
          >
            {format(new Date(message.timestamp), "hh:mm a")}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
