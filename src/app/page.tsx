import { HomePage } from "@/components/HomePage";
import { t } from "@/lib/dictionary";
import { faqJsonLd, personJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("pt");

export default function PortugueseHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd("pt")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd("pt")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("pt")) }}
      />
      <HomePage locale="pt" copy={t("pt")} />
    </>
  );
}
