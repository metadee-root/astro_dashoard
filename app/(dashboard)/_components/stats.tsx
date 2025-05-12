import { formatINR } from "@/lib/utils";
import { ArrowUp, IndianRupee, Phone, Wallet } from "lucide-react";
import React from "react";

export const Stats = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row w-full">
      <div className="border w-full shadow-sm p-4 rounded-lg flex items-center gap-4">
        <div className="size-16  rounded-full bg-accent flex items-center justify-center">
          <IndianRupee strokeWidth={1.5} className="size-8" />
        </div>
        <div className="space-y-1">
          <p>Total Monthly Earnings</p>
          <p className="text-2xl md:text-3xl font-bold">
            {formatINR(24500)}{" "}
            <span className="text-base inline-flex items-center gap-1 text-green-500 font-medium">
              +12% <ArrowUp className="size-4" />
            </span>
          </p>
        </div>
      </div>
      <div className="border w-full shadow-sm p-4 rounded-lg flex items-center gap-4">
        <div className="size-16  rounded-full bg-accent flex items-center justify-center">
          <Phone strokeWidth={1.5} className="size-8" />
        </div>
        <div className="space-y-1">
          <p>Total Calls Accepted</p>
          <p className="text-2xl md:text-3xl font-bold">
            56{" "}
            <span className="text-base inline-flex items-center gap-1 text-green-500 font-medium">
              +12% <ArrowUp className="size-4" />
            </span>
          </p>
        </div>
      </div>
      <div className="border w-full shadow-sm p-4 rounded-lg flex items-center gap-4">
        <div className="size-16  rounded-full bg-accent flex items-center justify-center">
          <Wallet strokeWidth={1.5} className="size-8" />
        </div>
        <div className="space-y-1">
          <p>Wallet Balance</p>
          <p className="text-2xl md:text-3xl font-bold">{formatINR(17000)}</p>
        </div>
      </div>
    </div>
  );
};
