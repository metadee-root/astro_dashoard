"use client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Constants from onboarding
const EXPERTISE_OPTIONS = [
  { value: "vedic_astrology", label: "Vedic Astrology" },
  { value: "western_astrology", label: "Western Astrology" },
  { value: "numerology", label: "Numerology" },
  { value: "palmistry", label: "Palmistry" },
  { value: "vastu", label: "Vastu Shastra" },
  { value: "feng_shui", label: "Feng Shui" },
  { value: "tarot_reading", label: "Tarot Reading" },
  { value: "kp_astrology", label: "KP Astrology" },
  { value: "nadi_astrology", label: "Nadi Astrology" },
  { value: "prashna", label: "Prashna (Horary)" },
  { value: "muhoorat", label: "Muhoorat (Electional)" },
  { value: "remedial_astrology", label: "Remedial Astrology" },
];

const ASTROLOGY_SYSTEMS = [
  { value: "parashari", label: "Parashari System" },
  { value: "jamini", label: "Jamini System" },
  { value: "kp", label: "KP System" },
  { value: "nadi", label: "Nadi Astrology" },
  { value: "lal_kitab", label: "Lal Kitab" },
  { value: "western", label: "Western Astrology" },
  { value: "chinese", label: "Chinese Astrology" },
];

const REMEDIES_TYPES = [
  { value: "gemstone", label: "Gemstone Therapy" },
  { value: "mantra", label: "Mantra Chanting" },
  { value: "yagna", label: "Yagna/Havan" },
  { value: "yantra", label: "Yantra Installation" },
  { value: "donation", label: "Donation (Daan)" },
  { value: "fasting", label: "Fasting (Vrat)" },
  { value: "puja", label: "Puja Rituals" },
  { value: "rudraksha", label: "Rudraksha Therapy" },
  { value: "vaastu", label: "Vaastu Remedies" },
  { value: "ayurvedic", label: "Ayurvedic Remedies" },
];

const PREDICTION_AREAS = [
  { value: "death", label: "Death Predictions" },
  { value: "health", label: "Health Issues" },
  { value: "legal", label: "Legal Matters" },
  { value: "financial", label: "Financial Crisis" },
  { value: "relationship", label: "Relationship Problems" },
  { value: "marriage", label: "Marriage Timing" },
  { value: "children", label: "Child Birth" },
  { value: "career", label: "Career Changes" },
  { value: "abroad", label: "Foreign Settlement" },
  { value: "property", label: "Property Disputes" },
  { value: "education", label: "Education Results" },
  { value: "politics", label: "Political Predictions" },
  { value: "stock", label: "Stock Market" },
  { value: "sports", label: "Sports Outcomes" },
];

const EXPERIENCE_YEARS = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10-15", label: "10-15 years" },
  { value: "15-20", label: "15-20 years" },
  { value: "20+", label: "20+ years" },
];

const professionalBackgroundSchema = z.object({
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  expertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
  astrologySystems: z.array(z.string()).min(1, "Select at least one astrology system"),
  otherPractices: z.array(z.string()).optional(),
  teachers: z.string().optional(),
  lineage: z.string().optional(),
  formalEducation: z.string().optional(),
  remediesTypes: z.array(z.string()).optional(),
  excludedPredictionAreas: z.array(z.string()).optional(),
  createHoroscopeContent: z.boolean().optional(),
  createDailyPredictions: z.boolean().optional(),
  educationCertificates: z
    .array(
      z.union([
        z.string(),
        typeof File !== "undefined" ? z.instanceof(File) : z.any(),
      ])
    )
    .optional(),
  createEducationalPosts: z.boolean().optional(),
  comfortableWithVideo: z.boolean().optional(),
  comfortableWithAudio: z.boolean().optional(),
  participateInLiveEvents: z.boolean().optional(),
  participateInWebinars: z.boolean().optional(),
});

type ProfessionalBackgroundData = z.infer<typeof professionalBackgroundSchema>;

interface ProfessionalBackgroundTabProps {
  profile: any;
}

export const ProfessionalBackgroundTab = ({ profile }: ProfessionalBackgroundTabProps) => {
  const queryClient = useQueryClient();

  const form = useForm<ProfessionalBackgroundData>({
    resolver: zodResolver(professionalBackgroundSchema),
    defaultValues: {
      yearsOfExperience: profile?.yearsOfExperience?.toString() || "",
      expertise: profile?.expertise || [],
      astrologySystems: profile?.astrologySystems || [],
      otherPractices: profile?.otherPractices || [],
      teachers: profile?.teachers || "",
      lineage: profile?.lineage || "",
      formalEducation: profile?.formalEducation || "",
      remediesTypes: profile?.remediesTypes || [],
      excludedPredictionAreas: profile?.excludedPredictionAreas || [],
      createHoroscopeContent: profile?.createHoroscopeContent || false,
      createDailyPredictions: profile?.createDailyPredictions || false,
      educationCertificates: profile?.educationCertificates || [],
      createEducationalPosts: profile?.createEducationalPosts || false,
      comfortableWithVideo: profile?.comfortableWithVideo || false,
      comfortableWithAudio: profile?.comfortableWithAudio || false,
      participateInLiveEvents: profile?.participateInLiveEvents || false,
      participateInWebinars: profile?.participateInWebinars || false,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProfessionalBackgroundData) => api.auth.updateProfile(data),
    onSuccess: () => {
      toast.success("Professional background updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update professional background");
    },
  });

  const onSubmit = (data: ProfessionalBackgroundData) => {
    updateMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Background</CardTitle>
        <CardDescription>
          Share your experience, expertise, and professional journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of years"
                        min="0"
                        max="50"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Total years practicing astrology (0-50)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="formalEducation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formal Education</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., MA in Astrology, PhD in Vedic Sciences"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Any formal education or certifications in astrology or related fields
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Areas of Expertise</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((expertise) => ({
                          value: expertise,
                          label:
                            EXPERTISE_OPTIONS.find((opt) => opt.value === expertise)
                              ?.label || expertise,
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
                  <FormDescription>
                    Select all areas where you have expertise
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="astrologySystems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Astrology Systems</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((system) => ({
                          value: system,
                          label:
                            ASTROLOGY_SYSTEMS.find((opt) => opt.value === system)
                              ?.label || system,
                        })) || []
                      }
                      onChange={(options) =>
                        field.onChange(options.map((opt) => opt.value))
                      }
                      options={[...ASTROLOGY_SYSTEMS]}
                      placeholder="Select astrology systems you practice"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Select the astrology systems you specialize in
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherPractices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Practices</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((practice) => ({
                          value: practice,
                          label: practice,
                        })) || []
                      }
                      onChange={(options) =>
                        field.onChange(options.map((opt) => opt.value))
                      }
                      options={[]}
                      placeholder="Type and add other practices"
                      emptyIndicator={
                        <p className="text-center text-sm">
                          Type a practice and press Enter
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Any other spiritual or astrological practices you follow
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="teachers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teachers/Gurus</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Names of your teachers or mentors in astrology"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lineage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Astrological Lineage</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your family or traditional lineage in astrology (if any)"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="formalEducation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Formal Education</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Degrees, certifications, courses, or formal training in astrology..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Any formal education or certifications in astrology or related fields
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remediesTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remedy Types You Offer</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={
                        field.value?.map((remedy) => ({
                          value: remedy,
                          label:
                            REMEDIES_TYPES.find((opt) => opt.value === remedy)
                              ?.label || remedy,
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
                  <FormDescription>
                    Select the types of astrological remedies you specialize in
                  </FormDescription>
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
                        field.value?.map((area) => ({
                          value: area,
                          label:
                            PREDICTION_AREAS.find((opt) => opt.value === area)
                              ?.label || area,
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
                  <FormDescription>
                    Be honest about areas where you're not comfortable making predictions
                  </FormDescription>
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="educationCertificates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Certificates</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept=".pdf,.jpg,.jpeg,.png"
                      maxFiles={5}
                      maxSize={5 * 1024 * 1024}
                      value={field.value || []}
                      onValueChange={(files) => field.onChange(files)}
                      className="w-full"
                    >
                      <FileUploadDropzone>
                        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="flex flex-col gap-1">
                            <p className="text-sm text-muted-foreground">
                              Drop your certificates here or
                            </p>
                            <FileUploadTrigger asChild>
                              <Button type="button" variant="outline" size="sm">
                                browse files
                              </Button>
                            </FileUploadTrigger>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Supports: PDF, JPEG, PNG up to 5MB each (max 5 files)
                          </p>
                        </div>
                      </FileUploadDropzone>
                      <FileUploadList className="mt-2" />
                    </FileUpload>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Upload your astrology certificates, diplomas, or course completions
                  </FormDescription>
                </FormItem>
              )}
            />

            <div>
              <h3 className="font-semibold mb-4">Content Creation Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          Interested in creating horoscope-related content
                        </FormDescription>
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
                          Daily predictions
                        </FormLabel>
                        <FormDescription>
                          Create daily/weekly astrological predictions
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="createEducationalPosts"
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
                          Educational content
                        </FormLabel>
                        <FormDescription>
                          Create educational posts about astrology
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Consultation Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="comfortableWithVideo"
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
                          Comfortable with video consultations
                        </FormLabel>
                        <FormDescription>
                          Available for video calls with clients
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comfortableWithAudio"
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
                          Comfortable with audio consultations
                        </FormLabel>
                        <FormDescription>
                          Available for voice calls with clients
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participateInLiveEvents"
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
                          Live events participation
                        </FormLabel>
                        <FormDescription>
                          Interested in participating in live events
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participateInWebinars"
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
                          Webinars and workshops
                        </FormLabel>
                        <FormDescription>
                          Interested in conducting webinars
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};