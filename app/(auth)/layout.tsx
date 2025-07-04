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
    <>
      <div className="min-h-screen flex items-center justify-center md:bg-neutral-100 bg-background sm:p-6">
        <div className="rounded-xl overflow-hidden flex w-full max-w-[68rem] bg-background md:shadow-2xl">
          <Image
            src={planetsImage}
            alt="planets"
            placeholder="blur"
            className="aspect-square hidden md:block object-cover w-full md:max-w-[32rem] lg:max-w-[36rem] xl:max-w-[40rem]"
          />

          <div className="flex flex-col md:px-8 lg:px-10 md:py-12 md:p-0 space-y-6 flex-1 p-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="logo" className="w-12 h-auto" />
              <p className="font-cinzel font-bold text-2xl">Sanatan Vision</p>
            </div>
            {children}
          </div>
        </div>
      </div>
      <Toaster richColors theme="light" className="font-sans" />
    </>
  );
};

export default AuthLayout;
