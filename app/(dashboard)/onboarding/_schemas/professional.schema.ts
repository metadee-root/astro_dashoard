import { z } from 'zod';

export const professionalSchema = z.object({
  expertise: z.array(z.string())
    .min(1, 'Select at least one area of expertise')
    .max(10, 'You can select maximum 10 areas of expertise'),

  yearsOfExperience: z.number({
      required_error: 'Please select your years of experience',
      invalid_type_error: 'Years of experience must be a number',
    })
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience cannot exceed 50'),

  astrologySystems: z.array(z.string())
    .min(1, 'Select at least one astrology system')
    .max(8, 'You can select maximum 8 astrology systems'),

  otherPractices: z.array(z.string())
    .optional()
    .refine((val) => !val || val.length <= 10, 'You can select maximum 10 other practices'),

  teachers: z.string()
    .optional()
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || val.length <= 200, 'Teachers information must not exceed 200 characters')
    .optional(),

  lineage: z.string()
    .optional()
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || val.length <= 300, 'Lineage information must not exceed 300 characters')
    .optional(),

  formalEducation: z.string()
    .optional()
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || val.length >= 20, 'If provided, education details must be at least 20 characters')
    .refine((val) => !val || val.length <= 1000, 'Education details must not exceed 1000 characters')
    .optional(),

  });

export type ProfessionalData = z.infer<typeof professionalSchema>;