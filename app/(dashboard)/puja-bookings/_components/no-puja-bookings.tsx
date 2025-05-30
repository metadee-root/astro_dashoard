import { CalendarOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const NoPujaBookings = () => {
  return (
    <Card className="w-full border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-orange-100 p-4 mb-4">
          <CalendarOff className="h-8 w-8 text-orange-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          No Puja Bookings Yet
        </h3>
        
        <p className="text-sm text-gray-500 max-w-[300px] mb-6">
          You don't have any puja bookings at the moment. New bookings will appear here when devotees schedule pujas with you.
        </p>

        <div className="text-xs text-gray-500 flex flex-col items-center gap-1">
          <p>Keep your profile updated to increase visibility</p>
          <p>Respond promptly to booking requests when they arrive</p>
        </div>
      </CardContent>
    </Card>
  );
};
