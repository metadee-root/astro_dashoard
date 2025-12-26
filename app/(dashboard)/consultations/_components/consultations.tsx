"use client";
import { api } from "@/lib/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ConsultationCard } from "./consultation-card";
import { Button } from "@/components/ui/button";
import { NoConsultations } from "./no-consultations";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export const Consultations = () => {
  const t = useTranslations("consultations");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["consultations"],
      queryFn: ({ pageParam }) =>
        api.consultation.getConsultationRecords(pageParam as number, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.page < lastPage.pagination.totalPages) {
          return lastPage.pagination.page + 1;
        }
        return undefined;
      },
    });

  const allConsultations = data.pages.flatMap((page) => page.data);

  if (allConsultations.length === 0) {
    return <NoConsultations />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {allConsultations.map((consultation) => (
        <ConsultationCard key={consultation._id} consultation={consultation} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center col-span-full">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? (
              <>
                <Spinner className="mr-2" /> {t("loadingMore")}
              </>
            ) : (
              t("loadMore")
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
