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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useTranslations } from "next-intl";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth.signUp");
  const tc = useTranslations("common");

  const signUpSchema = z
    .object({
      name: z.string().min(1, t("validation.nameRequired")),
      email: z
        .string()
        .min(1, t("validation.emailRequired"))
        .email(t("validation.emailInvalid")),
      password: z
        .string()
        .min(8, t("validation.passwordMin"))
        .max(100, t("validation.passwordMax")),
      confirmPassword: z
        .string()
        .min(1, t("validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

  type SignUpFormValues = z.infer<typeof signUpSchema>;

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
      toast.success(t("messages.success"));
      router.push(`/verify?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || t("messages.error"));
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    signUpMutation.mutate(values);
  };

  const isLoading = signUpMutation.isPending;

  return (
    <Card className="w-full max-w-[26rem]">
      <CardHeader className="text-center">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
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
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("namePlaceholder")}
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
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("emailPlaceholder")}
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
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={t("passwordPlaceholder")}
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
                    <FormLabel>{t("confirmPassword")}</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={t("confirmPasswordPlaceholder")}
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
              {t("signUpButton")}
            </Button>
          </form>
        </Form>

        <p className="text-sm font-medium text-center text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link href="/sign-in" className="hover:underline text-primary">
            {t("signIn")}
          </Link>
        </p>

        <p className="text-xs font-medium text-center text-muted-foreground">
          {useTranslations("auth.signIn")("termsAgree")}{" "}
          <Link
            href={EXTERNAL_LINKS.TERMS_OF_SERVICE}
            className="hover:underline text-primary"
          >
            {useTranslations("auth.signIn")("termsOfService")}
          </Link>{" "}
          {tc("and")}{" "}
          <Link
            href={EXTERNAL_LINKS.PRIVACY_POLICY}
            className="hover:underline text-primary"
          >
            {useTranslations("auth.signIn")("privacyPolicy")}
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
};
