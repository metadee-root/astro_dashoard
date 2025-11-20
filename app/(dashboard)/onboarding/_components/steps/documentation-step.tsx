import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  documentationSchema,
  DocumentationData,
} from "../../_schemas/documentation.schema";
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
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemDelete,
} from "@/components/ui/file-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, FileText, Upload, X } from "lucide-react";

export const DocumentationStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

  const savedData = getStepData("documentation");
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  const form = useForm<DocumentationData>({
    resolver: zodResolver(documentationSchema),
    defaultValues: savedData || {
      aadharCard: undefined,
      addressProof: undefined,
      educationCertificates: [],
    },
  });

  const onSubmit = (data: DocumentationData) => {
    updateStepData("documentation", data);
    nextStep();
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    const currentData = form.getValues();
    updateStepData("documentation", currentData);
    previousStep();
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateStepData("documentation", value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateStepData]);

  const handleFileUpload = (fieldName: string, files: File[]) => {
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 50 }));

    setTimeout(() => {
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }));
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
      }, 500);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
        <CardDescription>
          Upload required documents for verification and profile setup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="aadharCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Aadhar Card <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*,application/pdf,.doc,.docx"
                      maxSize={10 * 1024 * 1024}
                      multiple={false}
                      onValueChange={(files) => {
                        if (files.length > 0) {
                          field.onChange(files[0]);
                          handleFileUpload("aadharCard", files);
                        }
                      }}
                      value={field.value ? [field.value] : []}
                    >
                      <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="size-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-sm">
                            Drag & drop files here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Or click to browse (up to 10MB each)
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            Browse files
                          </Button>
                        </FileUploadTrigger>
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field.value
                          ? [field.value].map((file, index) => (
                              <FileUploadItem key={index} value={file}>
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
                            ))
                          : null}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressProof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address Proof <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*,application/pdf,.doc,.docx"
                      maxSize={10 * 1024 * 1024}
                      multiple={false}
                      onValueChange={(files) => {
                        if (files.length > 0) {
                          field.onChange(files[0]);
                          handleFileUpload("addressProof", files);
                        }
                      }}
                      value={field.value ? [field.value] : []}
                    >
                      <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="size-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-sm">
                            Drag & drop files here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Or click to browse (up to 10MB each)
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            Browse files
                          </Button>
                        </FileUploadTrigger>
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field.value
                          ? [field.value].map((file, index) => (
                              <FileUploadItem key={index} value={file}>
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
                            ))
                          : null}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educationCertificates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Education Certificates{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*,application/pdf,.doc,.docx"
                      multiple
                      maxFiles={10}
                      maxSize={5 * 1024 * 1024}
                      onValueChange={(files) => {
                        field.onChange(files);
                        if (files.length > 0) {
                          handleFileUpload("educationCertificates", files);
                        }
                      }}
                      value={field.value || []}
                    >
                      <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="size-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-sm">
                            Drag & drop files here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Or click to browse (max 10 files, up to 5MB each)
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            Browse files
                          </Button>
                        </FileUploadTrigger>
                      </FileUploadDropzone>
                      <FileUploadList>
                        {(field.value || []).map((file, index) => (
                          <FileUploadItem key={index} value={file}>
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
                        ))}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    At least one education certificate is required
                  </div>
                </FormItem>
              )}
            />

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    Document Security & Privacy
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc -ml-4">
                    <li>All documents are encrypted and stored securely</li>
                    <li>Documents are used only for verification purposes</li>
                    <li>
                      Your personal information is protected as per privacy
                      policy
                    </li>
                    <li>Documents will be reviewed within 2-3 business days</li>
                  </ul>
                </div>
              </div>
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
