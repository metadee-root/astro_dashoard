import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Constants from onboarding
const WORKING_DAYS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const TIME_SLOTS = [
  { value: "06:00-08:00", label: "6:00 AM - 8:00 AM" },
  { value: "08:00-10:00", label: "8:00 AM - 10:00 AM" },
  { value: "10:00-12:00", label: "10:00 AM - 12:00 PM" },
  { value: "12:00-14:00", label: "12:00 PM - 2:00 PM" },
  { value: "14:00-16:00", label: "2:00 PM - 4:00 PM" },
  { value: "16:00-18:00", label: "4:00 PM - 6:00 PM" },
  { value: "18:00-20:00", label: "6:00 PM - 8:00 PM" },
  { value: "20:00-22:00", label: "8:00 PM - 10:00 PM" },
];

const RESPONSE_TIME_OPTIONS = [
  { value: "immediately", label: "Immediately" },
  { value: "within_5_min", label: "Within 5 minutes" },
  { value: "within_15_min", label: "Within 15 minutes" },
  { value: "within_30_min", label: "Within 30 minutes" },
  { value: "within_1_hour", label: "Within 1 hour" },
  { value: "within_2_hours", label: "Within 2 hours" },
  { value: "within_4_hours", label: "Within 4 hours" },
  { value: "same_day", label: "Same day" },
];

const CONSULTATION_LIMITS = Array.from({ length: 20 }, (_, i) => i + 1).map(num => ({
  value: num.toString(),
  label: num.toString(),
}));

const servicesAvailabilitySchema = z.object({
  chatPrice: z.string().min(1, "Chat price is required"),
  callPrice: z.string().min(1, "Call price is required"),
  videoPrice: z.string().min(1, "Video price is required"),
  maxConsultationsPerDay: z.string().min(1, "Max consultations per day is required"),
  workingDays: z.array(z.string()).min(1, "Select at least one working day"),
  timeSlots: z.array(z.string()).min(1, "Select at least one time slot"),
  expectedResponseTime: z.string().min(1, "Expected response time is required"),
  canPerformPuja: z.string().optional(),
});

type ServicesAvailabilityData = z.infer<typeof servicesAvailabilitySchema>;

interface ServicesAvailabilityTabProps {
  profile: any;
}

export const ServicesAvailabilityTab = ({ profile }: ServicesAvailabilityTabProps) => {
  const queryClient = useQueryClient();

  const form = useForm<ServicesAvailabilityData>({
    resolver: zodResolver(servicesAvailabilitySchema),
    defaultValues: {
      chatPrice: profile?.chatPrice?.toString() || "",
      callPrice: profile?.callPrice?.toString() || "",
      videoPrice: profile?.videoPrice?.toString() || "",
      maxConsultationsPerDay: profile?.maxConsultationsPerDay?.toString() || "5",
      workingDays: profile?.workingDays || [],
      timeSlots: profile?.timeSlots || [],
      expectedResponseTime: profile?.expectedResponseTime || "",
      canPerformPuja: profile?.canPerformPuja ? "true" : "false",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ServicesAvailabilityData) => api.auth.updateProfile(data),
    onSuccess: () => {
      toast.success("Services and availability updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update services and availability");
    },
  });

  const onSubmit = (data: ServicesAvailabilityData) => {
    updateMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services & Availability</CardTitle>
        <CardDescription>
          Set up your consultation services, pricing, and availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Consultation Pricing (₹)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="chatPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chat Consultation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="500"
                            min="1"
                            max="10000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Min: ₹1, Max: ₹10,000</FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="callPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Call Consultation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1000"
                            min="1"
                            max="10000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Min: ₹1, Max: ₹10,000</FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Consultation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1000"
                            min="1"
                            max="10000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Min: ₹1, Max: ₹10,000</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Additional Services</h3>
                <FormField
                  control={form.control}
                  name="canPerformPuja"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value === "true"}
                          onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I can perform online puja ceremonies
                        </FormLabel>
                        <FormDescription>
                          Let users know if you offer virtual puja services
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4">Availability</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="maxConsultationsPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Consultations Per Day</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select maximum consultations" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONSULTATION_LIMITS.map((limit) => (
                                <SelectItem key={limit.value} value={limit.value}>
                                  {limit.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expectedResponseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Response Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select response time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {RESPONSE_TIME_OPTIONS.map((time) => (
                                <SelectItem key={time.value} value={time.value}>
                                  {time.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="workingDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Working Days</FormLabel>
                          <FormControl>
                            <MultipleSelector
                              value={
                                field.value?.map((item) => ({
                                  value: item,
                                  label:
                                    WORKING_DAYS.find(
                                      (opt) => opt.value === item
                                    )?.label || item,
                                })) || []
                              }
                              onChange={(options) =>
                                field.onChange(options.map((opt) => opt.value))
                              }
                              options={[...WORKING_DAYS]}
                              placeholder="Select your working days"
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            Select days when you are available for consultations
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Time Slots</FormLabel>
                          <FormControl>
                            <MultipleSelector
                              value={
                                field.value?.map((item) => ({
                                  value: item,
                                  label:
                                    TIME_SLOTS.find((opt) => opt.value === item)
                                      ?.label || item,
                                })) || []
                              }
                              onChange={(options) =>
                                field.onChange(options.map((opt) => opt.value))
                              }
                              options={[...TIME_SLOTS]}
                              placeholder="Select your preferred time slots"
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            Select time slots when you prefer to conduct consultations
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">
                  Pricing Guidelines
                </h4>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc ml-4">
                  <li>Consider your experience level when setting prices</li>
                  <li>Video consultations typically cost more than chat/call</li>
                  <li>You can adjust these prices later based on demand</li>
                  <li>Platform commission will be deducted from these amounts</li>
                </ul>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};