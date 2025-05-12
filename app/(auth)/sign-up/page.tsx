import Link from "next/link";
import { SignUpForm } from "./_components/sign-up-form";

export const metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-lg sr-only md:text-xl font-semibold">
        Sign Up - Astro Advisor
      </h1>
      <SignUpForm />
      <p className="text-center text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
