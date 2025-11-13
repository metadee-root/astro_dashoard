import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  PersonalInfoData,
} from "../../_schemas/personal-info.schema";
import { StepProps } from "../../_types/step.types";
import { LANGUAGE_OPTIONS } from "../../_constants/form-options";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PersonalInfoStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

  const savedData = getStepData("personalInfo");

  // Filter out primary language from additional languages options
  const getAdditionalLanguageOptions = (primaryLang?: string): Option[] => {
    return LANGUAGE_OPTIONS.filter((lang) => lang.value !== primaryLang).map(
      (lang) => ({
        value: lang.value,
        label: lang.label,
      })
    );
  };

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: savedData || {
      fullName: "",
      dateOfBirth: new Date(),
      timeOfBirth: new Date(),
      placeOfBirth: "",
      primaryLanguage: "",
      languages: [],
      about: "",
      profileImage: undefined,
    },
  });

  const onSubmit = (data: PersonalInfoData) => {
    updateStepData("personalInfo", data);
    nextStep();
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    const currentData = form.getValues();
    updateStepData("personalInfo", currentData);
    previousStep();
  };

  // Watch for form changes and update store in real-time
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateStepData("personalInfo", value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateStepData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself to create your astrologer profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name as per official documents"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Birth *</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? `${field.value
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${field.value
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}`
                            : ""
                        }
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value
                            .split(":")
                            .map(Number);
                          const date = new Date();
                          date.setHours(hours, minutes, 0, 0);
                          field.onChange(date);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of Birth *</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="primaryLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Language *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LANGUAGE_OPTIONS.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Languages (Optional)</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((lang) => ({
                          value: lang,
                          label:
                            LANGUAGE_OPTIONS.find((opt) => opt.value === lang)
                              ?.label || lang,
                        })) || []
                      }
                      onChange={(options) =>
                        field.onChange(options.map((opt) => opt.value))
                      }
                      options={[...getAdditionalLanguageOptions(
                        form.watch("primaryLanguage")
                      )]}
                      placeholder="Additional languages"
                      emptyIndicator={
                        <p className="text-center text-sm">
                          No languages found
                        </p>
                      }
                      hideClearAllButton
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo (Optional)</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxFiles={1}
                      maxSize={2 * 1024 * 1024}
                      value={field.value ? [field.value] : []}
                      onValueChange={(files) => field.onChange(files[0])}
                      className="w-full"
                    >
                      <FileUploadDropzone className="">
                        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="flex flex-col gap-1">
                            <p className="text-sm text-muted-foreground">
                              Drop your profile photo here or
                            </p>
                            <FileUploadTrigger asChild>
                              <Button type="button" variant="outline" size="sm">
                                browse
                              </Button>
                            </FileUploadTrigger>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Supports: JPEG, PNG up to 2MB
                          </p>
                        </div>
                      </FileUploadDropzone>
                      <FileUploadList className="mt-2" />
                      {field.value && (
                        <FileUploadList>
                          <FileUploadItem value={field.value}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        </FileUploadList>
                      )}
                    </FileUpload>
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-gray-500">
                    Upload a clear photo of yourself for your profile
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Yourself *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your journey in astrology, your approach, what makes you unique, and how you help clients..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-gray-500">
                    Minimum 50 characters required
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled
              >
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
