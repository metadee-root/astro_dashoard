import Image from "next/image";
import React, { FC } from "react";
import planetsImage from "@/public/planets.jpg";
import logo from "@/public/logo.png";
import { Toaster } from "@/components/ui/sonner";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
