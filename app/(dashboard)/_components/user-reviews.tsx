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
import { UserReviewCard } from "../reviews/_components/user-review-card";
import { Rating, RatingButton } from "@/components/ui/rating";

const reviews = [
  {
    _id: "1",
    user: { name: "Alice Johnson", image: "https://i.pravatar.cc/150?img=1" },
    rating: 4,
    comment: "Great product, works as expected. Would buy again!",
    createdAt: "2025-05-01T10:30:00Z",
  },
  {
    _id: "2",
    user: { name: "Bob Smith", image: "https://i.pravatar.cc/150?img=2" },
    rating: 5,
    comment: "Absolutely love it! Exceeded my expectations.",
    createdAt: "2025-05-02T14:45:00Z",
  },
  {
    _id: "3",
    user: { name: "Catherine Lee" },
    rating: 3,
    comment: "It's okay, but there are better alternatives.",
    createdAt: "2025-05-03T09:20:00Z",
  },
  {
    _id: "4",
    user: { name: "Daniel Green", image: "https://i.pravatar.cc/150?img=3" },
    rating: 2,
    comment: "Disappointed with the quality for the price.",
    createdAt: "2025-05-04T12:15:00Z",
  },
  {
    _id: "5",
    user: { name: "Emily Clark", image: "https://i.pravatar.cc/150?img=4" },
    rating: 5,
    comment: "Fast shipping and the item is perfect.",
    createdAt: "2025-05-05T11:00:00Z",
  },
  {
    _id: "6",
    user: { name: "Frank Wilson" },
    rating: 4,
    comment: "Very satisfied, will recommend to friends.",
    createdAt: "2025-05-06T08:50:00Z",
  },
  {
    _id: "7",
    user: { name: "Grace Kim", image: "https://i.pravatar.cc/150?img=5" },
    rating: 1,
    comment: "Terrible experience. Would not recommend.",
    createdAt: "2025-05-07T16:30:00Z",
  },
  {
    _id: "8",
    user: { name: "Henry Baker" },
    rating: 3,
    comment: "Decent, but expected more features.",
    createdAt: "2025-05-08T10:00:00Z",
  },
  {
    _id: "9",
    user: { name: "Isabella Young", image: "https://i.pravatar.cc/150?img=6" },
    rating: 5,
    comment: "Love the design and functionality. Highly recommended!",
    createdAt: "2025-05-09T13:10:00Z",
  },
  {
    _id: "10",
    user: { name: "Jack Turner" },
    rating: 4,
    comment: "Good value for money, but packaging could improve.",
    createdAt: "2025-05-10T15:40:00Z",
  },
];

export const UserReviews = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-[22px]">User Reviews</CardTitle>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-4xl font-semibold">4.5</p>
            <Rating readOnly defaultValue={4.5} className="gap-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  key={index}
                  className="text-yellow-500"
                  size={14}
                />
              ))}
            </Rating>
            <p>2,256,896</p>
          </div>
          <div>
            <p>Based on 42 reviews</p>
            <p>98%of seekers rated you 4+ stars</p>
          </div>
        </div>
        <CardAction>
          <Button asChild variant="outline">
            <Link href="/reviews">View All</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <UserReviewCard key={review._id} review={review} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
