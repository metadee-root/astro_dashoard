import { Onboarding } from "./_components/onboarding";

export const metadata = {
  title: "Astrologer Onboarding",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Onboarding />
    </div>
  );
}
