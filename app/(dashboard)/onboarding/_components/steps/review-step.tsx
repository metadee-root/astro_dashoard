"use client";

import React, { useState } from "react";
import { useOnboardingStore } from "../../_hooks/use-onboarding-store";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  User,
  Briefcase,
  DollarSign,
  FileText,
  CreditCard,
  Star,
  Shield,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { EXTERNAL_LINKS } from "@/lib/constants";

// Helper function to transform form data to API format
const transformFormDataForAPI = (formData: any) => {
  return {
    fullName: formData.personalInfo?.fullName || "",
    dateOfBirth:
      formData.personalInfo?.dateOfBirth?.toISOString().split("T")[0] || "",
    timeOfBirth:
      formData.personalInfo?.timeOfBirth?.toTimeString().slice(0, 5) || "",
    placeOfBirth: formData.personalInfo?.placeOfBirth || "",
    primaryLanguage: formData.personalInfo?.primaryLanguage || "",
    languages: formData.personalInfo?.languages || [],
    expertise: formData.professionalBackground?.expertise || [],
    yearsOfExperience:
      formData.professionalBackground?.yearsOfExperience?.toString() || "0",
    astrologySystems: formData.professionalBackground?.astrologySystems || [],
    otherPractices: formData.professionalBackground?.otherPractices || [],
    teachers: formData.professionalBackground?.teachers || "",
    lineage: formData.professionalBackground?.lineage || "",
    formalEducation: formData.professionalBackground?.formalEducation || "",
    maxConsultationsPerDay:
      formData.servicesPricing?.maxConsultationsPerDay?.toString() || "5",
    workingDays: formData.servicesPricing?.workingDays || [],
    timeSlots: formData.servicesPricing?.timeSlots || [],
    expectedResponseTime:
      formData.servicesPricing?.expectedResponseTime || "within_24_hours",
    remediesTypes: formData.specialization?.remediesTypes || [],
    excludedPredictionAreas:
      formData.specialization?.excludedPredictionAreas || [],
    createHoroscopeContent:
      formData.specialization?.createHoroscopeContent || false,
    createDailyPredictions:
      formData.specialization?.createDailyPredictions || false,
    bankDetails: JSON.stringify(formData.financial || {}),
    about: formData.personalInfo?.about || "",
    chatPrice: formData.servicesPricing?.chatPrice || "500",
    callPrice: formData.servicesPricing?.callPrice || "1000",
    videoPrice: formData.servicesPricing?.videoPrice || "1500",
    canPerformPuja: formData.specialization?.canPerformPuja || false,
    profileImage: formData.personalInfo?.profileImage,
    aadharCard: formData.documentation?.aadharCard,
    addressProof: formData.documentation?.addressProof,
    educationCertificates: formData.documentation?.educationCertificates || [],
  };
};

// Separate component for submission with mutation
interface SubmitOnboardingButtonProps {
  disabled?: boolean;
}

const SubmitOnboardingButton = ({ disabled }: SubmitOnboardingButtonProps) => {
  const { getCompleteFormData, resetForm } = useOnboardingStore();
  const { update } = useSession();
  const t = useTranslations("onboarding.review");

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: async () => {
      const formData = getCompleteFormData();
      const apiData = transformFormDataForAPI(formData);

      // Validate required fields
      if (!apiData.fullName || !apiData.dateOfBirth || !apiData.placeOfBirth) {
        throw new Error("Please complete all required personal information");
      }

      if (!apiData.expertise.length || !apiData.astrologySystems.length) {
        throw new Error(
          "Please add at least one area of expertise and one astrology system"
        );
      }

      if (!apiData.workingDays.length || !apiData.timeSlots.length) {
        throw new Error("Please select your working days and time slots");
      }

      console.log("Submitting transformed data:", apiData);
      return await api.auth.submitOnboarding(apiData);
    },
    onSuccess: async () => {
      toast.success(t("successMessage"));
      resetForm();
      // Update session with new status
      await update({
        status: "in_review",
      });
      // Use hard redirect instead of router.push to ensure middleware gets updated token
      window.location.href = "/in-review";
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      toast.error(error.message || t("errorMessage"));
    },
  });

  const handleSubmit = () => {
    submitApplication();
  };

  return (
    <Button
      type="button"
      onClick={handleSubmit}
      disabled={isPending || disabled}
      className="px-8"
    >
      {isPending ? t("submitting") : t("submitButton")}
    </Button>
  );
};

// Legal agreement section with checkboxes
interface LegalAgreementSectionProps {
  previousStep: () => void;
  t: ReturnType<typeof useTranslations>;
  tCommon: ReturnType<typeof useTranslations>;
}

const LegalAgreementSection = ({
  previousStep,
  t,
  tCommon,
}: LegalAgreementSectionProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const canSubmit = acceptedTerms && acceptedPrivacy;

  return (
    <div className="bg-muted/50 border rounded-lg p-6">
      {/* Legal Agreements */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="size-4" />
          {t("legalAgreements")}
        </h4>
        <div className="space-y-4">
          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptTerms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
            />
            <label
              htmlFor="acceptTerms"
              className="text-sm leading-relaxed cursor-pointer"
            >
              {t("acceptTermsPrefix")}{" "}
              <a
                href={EXTERNAL_LINKS.TERMS_OF_SERVICE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {tCommon("termsOfService")}
              </a>{" "}
              <span className="text-destructive">*</span>
            </label>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptPrivacy"
              checked={acceptedPrivacy}
              onCheckedChange={(checked) =>
                setAcceptedPrivacy(checked === true)
              }
            />
            <label
              htmlFor="acceptPrivacy"
              className="text-sm leading-relaxed cursor-pointer"
            >
              {t("acceptPrivacyPrefix")}{" "}
              <a
                href={EXTERNAL_LINKS.PRIVACY_POLICY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {tCommon("privacyPolicy")}
              </a>{" "}
              <span className="text-destructive">*</span>
            </label>
          </div>
        </div>
      </div>

      {/* Submission Section */}
      <div className="text-center border-t pt-6">
        <h4 className="font-semibold text-foreground mb-2">
          {t("confirmSubmit")}
        </h4>
        <p className="text-muted-foreground text-sm mb-6">
          {t("reviewNotice")}
        </p>
        <div className="flex justify-center gap-4">
          <Button type="button" variant="outline" onClick={previousStep}>
            {tCommon("previous")}
          </Button>
          <SubmitOnboardingButton disabled={!canSubmit} />
        </div>
      </div>
    </div>
  );
};

interface ReviewStepProps {}

export const ReviewStep: React.FC<ReviewStepProps> = () => {
  const { getStepData, previousStep, formData } = useOnboardingStore();
  const t = useTranslations("onboarding.review");
  const tCommon = useTranslations("common");

  const personalInfo = getStepData("personalInfo");
  const professionalBackground = getStepData("professionalBackground");
  const servicesPricing = getStepData("servicesPricing");
  const specialization = getStepData("specialization");
  const documentation = getStepData("documentation");
  const financial = getStepData("financial");

  const formatCurrency = (amount: string): string => {
    return `₹${parseInt(amount || "0").toLocaleString()}`;
  };

  const SectionCard = ({
    icon: Icon,
    title,
    children,
    isComplete,
  }: {
    icon: any;
    title: string;
    children: React.ReactNode;
    isComplete: boolean;
  }) => (
    <Card className={`${isComplete ? "border-primary/30 bg-primary/5" : ""}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <CardTitle className="text-lg">{title}</CardTitle>
          {isComplete && (
            <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Personal Information */}
        <SectionCard
          icon={User}
          title="Personal Information"
          isComplete={!!personalInfo}
        >
          {personalInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>{" "}
                {personalInfo.fullName}
              </div>
              <div>
                <span className="font-medium">Date of Birth:</span>{" "}
                {personalInfo.dateOfBirth?.toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Time of Birth:</span>{" "}
                {personalInfo.timeOfBirth?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                <span className="font-medium">Place of Birth:</span>{" "}
                {personalInfo.placeOfBirth}
              </div>
              <div>
                <span className="font-medium">Primary Language:</span>{" "}
                {personalInfo.primaryLanguage}
              </div>
              <div>
                <span className="font-medium">Additional Languages:</span>{" "}
                {personalInfo.languages?.join(", ") || "None"}
              </div>
              {personalInfo.profileImage && (
                <div className="md:col-span-2">
                  <span className="font-medium">Profile Photo:</span>{" "}
                  {personalInfo.profileImage.name}
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Personal information not provided
            </p>
          )}
        </SectionCard>

        {/* Professional Background */}
        <SectionCard
          icon={Briefcase}
          title="Professional Background"
          isComplete={!!professionalBackground}
        >
          {professionalBackground ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Areas of Expertise:</span>{" "}
                {professionalBackground.expertise?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Years of Experience:</span>{" "}
                {professionalBackground.yearsOfExperience}
              </div>
              <div>
                <span className="font-medium">Astrology Systems:</span>{" "}
                {professionalBackground.astrologySystems?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Other Practices:</span>{" "}
                {professionalBackground.otherPractices?.join(", ") || "None"}
              </div>
              {professionalBackground.teachers && (
                <div className="md:col-span-2">
                  <span className="font-medium">Teachers/Gurus:</span>{" "}
                  {professionalBackground.teachers}
                </div>
              )}
              {professionalBackground.lineage && (
                <div className="md:col-span-2">
                  <span className="font-medium">Lineage/Tradition:</span>{" "}
                  {professionalBackground.lineage}
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Professional background not provided
            </p>
          )}
        </SectionCard>

        {/* Services & Pricing */}
        <SectionCard
          icon={DollarSign}
          title="Services & Pricing"
          isComplete={!!servicesPricing}
        >
          {servicesPricing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Chat Consultation:</span>{" "}
                {formatCurrency(servicesPricing.chatPrice)}
              </div>
              <div>
                <span className="font-medium">Call Consultation:</span>{" "}
                {formatCurrency(servicesPricing.callPrice)}
              </div>
              <div>
                <span className="font-medium">Video Consultation:</span>{" "}
                {formatCurrency(servicesPricing.videoPrice)}
              </div>
              <div>
                <span className="font-medium">Max Consultations/Day:</span>{" "}
                {servicesPricing.maxConsultationsPerDay || "Not set"}
              </div>
              <div>
                <span className="font-medium">Working Days:</span>{" "}
                {servicesPricing.workingDays?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Time Slots:</span>{" "}
                {servicesPricing.timeSlots?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Response Time:</span>{" "}
                {servicesPricing.expectedResponseTime}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Services and pricing not provided
            </p>
          )}
        </SectionCard>

        {/* Specialization */}
        <SectionCard
          icon={Star}
          title="Specialization"
          isComplete={!!specialization}
        >
          {specialization ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Remedy Types:</span>{" "}
                {specialization.remediesTypes?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Excluded Areas:</span>{" "}
                {specialization.excludedPredictionAreas?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Creates Horoscope Content:</span>{" "}
                {specialization.createHoroscopeContent ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Creates Daily Predictions:</span>{" "}
                {specialization.createDailyPredictions ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Can Perform Puja:</span>{" "}
                {specialization.canPerformPuja ? "Yes" : "No"}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Specialization information not provided
            </p>
          )}
        </SectionCard>

        {/* Documentation */}
        <SectionCard
          icon={FileText}
          title="Documentation"
          isComplete={!!documentation}
        >
          {documentation ? (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Aadhar Card:</span>{" "}
                {documentation.aadharCard
                  ? documentation.aadharCard.name
                  : "Not uploaded"}
              </div>
              <div>
                <span className="font-medium">Address Proof:</span>{" "}
                {documentation.addressProof
                  ? documentation.addressProof.name
                  : "Not uploaded"}
              </div>
              <div>
                <span className="font-medium">Education Certificates:</span>{" "}
                {documentation.educationCertificates?.length || 0} files
                uploaded
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Documents not uploaded
            </p>
          )}
        </SectionCard>

        {/* Financial Information */}
        <SectionCard
          icon={CreditCard}
          title="Financial Information"
          isComplete={!!financial}
        >
          {financial ? (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Account Holder:</span>{" "}
                {financial.accountHolderName}
              </div>
              <div>
                <span className="font-medium">Bank Name:</span>{" "}
                {financial.bankName}
              </div>
              <div>
                <span className="font-medium">Branch:</span>{" "}
                {financial.branchName}
              </div>
              <div>
                <span className="font-medium">Account Type:</span>{" "}
                {financial.accountType}
              </div>
              <div>
                <span className="font-medium">IFSC Code:</span>{" "}
                {financial.ifscCode}
              </div>
              {financial.upiId && (
                <div>
                  <span className="font-medium">UPI ID:</span> {financial.upiId}
                </div>
              )}
              {financial.paypalEmail && (
                <div>
                  <span className="font-medium">PayPal Email:</span>{" "}
                  {financial.paypalEmail}
                </div>
              )}
              <div>
                <span className="font-medium">Payment Methods:</span>{" "}
                {financial.preferredPaymentMethod?.join(", ") || "None"}
              </div>
              <div>
                <span className="font-medium">Payout Frequency:</span>{" "}
                {financial.payoutFrequency}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Financial information not provided
            </p>
          )}
        </SectionCard>

        {/* Terms & Policy Acceptance */}
        <LegalAgreementSection
          previousStep={previousStep}
          t={t}
          tCommon={tCommon}
        />
      </CardContent>
    </Card>
  );
};
