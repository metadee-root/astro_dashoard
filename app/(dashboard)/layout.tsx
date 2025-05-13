import { Navbar } from "@/components/navbar";
import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
