import { type ChatMessage as IChatMessage } from "@/types/session";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useState } from "react";
import { FileIcon, ZoomInIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ImageEnlargeDialog } from "./image-enlarge-dialog";

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
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const isCurrentUser = senderId === session?.user.id;

  const handleImageClick = (src: string) => {
    setEnlargedImage(src);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  const renderClickableImage = (
    src: string,
    alt: string,
    size: "small" | "medium"
  ) => {
    const sizeClasses = size === "small" ? "h-32 w-32" : "h-48 w-48";
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg cursor-pointer",
          sizeClasses
        )}
        onClick={() => handleImageClick(src)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes={
            size === "small"
              ? "(max-width: 768px) 100vw, 25vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />
        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ZoomInIcon className="h-6 w-6 text-white" />
        </div>
      </div>
    );
  };

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
            {/* Show clickable image */}
            {renderClickableImage(imageSrc, "Message image", "medium")}
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
            {/* Show attached clickable image with text if available */}
            {type === "text" &&
              mediaUrl &&
              renderClickableImage(mediaUrl, "Attached image", "small")}
          </div>
        );
    }
  };

  return (
    <>
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

      {/* Image Enlarge Dialog */}
      <ImageEnlargeDialog
        imageSrc={enlargedImage}
        onClose={handleCloseEnlarged}
      />
    </>
  );
};
