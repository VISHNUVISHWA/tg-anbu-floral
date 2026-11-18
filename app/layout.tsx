import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "T.G ANBU — Floral & Event Design | Wedding Decoration, Garlands & Fresh Flowers",
  description:
    "T.G ANBU, Cheyyar — premium wedding decoration, event & stage decoration, handcrafted flower garlands and fresh flowers for every celebration.",
  keywords: [
    "flower decoration Cheyyar",
    "wedding stage decoration",
    "flower garlands",
    "varmala",
    "event decoration Tamil Nadu",
    "fresh flowers",
  ],
  openGraph: {
    title: "T.G ANBU — Where Flowers Turn Moments Into Memories",
    description: "Wedding decoration, event styling, garlands and fresh flowers by T.G ANBU.",
    images: [asset("/images/stage-arch-wide.jpg")],
  },
};

export const viewport: Viewport = {
  themeColor: "#173B2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
