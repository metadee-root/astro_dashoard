"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export const CallRestriction = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/puja-bookings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Call Access Restricted
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please check the timing requirements below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-orange-50 p-4 border border-orange-200">
            <p className="text-sm text-orange-800 leading-relaxed">
              You can only join the call{" "}
              <strong>at or after the booking time</strong> and up to{" "}
              <strong>2 hours after the booking starts</strong>.
            </p>
          </div>
          <Button onClick={handleGoBack} className="w-full" variant="default">
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
