"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { EXTERNAL_LINKS } from "@/lib/constants";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must not exceed 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (values: SignUpFormValues) =>
      api.auth.signup({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    onSuccess: (_, variables) => {
      toast.success(
        "Account created successfully! Please check your email for verification."
      );
      router.push(`/verify?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    signUpMutation.mutate(values);
  };

  const isLoading = signUpMutation.isPending;

  return (
    <Card className="w-full max-w-[26rem]">
      <CardHeader>
        <CardTitle className="text-center">Sign Up - Astrologers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      autoCapitalize="words"
                      autoComplete="name"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter password"
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="new-password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:bg-transparent hover:text-foreground"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="inline-flex items-center justify-between">
                    <FormLabel>Confirm Password</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="new-password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:bg-transparent hover:text-foreground"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Sign up
            </Button>
          </form>
        </Form>

        <p className="text-sm font-medium text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="hover:underline text-primary">
            Sign in
          </Link>
        </p>

        <p className="text-xs font-medium text-center text-muted-foreground">
          By continuing, you agree to Sanatan Vision&apos;s{" "}
          <Link
            href={EXTERNAL_LINKS.TERMS_OF_SERVICE}
            className="hover:underline text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={EXTERNAL_LINKS.PRIVACY_POLICY}
            className="hover:underline text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
};
