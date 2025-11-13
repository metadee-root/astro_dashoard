import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name should only contain letters and spaces"),

  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Please enter a valid date",
    })
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();

      if (age < 18 || age > 100) return false;
      if (age === 18 && monthDiff < 0) return false;
      if (age === 100 && monthDiff > 0) return false;

      return date < today;
    }, "You must be between 18 and 100 years old"),

  timeOfBirth: z
    .date({
      required_error: "Time of birth is required",
      invalid_type_error: "Please enter a valid time",
    })
    .refine((time) => {
      // Validate that it's a valid date/time object
      return !isNaN(time.getTime());
    }, "Please enter a valid time"),

  placeOfBirth: z
    .string()
    .min(2, "Place of birth must be at least 2 characters long")
    .max(200, "Place of birth must not exceed 200 characters"),

  primaryLanguage: z.string().min(1, "Please select your primary language"),

  languages: z.array(z.string()).optional(),

  about: z
    .string()
    .min(50, "Please provide at least 50 characters about yourself")
    .max(1000, "About section must not exceed 1000 characters")
    .refine((val) => val.trim().length > 0, "About section cannot be empty"),

  profileImage: z
    .instanceof(File, {
      message: "Please upload a valid image file",
    })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Profile image size must be less than 5MB"
    )
    .refine((file) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];
      return allowedTypes.includes(file.type);
    }, "Profile image must be JPEG, PNG, or WebP format")
    .optional(),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
