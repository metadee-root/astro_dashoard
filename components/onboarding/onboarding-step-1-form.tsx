"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const LANGUAGES = [
  { id: "hindi", label: "Hindi" },
  { id: "english", label: "English" },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  spiritualTitle: z
    .string()
    .min(2, "Spiritual title must be at least 2 characters"),
  otherLanguage: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  expertise: z
    .array(z.string())
    .min(1, "Please select at least one area of expertise"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio must not exceed 500 characters"),
});

export const OnboardingStep1Form = () => {
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      spiritualTitle: "",
      otherLanguage: "",
      country: "",
      state: "",
      city: "",
      languages: [],
      expertise: [],
      yearsOfExperience: "",
      bio: "",
    },
  });

  const [
    { files, isDragging, errors: uploadErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-lg">Pandit Profile Setup</CardTitle>
        <CardDescription>
          Please provide your spiritual and professional details
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spiritualTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spiritual Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your spiritual title (e.g., Pandit, Aacharya, Swami)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
                    </FormControl>
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
                  <FormLabel>Languages Known</FormLabel>
                  <div className="space-y-2">
                    {LANGUAGES.map((language) => (
                      <div
                        key={language.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={language.id}
                          checked={field.value.includes(language.id)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, language.id]
                              : field.value.filter(
                                  (value) => value !== language.id
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                        <label
                          htmlFor={language.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {language.label}
                        </label>
                      </div>
                    ))}
                    <FormField
                      control={form.control}
                      name="otherLanguage"
                      render={({ field: otherField }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="other-language"
                            checked={field.value.includes("other")}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...field.value, "other"]
                                : field.value.filter(
                                    (value) => value !== "other"
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                          <label
                            htmlFor="other-language"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Other
                          </label>
                          {field.value.includes("other") && (
                            <Input
                              placeholder="Specify other language"
                              className="max-w-[200px]"
                              {...otherField}
                            />
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas of Expertise</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Start typing (e.g., Jyotish, Vastu, Daan)..."
                        value={field.value.join(", ")}
                        onChange={(e) => {
                          const values = e.target.value
                            .split(",")
                            .map((value) => value.trim())
                            .filter(Boolean);
                          field.onChange(values);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your years of experience"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Profile Image</FormLabel>
              <div className="relative">
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-dragging={isDragging || undefined}
                  className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                >
                  <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                  />
                  {previewUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img
                        src={previewUrl}
                        alt={files[0]?.file?.name || "Uploaded image"}
                        className="mx-auto max-h-full rounded object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                      <div
                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                      >
                        <ImageIcon className="size-4 opacity-60" />
                      </div>
                      <p className="mb-1.5 text-sm font-medium">
                        Drop your image here
                      </p>
                      <p className="text-muted-foreground text-xs">
                        SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={openFileDialog}
                        type="button"
                      >
                        <UploadIcon
                          className="-ms-1 size-4 opacity-60"
                          aria-hidden="true"
                        />
                        Select image
                      </Button>
                    </div>
                  )}
                </div>

                {previewUrl && (
                  <div className="absolute top-4 right-4">
                    <button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                      onClick={() => removeFile(files[0]?.id)}
                      aria-label="Remove image"
                    >
                      <XIcon className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              {uploadErrors.length > 0 && (
                <div
                  className="text-destructive flex items-center gap-1 text-xs"
                  role="alert"
                >
                  <AlertCircleIcon className="size-3 shrink-0" />
                  <span>{uploadErrors[0]}</span>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Write a brief bio about yourself..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="">
                Save Profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
