import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating, RatingButton } from "@/components/ui/rating";
import React, { FC } from "react";
import { IReview } from "@/lib/api/reviews.api";

interface UserReviewCardProps {
  review: IReview;
}

export const UserReviewCard: FC<UserReviewCardProps> = ({ review }) => {
  const getInitials = (name: string) => {
    const names = name.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    return names.length > 1
      ? initials + names[names.length - 1].substring(0, 1).toUpperCase()
      : initials;
  };

  return (
    <div className="p-4 border rounded-md space-y-2">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src={review.user.avatar} />
          <AvatarFallback>{getInitials(review.user.name)}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold">{review.user.name}</p>
          <Rating readOnly defaultValue={review.rating} className="gap-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton key={index} className="text-yellow-500" size={14} />
            ))}
          </Rating>
        </div>
      </div>
      <p className="font-medium text-foreground/80">{review.feedback}</p>
    </div>
  );
};
