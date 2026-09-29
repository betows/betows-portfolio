"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Mark } from "./Mark";

const links = [
  { href: "#work", key: "work" },
  { href: "#services", key: "services" },
  { href: "#about", key: "about" },
  { href: "#contact", key: "contact" },
] as const;

export function Header({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-2.5">
          <Mark className="h-8 w-8" />
          <span className="text-[17px] font-semibold tracking-tight text-ink">
            {site.aka}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-medium text-ink-soft md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-ink">
              {copy.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <a
            href="#contact"
            className="inline-flex items-center gap-1 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:bg-lime-deep"
          >
            {copy.nav.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="rounded-full border border-line bg-cream px-3 py-2 text-sm font-semibold"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? copy.nav.closeMenu : copy.nav.openMenu}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="relative z-50 border-t border-line bg-cream px-4 py-4 shadow-sm md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-3 text-base font-medium">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl px-3 py-2 hover:bg-paper-deep"
                onClick={() => setOpen(false)}
              >
                {copy.nav[link.key]}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-lime px-4 py-3 text-center font-semibold"
              onClick={() => setOpen(false)}
            >
              {copy.nav.cta}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
