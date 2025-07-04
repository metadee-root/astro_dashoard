import {
  CalendarIcon,
  CircleDollarSignIcon,
  ClockIcon,
  UserRound,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, isBefore, addHours, startOfDay, isAfter } from "date-fns";
import { PujaBooking } from "@/lib/api/puja.api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PujaBookingCardProps {
  booking: PujaBooking;
}

const getStatusConfig = (status: PujaBooking["status"]) => {
  switch (status) {
    case "pending":
      return {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    case "confirmed":
      return {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
      };
    case "completed":
      return {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
      };
    case "cancelled":
      return {
        color: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
      };
    default:
      return {
        color: "bg-gray-50 text-gray-700 border-gray-200",
        dot: "bg-gray-500",
      };
  }
};

const getPaymentStatusConfig = (status: PujaBooking["payment"]["status"]) => {
  switch (status) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "half-paid":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const PujaBookingCard = ({ booking }: PujaBookingCardProps) => {
  const router = useRouter();
  const statusConfig = getStatusConfig(booking.status);
  const paymentConfig = getPaymentStatusConfig(booking.payment.status);

  const bookingDateTime = new Date(booking.bookingDateTime);
  const currentDateTime = new Date();
  const pujaEndTime = addHours(bookingDateTime, 2);

  // Condition 1: Don't show join video call button if booking date is 1 day older than current date
  const isBookingDateOlderThanOneDay = isBefore(
    bookingDateTime,
    startOfDay(currentDateTime)
  );

  // Condition 2: Enable it only from puja booking time to two hours after
  const isCallActive =
    isAfter(currentDateTime, bookingDateTime) &&
    isBefore(currentDateTime, pujaEndTime);

  const showVideoCallButton = !isBookingDateOlderThanOneDay;
  const isVideoCallButtonDisabled = !isCallActive;

  return (
    <Card className="w-full">
      <CardHeader className="">
        <div className="flex items-start gap-4">
          <Avatar className="size-12 bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-200">
            <AvatarFallback className="text-orange-700 font-semibold text-lg">
              {booking.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                  {booking.poojaId.name.en}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Booking ID: #{booking._id.slice(-8)}
                </p>
              </div>

              <Badge
                variant="outline"
                className={`${statusConfig.color} font-medium px-3 py-1 flex items-center gap-2`}
              >
                <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* User Information */}
          <div className="border rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900 text-sm mb-3">
              Customer Details
            </h4>
            <div className="grid gap-2">
              <div className="flex items-center gap-3 text-sm">
                <UserRound className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-gray-900 font-medium">
                  {booking.user.name}
                </span>
              </div>
              {/* <div className="flex items-center gap-3 text-sm">
                <MailIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-600 truncate">
                  {booking.user.email}
                </span>
              </div> */}
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-12">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Date
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(booking.bookingDateTime), "PPP")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <ClockIcon className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Time
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(booking.bookingDateTime), "p")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <CircleDollarSignIcon className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Amount
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{booking.payment.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Payment:
                </span>
                <Badge
                  variant="outline"
                  className={`${paymentConfig} text-xs font-medium`}
                >
                  {booking.payment.status.charAt(0).toUpperCase() +
                    booking.payment.status.slice(1)}
                </Badge>
              </div>

              {showVideoCallButton && (
                <Button
                  onClick={() => router.push(`/puja-bookings/${booking._id}`)}
                  disabled={isVideoCallButtonDisabled}
                >
                  <Video /> Join Video Call
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
