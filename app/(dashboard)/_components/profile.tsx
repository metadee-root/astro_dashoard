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

interface ProfileProps {
  profile: AstrologerDetails;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
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
        <CardTitle className="text-xl md:text-[22px]">Profile</CardTitle>
        <CardAction>
          <Link href="/profile">
            <Button variant="outline">
              <Pencil /> Edit Profile
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* <div className="space-y-2 mb-6">
          <div className="text-sm font-medium flex justify-between">
            <p>Profile completion</p>
            <p>65% Completed</p>
          </div>
          <Progress value={65} />
          <p className="text-sm ">
            Complete your profile to increase visibility to seekers
          </p>
        </div> */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="relative">
            <div className="size-32 bg-accent relative rounded-full ring-2 ring-yellow-500">
              <Avatar className="h-full w-full">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback>
                  {getInitials(profile?.name || profile.fullName)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -right-0 rounded-full -bottom-0"
              >
                <Pencil />
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {profile.name || profile.fullName}
                </p>
              </div>
              {/* <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">
                  Title
                </p>
                <p className="font-medium">
                  Vedic Astrology Expert
                </p>
              </div> */}
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Languages</p>
                <p className="font-medium capitalize">
                  {profile.languages.join(", ")}
                </p>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">
                  Experience
                </p>
                <p className="font-medium">15+ Years</p>
              </div>
            </div> */}

            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground">Expertise</p>
              <p className="font-medium capitalize">
                {profile.expertise.join(", ")}
              </p>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="font-medium">{profile.about}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
