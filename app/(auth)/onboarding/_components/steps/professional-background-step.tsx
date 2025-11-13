import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  professionalSchema,
  ProfessionalData,
} from "../../_schemas/professional.schema";
import { StepProps } from "../../_types/step.types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ProfessionalBackgroundStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

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
        <CardTitle>Professional Background</CardTitle>
        <CardDescription>
          Share your experience and expertise in astrology
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Areas of Expertise *</FormLabel>
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
                      placeholder="Select your areas of expertise"
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-gray-500">
                    Select at least one area where you have expertise
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of years"
                        min="0"
                        max="50"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Total years practicing astrology
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="astrologySystems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Astrology Systems *</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={
                          field.value?.map((item) => ({
                            value: item,
                            label:
                              ASTROLOGY_SYSTEMS.find(
                                (opt) => opt.value === item
                              )?.label || item,
                          })) || []
                        }
                        onChange={(options) =>
                          field.onChange(options.map((opt) => opt.value))
                        }
                        options={[...ASTROLOGY_SYSTEMS]}
                        placeholder="Select astrology systems you use"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Select at least one astrology system
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="otherPractices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Practices (Optional)</FormLabel>
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
                      placeholder="Select other related practices"
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-gray-500">
                    Any other healing or spiritual practices you offer
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
                    <FormLabel>Teachers/Gurus (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Names of your teachers or gurus in astrology"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Your teachers or mentors who guided your astrological
                      journey
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lineage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lineage/Tradition (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your astrological lineage or tradition"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Any specific astrological tradition or lineage you follow
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="formalEducation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Formal Education in Astrology (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Degrees, certifications, courses, or formal training in astrology..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-gray-500">
                      Any formal degrees, certifications, or specialized courses
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Professional Summary
              </h4>
              <p className="text-sm text-blue-800">
                Your professional background helps clients understand your
                expertise and approach to astrology. Be honest about your
                experience and qualifications.
              </p>
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
