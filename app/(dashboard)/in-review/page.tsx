import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { Clock } from "lucide-react";
import React from "react";

const Page = async () => {
  const data = await api.auth.getStatus();
  
  if (data.status === "verified") {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center p-4">
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
        <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h1 className="text-2xl font-bold">Profile Under Review</h1>
      <p className="text-muted-foreground max-w-md">
        Your profile is currently being reviewed by our team. This process usually takes 24-48 hours. 
        You will be notified once your profile is verified.
      </p>
      {data.adminNote && (
        <div className="mt-4 p-4 bg-muted rounded-lg max-w-md w-full">
          <p className="text-sm font-medium mb-1">Admin Note:</p>
          <p className="text-sm text-muted-foreground">{data.adminNote}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
