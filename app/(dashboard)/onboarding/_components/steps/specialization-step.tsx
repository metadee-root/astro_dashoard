import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  specializationSchema,
  SpecializationData,
} from "../../_schemas/specialization.schema";
import { StepProps } from "../../_types/step.types";
import {
  REMEDIES_TYPES,
  PREDICTION_AREAS,
  YES_NO_MAYBE_OPTIONS,
  PUJA_CAPABILITY,
} from "../../_constants/form-options";
import { useOnboardingStore } from "../../_hooks/use-onboarding-store";
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
import { Checkbox } from "@/components/ui/checkbox";
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

export const SpecializationStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

  const savedData = getStepData("specialization");

  const form = useForm<SpecializationData>({
    resolver: zodResolver(specializationSchema),
    defaultValues: savedData || {
      remediesTypes: [],
      excludedPredictionAreas: [],
      createHoroscopeContent: false,
      createDailyPredictions: false,
      canPerformPuja: false,
    },
  });

  const onSubmit = (data: SpecializationData) => {
    updateStepData("specialization", data);
    nextStep();
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    const currentData = form.getValues();
    updateStepData("specialization", currentData);
    previousStep();
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateStepData("specialization", value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateStepData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specialization & Services</CardTitle>
        <CardDescription>
          Define your specialized areas and additional services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Remedies & Solutions</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="remediesTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remedy Types You Offer</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            value={
                              field.value?.map((item) => ({
                                value: item,
                                label:
                                  REMEDIES_TYPES.find(
                                    (opt) => opt.value === item
                                  )?.label || item,
                              })) || []
                            }
                            onChange={(options) =>
                              field.onChange(options.map((opt) => opt.value))
                            }
                            options={[...REMEDIES_TYPES]}
                            placeholder="Select types of remedies you provide"
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          Select the types of astrological remedies you
                          specialize in
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excludedPredictionAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prediction Areas You Avoid</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            value={
                              field.value?.map((item) => ({
                                value: item,
                                label:
                                  PREDICTION_AREAS.find(
                                    (opt) => opt.value === item
                                  )?.label || item,
                              })) || []
                            }
                            onChange={(options) =>
                              field.onChange(options.map((opt) => opt.value))
                            }
                            options={[...PREDICTION_AREAS]}
                            placeholder="Select areas you prefer not to predict"
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          Be honest about areas where you're not comfortable
                          making predictions
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Content Creation</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="createHoroscopeContent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Create horoscope content
                          </FormLabel>
                          <FormDescription>
                            Creating horoscope content for the platform users
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="createDailyPredictions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Create daily predictions
                          </FormLabel>
                          <FormDescription>
                            Writing daily astrological predictions for zodiac signs
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Puja Services</h3>
                <div>
                  <FormField
                    control={form.control}
                    name="canPerformPuja"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Can perform puja services
                          </FormLabel>
                          <FormDescription>
                            Your capability to perform religious/spiritual pujas for clients
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">
                Specialization Benefits
              </h4>
              <ul className="text-sm text-purple-800 space-y-1 list-disc ml-4">
                <li>
                  Being specific about your specialization helps attract the
                  right clients
                </li>
                <li>
                  Content creation can increase your visibility and earnings
                </li>
                <li>Puja services are high-value offerings on the platform</li>
                <li>Honesty about limitations builds trust with clients</li>
              </ul>
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
