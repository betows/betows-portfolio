import type { Locale } from "./site";
import { getSiteUrl, site } from "./site";
import { t } from "./dictionary";

export function personJsonLd(locale: Locale) {
  const url = getSiteUrl();
  const page = locale === "en" ? `${url}/en` : url;
  const copy = t(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.aka,
    url: page,
    email: site.email,
    jobTitle: locale === "en" ? "Full-stack developer" : "Desenvolvedor full-stack",
    description: copy.meta.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SC",
    },
    sameAs: [site.github],
    knowsAbout: [
      "Landing pages",
      "SaaS",
      "Next.js",
      "TypeScript",
      "React Native",
      "SEO",
    ],
  };
}

export function serviceJsonLd(locale: Locale) {
  const url = getSiteUrl();
  const page = locale === "en" ? `${url}/en` : url;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name:
      locale === "en"
        ? "Roberto Amaral — landing pages and systems"
        : "Roberto Amaral — landing pages e sistemas",
    url: page,
    image: `${url}/opengraph-image`,
    areaServed: ["BR", "Worldwide"],
    availableLanguage: ["pt-BR", "en"],
    founder: {
      "@type": "Person",
      name: site.name,
      alternateName: site.aka,
    },
    email: site.email,
    sameAs: [site.github],
    serviceType:
      locale === "en"
        ? ["Landing page development", "Systems / SaaS development", "Product engineering"]
        : ["Desenvolvimento de landing page", "Desenvolvimento de sistemas", "Engenharia de produto"],
  };
}

export function faqJsonLd(locale: Locale) {
  const items = t(locale).faq.items;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
