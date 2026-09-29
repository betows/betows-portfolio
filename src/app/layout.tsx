import type { Metadata } from "next";
import { Pixelify_Sans, VT323 } from "next/font/google";
import { headers } from "next/headers";
import { localeMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const lcd = VT323({
  variable: "--font-lcd",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  ...localeMetadata("pt"),
  metadataBase: new URL(getSiteUrl()),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-locale") === "en" ? "en" : "pt";

  return (
    <html
      lang={locale === "en" ? "en" : "pt-BR"}
      className={`${pixel.variable} ${lcd.variable} h-full`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
