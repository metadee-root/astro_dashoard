"use client";
import { api } from "@/lib/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { UserReviewCard } from "./user-review-card";
import { ReviewsEmpty } from "./reviews-empty";

export const Reviews = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["reviews", "infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      return await api.reviews.getReviews({ page: pageParam, limit: 12 });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.pagination.page < lastPage.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });

  // Set up intersection observer for the last element
  const { ref: lastReviewRef } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  // Flatten all review pages into a single array
  const allReviews = data.pages.flatMap((page) => page.data.reviews);
  const hasReviews = allReviews.length > 0;

  return (
    <div>
      {hasReviews ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allReviews.map((review, index) => (
              <div
                key={review._id}
                ref={index === allReviews.length - 3 ? lastReviewRef : undefined}
              >
                <UserReviewCard review={review} />
              </div>
            ))}
          </div>
          {isFetchingNextPage && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="animate-pulse"
                >
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <ReviewsEmpty />
      )}
    </div>
  );
};
