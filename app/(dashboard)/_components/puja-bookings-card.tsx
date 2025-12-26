"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NoPujaBookings } from "../puja-bookings/_components/no-puja-bookings";
import { PujaBookingCard } from "../puja-bookings/_components/puja-booking-card";
import { useTranslations } from "next-intl";

export const PujaBookingsCard = () => {
  const t = useTranslations("pujaBookings");
  const tc = useTranslations("common");
  const { data: pujaBookings } = useSuspenseQuery({
    queryKey: ["puja-bookings"],
    queryFn: api.puja.getBookings,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-[22px]">{t("title")}</CardTitle>
        <CardAction>
          <Button variant="outline" asChild>
            <Link href="/puja-bookings">{tc("viewAll")}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {pujaBookings.length === 0 ? (
          <NoPujaBookings />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pujaBookings.slice(0, 4).map((booking) => (
              <PujaBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
