"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet2 } from "lucide-react";
import { Transactions } from "./transactions";
import { WithdrawDialog } from "./withdraw-dialog";

export const WalletAndEarnings = () => {
  const { data: wallet } = useSuspenseQuery({
    queryKey: ["wallet"],
    queryFn: api.auth.getWallet,
  });

  const { data: profile } = useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: api.auth.getDetails,
  });

  const maxWithdrawable = wallet.balance * 0.75;

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
              <div className="flex items-center justify-center bg-primary/10 rounded-full size-20">
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
                    {maxWithdrawable.toLocaleString()} available now. (You can
                    withdraw 75% of the amount only)
                  </p>
                </div>
                <WithdrawDialog
                  maxWithdrawable={maxWithdrawable}
                  defaultBankDetails={profile?.bankDetails}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="transactions">
            <Transactions />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
