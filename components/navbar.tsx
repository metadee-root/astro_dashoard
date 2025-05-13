import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import { UserMenu } from "./user-menu";

export const Navbar = () => {
  return (
    <nav className="h-16 border-b flex items-center justify-center">
      <div className="px-4 sm:px-6 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" className="w-10 h-auto" />
          <p className="font-cinzel font-bold text-xl">Sanatan Vision</p>
        </Link>

        <UserMenu />
      </div>
    </nav>
  );
};
