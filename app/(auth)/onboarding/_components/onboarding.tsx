"use client";
import React from "react";
import { useOnboardingStore } from "../_hooks/use-onboarding-store";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { ProfessionalBackgroundStep } from "./steps/professional-background-step";
import { ServicesPricingStep } from "./steps/services-pricing-step";
import { SpecializationStep } from "./steps/specialization-step";
import { DocumentationStep } from "./steps/documentation-step";
import { FinancialStep } from "./steps/financial-step";
import { ReviewStep } from "./steps/review-step";

const STEP_CONFIG = [
  {
    id: 0,
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    id: 1,
    title: "Professional Background",
    description: "Share your experience and expertise",
  },
  {
    id: 2,
    title: "Services & Pricing",
    description: "Set up your services and pricing",
  },
  {
    id: 3,
    title: "Specialization",
    description: "Define your specialized areas",
  },
  {
    id: 4,
    title: "Documentation",
    description: "Upload required documents",
  },
  {
    id: 5,
    title: "Financial Information",
    description: "Set up your payment details",
  },
  {
    id: 6,
    title: "Review & Submit",
    description: "Review your application and submit",
  },
];

const stepComponents = [
  PersonalInfoStep,
  ProfessionalBackgroundStep,
  ServicesPricingStep,
  SpecializationStep,
  DocumentationStep,
  FinancialStep,
  ReviewStep,
];

export const Onboarding = () => {
  const { currentStep, totalSteps } = useOnboardingStore();

  const CurrentStepComponent = stepComponents[currentStep];
  const stepInfo = STEP_CONFIG[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Astrologer Onboarding</h1>
            <p className="text-muted-foreground">
              Complete your profile to start receiving consultations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({stepInfo.title})
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
              </div>
            </div>

            {/* Visual Progress Indicators */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
              <div className="relative flex justify-between">
                {STEP_CONFIG.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 bg-background ${
                        index <= currentStep
                          ? "border-blue-600 text-blue-600"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {index < currentStep ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs mt-2 hidden sm:block">
                      {step.title.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="max-w-4xl mx-auto">
          <CurrentStepComponent />
        </div>

        {/* Step Information Footer */}
        <div className="mt-8 text-center">
          <div className="text-sm text-muted-foreground">
            <p>Need help? Contact our support team</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
