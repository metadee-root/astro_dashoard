"use client";
import React, { useEffect } from "react";
import { useOnboardingStore } from "../_hooks/use-onboarding-store";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { ProfessionalBackgroundStep } from "./steps/professional-background-step";
import { ServicesPricingStep } from "./steps/services-pricing-step";
import { SpecializationStep } from "./steps/specialization-step";
import { DocumentationStep } from "./steps/documentation-step";
import { FinancialStep } from "./steps/financial-step";
import { ReviewStep } from "./steps/review-step";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("onboarding");
  const tCommon = useTranslations("common");

  const steps = [
    { step: 1, title: t("steps.personalInfo") },
    { step: 2, title: t("steps.professionalBackground") },
    { step: 3, title: t("steps.servicesPricing") },
    { step: 4, title: t("steps.specialization") },
    { step: 5, title: t("steps.documentation") },
    { step: 6, title: t("steps.financial") },
    { step: 7, title: t("steps.review") },
  ];

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>

          {/* Stepper */}
          <div className="max-w-4xl mx-auto">
            <Stepper value={currentStep + 1}>
              {steps.map(({ step, title }) => (
                <StepperItem
                  key={step}
                  step={step}
                  className="relative flex-1 flex-col!"
                >
                  <StepperTrigger className="flex-col gap-3 rounded">
                    <StepperIndicator />
                    <div className="space-y-0.5 px-2">
                      <StepperTitle>{title}</StepperTitle>
                    </div>
                  </StepperTrigger>
                  {step < steps.length && (
                    <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>

        {/* Current Step */}
        <div className="max-w-4xl mx-auto">
          <CurrentStepComponent />
        </div>

        {/* Step Information Footer */}
        <div className="mt-8 text-center">
          <div className="text-sm text-muted-foreground">
            <p>{tCommon("needHelp")}</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href={EXTERNAL_LINKS.PRIVACY_POLICY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {tCommon("privacyPolicy")}
              </a>
              <span>•</span>
              <a
                href={EXTERNAL_LINKS.TERMS_OF_SERVICE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {tCommon("termsOfService")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
