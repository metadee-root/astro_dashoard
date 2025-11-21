import { Navbar } from "@/components/navbar";
import { SocketProvider } from "@/components/socket-provider";
import { Toaster } from "@/components/ui/sonner";
import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SocketProvider>
      <div>
        <Navbar />
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">{children}</div>
        <Toaster richColors theme="light" className="font-sans" />
      </div>
    </SocketProvider>
  );
};

export default DashboardLayout;
