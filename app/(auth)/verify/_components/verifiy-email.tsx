"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";

export const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromQuery = searchParams.get("email");
  const t = useTranslations("auth.verify");

  const verifyEmailSchema = z.object({
    pin: z.string().min(6, {
      message: t("validation.otpLength"),
    }),
  });

  type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;

  const form = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      pin: "",
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (values: VerifyEmailValues) =>
      api.auth.verifyMail({
        email: emailFromQuery || "",
        otp: values.pin,
      }),
    onSuccess: () => {
      toast.success(t("messages.verified"));
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || t("messages.invalidOtp"));
    },
  });

  const resendMutation = useMutation({
    mutationFn: (email: string) => api.auth.resendOtp({ email }),
    onSuccess: () => {
      toast.success(t("messages.resent"));
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || t("messages.resendError"));
    },
  });

  const handleResendCode = () => {
    if (emailFromQuery) {
      resendMutation.mutate(emailFromQuery);
    } else {
      toast.error(t("messages.emailRequired"));
    }
  };

  const onSubmit = (values: VerifyEmailValues) => {
    verifyMutation.mutate({
      pin: values.pin,
    });
  };

  const isLoading = verifyMutation.isPending;

  return (
    <Card className="w-full max-w-[26rem]">
      <CardHeader>
        <CardTitle className="text-center">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground text-sm">
          {t("subtitle")}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 w-full"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("otp")}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      {Array.from({ length: 6 }, (_, index) => (
                        <InputOTPGroup key={index}>
                          <InputOTPSlot index={index} />
                        </InputOTPGroup>
                      ))}
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t("otpDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              {t("verifyButton")}
            </Button>
          </form>
        </Form>

        <div className="flex flex-col items-center gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleResendCode}
            disabled={resendMutation.isPending}
            className="w-full"
          >
            {resendMutation.isPending && <Spinner />}
            {t("resendCode")}
          </Button>

          <p className="text-sm font-medium text-center text-muted-foreground">
            {t("alreadyVerified")}{" "}
            <Link href="/sign-in" className="hover:underline text-primary">
              {t("signIn")}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
