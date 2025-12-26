"use client";

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
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface NoPujaBookingsProps {
  onUpdateProfile?: () => void;
  onViewAvailability?: () => void;
}

export const NoPujaBookings = ({
  onUpdateProfile,
  onViewAvailability,
}: NoPujaBookingsProps) => {
  const router = useRouter();
  const t = useTranslations("pujaBookings.empty");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Calendar className="size-6" />
        </EmptyMedia>
        <EmptyTitle>{t("title")}</EmptyTitle>
        <EmptyDescription>{t("description")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              router.push("/profile");
              onUpdateProfile?.();
            }}
          >
            {t("updateProfile")}
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
