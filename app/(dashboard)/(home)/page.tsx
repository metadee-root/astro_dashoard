import React from "react";
import { DashboardHeader } from "../_components/dashboard-header";
import { RecentUserInteractions } from "../_components/recent-user-interactions";
import { Profile } from "../_components/profile";
import { WalletAndEarnings } from "../_components/wallet-and-earnings";
import { UserReviews } from "../_components/user-reviews";
import { Stats } from "../_components/stats";
import { api } from "@/lib/api";
import { HydrateClient, prefetch } from "@/components/hydrate-client";
import { PujaBookingsCard } from "../_components/puja-bookings-card";
import { getQueryClient } from "@/lib/get-query-client";

const Page = async () => {
  const queryClient = getQueryClient();
  const profile = await queryClient.fetchQuery({
    queryKey: ["profile"],
    queryFn: api.auth.getDetails,
  });

  prefetch({ queryKey: ["puja-bookings"], queryFn: api.puja.getBookings });

  prefetch({
    queryKey: ["recent-consultations"],
    queryFn: () => api.consultation.getConsultationRecords(1, 2),
  });

  return (
    <HydrateClient>
      <div className="space-y-6">
        <DashboardHeader profile={profile} />
        <Stats />
        <Profile profile={profile} />
        <WalletAndEarnings />
        <PujaBookingsCard />
        <RecentUserInteractions />
        <UserReviews />
      </div>
    </HydrateClient>
  );
};

export default Page;
