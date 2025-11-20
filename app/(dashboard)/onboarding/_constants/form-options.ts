export const LANGUAGE_OPTIONS = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'english', label: 'English' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'telugu', label: 'Telugu' },
  { value: 'marathi', label: 'Marathi' },
  { value: 'bengali', label: 'Bengali' },
  { value: 'gujarati', label: 'Gujarati' },
  { value: 'kannada', label: 'Kannada' },
  { value: 'malayalam', label: 'Malayalam' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'urdu', label: 'Urdu' },
  { value: 'odia', label: 'Odia' },
  { value: 'sanskrit', label: 'Sanskrit' },
] as const;

export const EXPERTISE_OPTIONS = [
  { value: 'vedic-astrology', label: 'Vedic Astrology' },
  { value: 'western-astrology', label: 'Western Astrology' },
  { value: 'numerology', label: 'Numerology' },
  { value: 'palmistry', label: 'Palmistry' },
  { value: 'vastu', label: 'Vastu Shastra' },
  { value: 'tarot', label: 'Tarot Reading' },
  { value: 'kp-astrology', label: 'KP Astrology' },
  { value: 'nadi-astrology', label: 'Nadi Astrology' },
  { value: 'lalkitab', label: 'Lal Kitab' },
  { value: 'prashna', label: 'Prashna (Horary)' },
  { value: 'jaimini', label: 'Jaimini Astrology' },
  { value: 'muhurta', label: 'Muhurta (Electional Astrology)' },
] as const;

export const ASTROLOGY_SYSTEMS = [
  { value: 'parashari', label: 'Parashari System' },
  { value: 'jaimini', label: 'Jaimini System' },
  { value: 'kp-system', label: 'KP System' },
  { value: 'western-tropical', label: 'Western Tropical' },
  { value: 'western-sidereal', label: 'Western Sidereal' },
  { value: 'nadi', label: 'Nadi System' },
  { value: 'lalkitab', label: 'Lal Kitab' },
  { value: 'tajika', label: 'Tajika System' },
  { value: 'krishnamurti', label: 'Krishnamurti Paddhati' },
] as const;

export const OTHER_PRACTICES = [
  { value: 'yoga', label: 'Yoga & Meditation' },
  { value: 'ayurveda', label: 'Ayurveda' },
  { value: 'vastu-consultation', label: 'Vastu Consultation' },
  { value: 'gemstone-therapy', label: 'Gemstone Therapy' },
  { value: 'mantra-therapy', label: 'Mantra Therapy' },
  { value: 'reiki', label: 'Reiki Healing' },
  { value: 'feng-shui', label: 'Feng Shui' },
  { value: 'numerology-consultation', label: 'Numerology Consultation' },
  { value: 'palm-reading', label: 'Palm Reading' },
] as const;

export const WORKING_DAYS = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
] as const;

export const TIME_SLOTS = [
  { value: '6am-8am', label: '6:00 AM - 8:00 AM' },
  { value: '8am-10am', label: '8:00 AM - 10:00 AM' },
  { value: '10am-12pm', label: '10:00 AM - 12:00 PM' },
  { value: '12pm-2pm', label: '12:00 PM - 2:00 PM' },
  { value: '2pm-4pm', label: '2:00 PM - 4:00 PM' },
  { value: '4pm-6pm', label: '4:00 PM - 6:00 PM' },
  { value: '6pm-8pm', label: '6:00 PM - 8:00 PM' },
  { value: '8pm-10pm', label: '8:00 PM - 10:00 PM' },
  { value: '10pm-12am', label: '10:00 PM - 12:00 AM' },
] as const;

export const RESPONSE_TIME_OPTIONS = [
  { value: 'immediate', label: 'Immediate' },
  { value: '30min', label: 'Within 30 minutes' },
  { value: '1hour', label: 'Within 1 hour' },
  { value: '2hours', label: 'Within 2 hours' },
  { value: '4hours', label: 'Within 4 hours' },
  { value: '24hours', label: 'Within 24 hours' },
] as const;

export const CONSULTATION_LIMITS = [
  { value: 3, label: '1-3 consultations per day' },
  { value: 6, label: '4-6 consultations per day' },
  { value: 10, label: '7-10 consultations per day' },
  { value: 15, label: '11-15 consultations per day' },
  { value: 20, label: '16-20 consultations per day' },
  { value: 25, label: '20-25 consultations per day' },
  { value: 30, label: '25-30 consultations per day' },
  { value: 50, label: '40-50 consultations per day' },
] as const;

export const REMEDIES_TYPES = [
  { value: 'mantra', label: 'Mantra Therapy' },
  { value: 'yantra', label: 'Yantra' },
  { value: 'gemstone', label: 'Gemstone Therapy' },
  { value: 'puja', label: 'Puja/Homa' },
  { value: 'fasting', label: 'Fasting/Vrats' },
  { value: 'charity', label: 'Charity/Donations' },
  { value: 'rituals', label: 'Rituals' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'color-therapy', label: 'Color Therapy' },
] as const;

export const PREDICTION_AREAS = [
  { value: 'health', label: 'Health' },
  { value: 'marriage', label: 'Marriage/Relationships' },
  { value: 'career', label: 'Career/Business' },
  { value: 'finance', label: 'Finance/Wealth' },
  { value: 'education', label: 'Education' },
  { value: 'property', label: 'Property/Real Estate' },
  { value: 'children', label: 'Children/Progeny' },
  { value: 'travel', label: 'Foreign Travel' },
  { value: 'legal', label: 'Legal Matters' },
  { value: 'timing-events', label: 'Timing of Events' },
] as const;

export const PAYOUT_FREQUENCY = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'bank-transfer', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'cash', label: 'Cash' },
  { value: 'cheque', label: 'Cheque' },
] as const;

export const ACCOUNT_TYPES = [
  { value: 'savings', label: 'Savings Account' },
  { value: 'current', label: 'Current Account' },
  { value: 'fixed-deposit', label: 'Fixed Deposit' },
] as const;

export const YES_NO_MAYBE_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe' },
] as const;

export const PUJA_CAPABILITY = [
  { value: 'yes', label: 'Yes, I can perform puja' },
  { value: 'no', label: 'No, I do not perform puja' },
  { value: 'trained', label: 'Trained but limited experience' },
  { value: 'certified', label: 'Certified puja performer' },
] as const;