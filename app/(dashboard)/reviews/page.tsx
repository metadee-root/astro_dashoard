import { HydrateClient, prefetch } from "@/components/hydrate-client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { api } from "@/lib/api";
import { Reviews } from "./_components/reviews";
import { ReviewsSkeleton } from "./_components/reviews-skeleton";

export const metadata = {
  title: "Reviews",
};

const Page = () => {
  prefetch({
    queryKey: ["reviews"],
    queryFn: () => api.reviews.getReviews({ page: 1, limit: 30 }),
  });
  return (
    <HydrateClient>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Reviews
        </h1>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<ReviewsSkeleton />}>
            <Reviews />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
};

export default Page;
