"use client";

import { Button } from "@/components/ui/button";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BookingNotFound = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SearchX className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Booking Not Found
            </h1>
            <p className="text-muted-foreground">
              We couldn't find the booking you're looking for
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-8xl font-bold text-muted-foreground/30">404</div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            The booking link may be incorrect, expired, or the booking may have
            been cancelled. Please check the link and try again.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={handleGoHome} variant="default" className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Go to Home
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Need help? Contact support if you believe this is an error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingNotFound;
