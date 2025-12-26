"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

interface DeleteAccountDialogProps {
  children?: React.ReactNode;
}

const deleteAccountSchema = z.object({
  reason: z.string().min(1, "Reason is required").trim(),
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

export const DeleteAccountDialog = ({ children }: DeleteAccountDialogProps) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("profile.deleteAccount");

  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      reason: "",
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: (data: { reason: string }) =>
      api.auth.requestAccountDeletion(data),
    onSuccess: () => {
      toast.success(t("successMessage"));
      setOpen(false);
      form.reset();
      signOut();
    },
    onError: (error: any) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const onSubmit = (data: DeleteAccountFormData) => {
    deleteAccountMutation.mutate({ reason: data.reason });
  };

  const handleCancel = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children || (
          <Button variant="destructive">
            <Trash2 />
            {t("deleteButton")}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription asChild className="space-y-2">
            <div className="space-y-2">
              <div>{t("description")}</div>
              <div className="font-medium">{t("reasonPrompt")}</div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reasonLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("reasonPlaceholder")}
                      className="min-h-[100px]"
                      disabled={deleteAccountMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel
                type="button"
                onClick={handleCancel}
                disabled={deleteAccountMutation.isPending}
              >
                {t("cancel")}
              </AlertDialogCancel>
              <Button
                type="submit"
                variant="destructive"
                disabled={deleteAccountMutation.isPending}
              >
                {deleteAccountMutation.isPending && <Spinner />}
                {t("deleteButton")}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
