"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BanknoteArrowDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const withdrawSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  ifscCode: z.string().min(1, "IFSC code is required"),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

interface WithdrawDialogProps {
  maxWithdrawable: number;
  defaultBankDetails?: {
    accountHolderName?: string;
    ifscCode?: string;
  };
}

export const WithdrawDialog = ({
  maxWithdrawable,
  defaultBankDetails,
}: WithdrawDialogProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
      accountHolderName: defaultBankDetails?.accountHolderName || "",
      accountNumber: "",
      ifscCode: defaultBankDetails?.ifscCode || "",
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: (values: WithdrawFormValues) =>
      api.payment.createFundTransferRequest({
        amount: Number(values.amount),
        bankDetails: {
          accountHolderName: values.accountHolderName,
          accountNumber: values.accountNumber,
          ifscCode: values.ifscCode,
        },
      }),
    onSuccess: () => {
      toast.success("Withdrawal request submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit withdrawal request");
    },
  });

  const onSubmit = (values: WithdrawFormValues) => {
    const amount = Number(values.amount);
    if (amount > maxWithdrawable) {
      toast.error(
        `Maximum withdrawable amount is ₹${maxWithdrawable.toLocaleString()}`
      );
      return;
    }
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    withdrawMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={maxWithdrawable <= 0}>
          <BanknoteArrowDown />
          Withdraw to Bank
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw to Bank</DialogTitle>
          <DialogDescription>
            Enter your bank details and the amount you want to withdraw. Maximum
            withdrawable: ₹{maxWithdrawable.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      max={maxWithdrawable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter account number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter IFSC code"
                      className="uppercase"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={withdrawMutation.isPending}>
                {withdrawMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Submit Request
              </Button>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Note: Withdrawals take 1-2 working days to process.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
