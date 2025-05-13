import { getQueryClient } from "@/lib/get-query-client";
import {
  dehydrate,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  HydrationBoundary,
} from "@tanstack/react-query";
import React, { FC } from "react";

interface HydrateClientProps {
  children: React.ReactNode;
}

export const HydrateClient: FC<HydrateClientProps> = ({ children }) => {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export const prefetch = (opts: FetchQueryOptions) => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(opts);
};

export const prefetchInfinite = (opts: FetchInfiniteQueryOptions) => {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(opts);
};
