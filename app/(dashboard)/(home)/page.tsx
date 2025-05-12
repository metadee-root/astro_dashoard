import { Onboarding } from "@/components/onboarding";
import React from "react";
import { DashboardHeader } from "../_components/dashboard-header";
import { RecentUserInteractions } from "../_components/recent-user-interactions";
import { Profile } from "../_components/profile";
import { WalletAndEarnings } from "../_components/wallet-and-earnings";
import { UserReviews } from "../_components/user-reviews";
import { Stats } from "../_components/stats";

const Page = () => {
  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* <Onboarding /> */}
        <DashboardHeader />
        <Stats />
        <RecentUserInteractions />
        <Profile />
        <WalletAndEarnings />
        <UserReviews />
      </div>
    </div>
  );
};

export default Page;
