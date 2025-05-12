import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";

export const metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-lg md:text-xl font-semibold">
        Sign In - Astro Advisor
      </h1>
      <SignInForm />
      <p className="text-center text-muted-foreground text-sm">
        Dont have an account?{" "}
        <Link href="/sign-up" className="font-medium text-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
