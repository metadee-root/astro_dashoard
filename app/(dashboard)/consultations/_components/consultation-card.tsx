"use client";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Calendar,
  User,
  MapPin,
  MessageCircle,
  Mic,
  Video,
  Clock,
  FileText,
} from "lucide-react";
import { ConsultationRecord } from "@/lib/api/consultation.api";
import { useTranslations } from "next-intl";

interface ConsultationCardProps {
  consultation: ConsultationRecord;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({
  consultation,
}) => {
  const t = useTranslations("consultations.card");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200 font-medium">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-semibold">
              {consultation.fullName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {consultation.createdAt
                  ? format(
                      new Date(consultation.createdAt),
                      "MMM dd, yyyy 'at' h:mm a"
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
          <Badge
            className={`${getStatusColor(
              consultation.status
            )} capitalize font-medium px-3 py-1`}
          >
            {consultation.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Personal Information Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            {t("personalInformation")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("dateOfBirth")}
                </p>
                <p className="text-sm font-medium">
                  {consultation.dateTimeOfBirth
                    ? format(
                        new Date(consultation.dateTimeOfBirth),
                        "MMM dd, yyyy"
                      )
                    : t("notProvided")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t("gender")}</p>
                <p className="text-sm font-medium capitalize">
                  {consultation.gender}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("placeOfBirth")}
                </p>
                <p className="text-sm font-medium">
                  {consultation.placeOfBirth}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Consultation Details Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {t("consultationDetails")}
          </h4>
          <div className="space-y-3 pl-6">
            <div className="flex items-center gap-2">
              {getModeIcon(consultation.mode)}
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("consultationMode")}
                </p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {consultation.mode}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {t("userConcern")}
              </p>
              <div className="bg-primary/10 rounded-lg p-3 border">
                <p className="text-sm leading-relaxed">
                  {consultation.concern}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getModeIcon = (mode: "video" | "voice" | "chat") => {
  const iconClass = "w-4 h-4 text-muted-foreground";
  switch (mode) {
    case "video":
      return <Video className={iconClass} />;
    case "voice":
      return <Mic className={iconClass} />;
    case "chat":
      return <MessageCircle className={iconClass} />;
    default:
      return null;
  }
};
