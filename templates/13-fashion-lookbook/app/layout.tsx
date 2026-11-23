import type { Metadata } from "next";
import { Prata, Tenor_Sans } from "next/font/google";
import "./globals.css";

const prata = Prata({ subsets: ["latin", "cyrillic"], weight: "400", variable: "--font-prata" });
const tenor = Tenor_Sans({ subsets: ["latin", "cyrillic"], weight: "400", variable: "--font-tenor" });

export const metadata: Metadata = {
  title: "OSTEN — Off-Season SS27 Lookbook",
  description: "Fashion lookbook template presented as 35mm contact sheets on a light table: grease-pencil selects, frame numbers and a loupe. Next.js.",
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%231a1614'/%3E%3Crect x='6' y='9' width='20' height='14' fill='%23f2f1ec'/%3E%3Cellipse cx='16' cy='16' rx='12' ry='9' fill='none' stroke='%23e0332b' stroke-width='2'/%3E%3C/svg%3E" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${prata.variable} ${tenor.variable}`}>
      <body>{children}</body>
    </html>
  );
}
