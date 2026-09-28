import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";
import { Mark } from "./Mark";

export function Footer({ copy }: { copy: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Mark className="h-7 w-7" />
            <p className="font-semibold">{site.name}</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{copy.footer.blurb}</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          <a href="#work" className="hover:text-ink-soft">
            {copy.footer.work}
          </a>
          <a href="#services" className="hover:text-ink-soft">
            {copy.footer.services}
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-ink-soft">
            {copy.footer.github}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-ink-soft">
            {copy.footer.email}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {year} {copy.footer.rights}
        </p>
      </div>
    </footer>
  );
}
