import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatINR } from "@/lib/utils";
import { Clock, MessageCircle, Phone, Video } from "lucide-react";
import React from "react";

export const UserInteractionCard = () => {
  return (
    <div className="p-4 space-y-4 border rounded-md">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src="https://i.pravatar.cc/150?img=36" />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Priya Sharma</p>
          <p className="text-muted-foreground text-sm font-medium">
            First contact: May 12, 2023
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="flex items-center gap-2">
          <Phone className="size-4" strokeWidth={1.5} /> Voice Call - 3 times
        </p>
        <p className="flex items-center gap-2">
          <Video className="size-4" strokeWidth={1.5} /> Video Call - 1 time
        </p>
        <p className="flex items-center gap-2">
          <MessageCircle className="size-4" strokeWidth={1.5} /> Chat - 8 times
        </p>
        <p className="flex items-center gap-2">
          <Clock className="size-4" strokeWidth={1.5} /> Last Call: 1 day ago
        </p>
      </div>
      <div className="flex items-center justify-between font-semibold md:text-lg">
        <p>Total Earnings:</p>
        <p className="text-green-500">{formatINR(650)}</p>
      </div>
    </div>
  );
};
