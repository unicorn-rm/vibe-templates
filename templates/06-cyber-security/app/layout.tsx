import type { Metadata } from "next";
import { Inter, Tektur } from "next/font/google";
import "./globals.css";

const tektur = Tektur({ subsets: ["latin", "cyrillic"], variable: "--font-tektur" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Bastion — Offensive Security & Incident Response",
  description: "Dark cybersecurity consultancy template with a simulated attack-surface scanner. Next.js + Tailwind CSS.",
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2305080d'/%3E%3Cpath d='M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8z' fill='none' stroke='%232de2e6' stroke-width='2.5'/%3E%3C/svg%3E" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${tektur.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
