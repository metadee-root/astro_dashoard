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
import { Pencil } from "lucide-react";
import React from "react";

export const Profile = () => {
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
                <AvatarImage src="https://i.pravatar.cc/150?img=33" />
                <AvatarFallback>PS</AvatarFallback>
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
                <p className="md:text-lg font-semibold">
                  Acharya Ramesh Sharma
                </p>
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-semibold text-foreground/80">
                  Title
                </p>
                <p className="md:text-lg font-semibold">
                  Vedic Astrology Expert
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-1 flex-1">
                <p className="text-sm font-semibold text-foreground/80">
                  Languages
                </p>
                <p className="md:text-lg font-semibold">
                  Hindi, English, Sanskrit
                </p>
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-semibold text-foreground/80">
                  Experience
                </p>
                <p className="md:text-lg font-semibold">15+ Years</p>
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm font-semibold text-foreground/80">
                Expertise
              </p>
              <p className="md:text-lg font-semibold">
                Vedic Astrology, Vastu Shastra, Graha Shanti, Kundali Analysis
              </p>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm font-semibold text-foreground/80">Bio</p>
              <p className="md:text-lg font-semibold">
                Dedicated Vedic astrologer with over 15 years of experience
                guiding seekers through life's challenges using ancient wisdom.
                Specializing in Graha Shanti remedies and personalized spiritual
                guidance{" "}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
