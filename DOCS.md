# Sanatan Vision - Pandit Ji Documentation

Comprehensive documentation for the Sanatan Vision Astrologer Dashboard application.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [Dashboard Features](#dashboard-features)
5. [API Modules](#api-modules)
6. [State Management](#state-management)
7. [Real-time Features](#real-time-features)
8. [Internationalization](#internationalization)
9. [Components](#components)
10. [Development Guide](#development-guide)

---

## Overview

Sanatan Vision - Pandit Ji is a professional dashboard for astrologers to:

- Manage their professional profile and credentials
- Conduct real-time consultations via chat, voice, and video
- Handle puja service bookings
- Track earnings and manage withdrawals
- View and respond to client reviews

### Technology Choices

| Purpose       | Technology            | Reason                                     |
| ------------- | --------------------- | ------------------------------------------ |
| Framework     | Next.js 15            | App Router, Server Components, Turbopack   |
| Styling       | Tailwind CSS v4       | Utility-first, excellent DX                |
| UI Primitives | Radix UI              | Accessible, unstyled components            |
| Server State  | TanStack Query        | Caching, invalidation, optimistic updates  |
| Client State  | Zustand               | Simple, performant, devtools support       |
| Forms         | React Hook Form + Zod | Type-safe validation, great performance    |
| Real-time     | Socket.IO             | Bi-directional, reliable WebSocket wrapper |
| Video         | Agora RTC             | Low-latency, high-quality video            |
| Auth          | NextAuth.js           | Flexible, secure, session management       |

---

## Architecture

### Route Groups

The app uses Next.js route groups for organization:

```
app/
├── (auth)/           # Public authentication pages
│   ├── sign-in/
│   ├── sign-up/
│   ├── verify/
│   ├── reset-password/
│   └── missing-verification/
│
├── (dashboard)/      # Protected astrologer routes
│   ├── (home)/       # Dashboard home
│   ├── onboarding/   # Multi-step onboarding
│   ├── consultations/
│   ├── puja-bookings/
│   ├── reviews/
│   ├── profile/
│   └── session/      # Active call/chat sessions
│
├── (legal)/          # Legal pages
│   ├── privacy-policy/
│   └── terms-and-conditions/
│
└── api/              # API routes
    └── auth/         # NextAuth handlers
```

### Middleware

The `middleware.ts` handles:

- Route protection (redirects unauthenticated users)
- Status-based routing (onboarding, in-review states)
- Locale detection

---

## Authentication

### Flow

1. **Sign Up** → Email/password registration
2. **Email Verification** → OTP-based verification
3. **Sign In** → Credentials provider with JWT
4. **Password Reset** → OTP-based password recovery

### Session Structure

```typescript
interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    token: string; // API access token
    status: "pending" | "in_review" | "approved" | "rejected";
  };
}
```

### Protected Routes

All `/dashboard/*` routes require authentication. Middleware redirects based on user status:

| Status            | Redirect         |
| ----------------- | ---------------- |
| Not authenticated | `/sign-in`       |
| `pending`         | `/onboarding`    |
| `in_review`       | `/in-review`     |
| `approved`        | Dashboard access |
| `rejected`        | Contact support  |

---

## Dashboard Features

### Onboarding Flow

Multi-step wizard with 7 steps:

1. **Personal Information** - Name, DOB, languages, profile photo
2. **Professional Background** - Expertise, experience, systems
3. **Services & Pricing** - Consultation rates, availability
4. **Specialization** - Remedies, content creation preferences
5. **Documentation** - ID proof, certifications
6. **Financial Information** - Bank details, payment preferences
7. **Review & Submit** - Terms/Privacy acceptance, final submission

### Consultations

- View upcoming and completed consultations
- Client information display
- Join active sessions (chat/call/video)
- Consultation history

### Puja Bookings

- Manage puja service bookings
- View booking details and customer info
- Join video sessions for pujas

### Reviews

- View all client reviews
- Star rating distribution
- Response capability

### Profile Management

Tabs for managing:

- Personal information
- Professional background
- Services & availability
- Banking & payment
- Account actions (password change, data download, account deletion)

### Wallet

- View current balance
- Track earnings
- Request withdrawals
- Transaction history

---

## API Modules

Located in `lib/api/`:

### auth.api.ts

Authentication and user management:

- `signIn`, `signUp`, `verifyEmail`
- `forgotPassword`, `resetPassword`
- `submitOnboarding`, `getOnboardingStatus`
- `getProfile`, `updateProfile`

### consultation.api.ts

Consultation management:

- `getConsultations`
- `getConsultationDetails`

### puja.api.ts

Puja service management:

- `getPujaBookings`
- `getPujaBookingById`
- `joinPujaSession`

### reviews.api.ts

Review management:

- `getReviews`

### payment.api.ts

Financial operations:

- `getWalletBalance`
- `getTransactions`
- `requestWithdrawal`

### analytics.api.ts

Dashboard analytics:

- `getStats`
- `getEarnings`

### Usage Pattern

```typescript
import { api } from "@/lib/api";

// Use with TanStack Query
const { data } = useQuery({
  queryKey: ["consultations"],
  queryFn: () => api.consultation.getConsultations(),
});
```

---

## State Management

### Server State (TanStack Query)

All API data is managed with TanStack Query:

```typescript
// Fetching
const { data, isLoading, error } = useQuery({
  queryKey: ["reviews"],
  queryFn: api.reviews.getReviews,
});

// Mutations
const { mutate } = useMutation({
  mutationFn: api.auth.updateProfile,
  onSuccess: () => queryClient.invalidateQueries(["profile"]),
});
```

### Client State (Zustand)

Local UI state and ephemeral data:

```typescript
// Example: Onboarding store
const useOnboardingStore = create((set) => ({
  currentStep: 0,
  formData: {},
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  updateStepData: (step, data) =>
    set((s) => ({
      formData: { ...s.formData, [step]: data },
    })),
}));
```

---

## Real-time Features

### Socket.IO Integration

The `SocketProvider` component manages WebSocket connections:

- Automatic connection on authentication
- Online/offline status management
- Connection request handling
- Reconnection logic

### Video Calls (Agora)

Features:

- Room-based video sessions
- Audio/video toggle controls
- Screen sharing support
- Call duration tracking

---

## Internationalization

### Setup

Using `next-intl` with locale files in `messages/`:

- `en.json` - English translations
- `hi.json` - Hindi translations

### Usage

```typescript
import { useTranslations } from "next-intl";

const MyComponent = () => {
  const t = useTranslations("dashboard");
  return <h1>{t("greeting", { name: "User" })}</h1>;
};
```

### Language Switcher

Available in the navbar for runtime language switching.

---

## Components

### UI Components (`components/ui/`)

Built on Radix UI primitives with shadcn/ui patterns:

- `button.tsx` - Button variants
- `card.tsx` - Card container
- `dialog.tsx` - Modal dialogs
- `form.tsx` - Form components with React Hook Form
- `input.tsx`, `select.tsx`, `checkbox.tsx` - Form inputs
- `tabs.tsx` - Tab navigation
- `stepper.tsx` - Multi-step stepper
- And more...

### Shared Components

- `navbar.tsx` - Top navigation bar
- `user-menu.tsx` - User dropdown menu
- `socket-provider.tsx` - WebSocket context
- `language-switcher.tsx` - Locale switcher

---

## Development Guide

### File Naming

```bash
# ✅ Correct
components/ui/button.tsx
hooks/use-media-query.ts
lib/api/consultation.api.ts

# ❌ Incorrect
components/ui/Button.tsx
hooks/useMediaQuery.ts
```

### Component Pattern

```typescript
// Always use arrow functions
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
}

export const Button = ({ variant = "default", ...props }: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant }))} {...props} />;
};
```

### API Client Pattern

```typescript
// lib/api/feature.api.ts
export const featureApi = {
  getAll: () => axiosClient.get("/feature"),
  getById: (id: string) => axiosClient.get(`/feature/${id}`),
  create: (data: CreateDto) => axiosClient.post("/feature", data),
};
```

### Adding New Features

1. Create API module in `lib/api/`
2. Export from `lib/api/index.ts`
3. Create route in `app/`
4. Add translations to `messages/*.json`
5. Create components as needed

### Testing Locally

```bash
# Start development server
pnpm dev

# Check TypeScript
pnpm exec tsc --noEmit

# Run linting
pnpm lint
```

---

## Environment Variables

### Required

```env
NEXTAUTH_SECRET=       # Random 32+ character string
NEXTAUTH_URL=          # http://localhost:3000 for dev
```

### Optional

```env
# Add backend API URL, Agora credentials, etc.
```

---

## Deployment

### Build

```bash
pnpm build
```

### Environment

Ensure all environment variables are set in production.

### Platforms

- **Vercel** (recommended for Next.js)
- Any Node.js hosting platform

---

## Troubleshooting

### Common Issues

| Issue               | Solution                                    |
| ------------------- | ------------------------------------------- |
| Module not found    | Run `pnpm install`                          |
| Type errors         | Check imports, run `pnpm exec tsc --noEmit` |
| Auth redirect loops | Verify `NEXTAUTH_URL` matches domain        |
| Socket disconnects  | Check network, verify auth token            |

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
