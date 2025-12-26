"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { AstrologerDetails } from "@/lib/api/auth.api";
import { useTranslations } from "next-intl";

interface ProfileProps {
  profile: AstrologerDetails;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
  const t = useTranslations("dashboardProfile");

  const getInitials = (name: string): string => {
    if (!name) return "";

    const names = name?.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-[22px]">{t("title")}</CardTitle>
        <CardAction>
          <Link href="/profile">
            <Button variant="outline">
              <Pencil /> {t("editProfile")}
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="relative">
            <div className="size-32 bg-accent relative rounded-full">
              <Avatar className="h-full w-full">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback>
                  {getInitials(profile?.name || profile.fullName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">{t("fullName")}</p>
                <p className="font-medium">
                  {profile.name || profile.fullName}
                </p>
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">
                  {t("languages")}
                </p>
                <p className="font-medium capitalize">
                  {profile.languages.join(", ")}
                </p>
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground">{t("expertise")}</p>
              <p className="font-medium capitalize">
                {profile.expertise.join(", ")}
              </p>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground">{t("bio")}</p>
              <p className="font-medium">{profile.about}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
