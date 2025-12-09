import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  servicesPricingSchema,
  ServicesPricingData,
} from "../../_schemas/services-pricing.schema";
import { StepProps } from "../../_types/step.types";
import {
  WORKING_DAYS,
  TIME_SLOTS,
  RESPONSE_TIME_OPTIONS,
  CONSULTATION_LIMITS,
} from "../../_constants/form-options";
import { useOnboardingStore } from "../../_hooks/use-onboarding-store";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ServicesPricingStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

  const savedData = getStepData("servicesPricing");

  const form = useForm<ServicesPricingData>({
    resolver: zodResolver(servicesPricingSchema),
    defaultValues: savedData || {
      chatPrice: "",
      callPrice: "",
      videoPrice: "",
      maxConsultationsPerDay: 5,
      workingDays: [],
      timeSlots: [],
      expectedResponseTime: "",
    },
  });

  const onSubmit = (data: ServicesPricingData) => {
    updateStepData("servicesPricing", data);
    nextStep();
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    const currentData = form.getValues();
    updateStepData("servicesPricing", currentData);
    previousStep();
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateStepData("servicesPricing", value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateStepData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services & Pricing</CardTitle>
        <CardDescription>
          Set up your consultation services, pricing, and availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h3 className="font-semibold mb-4">Consultation Pricing (₹)</h3>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="chatPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Chat Consultation{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="500"
                            min="1"
                            max="1000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          Min: ₹1, Max: ₹1,000
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="callPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Call Consultation{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1000"
                            min="1"
                            max="1000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          Min: ₹1, Max: ₹1,000
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Video Consultation{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1000"
                            min="1"
                            max="1000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          Min: ₹1, Max: ₹1,000
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
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
                          <FormLabel>
                            Max Consultations Per Day{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter maximum consultations"
                              min="1"
                              max="50"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expectedResponseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Expected Response Time{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
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
                          <FormLabel>
                            Working Days{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
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
                          <div className="text-sm text-muted-foreground">
                            Select days when you are available for consultations
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Available Time Slots{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
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
                          <div className="text-sm text-muted-foreground">
                            Select time slots when you prefer to conduct
                            consultations
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">
                  Pricing Guidelines
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
                  <li>Consider your experience level when setting prices</li>
                  <li>
                    Video consultations typically cost more than chat/call
                  </li>
                  <li>You can adjust these prices later based on demand</li>
                  <li>
                    Platform commission will be deducted from these amounts
                  </li>
                </ul>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
