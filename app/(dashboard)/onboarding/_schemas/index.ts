// Import all schemas and their types
import {
  personalInfoSchema,
  type PersonalInfoData,
} from "./personal-info.schema";
import {
  professionalSchema,
  type ProfessionalData,
} from "./professional.schema";
import {
  servicesPricingSchema,
  type ServicesPricingData,
} from "./services-pricing.schema";
import {
  specializationSchema,
  type SpecializationData,
} from "./specialization.schema";
import {
  documentationSchema,
  type DocumentationData,
} from "./documentation.schema";
import { financialSchema, type FinancialData } from "./financial.schema";

// Re-export all schemas and their types
export {
  personalInfoSchema,
  PersonalInfoData,
  professionalSchema,
  ProfessionalData,
  servicesPricingSchema,
  ServicesPricingData,
  specializationSchema,
  SpecializationData,
  documentationSchema,
  DocumentationData,
  financialSchema,
  FinancialData,
};

// Combined form data type
export type OnboardingFormData = {
  personalInfo: PersonalInfoData;
  professionalBackground: ProfessionalData;
  servicesPricing: ServicesPricingData;
  specialization: SpecializationData;
  documentation: DocumentationData;
  financial: FinancialData;
};

// Step-specific form data interface (for partial updates)
export interface OnboardingStepData {
  personalInfo?: Partial<PersonalInfoData>;
  professionalBackground?: Partial<ProfessionalData>;
  servicesPricing?: Partial<ServicesPricingData>;
  specialization?: Partial<SpecializationData>;
  documentation?: Partial<DocumentationData>;
  financial?: Partial<FinancialData>;
}

// Schema validation exports for form validation
export const onboardingSchemas = {
  personalInfo: personalInfoSchema,
  professionalBackground: professionalSchema,
  servicesPricing: servicesPricingSchema,
  specialization: specializationSchema,
  documentation: documentationSchema,
  financial: financialSchema,
} as const;
