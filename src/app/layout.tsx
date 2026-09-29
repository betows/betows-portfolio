import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { localeMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${figtree.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
