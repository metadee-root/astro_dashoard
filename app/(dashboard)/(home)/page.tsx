import React from "react";
import { DashboardHeader } from "../_components/dashboard-header";
import { RecentUserInteractions } from "../_components/recent-user-interactions";
import { Profile } from "../_components/profile";
import { WalletAndEarnings } from "../_components/wallet-and-earnings";
import { UserReviews } from "../_components/user-reviews";
import { Stats } from "../_components/stats";
import { api } from "@/lib/api";

const Page = async () => {
  const profile = await api.auth.getDetails();

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <Stats />
      <RecentUserInteractions />
      <Profile profile={profile} />
      <WalletAndEarnings />
      <UserReviews />
    </div>
  );
};

export default Page;
