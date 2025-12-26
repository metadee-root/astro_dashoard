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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("wallet");
  const tc = useTranslations("common");

  const withdrawSchema = z.object({
    amount: z.string().min(1, t("validation.amountRequired")),
    accountHolderName: z.string().min(1, t("validation.accountHolderRequired")),
    accountNumber: z.string().min(1, t("validation.accountNumberRequired")),
    ifscCode: z.string().min(1, t("validation.ifscRequired")),
  });

  type WithdrawFormValues = z.infer<typeof withdrawSchema>;

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
      toast.success(t("messages.withdrawSuccess"));
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || t("messages.withdrawError"));
    },
  });

  const onSubmit = (values: WithdrawFormValues) => {
    const amount = Number(values.amount);
    if (amount > maxWithdrawable) {
      toast.error(
        t("messages.maxAmount", { amount: maxWithdrawable.toLocaleString() })
      );
      return;
    }
    if (amount <= 0) {
      toast.error(t("messages.invalidAmount"));
      return;
    }
    withdrawMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={maxWithdrawable <= 0}>
          <BanknoteArrowDown />
          {t("withdrawToBank")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("withdrawTitle")}</DialogTitle>
          <DialogDescription>
            {t("withdrawDescription", {
              amount: `₹${maxWithdrawable.toLocaleString()}`,
            })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("amount")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("amountPlaceholder")}
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
                  <FormLabel>{t("accountHolderName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("accountHolderPlaceholder")}
                      {...field}
                    />
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
                  <FormLabel>{t("accountNumber")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("accountNumberPlaceholder")}
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
                  <FormLabel>{t("ifscCode")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("ifscPlaceholder")}
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
                {tc("cancel")}
              </Button>
              <Button type="submit" disabled={withdrawMutation.isPending}>
                {withdrawMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {t("submitRequest")}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {t("withdrawNote")}
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
