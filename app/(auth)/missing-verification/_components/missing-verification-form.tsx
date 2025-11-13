"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ResendVerificationValues = z.infer<typeof resendVerificationSchema>;

export const MissingVerificationForm = () => {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const form = useForm<ResendVerificationValues>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const resendMutation = useMutation({
    mutationFn: (values: ResendVerificationValues) =>
      api.auth.resendOtp({ email: values.email }),
    onSuccess: (data, variables) => {
      setEmailSent(true);
      setSentEmail(variables.email);
      toast.success("Verification email sent successfully!");

      // Redirect to verify page after a short delay
      setTimeout(() => {
        router.push(`/verify?email=${encodeURIComponent(variables.email)}`);
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to send verification email. Please try again."
      );
    },
  });

  const onSubmit = (values: ResendVerificationValues) => {
    resendMutation.mutate(values);
  };

  const handleGoToVerification = () => {
    router.push(`/verify?email=${encodeURIComponent(sentEmail)}`);
  };

  const isLoading = resendMutation.isPending;

  return (
    <Card className="w-full max-w-[26rem]">
      <CardHeader className="text-center">
        <CardTitle>Missing Verification Email?</CardTitle>
        <CardDescription>
          Enter your email address to receive a new verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!emailSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Spinner className="mr-2 h-4 w-4" />}
                Send Verification Email
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Email Sent!</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a verification email to:
              </p>
              <p className="font-medium">{sentEmail}</p>
              <p className="text-sm text-muted-foreground">
                Redirecting you to the verification page...
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleGoToVerification}
              className="w-full"
            >
              Go to Verification Page
            </Button>
          </div>
        )}
        {/* Back to Sign In Link */}
        <div className="pt-6 flex justify-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
