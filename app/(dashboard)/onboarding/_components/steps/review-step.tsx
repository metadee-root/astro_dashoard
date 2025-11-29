import React from "react";
import { useOnboardingStore } from "../../_hooks/use-onboarding-store";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  User,
  Briefcase,
  DollarSign,
  FileText,
  CreditCard,
  Star,
} from "lucide-react";
import { useSession } from "next-auth/react";

interface ReviewStepProps {}

export const ReviewStep: React.FC<ReviewStepProps> = () => {
  const { getStepData, previousStep, formData } = useOnboardingStore();

  const personalInfo = getStepData("personalInfo");
  const professionalBackground = getStepData("professionalBackground");
  const servicesPricing = getStepData("servicesPricing");
  const specialization = getStepData("specialization");
  const documentation = getStepData("documentation");
  const financial = getStepData("financial");

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "No file";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

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
    <Card
      className={`${
        isComplete ? "border-green-200 bg-green-50/30" : "border-gray-200"
      }`}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <CardTitle className="text-lg">{title}</CardTitle>
          {isComplete && (
            <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Your Application</CardTitle>
        <CardDescription>
          Please review all the information before submitting your application
        </CardDescription>
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

        {/* Submission Button */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-center">
            <h4 className="font-semibold text-blue-900 mb-2">
              Ready to Submit?
            </h4>
            <p className="text-blue-800 text-sm mb-6">
              Your application will be reviewed within 2-3 business days. You'll
              receive a notification once the review is complete.
            </p>
            <div className="flex justify-center gap-4">
              <Button type="button" variant="outline" onClick={previousStep}>
                Previous
              </Button>
              <SubmitOnboardingButton />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
const SubmitOnboardingButton = () => {
  const { getCompleteFormData, resetForm } = useOnboardingStore();
  const { update } = useSession();
  const router = useRouter();

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
    onSuccess: async (data) => {
      toast.success("Application submitted successfully! 🎉");
      resetForm();
      // Redirect to dashboard or success page
      update({
        status: "in_review",
      });
      router.push("/in-review");
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      toast.error(
        error.message || "Failed to submit application. Please try again."
      );
    },
  });

  const handleSubmit = () => {
    submitApplication();
  };

  return (
    <Button
      type="button"
      onClick={handleSubmit}
      disabled={isPending}
      className="px-8"
    >
      {isPending ? "Submitting..." : "Submit Application"}
    </Button>
  );
};
