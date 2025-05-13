import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { TransactionCard } from "./transaction-card";

const transactions = [
  {
    _id: "txn_001",
    amount: 150.75,
    type: "credit",
    date: "2025-05-10T14:23:00Z",
    description: "Salary Credit",
    status: "completed",
  },
  {
    _id: "txn_002",
    amount: 45.0,
    type: "debit",
    date: "2025-05-09T11:15:00Z",
    description: "Grocery Shopping",
    status: "completed",
  },
  {
    _id: "txn_003",
    amount: 200.0,
    type: "debit",
    date: "2025-05-08T18:45:00Z",
    description: "Electricity Bill",
    status: "pending",
  },
  {
    _id: "txn_004",
    amount: 500.0,
    type: "credit",
    date: "2025-05-07T09:00:00Z",
    description: "Freelance Project",
    status: "completed",
  },
  {
    _id: "txn_005",
    amount: 75.25,
    type: "debit",
    date: "2025-05-06T16:30:00Z",
    description: "Restaurant Bill",
    status: "completed",
  },
  {
    _id: "txn_006",
    amount: 300.0,
    type: "credit",
    date: "2025-05-05T12:00:00Z",
    description: "Refund from Vendor",
    status: "pending",
  },
] as const;

export const Transactions = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold md:text-xl">Transactions</h3>

        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="withdraw">Withdraw</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction._id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
