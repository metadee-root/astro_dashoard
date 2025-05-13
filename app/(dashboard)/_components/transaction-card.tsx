import { cn, formatINR } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { FC } from "react";
import { format } from "date-fns";

interface TransactionCardProps {
  transaction: {
    _id: string;
    amount: number;
    type: "credit" | "debit";
    date: string;
    description: string;
    status: "pending" | "completed";
  };
}

export const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <div className="p-4 flex gap-4 border rounded-md">
      <div
        className={cn(
          "flex items-center justify-center rounded-full size-12",
          transaction.type === "credit"
            ? "bg-green-100 text-green-500"
            : "bg-red-100 text-red-500"
        )}
      >
        {transaction.type === "credit" ? <ArrowUp /> : <ArrowDown />}
      </div>
      <div className="flex justify-between font-semibold flex-1">
        <div className="space-y-1">
          <p>
            {transaction.type === "credit"
              ? "Received from user [Aarav] Voice Call (15 min)"
              : "Withdrawal to Bank Account"}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {format(transaction.date, "MMM dd, yyyy • hh:mm a")}
          </p>
        </div>
        <div>
          <p
            className={cn(
              "md:text-lg",
              transaction.type === "credit" ? "text-green-500" : "text-red-500"
            )}
          >
            {transaction.type === "credit" ? "+" : "-"}
            {formatINR(transaction.amount)}
          </p>
          <p className="text-muted-foreground text-sm font-medium capitalize">
            {transaction.status}
          </p>
        </div>
      </div>
    </div>
  );
};
