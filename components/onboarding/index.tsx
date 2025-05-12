import React from "react";
import { OnboardingStepper } from "./onboarding-stepper";
import { OnboardingStep1Form } from "./onboarding-step-1-form";
import { OnboardingStep2Form } from "./onboarding-step-2-form";
import { OnboardingStep3Form } from "./onboarding-step-3-form";

export const Onboarding = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-lg md:text-xl lg:text-[22px] font-semibold text-center">
        Sanatan Vision - Astro Advisor
      </h1>
      <div className="md:max-w-2xl mx-auto">
        <OnboardingStepper />
      </div>

      <div className="max-w-6xl mx-auto">
        <OnboardingStep1Form />
        {/* <OnboardingStep2Form /> */}
        <OnboardingStep3Form />
      </div>
    </div>
  );
};
