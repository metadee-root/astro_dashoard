"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  professionalSchema,
  ProfessionalData,
} from "../../_schemas/professional.schema";
import {
  EXPERTISE_OPTIONS,
  ASTROLOGY_SYSTEMS,
  OTHER_PRACTICES,
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
import MultipleSelector from "@/components/ui/multiselect";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const ProfessionalBackgroundStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();
  const t = useTranslations("onboarding.professionalBackground");
  const tCommon = useTranslations("common");

  const savedData = getStepData("professionalBackground");

  const form = useForm<ProfessionalData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: savedData || {
      expertise: [],
      yearsOfExperience: 0,
      astrologySystems: [],
      otherPractices: [],
      teachers: "",
      lineage: "",
      formalEducation: "",
    },
  });

  const onSubmit = (data: ProfessionalData) => {
    updateStepData("professionalBackground", data);
    nextStep();
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    const currentData = form.getValues();
    updateStepData("professionalBackground", currentData);
    previousStep();
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateStepData("professionalBackground", value);
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
            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("areasOfExpertise")}{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((item) => ({
                          value: item,
                          label:
                            EXPERTISE_OPTIONS.find((opt) => opt.value === item)
                              ?.label || item,
                        })) || []
                      }
                      onChange={(options) =>
                        field.onChange(options.map((opt) => opt.value))
                      }
                      options={[...EXPERTISE_OPTIONS]}
                      placeholder={t("areasOfExpertisePlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    {t("areasOfExpertiseHint")}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("yearsOfExperience")}{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("yearsOfExperiencePlaceholder")}
                      min="0"
                      max="50"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    {t("yearsOfExperienceHint")}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="astrologySystems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("astrologySystems")}{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((item) => ({
                          value: item,
                          label:
                            ASTROLOGY_SYSTEMS.find((opt) => opt.value === item)
                              ?.label || item,
                        })) || []
                      }
                      onChange={(options) =>
                        field.onChange(options.map((opt) => opt.value))
                      }
                      options={[...ASTROLOGY_SYSTEMS]}
                      placeholder={t("astrologySystemsPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    {t("astrologySystemsHint")}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherPractices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("otherPractices")}</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((item) => ({
                          value: item,
                          label:
                            OTHER_PRACTICES.find((opt) => opt.value === item)
                              ?.label || item,
                        })) || []
                      }
                      onChange={(options) =>
                        field.onChange(options.map((opt) => opt.value))
                      }
                      options={[...OTHER_PRACTICES]}
                      placeholder={t("otherPracticesPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    {t("otherPracticesHint")}
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="teachers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("teachersGurus")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("teachersGurusPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-muted-foreground">
                      {t("teachersGurusHint")}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lineage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("lineageTradition")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("lineageTraditionPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-muted-foreground">
                      {t("lineageTraditionHint")}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="formalEducation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formalEducation")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("formalEducationPlaceholder")}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    {t("formalEducationHint")}
                  </div>
                </FormItem>
              )}
            />

            <div className="bg-muted/50 border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">
                {t("summaryTitle")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("summaryDescription")}
              </p>
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
