import { SessionRequest } from "@/types/session";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { format } from "date-fns";
import { MessageCircle, Phone, Video } from "lucide-react";
import { capitalizeString, cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { useSocket } from "./socket-provider";
import { toast } from "sonner";

type Mode = "call" | "video" | "chat";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const modeIcons: Record<Mode, React.FC<{ className?: string }>> = {
  call: Phone,
  video: Video,
  chat: MessageCircle,
};

interface ConnectRequestCardProps {
  request: SessionRequest;
}

export const ConnectRequestCard: FC<ConnectRequestCardProps> = ({
  request,
}) => {
  const { consultationDetails: user } = request;
  const { joinSession, rejectSession } = useSocket();

  const onAccept = () => {
    joinSession({
      sessionId: request.sessionId,
      roomId: request.roomId,
    });
    toast.dismiss();
  };

  const onReject = () => {
    rejectSession({
      sessionId: request.sessionId,
    });
    toast.dismiss();
  };

  return (
    <div
      className={cn(
        "rounded-md shadow-sm w-full font-medium md:w-80 bg-background border",
        montserrat.className
      )}
    >
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold -tracking-tight flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500" />
          Incoming Call Request
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-12">
            <AvatarFallback>{user.fullName.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-muted-foreground font-medium">
              Immediate Call
            </p>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">
              Type of Consultation
            </p>
            <p className="flex items-center gap-1 text-sm">
              {React.createElement(modeIcons[request.mode as Mode], {
                className: "size-4 ml-1.5",
              })}{" "}
              {capitalizeString(request.mode)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">
              Date Time of Birth
            </p>
            <p className="text-sm">
              {format(
                request.consultationDetails.dateTimeOfBirth,
                "d MMM, yyyy, h:mm a"
              )}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">
              Place of Birth
            </p>
            <p className="text-sm">
              {request.consultationDetails.placeOfBirth}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Concern</p>
            <p className="text-sm">{request.consultationDetails.concern}</p>
          </div>
        </div>
        <div className="flex gap-2.5 pt-2">
          <Button size="lg" className="flex-1" onClick={onAccept}>
            Accept
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onClick={onReject}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};
