import React from "react";
import { Star } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ReviewsEmptyProps {
  onShareProfile?: () => void;
}

export const ReviewsEmpty = ({ onShareProfile }: ReviewsEmptyProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Star className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No Reviews Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t received any reviews from clients yet. Complete successful
          consultations to encourage clients to share their experience.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
