"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOutIcon, UserCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const UserMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("userMenu");

  const getInitials = (name: string): string => {
    if (!name) return "";

    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };

  if (status === "loading" || !session?.user) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-10">
          <AvatarImage src={user.image!} alt={user.name!} />
          <AvatarFallback>{getInitials(user.name!)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-10">
              <AvatarImage src={user.image!} alt={user.name!} />
              <AvatarFallback>{getInitials(user.name!)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.status !== "onboarding" && (
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <UserCircle />
            {t("profile")}
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon />
          {t("logOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
