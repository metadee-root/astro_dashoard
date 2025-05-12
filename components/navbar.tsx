import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";

export const Navbar = () => {
  return (
    <nav className="h-16 border-b flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" className="w-12 h-auto" />
        <p className="font-cinzel font-bold text-2xl">Sanatan Vision</p>
      </Link>
    </nav>
  );
};
