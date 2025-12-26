"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeftIcon,
  CircleUserRoundIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
  Loader2,
  CalendarIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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

// Define type for pixel crop area
type Area = { x: number; y: number; width: number; height: number };

// Helper function to create a cropped image blob
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number = pixelCrop.width,
  outputHeight: number = pixelCrop.height
): Promise<Blob | null> => {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth,
      outputHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  } catch (error) {
    console.error("Error in getCroppedImg:", error);
    return null;
  }
};

interface ProfileImageUploaderProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  existingImageUrl?: string;
}

const ProfileImageUploader = ({
  value,
  onChange,
  existingImageUrl,
}: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(
    existingImageUrl || null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hasUserChangedImage, setHasUserChangedImage] = useState(false);

  // Initialize with existing image URL
  useEffect(() => {
    if (existingImageUrl && !finalImageUrl) {
      setFinalImageUrl(existingImageUrl);
    }
  }, [existingImageUrl, finalImageUrl]);

  // Initialize with existing value if present
  useEffect(() => {
    if (value && !finalImageUrl) {
      const url = URL.createObjectURL(value);
      setFinalImageUrl(url);
    }
  }, [value, finalImageUrl]);

  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Revoke old preview URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create preview and open dialog
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsDialogOpen(true);
      setCroppedAreaPixels(null);
      setZoom(1);
    }
    // Reset input value so the same file can be selected again
    e.target.value = "";
  };

  const handleApply = async () => {
    if (!previewUrl || !croppedAreaPixels) {
      console.error("Missing data for apply:", {
        croppedAreaPixels,
        previewUrl,
      });
      setIsDialogOpen(false);
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);

      if (!croppedBlob) {
        throw new Error("Failed to generate cropped image blob.");
      }

      // Create a File from the Blob
      const croppedFile = new File([croppedBlob], "profile-image.jpg", {
        type: "image/jpeg",
      });

      // Create a NEW object URL from the cropped blob
      const newFinalUrl = URL.createObjectURL(croppedBlob);

      // Revoke the OLD finalImageUrl if it exists and is a blob URL
      if (finalImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(finalImageUrl);
      }

      // Set the final avatar state to the NEW URL
      setFinalImageUrl(newFinalUrl);

      // Mark that user has changed the image
      setHasUserChangedImage(true);

      // Call onChange with the cropped file
      onChange(croppedFile);

      // Close the dialog and clean up preview
      setIsDialogOpen(false);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error during apply:", error);
      setIsDialogOpen(false);
    }
  };

  const handleRemoveFinalImage = () => {
    if (finalImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(finalImageUrl);
    }
    // Reset to the existing image or null
    setFinalImageUrl(existingImageUrl || null);
    setHasUserChangedImage(false);
    onChange(undefined);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setIsDialogOpen(open);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsDialogOpen(true);
      setCroppedAreaPixels(null);
      setZoom(1);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      if (finalImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(finalImageUrl);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-flex">
        <button
          aria-label={finalImageUrl ? "Change image" : "Upload image"}
          className="relative flex size-32 items-center justify-center overflow-hidden rounded-full border-2 border-input border-dashed outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 data-[dragging=true]:bg-accent/50"
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          type="button"
        >
          {finalImageUrl ? (
            <img
              alt="Profile photo"
              className="size-full object-cover"
              height={128}
              src={finalImageUrl}
              style={{ objectFit: "cover" }}
              width={128}
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-2"
            >
              <CircleUserRoundIcon className="size-10 opacity-40" />
              <span className="text-xs text-muted-foreground">
                Click to upload
              </span>
            </div>
          )}
        </button>
        {hasUserChangedImage && finalImageUrl && (
          <Button
            aria-label="Remove image"
            className="-top-1 -right-1 absolute size-8 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            onClick={handleRemoveFinalImage}
            size="icon"
            variant="destructive"
            type="button"
          >
            <XIcon className="size-4" />
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          aria-label="Upload image file"
          className="sr-only"
          tabIndex={-1}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Supports: JPEG, PNG up to 5MB
        <br />
        <span className="text-primary">Click or drag to upload</span>
      </p>

      {/* Cropper Dialog */}
      <Dialog onOpenChange={handleDialogClose} open={isDialogOpen}>
        <DialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
          <DialogDescription className="sr-only">
            Crop image dialog
          </DialogDescription>
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="flex items-center justify-between border-b p-4 text-base">
              <div className="flex items-center gap-2">
                <Button
                  aria-label="Cancel"
                  className="-my-1 opacity-60"
                  onClick={() => handleDialogClose(false)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <ArrowLeftIcon aria-hidden="true" />
                </Button>
                <span>Crop Profile Photo</span>
              </div>
              <Button
                autoFocus
                className="-my-1"
                disabled={!previewUrl}
                onClick={handleApply}
                type="button"
              >
                Apply
              </Button>
            </DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <Cropper
              className="h-96 sm:h-120"
              image={previewUrl}
              onCropChange={handleCropChange}
              onZoomChange={setZoom}
              zoom={zoom}
            >
              <CropperDescription />
              <CropperImage />
              <CropperCropArea />
            </Cropper>
          )}
          <DialogFooter className="border-t px-4 py-6">
            <div className="mx-auto flex w-full max-w-80 items-center gap-4">
              <ZoomOutIcon
                aria-hidden="true"
                className="shrink-0 opacity-60"
                size={16}
              />
              <Slider
                aria-label="Zoom slider"
                defaultValue={[1]}
                max={3}
                min={1}
                onValueChange={(value) => setZoom(value[0])}
                step={0.1}
                value={[zoom]}
              />
              <ZoomInIcon
                aria-hidden="true"
                className="shrink-0 opacity-60"
                size={16}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
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
  const t = useTranslations("profile.personalInfoTab");

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth)
        : undefined,
      timeOfBirth: profile?.timeOfBirth || "",
      placeOfBirth: profile?.placeOfBirth || "",
      primaryLanguage: profile?.primaryLanguage || "",
      languages: profile?.languages || [],
      about: profile?.about || "",
      profileImage: undefined,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: PersonalInfoData) => {
      // Convert Date to ISO string for API
      const apiData = {
        ...data,
        dateOfBirth: data.dateOfBirth.toISOString().split("T")[0],
      };
      return api.auth.updateProfile(apiData as any);
    },
    onSuccess: () => {
      toast.success(t("successMessage"));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || t("errorMessage"));
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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image with Cropper */}
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>{t("profilePhoto")}</FormLabel>
                  <FormControl>
                    <ProfileImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      existingImageUrl={profile?.profileImage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fullName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fullNamePlaceholder")}
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
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("dateOfBirth")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMMM do, yyyy")
                            ) : (
                              <span>{t("pickDate")}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1940}
                          toYear={new Date().getFullYear()}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1940-01-01")
                          }
                          defaultMonth={field.value || new Date(2000, 0)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("timeOfBirth")}</FormLabel>
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
                    <FormLabel>{t("placeOfBirth")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeOfBirthPlaceholder")}
                        {...field}
                      />
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
                    <FormLabel>{t("primaryLanguage")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t("primaryLanguagePlaceholder")}
                          />
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
                  <FormLabel>{t("additionalLanguages")}</FormLabel>
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
                      placeholder={t("additionalLanguagesPlaceholder")}
                      emptyIndicator={
                        <p className="text-center text-sm">
                          {t("noLanguagesFound")}
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
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("aboutYourself")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("aboutPlaceholder")}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>{t("minCharacters")}</FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : (
                  t("saveChanges")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
