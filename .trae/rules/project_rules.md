# Sanatan Vision Astrologers Guidelines

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling

- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

Key Conventions

- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client':
  - Favor server components and Next.js SSR.
  - Use only for Web API access in small components.
  - Avoid for data fetching or state management.

Follow Next.js docs for Data Fetching, Rendering, and Routing.

### Code Standards

- Files
  - Always use kebab-case
- Naming
  - Functions/Vars: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Types/Classes: PascalCase
- TypeScript
  - Prefer types over interfaces
  - Use type inference whenever possible
  - Avoid any, any[], unknown, or any other generic type
  - Use spaces between code blocks to improve readability

### Styling

- Styling is done using Tailwind CSS. We use the "cn" function from the "@kit/ui/utils" package to generate class names.
- Avoid fixes classes such as "bg-gray-500". Instead, use Shadcn classes such as "bg-background", "text-secondary-foreground", "text-muted-foreground", etc.

## Forms

- Use React Hook Form for form validation and submission.
- Use Zod for form validation.
- Use the "zodResolver" function to resolve the Zod schema to the form.
  Follow the example below to create all forms:

### Define the schema

Zod schemas should be defined in the "schema" folder and exported, so we can reuse them across a Server Action and the client-side form:
"tsx
// \_lib/schema/create-note.schema.ts
import { z } from 'zod';
export const CreateNoteSchema = z.object({
title: z.string().min(1),
content: z.string().min(1),
});
"
