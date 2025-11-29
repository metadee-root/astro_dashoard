"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import { UserMenu } from "./user-menu";
import { useSocket } from "./socket-provider";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

export const Navbar = () => {
  const { isConnected } = useSocket();
  return (
    <nav className="h-16 border-b flex items-center justify-center">
      <div className="px-4 sm:px-6 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" className="w-10 h-auto" />
          <p className="font-cinzel font-bold text-xl hidden md:block">
            Sanatan Vision
          </p>
        </Link>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-full border text-xs font-semibold flex items-center gap-2">
            <Circle
              className={cn(
                "size-2.5 rounded-full",
                isConnected
                  ? "bg-green-500 text-green-500"
                  : "bg-red-500 text-red-500"
              )}
            />
            {isConnected ? "Connected" : "Not Connected"}
          </div>
          <ThemeToggle />

          <UserMenu />
        </div>
      </div>
    </nav>
  );
};
