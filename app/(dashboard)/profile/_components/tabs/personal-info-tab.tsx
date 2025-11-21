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
import { Upload, X, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Reuse language options from onboarding
const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "bengali", label: "Bengali" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "marathi", label: "Marathi" },
  { value: "gujarati", label: "Gujarati" },
  { value: "kannada", label: "Kannada" },
  { value: "malayalam", label: "Malayalam" },
  { value: "punjabi", label: "Punjabi" },
  { value: "odia", label: "Odia" },
  { value: "assamese", label: "Assamese" },
] as const;

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  timeOfBirth: z.string().min(1, "Time of birth is required"),
  placeOfBirth: z.string().min(2, "Place of birth is required"),
  primaryLanguage: z.string().min(1, "Primary language is required"),
  languages: z.array(z.string()).optional(),
  about: z.string().min(50, "About must be at least 50 characters"),
  profileImage: z.instanceof(File).optional(),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoTabProps {
  profile: any; // Using any for now, should use proper type from API
}

export const PersonalInfoTab = ({ profile }: PersonalInfoTabProps) => {
  const queryClient = useQueryClient();

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
        : "",
      timeOfBirth: profile?.timeOfBirth || "",
      placeOfBirth: profile?.placeOfBirth || "",
      primaryLanguage: profile?.primaryLanguage || "",
      languages: profile?.languages || [],
      about: profile?.about || "",
      profileImage: undefined,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: PersonalInfoData) => api.auth.updateProfile(data),
    onSuccess: () => {
      toast.success("Personal information updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update personal information");
    },
  });

  const onSubmit = (data: PersonalInfoData) => {
    updateMutation.mutate(data);
  };

  // Filter out primary language from additional languages options
  const getAdditionalLanguageOptions = (primaryLang?: string): Option[] => {
    return LANGUAGE_OPTIONS.filter((lang) => lang.value !== primaryLang).map(
      (lang) => ({
        value: lang.value,
        label: lang.label,
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your basic profile information and photo
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
                    <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
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
                    <FormLabel>Time of Birth</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
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
                    <FormLabel>Place of Birth</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel>Primary Language</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
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
                  <FormLabel>Additional Languages</FormLabel>
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
                      options={[
                        ...getAdditionalLanguageOptions(
                          form.watch("primaryLanguage")
                        ),
                      ]}
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
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxFiles={1}
                      maxSize={2 * 1024 * 1024}
                      value={field.value ? [field.value] : []}
                      onValueChange={(files) => field.onChange(files[0])}
                      className="w-full"
                    >
                      <FileUploadDropzone>
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
                  <FormDescription>
                    Upload a clear photo of yourself for your profile
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Yourself</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your journey in astrology, your approach, what makes you unique, and how you help clients..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Minimum 50 characters required
                  </FormDescription>
                </FormItem>
              )}
            />

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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};