"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/lib/api";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be six digit long." })
    .max(6, { message: "OTP must be six digit long." }),
});

const passwordSchema = z
  .string()
  .min(8, { message: "Password should be at least 8 characters long" })
  .max(16, { message: "Password should not exceed 16 characters" })
  .refine(
    (value) =>
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/.test(
        value
      ),
    {
      message:
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character",
    }
  );

const formSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const ResetPassword = () => {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  // send otp
  const { mutate: sendOtp, isPending } = useMutation({
    mutationKey: ["send otp"],
    mutationFn: async (email: string) => {
      const data = await api.auth.forgotPasswordOtp({ email });
      return data;
    },
    onSuccess() {
      toast.success("Verification email Sent!");
      setIsSent(true);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { mutate: resetPassword, isPending: verifyLoading } = useMutation({
    mutationKey: ["reset password"],
    mutationFn: async ({
      email,
      password,
      otp,
    }: z.infer<typeof formSchema> & { otp: string }) => {
      const data = await api.auth.resetPassword({
        email,
        password,
        otp,
      });

      return data;
    },
    onSuccess(data, email, context) {
      toast.success("Password updated!");
      router.push("/sign-in");
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendOtp(values.email);
  };

  const onOtpSubmit = (values: z.infer<typeof otpSchema>) => {
    resetPassword({
      email: form.getValues("email"),
      password: form.getValues("password"),
      confirmPassword: form.getValues("confirmPassword"),
      otp: values.otp,
    });
  };

  return (
    <Card className="w-full max-w-[26rem] isolate">
      <CardHeader className="text-center">
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Enter the email to get OTP to setting up new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {!isSent ? (
          <Form key={"email-password-form"} {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSent}
                          type={isPasswordVisible ? "text" : "password"}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute top-2.5 right-2.5 text-muted-foreground"
                        onClick={() => setIsPasswordVisible((ipv) => !ipv)}
                        disabled={isSent}
                      >
                        {isPasswordVisible ? (
                          <EyeOff strokeWidth={1.5} size={20} />
                        ) : (
                          <Eye strokeWidth={1.5} size={20} />
                        )}
                      </button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* confirm password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={isConfirmPasswordVisible ? "text" : "password"}
                          disabled={isSent}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute top-2.5 right-2.5 text-muted-foreground"
                        onClick={() =>
                          setIsConfirmPasswordVisible((ipv) => !ipv)
                        }
                        disabled={isSent}
                      >
                        {isConfirmPasswordVisible ? (
                          <EyeOff strokeWidth={1.5} size={20} />
                        ) : (
                          <Eye strokeWidth={1.5} size={20} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-2"
                type="submit"
                disabled={isPending || isSent}
              >
                {isPending ? <Spinner size={20} /> : "Send OTP"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form key={"otp-form"} {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPGroup className="w-full" key={i}>
                            <InputOTPSlot index={i} />
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

              <Button className="w-full" type="submit" disabled={verifyLoading}>
                {verifyLoading ? (
                  <Spinner size={20} className="animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        )}

        <div className="text-sm text-muted-foreground text-center">
          Have an account already ?{" "}
          <Link className="text-primary font-medium" href="/sign-in">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
