"use client";

import React from "react";
import { Users } from "lucide-react";
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

interface NoConsultationsProps {
  onUpdateProfile?: () => void;
  onViewAvailability?: () => void;
}

export const NoConsultations = ({
  onUpdateProfile,
  onViewAvailability,
}: NoConsultationsProps) => {
  const router = useRouter();
  const t = useTranslations("consultations.empty");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users className="size-6" />
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
          <Button
            variant="outline"
            onClick={() => {
              router.push("/profile?tab=services");
              onViewAvailability?.();
            }}
          >
            {t("setAvailability")}
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
