"use client";

import React from "react";
import { AstrologerDetails } from "@/lib/api/auth.api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Trash2, Shield, LogOut } from "lucide-react";
import { DeleteAccountDialog } from "../delete-account-dialog";
import { ChangePasswordDialog } from "../change-password-dialog";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface ProfileActionsTabProps {
  profile: AstrologerDetails;
}

export const ProfileActionsTab = ({ profile }: ProfileActionsTabProps) => {
  const handleDownloadData = () => {
    // Create a JSON object with user data
    const userData = {
      personalInfo: {
        fullName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
        placeOfBirth: profile.placeOfBirth,
        timeOfBirth: profile.timeOfBirth,
      },
      professionalInfo: {
        expertise: profile.expertise,
        astrologySystems: profile.astrologySystems,
        yearsOfExperience: profile.yearsOfExperience,
        languages: profile.languages,
        about: profile.about,
      },
      services: {
        chatPrice: profile.chatPrice,
        callPrice: profile.callPrice,
        videoPrice: profile.videoPrice,
        workingDays: profile.workingDays,
        timeSlots: profile.timeSlots,
        expectedResponseTime: profile.expectedResponseTime,
      },
      accountInfo: {
        status: profile.status,
        isVerified: profile.isVerified,
        createdAt: profile.createdAt,
      },
    };

    // Create and download the JSON file
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${profile.fullName.replace(/\s+/g, "_")}_data.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast.success("Your data has been downloaded successfully");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="space-y-6">
      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Manage your personal data and account information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownloadData}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download My Data
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Download a copy of your personal information, profile details, and
            account data in JSON format.
          </p>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your account security and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <ChangePasswordDialog />
            <p className="text-sm text-muted-foreground">
              Change your account password to keep your account secure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <LogOut className="h-5 w-5" />
            Account Actions
          </CardTitle>
          <CardDescription>
            Manage your account status and access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
            <p className="text-sm text-muted-foreground">
              Sign out of your current session.
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <DeleteAccountDialog>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </DeleteAccountDialog>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action
              cannot be undone.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};