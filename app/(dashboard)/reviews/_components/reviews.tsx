"use client";
import { api } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const Reviews = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["reviews"],
    queryFn: async () => await api.reviews.getReviews({ page: 1, limit: 30 }),
  });

  console.log(data);

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
  );
};
