import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Sarlavhalar uchun — zamonaviy SaaS display font (Linear/Notion ruhi).
const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Huquqim.AI — Advokati yo'q fuqarolar uchun huquqiy yordamchi",
  description:
    "Sun'iy intellektga asoslangan huquqiy yordamchi. Holatingizni tushuntiradi, hujjat tayyorlaydi va sudga tayyorlaydi — oddiy tilda, o'zbek tilida.",
  keywords: ["huquq", "advokat", "ariza", "da'vo", "iste'molchi", "AI", "O'zbekiston"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
