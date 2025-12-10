import { cn, formatINR } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { FC } from "react";
import { format } from "date-fns";
import type { FundTransferRequest } from "@/lib/api/payment.api";

interface TransactionCardProps {
  transaction: FundTransferRequest;
}

const statusColors: Record<FundTransferRequest["status"], string> = {
  pending: "text-yellow-600 dark:text-yellow-400",
  processing: "text-blue-600 dark:text-blue-400",
  approved: "text-green-600 dark:text-green-400",
  rejected: "text-red-600 dark:text-red-400",
};

export const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <div className="p-4 flex gap-4 border rounded-md">
      <div className="flex items-center justify-center rounded-full size-12 bg-red-100 dark:bg-red-900/30 text-red-500">
        <ArrowDown />
      </div>
      <div className="flex justify-between font-semibold flex-1">
        <div className="space-y-1">
          <p>Withdrawal to Bank</p>
          <p className="text-sm font-medium text-muted-foreground">
            {transaction.bankDetails.accountHolderName} •{" "}
            {transaction.bankDetails.ifscCode}
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            {format(
              new Date(transaction.requestDate),
              "MMM dd, yyyy • hh:mm a"
            )}
          </p>
        </div>
        <div className="text-right">
          <p className="md:text-lg text-red-500">
            -{formatINR(transaction.amount)}
          </p>
          <p
            className={cn(
              "text-sm font-medium capitalize",
              statusColors[transaction.status]
            )}
          >
            {transaction.status}
          </p>
        </div>
      </div>
    </div>
  );
};
