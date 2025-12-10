"use client";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { api } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Calendar, CreditCard, Settings } from "lucide-react";
import { PersonalInfoTab } from "./tabs/personal-info-tab";
import { ProfessionalBackgroundTab } from "./tabs/professional-background-tab";
import { ServicesAvailabilityTab } from "./tabs/services-availability-tab";
import { BankingPaymentTab } from "./tabs/banking-payment-tab";
import { ProfileActionsTab } from "./tabs/profile-actions-tab";

const TAB_VALUES = [
  "personal",
  "professional",
  "services",
  "banking",
  "actions",
] as const;

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringLiteral(TAB_VALUES).withDefault("personal")
  );

  const { data: profile } = useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: () => api.auth.getDetails(),
  });

  const tabs = [
    {
      value: "personal",
      label: "Personal Information",
      icon: User,
      component: <PersonalInfoTab profile={profile} />,
    },
    {
      value: "professional",
      label: "Professional Background",
      icon: Briefcase,
      component: <ProfessionalBackgroundTab profile={profile} />,
    },
    {
      value: "services",
      label: "Services & Availability",
      icon: Calendar,
      component: <ServicesAvailabilityTab profile={profile} />,
    },
    {
      value: "banking",
      label: "Banking & Payment",
      icon: CreditCard,
      component: <BankingPaymentTab profile={profile} />,
    },
    {
      value: "actions",
      label: "Profile Actions",
      icon: Settings,
      component: <ProfileActionsTab profile={profile} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Update your profile information, services, and payment details
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as (typeof TAB_VALUES)[number])
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {tab.component}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
