import React, { FC } from "react";
import { Toaster } from "@/components/ui/sonner";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      {children}
      <Toaster richColors theme="light" className="font-sans" />
    </div>
  );
};

export default AuthLayout;
