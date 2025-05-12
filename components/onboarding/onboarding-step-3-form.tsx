"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, FileIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  profileImage: z.object({
    file: z.any().optional()
  }),
  nationalId: z.object({
    file: z.any().refine((file) => file, "Please upload your National ID or Aadhar Card")
  }),
  spiritualCertificate: z.object({
    file: z.any().refine((file) => file, "Please upload your Spiritual Education Certificate")
  }),
  introduction: z.object({
    file: z.any().optional()
  })
});

export const OnboardingStep3Form = () => {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const form = useForm<z.infer<typeof formSchema>>({    
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: { file: null },
      nationalId: { file: null },
      spiritualCertificate: { file: null },
      introduction: { file: null }
    }
  });

  const [
    { files: profileImageFiles, isDragging: isProfileImageDragging, errors: profileImageErrors },
    { handleDragEnter: handleProfileImageDragEnter, handleDragLeave: handleProfileImageDragLeave,
      handleDragOver: handleProfileImageDragOver, handleDrop: handleProfileImageDrop,
      openFileDialog: openProfileImageDialog, removeFile: removeProfileImageFile,
      getInputProps: getProfileImageInputProps }
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize: maxSize / 2.5 // 2MB for profile image
  });

  const previewUrl = profileImageFiles[0]?.preview || null;
  const [
    { files: nationalIdFiles, isDragging: isNationalIdDragging, errors: nationalIdErrors },
    { handleDragEnter: handleNationalIdDragEnter, handleDragLeave: handleNationalIdDragLeave,
      handleDragOver: handleNationalIdDragOver, handleDrop: handleNationalIdDrop,
      openFileDialog: openNationalIdDialog, removeFile: removeNationalIdFile,
      getInputProps: getNationalIdInputProps }
  ] = useFileUpload({
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize
  });

  const [
    { files: certificateFiles, isDragging: isCertificateDragging, errors: certificateErrors },
    { handleDragEnter: handleCertificateDragEnter, handleDragLeave: handleCertificateDragLeave,
      handleDragOver: handleCertificateDragOver, handleDrop: handleCertificateDrop,
      openFileDialog: openCertificateDialog, removeFile: removeCertificateFile,
      getInputProps: getCertificateInputProps }
  ] = useFileUpload({
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize
  });

  const [
    { files: introFiles, isDragging: isIntroDragging, errors: introErrors },
    { handleDragEnter: handleIntroDragEnter, handleDragLeave: handleIntroDragLeave,
      handleDragOver: handleIntroDragOver, handleDrop: handleIntroDrop,
      openFileDialog: openIntroDialog, removeFile: removeIntroFile,
      getInputProps: getIntroInputProps }
  ] = useFileUpload({
    accept: ".mp4,.mp3,.wav",
    maxSize: maxSize * 2 // 10MB for media files
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Handle form submission
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-lg">Document Verification</CardTitle>
        <CardDescription>
          Please upload the required documents for verification
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-sm text-muted-foreground mb-6">
              Your documents will remain private and are only used for internal verification.
            </div>

            <FormField
              control={form.control}
              name="profileImage.file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <div className="relative">
                    <div
                      onDragEnter={handleProfileImageDragEnter}
                      onDragLeave={handleProfileImageDragLeave}
                      onDragOver={handleProfileImageDragOver}
                      onDrop={handleProfileImageDrop}
                      data-dragging={isProfileImageDragging || undefined}
                      className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                    >
                      <input
                        {...getProfileImageInputProps()}
                        {...field}
                        value={field.value?.name || ""}
                        className="sr-only"
                        aria-label="Upload image file"
                      />
                      {previewUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <img
                            src={previewUrl}
                            alt={profileImageFiles[0]?.file?.name || "Uploaded image"}
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
                            SVG, PNG, JPG or GIF (max. 2MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={openProfileImageDialog}
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
                          onClick={() => {
                            removeProfileImageFile(profileImageFiles[0]?.id);
                            field.onChange(null);
                          }}
                          aria-label="Remove image"
                        >
                          <XIcon className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>

                  {profileImageErrors.length > 0 && (
                    <div
                      className="text-destructive flex items-center gap-1 text-xs"
                      role="alert"
                    >
                      <AlertCircleIcon className="size-3 shrink-0" />
                      <span>{profileImageErrors[0]}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalId.file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID / Aadhar Card</FormLabel>
                  <div
                    onDragEnter={handleNationalIdDragEnter}
                    onDragLeave={handleNationalIdDragLeave}
                    onDragOver={handleNationalIdDragOver}
                    onDrop={handleNationalIdDrop}
                    data-dragging={isNationalIdDragging || undefined}
                    className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                  >
                    <input
                      {...getNationalIdInputProps()}
                      {...field}
                      value={field.value?.name || ""}
                      className="sr-only"
                      aria-label="Upload National ID"
                    />
                    {nationalIdFiles[0] ? (
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4" />
                        <span className="text-sm">{nationalIdFiles[0].file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            removeNationalIdFile(nationalIdFiles[0].id);
                            field.onChange(null);
                          }}
                          className="ml-2 text-destructive hover:text-destructive/80"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <UploadIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                        <div className="text-xs">
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 text-xs"
                            onClick={openNationalIdDialog}
                          >
                            Click to upload
                          </Button>
                          {" or drag and drop"}
                        </div>
                        <div className="text-muted-foreground text-xs mt-1">
                          PDF, JPG or PNG (max. {maxSizeMB}MB)
                        </div>
                      </div>
                    )}
                  </div>
                  {nationalIdErrors.length > 0 && (
                    <div className="text-destructive flex items-center gap-1 text-xs mt-1.5">
                      <AlertCircleIcon className="h-3 w-3" />
                      <span>{nationalIdErrors[0]}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spiritualCertificate.file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spiritual Education Certificate</FormLabel>
                  <div
                    onDragEnter={handleCertificateDragEnter}
                    onDragLeave={handleCertificateDragLeave}
                    onDragOver={handleCertificateDragOver}
                    onDrop={handleCertificateDrop}
                    data-dragging={isCertificateDragging || undefined}
                    className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                  >
                    <input
                      {...getCertificateInputProps()}
                      {...field}
                      value={field.value?.name || ""}
                      className="sr-only"
                      aria-label="Upload Certificate"
                    />
                    {certificateFiles[0] ? (
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4" />
                        <span className="text-sm">{certificateFiles[0].file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            removeCertificateFile(certificateFiles[0].id);
                            field.onChange(null);
                          }}
                          className="ml-2 text-destructive hover:text-destructive/80"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <UploadIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                        <div className="text-xs">
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 text-xs"
                            onClick={openCertificateDialog}
                          >
                            Click to upload
                          </Button>
                          {" or drag and drop"}
                        </div>
                        <div className="text-muted-foreground text-xs mt-1">
                          PDF, JPG or PNG (max. {maxSizeMB}MB)
                        </div>
                      </div>
                    )}
                  </div>
                  {certificateErrors.length > 0 && (
                    <div className="text-destructive flex items-center gap-1 text-xs mt-1.5">
                      <AlertCircleIcon className="h-3 w-3" />
                      <span>{certificateErrors[0]}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="introduction.file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Introduction or Audio Chant (Optional)</FormLabel>
                  <div
                    onDragEnter={handleIntroDragEnter}
                    onDragLeave={handleIntroDragLeave}
                    onDragOver={handleIntroDragOver}
                    onDrop={handleIntroDrop}
                    data-dragging={isIntroDragging || undefined}
                    className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                  >
                    <input
                      {...getIntroInputProps()}
                      {...field}
                      value={field.value?.name || ""}
                      className="sr-only"
                      aria-label="Upload Introduction"
                    />
                    {introFiles[0] ? (
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4" />
                        <span className="text-sm">{introFiles[0].file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            removeIntroFile(introFiles[0].id);
                            field.onChange(null);
                          }}
                          className="ml-2 text-destructive hover:text-destructive/80"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <UploadIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                        <div className="text-xs">
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 text-xs"
                            onClick={openIntroDialog}
                          >
                            Click to upload
                          </Button>
                          {" or drag and drop"}
                        </div>
                        <div className="text-muted-foreground text-xs mt-1">
                          MP4, MP3 or WAV (max. {maxSizeMB * 2}MB)
                        </div>
                      </div>
                    )}
                  </div>
                  {introErrors.length > 0 && (
                    <div className="text-destructive flex items-center gap-1 text-xs mt-1.5">
                      <AlertCircleIcon className="h-3 w-3" />
                      <span>{introErrors[0]}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2.5">
              <Button type="button" variant="outline">Back</Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
