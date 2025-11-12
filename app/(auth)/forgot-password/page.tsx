import Link from "next/link";
import { ForgotPassword } from "./_components/forgot-password";

export const metadata = {
  title: "Forgot Password",
};

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
