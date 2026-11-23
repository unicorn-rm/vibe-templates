import type { Metadata } from "next";
import { Fira_Code, PT_Serif } from "next/font/google";
import "./globals.css";

const serif = PT_Serif({ subsets: ["latin", "cyrillic"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-paper" });
const mono = Fira_Code({ subsets: ["latin", "cyrillic"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Tern — a small model that says when it doesn't know",
  description: "AI startup template typeset as an arXiv research paper: interactive token-confidence figure, results table, MathML equation, BibTeX. Next.js + Tailwind CSS.",
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23fdfdfb'/%3E%3Ctext x='16' y='22' font-family='Georgia' font-size='16' text-anchor='middle'%3E%CF%84%3C/text%3E%3Cpath d='M6 26h20' stroke='%23b3261e' stroke-width='2'/%3E%3C/svg%3E" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
