"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DAYS_OF_WEEK = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const CONSULTATION_MODES = [
  { id: "chat", label: "Chat" },
  { id: "voice", label: "Voice Call" },
  { id: "video", label: "Video Call" },
];

const formSchema = z
  .object({
    availableDays: z.array(z.string()).min(1, "Please select at least one day"),
    timeSlot: z.enum(["morning", "afternoon", "evening", "custom"]),
    customStartTime: z.string().optional(),
    customEndTime: z.string().optional(),
    consultationModes: z
      .array(z.string())
      .min(1, "Please select at least one consultation mode"),
  })
  .refine(
    (data) => {
      if (data.timeSlot === "custom") {
        return data.customStartTime && data.customEndTime;
      }
      return true;
    },
    {
      message: "Please specify both start and end time for custom time slot",
      path: ["customStartTime", "customEndTime"],
    }
  );

export const OnboardingStep2Form = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableDays: [],
      timeSlot: "morning",
      customStartTime: "",
      customEndTime: "",
      consultationModes: [],
    },
  });

  const timeSlot = form.watch("timeSlot");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Handle form submission
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-lg">Set Your Availability</CardTitle>
        <CardDescription>
          Let devotees know when they can reach you
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="availableDays"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Available Days</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={day.id}
                          checked={field.value.includes(day.id)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, day.id]
                              : field.value.filter((value) => value !== day.id);
                            field.onChange(updatedValue);
                          }}
                        />
                        <label
                          htmlFor={day.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Time Slot</FormLabel>
                  <div className="space-y-4">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <label
                          htmlFor="morning"
                          className="text-sm font-medium leading-none"
                        >
                          Morning (6 AM - 12 PM)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <label
                          htmlFor="afternoon"
                          className="text-sm font-medium leading-none"
                        >
                          Afternoon (12 PM - 5 PM)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <label
                          htmlFor="evening"
                          className="text-sm font-medium leading-none"
                        >
                          Evening (5 PM - 10 PM)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <label
                          htmlFor="custom"
                          className="text-sm font-medium leading-none"
                        >
                          Custom
                        </label>
                      </div>
                    </RadioGroup>

                    {timeSlot === "custom" && (
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="customStartTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="time"
                                    placeholder="Start Time"
                                    {...field}
                                  />
                                  <ClockIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="customEndTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="time"
                                    placeholder="End Time"
                                    {...field}
                                  />
                                  <ClockIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consultationModes"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Consultation Modes</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {CONSULTATION_MODES.map((mode) => (
                      <div
                        key={mode.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={mode.id}
                          checked={field.value.includes(mode.id)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, mode.id]
                              : field.value.filter(
                                  (value) => value !== mode.id
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                        <label
                          htmlFor={mode.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {mode.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2.5">
              <Button type="button" variant="outline">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
