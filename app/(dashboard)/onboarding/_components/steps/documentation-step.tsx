"use client";

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
import { AlertCircle, Upload, X } from "lucide-react";
import { useTranslations } from "next-intl";

export const DocumentationStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();
  const t = useTranslations("onboarding.documentation");
  const tCommon = useTranslations("common");

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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
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
                    {t("idProof")} <span className="text-destructive">*</span>
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
                            {t("idProofHint")}
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            {tCommon("viewAll")}
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
                    {t("addressProof")}{" "}
                    <span className="text-destructive">*</span>
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
                            {t("addressProofHint")}
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            {tCommon("viewAll")}
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
                  <FormLabel>{t("certifications")}</FormLabel>
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
                            {t("certificationsHint")}
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            {tCommon("viewAll")}
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
                </FormItem>
              )}
            />

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
