export interface StepProps {
  data?: any;
  onNext: (data: any) => void;
  onPrevious: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}

export interface BaseStepConfig {
  id: string;
  title: string;
  description: string;
  component: string;
}

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
}

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: BaseStepConfig[];
}