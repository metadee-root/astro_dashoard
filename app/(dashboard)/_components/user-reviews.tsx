"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { UserReviewCard } from "../reviews/_components/user-review-card";
import { Rating, RatingButton } from "@/components/ui/rating";
import { ReviewsEmpty } from "../reviews/_components/reviews-empty";
import { useTranslations } from "next-intl";

export const UserReviews = () => {
  const t = useTranslations("reviews");
  const tc = useTranslations("common");
  const { data } = useSuspenseQuery({
    queryKey: ["reviews", 1, 2],
    queryFn: () => api.reviews.getReviews({ page: 1, limit: 2 }),
  });

  const { rating, reviews } = data.data;
  const hasReviews = reviews && reviews.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-[22px]">{t("title")}</CardTitle>
        {hasReviews ? (
          <div className="flex items-center gap-4">
            <div>
              <p className="text-4xl font-semibold">
                {rating.average.toFixed(1)}
              </p>
              <Rating readOnly defaultValue={rating.average} className="gap-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    key={index}
                    className={
                      index < Math.floor(rating.average)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                    size={14}
                  />
                ))}
              </Rating>
              <p>{rating.reviewsCount.toLocaleString()}</p>
            </div>
            <div>
              <p>{t("basedOn", { count: rating.reviewsCount })}</p>
              <p>
                {t("ratedYou", {
                  percent: Math.round(
                    (reviews.filter((r) => r.rating >= 4).length /
                      reviews.length) *
                      100
                  ),
                  rating: rating.average.toFixed(1),
                })}
              </p>
            </div>
          </div>
        ) : null}
        <CardAction>
          <Button asChild variant="outline">
            <Link href="/reviews">{tc("viewAll")}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {hasReviews ? (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <UserReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <ReviewsEmpty
            onShareProfile={() => (window.location.href = "/edit-profile")}
          />
        )}
      </CardContent>
    </Card>
  );
};
