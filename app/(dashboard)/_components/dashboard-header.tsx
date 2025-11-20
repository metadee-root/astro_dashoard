"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { format } from "date-fns";
import { AstrologerDetails } from "@/lib/api/auth.api";
import { useSocket } from "@/components/socket-provider";

export const DashboardHeader = ({
  profile,
}: {
  profile: AstrologerDetails;
}) => {
  const { isConnected, connect, disconnect } = useSocket();

  const handleConnectionChange = (checked: boolean) => {
    if (checked) {
      connect();
    } else {
      disconnect();
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
      <div className="space-y-1">
        <h2 className="text-xl md:text-[22px] font-semibold">
          Namaste, {profile.name || profile.fullName}
        </h2>
        <p className="font-medium">
          {/* Today is Shukla Paksha, Dwitiya |{" "} */}
          {format(new Date(), "PPpp")}
        </p>
      </div>

      <div
        className="group flex w-fit items-center gap-2 px-4 py-2 border rounded-xl"
        data-state={isConnected ? "checked" : "unchecked"}
      >
        <span
          id={`switch-off`}
          className="group-data-[state=checked]:text-muted-foreground/70 flex-1 cursor-pointer text-right text-sm font-medium"
          aria-controls={"switch"}
          onClick={() => disconnect()}
        >
          Offline
        </span>
        <Switch
          id={"switch"}
          checked={isConnected}
          onCheckedChange={handleConnectionChange}
          aria-labelledby={`switch-off switch-on`}
        />
        <span
          id={`switch-on`}
          className="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 cursor-pointer text-left text-sm font-medium"
          aria-controls={"switch"}
          onClick={() => connect()}
        >
          Online
        </span>
      </div>
    </div>
  );
};
