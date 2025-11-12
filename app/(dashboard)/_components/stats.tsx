"use client";
import { formatINR } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUp, IndianRupee, Phone, Wallet } from "lucide-react";
import React from "react";
import { api } from "@/lib/api";

export const Stats = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["analytics"],
    queryFn: async () =>
      api.analytics.getAnalytics({
        period: "monthly",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }),
  });

  const currentMonthEarnings = data.data.currentPeriod.earnings;
  const totalSessions = data.data.currentPeriod.sessions;
  const walletBalance = data.data.wallet.currentBalance;

  return (
    <div className="flex gap-4 flex-col md:flex-row w-full">
      <div className="border w-full shadow-sm p-4 rounded-lg flex items-center gap-4">
        <div className="size-16  rounded-full bg-accent flex items-center justify-center">
          <IndianRupee strokeWidth={1.5} className="size-8" />
        </div>
        <div className="space-y-1">
          <p>Total Monthly Earnings</p>
          <p className="text-2xl md:text-3xl font-bold">
            {formatINR(currentMonthEarnings)}
          </p>
        </div>
      </div>
      <div className="border w-full shadow-sm p-4 rounded-lg flex items-center gap-4">
        <div className="size-16  rounded-full bg-accent flex items-center justify-center">
          <Phone strokeWidth={1.5} className="size-8" />
        </div>
        <div className="space-y-1">
          <p>Total Sessions</p>
          <p className="text-2xl md:text-3xl font-bold">{totalSessions}</p>
        </div>
      </div>
      <div className="border w-full shadow-sm p-4 rounded-lg flex items-center gap-4">
        <div className="size-16  rounded-full bg-accent flex items-center justify-center">
          <Wallet strokeWidth={1.5} className="size-8" />
        </div>
        <div className="space-y-1">
          <p>Wallet Balance</p>
          <p className="text-2xl md:text-3xl font-bold">{formatINR(walletBalance)}</p>
        </div>
      </div>
    </div>
  );
};
