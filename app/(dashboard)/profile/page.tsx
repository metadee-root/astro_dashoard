import { HydrateClient, prefetch } from "@/components/hydrate-client";
import { api } from "@/lib/api";
import React, { Suspense } from "react";
import { ProfileTabs } from "./_components/profile-tabs";
import { ProfileTabsSkeleton } from "./_components/profile-tabs-skeleton";

export const metadata = {
  title: "Profile",
};

const Page = () => {
  prefetch({
    queryKey: ["profile"],
    queryFn: () => api.auth.getDetails(),
  });
  return (
    <HydrateClient>
      <Suspense fallback={<ProfileTabsSkeleton />}>
        <ProfileTabs />
      </Suspense>
    </HydrateClient>
  );
};

export default Page;
