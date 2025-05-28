import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const ChatHeader = () => {
  const { currentSession, endSession } = useSocket();
  const router = useRouter();

  const onSessionEnd = () => {
    endSession(currentSession?.sessionId || "");
  };

  return (
    <div className="flex items-center justify-between">
      <p className="md:text-lg font-semibold">
        {currentSession?.consultationDetails.fullName}
      </p>
      <Button size="sm" variant="destructive" onClick={onSessionEnd}>
        End Session <LogOut />
      </Button>
    </div>
  );
};
