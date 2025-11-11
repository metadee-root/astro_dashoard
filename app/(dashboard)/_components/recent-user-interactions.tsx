"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ConsultationCard } from "../consultations/_components/consultation-card";
import { NoConsultations } from "../consultations/_components/no-consultations";

export const RecentUserInteractions = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["recent-consultations"],
    queryFn: () => api.consultation.getConsultationRecords(1, 2),
  });

  const hasConsultations = data.data && data.data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-[22px]">
          Recent Consultations
        </CardTitle>
        <CardAction>
          <Button variant="outline" asChild>
            <Link href="/consultations">View All</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {hasConsultations ? (
          <div className="grid md:grid-cols-2 gap-4">
            {data.data.map((consultation) => (
              <ConsultationCard
                key={consultation._id}
                consultation={consultation}
              />
            ))}
          </div>
        ) : (
          <NoConsultations
            onUpdateProfile={() => window.location.href = "/edit-profile"}
            onViewAvailability={() => window.location.href = "/availability"}
          />
        )}
      </CardContent>
    </Card>
  );
};
