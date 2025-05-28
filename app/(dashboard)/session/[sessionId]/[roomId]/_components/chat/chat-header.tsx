import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

export const ChatHeader = () => {
  const { currentSession } = useSocket();
  return (
    <div className="flex items-center justify-between">
      <p className="md:text-lg font-semibold">
        {currentSession?.consultationDetails.fullName}
      </p>
      <Button size="sm" variant="destructive">
        End Session <LogOut />
      </Button>
    </div>
  );
};
