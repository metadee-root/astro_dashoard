"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { api } from "@/lib/api";
import { PujaBookingCard } from "./puja-booking-card";
import { NoPujaBookings } from "./no-puja-bookings";

export const PujaBookings = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["puja-bookings"],
    queryFn: api.puja.getBookings,
  });

  if (data.length === 0) {
    return <NoPujaBookings />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((booking) => (
        <PujaBookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};
