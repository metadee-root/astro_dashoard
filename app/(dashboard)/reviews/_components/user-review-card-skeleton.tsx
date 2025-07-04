import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserReviewCardSkeleton = () => {
  return (
    <div className="p-4 border rounded-md space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-3 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};
