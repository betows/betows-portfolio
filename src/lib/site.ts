export const site = {
  name: "Roberto Amaral",
  aka: "betows",
  email: "robertoamaral56@gmail.com",
  github: "https://github.com/betows",
  location: "Brazil",
  region: "Vale do Itajaí, SC",
} as const;

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (raw) return raw;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function localePath(locale: Locale, hash = "") {
  const base = locale === "en" ? "/en" : "/";
  return hash ? `${base}${hash}` : base;
}

export type Locale = "pt" | "en";
