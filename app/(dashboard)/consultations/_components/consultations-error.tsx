"use client";
import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ConsultationsError = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full text-red-500">
      <XCircle className="w-16 h-16 mb-4" />
      <p className="text-lg font-semibold">Failed to load consultations.</p>
      <p className="text-sm text-center">
        An error occurred while fetching your consultation records. Please try
        again.
      </p>
      <Button onClick={() => router.refresh()} className="mt-4">
        Retry
      </Button>
    </div>
  );
};
