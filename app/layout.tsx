import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono, Montserrat } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Provider } from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sanatan Vision - Pandit Ji",
    template: "%s | Sanatan Vision - Pandit Ji",
  },
  description:
    "Sanatan Vision - Your trusted Hindu spiritual platform for connecting with divine wisdom, astrology, and spiritual guidance. Explore ancient Vedic knowledge and spiritual practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <NuqsAdapter>
          <Provider>
            <main>{children}</main>
          </Provider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
