import { Dex } from "@/components/Dex";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/site";

export function HomePage({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  return <Dex locale={locale} copy={copy} />;
}
