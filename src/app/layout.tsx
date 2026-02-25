import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZeroOne CodeClub | Elite Student Builder Collective",
  description:
    "A selective student collective building production-grade technology. No demos. No busy-work. Real users, real problems, real stakes.",
  openGraph: {
    title: "ZeroOne CodeClub",
    description: "Elite student builders shipping real technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroOne CodeClub",
    description: "Elite student builders shipping real technology.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
