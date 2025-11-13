import { z } from "zod";

// File validation schemas
const documentFileSchema = z
  .instanceof(File, {
    message: "Please upload a valid document file",
  })
  .refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB
    "Document size must be less than 10MB"
  )
  .refine((file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg", // Images
      "application/pdf", // PDF
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word docs
    ];
    return allowedTypes.includes(file.type);
  }, "Document must be PDF, JPEG, PNG, or Word format");

const multipleDocumentsSchema = z
  .array(
    z.instanceof(File, {
      message: "Please upload valid document files",
    })
  )
  .optional()
  .refine(
    (files) => !files || files.length <= 10,
    "You can upload maximum 10 education certificates"
  )
  .refine((files) => {
    return !files || files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB per file
  }, "Each certificate must be less than 5MB")
  .refine((files) => {
    if (!files || files.length === 0) return true;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return files.every((file) => allowedTypes.includes(file.type));
  }, "Certificates must be PDF, JPEG, PNG, or Word format");

export const documentationSchema = z.object({
  aadharCard: documentFileSchema,

  addressProof: documentFileSchema,

  educationCertificates: multipleDocumentsSchema.refine(
    (files) => files && files.length > 0,
    "At least one education certificate is required"
  ),
});

export type DocumentationData = z.infer<typeof documentationSchema>;
