import type { Metadata } from "next";
import { t } from "./dictionary";
import { getSiteUrl, type Locale } from "./site";

export function localeMetadata(locale: Locale): Metadata {
  const url = getSiteUrl();
  const copy = t(locale);
  const canonical = locale === "en" ? `${url}/en` : url;
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    keywords: copy.meta.keywords.split(", ").concat(
      locale === "pt"
        ? ["desenvolvedor de landing page", "desenvolvimento de sistemas"]
        : ["landing page developer", "full stack developer Brazil"],
    ),
    authors: [{ name: "Roberto Amaral", url: "https://github.com/betows" }],
    creator: "Roberto Amaral",
    metadataBase: new URL(url),
    alternates: {
      canonical,
      languages: {
        "pt-BR": url,
        en: `${url}/en`,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "en" ? ["pt_BR"] : ["en_US"],
      url: canonical,
      siteName: "Roberto Amaral",
      title: copy.meta.ogTitle,
      description: copy.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.ogTitle,
      description: copy.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
