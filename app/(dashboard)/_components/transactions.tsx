"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TransactionCard } from "./transaction-card";
import { useState } from "react";
import type { FundTransferRequest } from "@/lib/api/payment.api";

type FilterType = "all" | "pending" | "approved" | "rejected" | "processing";

export const Transactions = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const { data: fundTransferRequests } = useSuspenseQuery({
    queryKey: ["fund-transfer-requests", filter],
    queryFn: () =>
      api.payment.getFundTransferRequests({
        status: filter === "all" ? undefined : filter,
      }),
  });

  const requests = fundTransferRequests as FundTransferRequest[];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold md:text-xl">
          Withdrawal Requests
        </h3>

        <Select
          value={filter}
          onValueChange={(value) => setFilter(value as FilterType)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {requests?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No withdrawal requests found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {requests?.map((request) => (
            <TransactionCard key={request._id} transaction={request} />
          ))}
        </div>
      )}
    </div>
  );
};
