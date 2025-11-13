import { z } from 'zod';

// Bank details validation regex patterns
const accountNumberSchema = z.string()
  .min(9, 'Account number must be at least 9 digits')
  .max(18, 'Account number must not exceed 18 digits')
  .regex(/^\d+$/, 'Account number must contain only digits');

const ifscCodeSchema = z.string()
  .min(11, 'IFSC code must be 11 characters')
  .max(11, 'IFSC code must be 11 characters')
  .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format');

const bankNameSchema = z.string()
  .min(3, 'Bank name must be at least 3 characters')
  .max(100, 'Bank name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s&.-]+$/, 'Bank name should only contain letters, spaces, &, -, and .');

const upiIdSchema = z.string()
  .optional()
  .transform((val) => val?.trim() || '')
  .refine((val) => !val || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(val), 'Invalid UPI ID format')
  .refine((val) => !val || val.length <= 50, 'UPI ID must not exceed 50 characters')
  .optional();

const panNumberSchema = z.string()
  .optional()
  .transform((val) => val?.trim().toUpperCase() || '')
  .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), 'Invalid PAN card format')
  .optional();

export const financialSchema = z.object({
  // Bank account details
  bankAccountNumber: accountNumberSchema,

  confirmBankAccountNumber: z.string()
    .min(9, 'Please confirm your account number')
    .refine((val) => /^\d+$/.test(val), 'Account number must contain only digits'),

  bankName: bankNameSchema,

  ifscCode: ifscCodeSchema,

  accountHolderName: z.string()
    .min(3, 'Account holder name must be at least 3 characters')
    .max(100, 'Account holder name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Account holder name should only contain letters and spaces'),

  branchName: z.string()
    .min(3, 'Branch name must be at least 3 characters')
    .max(100, 'Branch name must not exceed 100 characters'),

  accountType: z.string()
    .min(1, 'Please select account type')
    .refine((val) => ['savings', 'current', 'fixed-deposit'].includes(val.toLowerCase()), 'Invalid account type'),

  // Additional payment methods
  upiId: upiIdSchema,

  paypalEmail: z.string()
    .optional()
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Invalid PayPal email format')
    .optional(),

  // Tax and identification
  panNumber: panNumberSchema,

  gstNumber: z.string()
    .optional()
    .transform((val) => val?.trim().toUpperCase() || '')
    .refine((val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val), 'Invalid GST number format')
    .optional(),

  // Payment preferences
  preferredPaymentMethod: z.array(z.string())
    .min(1, 'Select at least one preferred payment method')
    .max(3, 'You can select maximum 3 payment methods')
    .refine((methods) => {
      const validMethods = ['bank-transfer', 'upi', 'paypal', 'cash', 'cheque'];
      return methods.every(method => validMethods.includes(method.toLowerCase()));
    }, 'Invalid payment methods selected'),

  payoutFrequency: z.string()
    .min(1, 'Please select payout frequency')
    .refine((val) => ['daily', 'weekly', 'biweekly', 'monthly'].includes(val.toLowerCase()), 'Invalid payout frequency'),

  // Consent and verification
  consentToTerms: z.boolean()
    .refine((val) => val === true, 'You must agree to the payment terms and conditions'),

  consentToDataSharing: z.boolean()
    .refine((val) => val === true, 'You must consent to share necessary financial information for payment processing'),
}).refine((data) => data.bankAccountNumber === data.confirmBankAccountNumber, {
  message: "Account numbers don't match",
  path: ['confirmBankAccountNumber'],
});

export type FinancialData = z.infer<typeof financialSchema>;