import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  PersonalInfoData,
  ProfessionalData,
  ServicesPricingData,
  SpecializationData,
  DocumentationData,
  FinancialData,
  OnboardingFormData,
} from "../_schemas";

export type StepKey =
  | "personalInfo"
  | "professionalBackground"
  | "servicesPricing"
  | "specialization"
  | "documentation"
  | "financial";

interface OnboardingStore {
  // Basic state
  currentStep: number;
  totalSteps: number;

  // Form data for each step with proper types
  formData: {
    personalInfo?: PersonalInfoData;
    professionalBackground?: ProfessionalData;
    servicesPricing?: ServicesPricingData;
    specialization?: SpecializationData;
    documentation?: DocumentationData;
    financial?: FinancialData;
  };

  // Basic actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateStepData: (step: StepKey, data: any) => void;
  getStepData: (step: StepKey) => any;
  resetForm: () => void;
  getCompleteFormData: () => Partial<OnboardingFormData>;
}

export const useOnboardingStore = create<OnboardingStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      totalSteps: 7,
      formData: {},

      // Navigation actions
      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      // Form data actions
      updateStepData: (step: StepKey, data: any) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [step]: data,
          },
        }));
      },

      getStepData: (step: StepKey) => {
        return get().formData[step];
      },

      resetForm: () => {
        set({
          currentStep: 0,
          formData: {},
        });
      },

      getCompleteFormData: () => {
        return get().formData;
      },
    }),
    {
      name: "onboarding-store",
    }
  )
);
