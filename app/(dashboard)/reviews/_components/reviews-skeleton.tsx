import React from "react";
import { UserReviewCardSkeleton } from "./user-review-card-skeleton";

export const ReviewsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 30 }).map((_, index) => (
        <UserReviewCardSkeleton key={index} />
      ))}
    </div>
  );
};
