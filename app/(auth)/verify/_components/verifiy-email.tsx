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

const verifyEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;

export const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromQuery = searchParams.get("email");

  const form = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: emailFromQuery || "",
      pin: "",
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (values: VerifyEmailValues) =>
      api.auth.verifyMail({
        email: values.email,
        otp: values.pin,
      }),
    onSuccess: () => {
      toast.success("Email verified successfully!");
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Invalid OTP. Please try again.");
    },
  });

  const onSubmit = (values: VerifyEmailValues) => {
    verifyMutation.mutate(values);
  };

  const isLoading = verifyMutation.isPending;

  return (
    <Card className="w-full max-w-[26rem]">
      <CardHeader>
        <CardTitle className="text-center">Verify Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground text-sm">
          Enter the 6-digit verification code sent to your email address
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
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      {Array.from({ length: 6 }, (_, index) => (
                        <InputOTPGroup key={index}>
                          <InputOTPSlot index={index} />
                        </InputOTPGroup>
                      ))}
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Verify Email
            </Button>
          </form>
        </Form>

        <p className="text-sm font-medium text-center text-muted-foreground">
          Already verified?{" "}
          <Link href="/sign-in" className="hover:underline text-primary">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
