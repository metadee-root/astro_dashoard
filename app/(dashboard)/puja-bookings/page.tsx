import { HydrateClient, prefetch } from "@/components/hydrate-client";
import React, { Suspense } from "react";
import { PujaBookings } from "./_components/puja-bookings";
import { ErrorBoundary } from "react-error-boundary";
import { PujaBookingsError } from "./_components/puja-bookings-errror";
import { PujaBookingsSkeleton } from "./_components/puja-bookings-skeleton";
import { api } from "@/lib/api";

export const metadata = {
  title: "Puja Bookings",
};

const Page = () => {
  prefetch({ queryKey: ["puja-bookings"], queryFn: api.puja.getBookings });
  return (
    <HydrateClient>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Puja Bookings
        </h1>
        <ErrorBoundary fallback={<PujaBookingsError />}>
          <Suspense fallback={<PujaBookingsSkeleton />}>
            <PujaBookings />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
};

export default Page;
