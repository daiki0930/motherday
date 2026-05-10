import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Klee_One } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const klee = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "お母さん、ありがとう",
  description: "母の日のチケット集",
};

export const viewport: Viewport = {
  themeColor: "#ff8aa1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${klee.variable}`}>
      <body>{children}</body>
    </html>
  );
}
