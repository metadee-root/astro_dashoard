import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AstrologerDetails } from "@/lib/api/auth.api";
import { Pencil } from "lucide-react";
import React, { FC } from "react";

interface ProfileProps {
  profile: AstrologerDetails;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
  const getInitials = (name: string): string => {
    if (!name) return "";

    const names = name.split(" ");
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
          <Button variant="outline">
            <Pencil /> Edit Profile
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          <div className="text-sm font-medium flex justify-between">
            <p>Profile completion</p>
            <p>65% Completed</p>
          </div>
          <Progress value={65} />
          <p className="text-sm ">
            Complete your profile to increase visibility to seekers
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="relative">
            <div className="size-32 bg-accent relative rounded-full ring-2 ring-yellow-500">
              <Avatar className="h-full w-full">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
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
                <p className="text-sm font-semibold text-foreground/80">
                  Full Name
                </p>
                <p className="md:text-lg font-semibold">{profile.name}</p>
              </div>
              {/* <div className="space-y-1 flex-1">
                <p className="text-sm font-semibold text-foreground/80">
                  Title
                </p>
                <p className="md:text-lg font-semibold">
                  Vedic Astrology Expert
                </p>
              </div> */}
              <div className="space-y-1 flex-1">
                <p className="text-sm font-semibold text-foreground/80">
                  Languages
                </p>
                <p className="md:text-lg font-semibold capitalize">
                  {profile.languages.join(", ")}
                </p>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-1 flex-1">
                <p className="text-sm font-semibold text-foreground/80">
                  Experience
                </p>
                <p className="md:text-lg font-semibold">15+ Years</p>
              </div>
            </div> */}

            <div className="space-y-1 flex-1">
              <p className="text-sm font-semibold text-foreground/80">
                Expertise
              </p>
              <p className="md:text-lg font-semibold capitalize">
                {profile.expertise.join(", ")}
              </p>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm font-semibold text-foreground/80">Bio</p>
              <p className="md:text-lg font-semibold">{profile.about}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
