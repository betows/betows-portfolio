import { HomePage } from "@/components/HomePage";
import { t } from "@/lib/dictionary";
import { faqJsonLd, personJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("en");

export default function EnglishHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd("en")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd("en")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("en")) }}
      />
      <HomePage locale="en" copy={t("en")} />
    </>
  );
}
