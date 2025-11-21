"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BanknoteArrowDown, Wallet2 } from "lucide-react";
import React from "react";
import { BankAccountDetailsForm } from "./bank-account-details-form";
import { Transactions } from "./transactions";

export const WalletAndEarnings = () => {
  const { data: wallet } = useSuspenseQuery({
    queryKey: ["wallet"],
    queryFn: api.auth.getWallet,
  });
  return (
    <Card>
      <Tabs defaultValue="wallet">
        <CardHeader>
          <CardTitle className="text-xl md:text-[22px]">
            Wallet & Earnings
          </CardTitle>
          <CardAction>
            <TabsList className="gap-1 rounded-full">
              <TabsTrigger
                value="wallet"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
              >
                Wallet
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
              >
                Transactions
              </TabsTrigger>
            </TabsList>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TabsContent value="wallet" className="space-y-6">
            <div className="p-4 bg-accent flex flex-col md:flex-row gap-4 rounded-md">
              <div className="flex items-center justify-center bg-neutral-200 rounded-full size-20">
                <Wallet2 className="size-8" strokeWidth={1.5} />
              </div>
              <div className="flex-1 flex items-center space-y-1 gap-4 flex-col md:flex-row  md:justify-between">
                <div className="font-medium">
                  <p>Wallet Balance</p>
                  <p className="text-2xl md:text-3xl font-bold">
                    {wallet.currency || "₹"}
                    {wallet.balance.toLocaleString()}
                  </p>
                  <p>
                    {wallet.currency || "₹"}
                    {(wallet.balance * 0.75).toLocaleString()} available now.
                    (You can withdraw 75% of the amount only)
                  </p>
                </div>
                <Button>
                  <BanknoteArrowDown />
                  Withdraw to Bank
                </Button>
              </div>
            </div>
            {/* <BankAccountDetailsForm /> */}
          </TabsContent>
          <TabsContent value="transactions">
            <Transactions />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
