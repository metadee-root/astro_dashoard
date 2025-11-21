import { z } from "zod";

export const specializationSchema = z.object({
  remediesTypes: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.length <= 10,
      "You can select maximum 10 remedy types"
    ),

  excludedPredictionAreas: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.length <= 15,
      "You can exclude maximum 15 prediction areas"
    ),

  createHoroscopeContent: z.boolean(),

  createDailyPredictions: z.boolean(),

  canPerformPuja: z.boolean(),

  // Optional fields for more detailed specialization information
  predictionMethodology: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.length <= 8,
      "You can select maximum 8 prediction methodologies"
    ),

  consultationStyle: z
    .string()
    .optional()
    .transform((val) => val?.trim() || "")
    .refine(
      (val) => !val || val.length <= 500,
      "Consultation style description must not exceed 500 characters"
    )
    .optional(),

  specialSkills: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.length <= 10,
      "You can list maximum 10 special skills"
    ),

  communicationMediums: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.length <= 5,
      "You can select maximum 5 communication mediums"
    ),
});

export type SpecializationData = z.infer<typeof specializationSchema>;
