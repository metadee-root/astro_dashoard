# Sanatan Vision - Pandit Ji (Astrologer Dashboard)

A comprehensive web application for astrologers to manage consultations, puja services, reviews, and connect with seekers in real-time. Built with Next.js 15, featuring real-time communication, video calls, and a rich dashboard experience.

## � Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Add your secrets to .env.local

# Start development server
pnpm dev

# Open http://localhost:3000
```

## 📋 Features

| Feature                  | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| **Authentication**       | NextAuth.js with JWT, email verification, password reset  |
| **Onboarding**           | Multi-step wizard with Terms & Privacy Policy acceptance  |
| **Consultations**        | Real-time chat (Socket.IO), voice/video calls (Agora RTC) |
| **Puja Services**        | Manage puja bookings and ceremonies                       |
| **Reviews**              | View and manage client reviews and ratings                |
| **Wallet**               | Track earnings and handle withdrawals                     |
| **Profile**              | Complete profile management with document uploads         |
| **Internationalization** | English and Hindi support via next-intl                   |

## � Tech Stack

| Category         | Technology                                |
| ---------------- | ----------------------------------------- |
| Framework        | Next.js 15.3 (App Router, Turbopack)      |
| Styling          | Tailwind CSS v4                           |
| UI Components    | Radix UI Primitives, shadcn/ui            |
| State Management | Zustand (client), TanStack Query (server) |
| Forms            | React Hook Form + Zod validation          |
| Real-time        | Socket.IO                                 |
| Video Calls      | Agora RTC                                 |
| Authentication   | NextAuth.js                               |
| HTTP Client      | Axios                                     |
| i18n             | next-intl                                 |

## 📁 Project Structure

```
├── app/
│   ├── (auth)/              # Auth routes (sign-in, sign-up, verify, reset)
│   ├── (dashboard)/         # Protected astrologer dashboard
│   │   ├── onboarding/      # Multi-step onboarding wizard
│   │   ├── consultations/   # Consultation management
│   │   ├── puja-bookings/   # Puja service bookings
│   │   ├── reviews/         # Client reviews
│   │   ├── profile/         # Profile settings
│   │   └── session/         # Active consultation sessions
│   ├── (legal)/             # Terms & Privacy Policy pages
│   └── api/                 # API routes (NextAuth)
├── components/
│   ├── ui/                  # Base UI components (shadcn/ui)
│   └── *.tsx                # Shared components
├── lib/
│   ├── api/                 # API client modules
│   ├── auth.ts              # NextAuth configuration
│   └── utils.ts             # Utility functions
├── hooks/                   # Custom React hooks
├── messages/                # i18n translation files (en.json, hi.json)
└── types/                   # TypeScript type definitions
```

## � Development

### Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Code Conventions

- **Arrow functions** only (no `function` keyword)
- **Interfaces** over types
- **kebab-case** for file names (`user-profile.tsx`)
- **PascalCase** for components (`UserProfile`)
- Always use `pnpm`

### Environment Variables

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 📖 Documentation

- [GEMINI.md](./GEMINI.md) - Detailed development guidelines
- [DOCS.md](./DOCS.md) - Comprehensive documentation

## 📄 License

MIT License - see [LICENSE](LICENSE)
