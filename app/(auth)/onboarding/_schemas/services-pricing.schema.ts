import { z } from 'zod';

const priceSchema = z.string()
  .min(1, 'Price is required')
  .regex(/^\d+$/, 'Price must be a valid number')
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 1, 'Minimum price should be ₹1')
  .refine((val) => val <= 1000, 'Maximum price should be ₹1,000')
  .transform((val) => val.toString());

const consultationLimitSchema = z.number()
  .min(1, 'Minimum 1 consultation per day required')
  .max(50, 'Maximum 50 consultations per day allowed');

const responseTimeSchema = z.string()
  .min(1, 'Please select expected response time')
  .refine((val) => ['immediate', '30min', '1hour', '2hours', '4hours', '24hours'].includes(val), 'Invalid response time');

export const servicesPricingSchema = z.object({
  chatPrice: priceSchema,

  callPrice: priceSchema,

  videoPrice: priceSchema,

  maxConsultationsPerDay: consultationLimitSchema,

  workingDays: z.array(z.string())
    .min(1, 'Select at least one working day')
    .max(7, 'You cannot select more than 7 working days')
    .refine((days) => {
      const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return days.every(day => validDays.includes(day.toLowerCase()));
    }, 'Invalid working days selected'),

  timeSlots: z.array(z.string())
    .min(1, 'Select at least one time slot')
    .max(12, 'You can select maximum 12 time slots')
    .refine((slots) => {
      const validSlots = [
        '6am-8am', '8am-10am', '10am-12pm', '12pm-2pm',
        '2pm-4pm', '4pm-6pm', '6pm-8pm', '8pm-10pm', '10pm-12am'
      ];
      return slots.every(slot => validSlots.includes(slot.toLowerCase()));
    }, 'Invalid time slots selected'),

  expectedResponseTime: responseTimeSchema,
});

export type ServicesPricingData = z.infer<typeof servicesPricingSchema>;