"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useTranslations } from "next-intl";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth.signIn");
  const tc = useTranslations("common");

  const signInSchema = z.object({
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z
      .string()
      .min(8, t("validation.passwordMin"))
      .max(100, t("validation.passwordMax")),
  });

  type SignInValues = z.infer<typeof signInSchema>;

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    setIsLoading(true);

    const data = await signIn("credentials", { ...values, redirect: false });

    if (data?.error) {
      toast.error(data.error);
      setIsLoading(false);
      return;
    }

    router.push("/");
    setIsLoading(false);
  };

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
            className="grid gap-6 w-full"
          >
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
                  <div className="inline-flex items-center justify-between">
                    <FormLabel>{t("password")}</FormLabel>
                    <Link
                      href="/reset-password"
                      className="text-xs font-medium text-muted-foreground hover:underline"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={t("passwordPlaceholder")}
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="current-password"
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

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              {t("signInButton")}
            </Button>
          </form>
        </Form>

        <p className="text-sm font-medium text-center text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/sign-up" className="hover:underline text-primary">
            {t("signUp")}
          </Link>
        </p>

        <div className="flex justify-center gap-4 text-sm">
          <Link
            href="/missing-verification"
            className="text-muted-foreground hover:underline"
          >
            {t("missingVerification")}
          </Link>
        </div>

        <p className="text-xs font-medium text-center text-muted-foreground">
          {t("termsAgree")}{" "}
          <Link
            href={EXTERNAL_LINKS.TERMS_OF_SERVICE}
            className="hover:underline text-primary"
          >
            {t("termsOfService")}
          </Link>{" "}
          {tc("and")}{" "}
          <Link
            href={EXTERNAL_LINKS.PRIVACY_POLICY}
            className="hover:underline text-primary"
          >
            {t("privacyPolicy")}
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
};
