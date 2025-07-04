import { HydrateClient, prefetchInfinite } from "@/components/hydrate-client";
import { api } from "@/lib/api";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Consultations } from "./_components/consultations";
import { ConsultationsError } from "./_components/consultations-error";
import { ConsultationsSkeleton } from "./_components/consultations-skeleton";

export const metadata = {
  title: "Consultations",
};

const Page = () => {
  prefetchInfinite({
    queryKey: ["consultations"],
    queryFn: ({ pageParam }) =>
      api.consultation.getConsultationRecords(pageParam as number, 10),
    initialPageParam: 1,
  });

  return (
    <HydrateClient>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Consultations
        </h1>
        <ErrorBoundary fallback={<ConsultationsError />}>
          <Suspense fallback={<ConsultationsSkeleton />}>
            <Consultations />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
};

export default Page;
