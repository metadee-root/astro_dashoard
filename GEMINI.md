# GEMINI.md

This file provides guidance to Agent when working with code in this repository.

## Development Commands

### Package Management

- Use `pnpm` for all package management operations (required by project configuration)
- `pnpm install` - Install dependencies
- `pnpm add <package>` - Add new dependency

### Development

- `pnpm dev` - Start development server with Turbopack (runs on localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Environment Setup

Create `.env.local` in the root directory with:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand for client state
- **Data Fetching**: TanStack Query for server state
- **Authentication**: NextAuth.js with credentials provider
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom implementations
- **Real-time**: Socket.IO client for live features
- **Video**: Agora RTC for video calling
- **HTTP Client**: Axios with custom configuration

### Project Structure

#### Core Directories

- `app/` - Next.js App Router pages and layouts
  - `(auth)/` - Authentication routes (sign-in, sign-up, reset-password)
  - `(dashboard)/` - Protected dashboard routes
  - `api/` - API routes including NextAuth configuration
- `components/` - Reusable React components
  - `ui/` - Base UI components built with Radix UI
  - `onboarding/` - Multi-step onboarding flow components
- `lib/` - Utilities and configurations
  - `api/` - API client modules organized by feature
  - `auth.ts` - NextAuth configuration
  - `utils.ts` - General utility functions
- `hooks/` - Custom React hooks

#### API Organization

API clients are modularized in `lib/api/`:

- `auth.api.ts` - Authentication endpoints
- `consultation.api.ts` - Consultation management
- `puja.api.ts` - Puja services and bookings
- `reviews.api.ts` - Review system
- `payment.api.ts` - Payment processing

All APIs are exported from `lib/api/index.ts` as a single `api` object.

### Authentication Flow

- Uses NextAuth.js with credentials provider
- JWT strategy with 15-day session duration
- Custom callbacks to attach user token and ID to session
- Redirects configured for sign-in and error pages

### State Management Architecture

- **TanStack Query**: Server state management with automatic caching and invalidation
- **Zustand**: Client-side state for UI state and ephemeral data
- **NextAuth Session**: Authentication state

### Real-time Features

- Socket.IO integration for live chat and notifications
- Custom `SocketProvider` component for socket connection management
- Agora RTC for video consultations with room-based sessions

### Form Handling

- React Hook Form with Zod schemas for validation
- Custom form components in `components/ui/form.tsx`
- Reusable form patterns with consistent error handling

### Styling System

- Tailwind CSS v4 with PostCSS
- Custom CSS variables for fonts (Montserrat, Geist Mono, Cinzel)
- `cn()` utility function for conditional class merging
- Component variants using `class-variance-authority`

### File Upload Handling

Custom `useFileUpload` hook with comprehensive features:

- Drag and drop support
- File validation (size, type)
- Preview generation for images
- Progress tracking
- Multiple file support

## Key Patterns and Conventions

### Component Organization

- UI components are atomic and composable
- Components follow the pattern: export component + any sub-components
- Consistent prop interfaces and TypeScript types

### API Client Pattern

Each API module follows this structure:

```typescript
export const featureApi = {
  action: (params) => axiosClient.post("/endpoint", params),
  // other actions...
};
```

### Error Handling

- Axios interceptors for centralized error handling
- React Error Boundary for client-side errors
- Toast notifications using Sonner

### Custom Hooks

- Media query hook for responsive behavior
- File upload hook with comprehensive features
- Query hooks are generated using TanStack Query patterns

## Project-Specific Rules and Conventions

### Code Style Requirements

- **Always use arrow functions** - Required by global configuration
- **Prefer interfaces over types** - Required by global configuration
- TypeScript strict mode enabled

### Import/Export Patterns

- Use named exports for utilities and types
- Default exports for React components
- Import APIs through the central `api` object: `import { api } from '@/lib/api'`

### State Management Rules

- **Server State**: Use TanStack Query for all API calls
- **Client State**: Use Zustand for UI state
- **Form State**: Use React Hook Form with Zod validation
- **Authentication**: Use NextAuth session for authenticated routes

### Component Architecture

- Follow the established component structure in `components/ui/`
- Use Radix UI primitives as base components
- Implement proper TypeScript types for all props
- Use compound component patterns for complex UI

### Authentication Integration

- Always use NextAuth session for authenticated routes
- Include session token in API requests: `Authorization: Bearer ${token}`
- Handle authentication errors with proper redirects

## File and Component Naming Conventions

### File Naming

- **Always use kebab-case** for all file names
- **Lowercase only** - no uppercase letters in filenames
- **Descriptive and concise** names
- **Consistent suffixes**: `.api.ts` for API files, `use-` prefix for hooks

```bash
# ✅ Correct examples
components/ui/button.tsx           # Exports <Button />
hooks/use-media-query.ts           # Exports useMediaQuery
lib/api/consultation.api.ts        # Exports consultationApi
app/(dashboard)/consultations/page.tsx  # Route page

# ❌ Avoid
components/ui/Button.tsx
hooks/useMediaQuery.ts
lib/api/ConsultationApi.ts
```

### Component Naming

- **PascalCase** for component names
- **Descriptive and specific** names
- **Avoid abbreviations** unless widely understood

```typescript
// ✅ Correct component names
export const UserProfile = () => { ... };
export const ConsultationCard = () => { ... };
export const PujaBookingForm = () => { ... };

// ❌ Avoid
export const userProfile = () => { ... };
export const ConsultCard = () => { ... };
```

### Directory Structure

- **kebab-case** for directory names
- **`_components`** for route-specific components
- **Parentheses for route groups**: `(auth)`, `(dashboard)`

```bash
# ✅ Correct structure
app/
  (auth)/
    sign-in/
      page.tsx
      _components/
        sign-in-form.tsx
  (dashboard)/
    consultations/
      _components/
        consultation-card.tsx

components/
  ui/                   # Base UI components
  onboarding/           # Feature-specific components
```

### Props and Interface Naming

- **PascalCase with `Props` suffix** for component props
- **No "I" prefix** for interfaces
- **Descriptive names** for types

```typescript
// ✅ Correct
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
}

interface UserProfile {
  id: string;
  name: string;
}

// ❌ Avoid
interface IButtonProps { ... }  // No "I" prefix
interface buttonProps { ... }   // Wrong case
```

### API File Organization

- **Feature-name.api.ts** pattern for API files
- **Export as camelCase** from each API module
- **Central export** from `lib/api/index.ts`

```typescript
// lib/api/consultation.api.ts
export const consultationApi = {
  getAll: () => axiosClient.get("/consultations"),
  create: (data) => axiosClient.post("/consultations", data),
};

// lib/api/index.ts
export const api = {
  consultation: consultationApi,
  // ... other APIs
};
```

## Development Workflow Rules

### Error Handling

- Use React Error Boundary for client-side errors
- Implement proper error handling in API calls
- Use Sonner for user-facing error notifications

### Styling Guidelines

- Use Tailwind CSS classes only
- Leverage the `cn()` utility for conditional classes
- Follow established design system patterns

### File Upload Patterns

- Use the custom `useFileUpload` hook for file handling
- Implement proper validation and error states
- Handle file previews appropriately

### Performance Considerations

- Use dynamic imports for large components
- Implement proper loading states with TanStack Query
- Optimize images and assets

### Testing

No test framework is currently configured. When adding tests:

- Consider Jest + React Testing Library
- Follow component testing patterns
- Test custom hooks and API clients

### Build Configuration

- Uses Turbopack for development builds
- Standard Next.js production builds
- PostCSS configuration for Tailwind CSS v4
