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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const SpecializationStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

  const savedData = getStepData("specialization");

  const form = useForm<SpecializationData>({
    resolver: zodResolver(specializationSchema),
    defaultValues: savedData || {
      remediesTypes: [],
      excludedPredictionAreas: [],
      createHoroscopeContent: "",
      createDailyPredictions: "",
      canPerformPuja: "",
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Specialization & Services
        </h2>
        <p className="text-gray-600">
          Define your specialized areas and additional services
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Remedies & Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="remediesTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remedy Types You Offer (Optional)</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value?.map(item => ({
                          value: item,
                          label: REMEDIES_TYPES.find(opt => opt.value === item)?.label || item
                        })) || []}
                        onChange={(options) => field.onChange(options.map(opt => opt.value))}
                        options={[...REMEDIES_TYPES]}
                        placeholder="Select types of remedies you provide"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Select the types of astrological remedies you specialize
                      in
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excludedPredictionAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prediction Areas You Avoid (Optional)</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value?.map(item => ({
                          value: item,
                          label: PREDICTION_AREAS.find(opt => opt.value === item)?.label || item
                        })) || []}
                        onChange={(options) => field.onChange(options.map(opt => opt.value))}
                        options={[...PREDICTION_AREAS]}
                        placeholder="Select areas you prefer not to predict"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Be honest about areas where you're not comfortable making
                      predictions
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Creation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="createHoroscopeContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Would you like to create horoscope content? *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YES_NO_MAYBE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Creating horoscope content for the platform users
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="createDailyPredictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Would you like to create daily predictions? *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YES_NO_MAYBE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Writing daily astrological predictions for zodiac signs
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Puja Services</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="canPerformPuja"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Can you perform puja services? *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your puja capability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PUJA_CAPABILITY.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Your capability to perform religious/spiritual pujas for
                      clients
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">
              Specialization Benefits
            </h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>
                • Being specific about your specialization helps attract the
                right clients
              </li>
              <li>
                • Content creation can increase your visibility and earnings
              </li>
              <li>• Puja services are high-value offerings on the platform</li>
              <li>• Honesty about limitations builds trust with clients</li>
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
    </div>
  );
};
