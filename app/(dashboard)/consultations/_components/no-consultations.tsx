import React from "react";
import { Users, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

interface NoConsultationsProps {
  onUpdateProfile?: () => void;
  onViewAvailability?: () => void;
}

export const NoConsultations = ({
  onUpdateProfile,
  onViewAvailability,
}: NoConsultationsProps) => {
  const router = useRouter();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No Client Consultations Yet</EmptyTitle>
        <EmptyDescription>
          Clients haven&apos;t booked any consultations with you yet. Update
          your profile, set your availability, and make your services more
          visible to attract clients.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              router.push("/profile");
              onUpdateProfile?.();
            }}
          >
            Update Profile
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/profile?tab=services");
              onViewAvailability?.();
            }}
          >
            Set Availability
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
