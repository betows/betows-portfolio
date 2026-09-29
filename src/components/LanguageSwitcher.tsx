import Link from "next/link";
import type { Locale } from "@/lib/site";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-cream p-1 text-sm font-medium"
      role="group"
      aria-label="Language"
    >
      <Link
        href="/"
        hrefLang="pt-BR"
        className={`rounded-full px-2.5 py-1 transition ${
          !isEn ? "bg-ink text-cream" : "text-muted hover:text-ink"
        }`}
        aria-current={!isEn ? "page" : undefined}
      >
        PT
      </Link>
      <Link
        href="/en"
        hrefLang="en"
        className={`rounded-full px-2.5 py-1 transition ${
          isEn ? "bg-ink text-cream" : "text-muted hover:text-ink"
        }`}
        aria-current={isEn ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
