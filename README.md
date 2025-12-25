# Sanatan Vision - Pandit Ji

A modern web application for connecting users with professional astrologers. Built with Next.js and featuring real-time communication, user reviews, and an intuitive dashboard.

## 📋 Quick Start Guide

### For New Developers

1. **Setup your environment**

   ```bash
   # Install dependencies
   pnpm install

   # Copy environment template
   cp .env.example .env.local

   # Add your secrets to .env.local
   ```

2. **Run the application**

   ```bash
   # Start development server
   pnpm dev

   # Open http://localhost:3000
   ```

3. **Create an account**
   - Sign up as a new user
   - Complete the astrologer onboarding flow
   - Set up your profile and services

### Key Things to Know

- **Package Manager**: Always use `pnpm` (not npm)
- **Code Style**: Arrow functions only, interfaces over types
- **File Names**: kebab-case (e.g., `user-profile.tsx`)
- **Environment**: All secrets in `.env.local`

### Common Tasks

```bash
# Add new dependency
pnpm add package-name

# Run linting
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Astrologer Profiles**: Detailed profiles with ratings and specialties
- **Real-time Chat**: Built with Socket.IO for instant messaging
- **Video Consultations**: Powered by Agora for live video sessions
- **Review System**: Users can leave and read reviews for astrologers
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in theme support with next-themes

## 🚀 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI Primitives
- **Data Fetching**: TanStack Query
- **Real-time**: Socket.IO
- **Video Calls**: Agora RTC
- **Authentication**: NextAuth.js
- **Notifications**: Sonner

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sanatan-vision-astrologers.git
   cd sanatan-vision-astrologers
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables:

   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. Run the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
/
├── app/                    # App router directory
│   ├── (dashboard)/       # Dashboard routes (protected)
│   ├── api/               # API routes
│   └── ...
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
├── public/                # Static files
└── styles/                # Global styles
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
