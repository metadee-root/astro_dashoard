import React from "react";
import { Frown } from "lucide-react";

export const NoConsultations = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <Frown className="w-16 h-16 mb-4" />
      <p className="text-lg font-semibold">No consultations found.</p>
      <p className="text-sm">
        It looks like you don't have any consultation records yet.
      </p>
    </div>
  );
};
