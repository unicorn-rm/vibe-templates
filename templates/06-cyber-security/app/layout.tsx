import type { Metadata } from "next";
import { Cousine, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({ subsets: ["latin", "cyrillic"], variable: "--font-serif-doc", style: ["normal", "italic"] });
const mono = Cousine({ subsets: ["latin", "cyrillic"], weight: ["400", "700"], variable: "--font-mono-doc" });

export const metadata: Metadata = {
  title: "Bastion — Declassified Security File",
  description: "Security consultancy template styled as a declassified pentest report: redaction bars, rubber stamps, a printed request form. Next.js + Tailwind CSS.",
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23fbfaf6'/%3E%3Crect x='5' y='9' width='22' height='5' fill='%23141414'/%3E%3Crect x='5' y='18' width='14' height='5' fill='%23c8102e'/%3E%3C/svg%3E" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
