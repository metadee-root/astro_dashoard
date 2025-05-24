"use client";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ className }) => {
  const { data: session, status } = useSession();

  const getInitials = (name: string): string => {
    if (!name) return "";

    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };

  if (status === "loading") {
    return <Skeleton className={cn("size-10 rounded-full", className)} />;
  }

  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarImage src={session?.user.image!} />
      <AvatarFallback>{getInitials(session?.user.name || "")}</AvatarFallback>
    </Avatar>
  );
};
