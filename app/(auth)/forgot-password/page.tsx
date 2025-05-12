import Link from "next/link";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata = {
  title: "Forgot Password",
};

const ForgotPasswordPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-lg md:text-xl font-semibold">
          Forgot your password?
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <ForgotPasswordForm />

      <p className="text-center text-muted-foreground text-sm">
        <Link href="/sign-in" className="font-medium text-primary">
          Back to sign in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
