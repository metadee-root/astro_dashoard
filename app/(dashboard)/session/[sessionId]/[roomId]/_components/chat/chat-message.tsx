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
  const {
    type,
    message: content,
    timestamp,
    senderId,
    mediaUrl,
    fileName,
    mimeType,
  } = message;
  const { data: session } = useSession();

  const isCurrentUser = senderId === session?.user.id;

  const renderContent = () => {
    switch (type) {
      case "image":
        // Use mediaUrl if available, otherwise fallback to content
        const imageSrc = mediaUrl || content;
        if (!imageSrc) {
          return (
            <p className="text-sm text-muted-foreground">Image loading...</p>
          );
        }
        return (
          <div className="space-y-2">
            {/* Show message text if available */}
            {content && mediaUrl && (
              <p className="text-sm font-medium">{content}</p>
            )}
            {/* Show image */}
            <div className="relative h-48 w-48 overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                alt="Message image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        );
      case "file":
        return (
          <div className="space-y-2">
            {/* Show message text if available */}
            {content && <p className="text-sm font-medium">{content}</p>}
            {/* Show file attachment */}
            <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
              <FileIcon className="h-4 w-4" />
              <a
                href={mediaUrl || content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {fileName || "Download File"}
              </a>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-1">
            <p className="text-sm font-medium">{content}</p>
            {/* Show attached image with text if available */}
            {type === "text" && mediaUrl && (
              <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                <Image
                  src={mediaUrl}
                  alt="Attached image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            )}
          </div>
        );
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
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-muted-foreground rounded-bl-none"
          )}
        >
          {renderContent()}

          <p
            className={cn(
              "text-[10px] font-medium opacity-70 mt-2",
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
