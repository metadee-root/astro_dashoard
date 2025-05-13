import type { Metadata } from "next";
import { Cinzel, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/components/provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
    default: "Sanatan Vision",
    template: "%s | Sanatan Vision",
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
    >
      <body>
        <Provider>
          <main>
            {children}
            <Toaster
              richColors
              theme="light"
              className={montserrat.className}
            />
          </main>
        </Provider>
      </body>
    </html>
  );
}
