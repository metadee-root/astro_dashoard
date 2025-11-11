"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { format } from "date-fns";
import { AstrologerDetails } from "@/lib/api/auth.api";

export const DashboardHeader = ({
  profile,
}: {
  profile: AstrologerDetails;
}) => {
  const [isOnline, setIsOnline] = React.useState(false);
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
      <div className="space-y-1">
        <h2 className="text-xl md:text-[22px] font-semibold">
          Namaste, {profile.name}
        </h2>
        <p className="font-medium">
          Today is Shukla Paksha, Dwitiya |{" "}
          {format(new Date(), "dd MMMM, yyyy")}
        </p>
      </div>

      <div
        className="group flex w-fit items-center gap-2 px-4 py-2 border rounded-xl"
        data-state={isOnline ? "checked" : "unchecked"}
      >
        <span
          id={`switch-off`}
          className="group-data-[state=checked]:text-muted-foreground/70 flex-1 cursor-pointer text-right text-sm font-medium"
          aria-controls={"switch"}
          onClick={() => setIsOnline(false)}
        >
          Offline
        </span>
        <Switch
          id={"switch"}
          checked={isOnline}
          onCheckedChange={setIsOnline}
          aria-labelledby={`switch-off switch-on`}
        />
        <span
          id={`switch-on`}
          className="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 cursor-pointer text-left text-sm font-medium"
          aria-controls={"switch"}
          onClick={() => setIsOnline(true)}
        >
          Online
        </span>
      </div>
    </div>
  );
};
