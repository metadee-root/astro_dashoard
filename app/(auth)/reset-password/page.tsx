import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata = {
  title: "Reset Password",
};

const ResetPasswordPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-lg md:text-xl font-semibold">
          Reset your password
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your new password below. Make sure it's at least 8 characters
          long.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
