"use client";

import React from "react";
import { Star } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useTranslations } from "next-intl";

interface ReviewsEmptyProps {
  onShareProfile?: () => void;
}

export const ReviewsEmpty = ({ onShareProfile }: ReviewsEmptyProps) => {
  const t = useTranslations("reviews.empty");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Star className="size-6" />
        </EmptyMedia>
        <EmptyTitle>{t("title")}</EmptyTitle>
        <EmptyDescription>{t("description")}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
