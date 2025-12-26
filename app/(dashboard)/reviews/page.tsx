import {
  HydrateClient,
  prefetch,
  prefetchInfinite,
} from "@/components/hydrate-client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { api } from "@/lib/api";
import { Reviews } from "./_components/reviews";
import { ReviewsSkeleton } from "./_components/reviews-skeleton";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations("reviews");
  return {
    title: t("pageTitle"),
  };
};

const Page = async () => {
  const t = await getTranslations("reviews");

  prefetchInfinite({
    queryKey: ["reviews", "infinite"],
    queryFn: async ({ pageParam }) => {
      return await api.reviews.getReviews({
        page: pageParam as number,
        limit: 12,
      });
    },
    initialPageParam: 1,
  });
  return (
    <HydrateClient>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          {t("pageTitle")}
        </h1>
        <ErrorBoundary fallback={<div>{t("error")}</div>}>
          <Suspense fallback={<ReviewsSkeleton />}>
            <Reviews />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
};

export default Page;
