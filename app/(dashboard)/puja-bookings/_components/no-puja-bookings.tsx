import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface NoPujaBookingsProps {
  onUpdateProfile?: () => void;
  onViewAvailability?: () => void;
}

export const NoPujaBookings = ({
  onUpdateProfile,
  onViewAvailability
}: NoPujaBookingsProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Calendar className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No Puja Bookings Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t received any puja bookings from devotees yet. Update your
          profile, set your availability, and make your puja services more visible
          to attract bookings.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button onClick={onUpdateProfile}>Update Profile</Button>
          <Button variant="outline" onClick={onViewAvailability}>
            Set Availability
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
