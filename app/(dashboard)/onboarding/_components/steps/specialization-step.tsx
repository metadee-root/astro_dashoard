"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  specializationSchema,
  SpecializationData,
} from "../../_schemas/specialization.schema";
import {
  REMEDIES_TYPES,
  PREDICTION_AREAS,
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
import MultipleSelector from "@/components/ui/multiselect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const SpecializationStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();
  const t = useTranslations("onboarding.specialization");
  const tCommon = useTranslations("common");

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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">{t("remediesTitle")}</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="remediesTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("remedyTypesYouOffer")}</FormLabel>
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
                            placeholder={t("remedyTypesPlaceholder")}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          {t("remedyTypesHint")}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excludedPredictionAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("predictionAreasYouAvoid")}</FormLabel>
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
                            placeholder={t("predictionAreasPlaceholder")}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-muted-foreground">
                          {t("predictionAreasHint")}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">
                  {t("contentCreationTitle")}
                </h3>
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
                            {t("createHoroscopeContent")}
                          </FormLabel>
                          <FormDescription>
                            {t("createHoroscopeContentHint")}
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
                            {t("createDailyPredictions")}
                          </FormLabel>
                          <FormDescription>
                            {t("createDailyPredictionsHint")}
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">{t("pujaServicesTitle")}</h3>
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
                            {t("canPerformPuja")}
                          </FormLabel>
                          <FormDescription>
                            {t("canPerformPujaHint")}
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">
                {t("benefitsTitle")}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
                <li>{t("benefitSpecific")}</li>
                <li>{t("benefitContent")}</li>
                <li>{t("benefitPuja")}</li>
                <li>{t("benefitHonesty")}</li>
              </ul>
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                {tCommon("previous")}
              </Button>
              <Button type="button" onClick={handleNext}>
                {tCommon("next")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
