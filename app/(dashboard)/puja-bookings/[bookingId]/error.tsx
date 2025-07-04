"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Frown } from "lucide-react";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Frown className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold">Error</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            An unexpected error occurred. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGoBack} className="w-full" variant="default">
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;
