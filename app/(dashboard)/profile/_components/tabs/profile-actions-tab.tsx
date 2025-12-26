"use client";

import React from "react";
import { AstrologerDetails } from "@/lib/api/auth.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Trash2, Shield, LogOut } from "lucide-react";
import { DeleteAccountDialog } from "../delete-account-dialog";
import { ChangePasswordDialog } from "../change-password-dialog";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface ProfileActionsTabProps {
  profile: AstrologerDetails;
}

export const ProfileActionsTab = ({ profile }: ProfileActionsTabProps) => {
  const t = useTranslations("profile.actionsTab");

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
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${profile.fullName.replace(
      /\s+/g,
      "_"
    )}_data.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast.success(t("downloadSuccess"));
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
            {t("dataManagement")}
          </CardTitle>
          <CardDescription>{t("dataManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownloadData}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {t("downloadMyData")}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("downloadDescription")}
          </p>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("privacySecurity")}
          </CardTitle>
          <CardDescription>{t("privacySecurityDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <ChangePasswordDialog />
            <p className="text-sm text-muted-foreground">
              {t("changePasswordDescription")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <LogOut className="h-5 w-5" />
            {t("accountActions")}
          </CardTitle>
          <CardDescription>{t("accountActionsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </Button>
            <p className="text-sm text-muted-foreground">
              {t("signOutDescription")}
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <DeleteAccountDialog>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                {t("deleteAccountDescription").split(".")[0]}
              </Button>
            </DeleteAccountDialog>
            <p className="text-sm text-muted-foreground">
              {t("deleteAccountDescription")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
