"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { featuredProject, projects, type Project } from "@/lib/projects";
import { site, type Locale } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { Sprite } from "./Sprite";

type Tab = "files" | "field";
type Panel = "list" | "detail";
type DataId = "profile" | "services" | "faq" | "contact";

type DexEntry =
  | { kind: "data"; id: DataId; title: string; haystack: string }
  | { kind: "project"; project: Project; title: string; haystack: string };

function pad(value: number) {
  return String(value).padStart(3, "0");
}

function isCompact() {
  return window.matchMedia("(max-width: 860px)").matches;
}

export function Dex({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const [tab, setTab] = useState<Tab>("field");
  const [index, setIndex] = useState(0);
  const [panel, setPanel] = useState<Panel>("list");
  const [query, setQuery] = useState("");
  const [faqOpen, setFaqOpen] = useState(0);

  const catalog = useMemo(() => {
    const files: DexEntry[] = [
      {
        kind: "data",
        id: "profile",
        title: copy.dex.profile,
        haystack: `${copy.dex.profile} ${copy.about.title} ${site.name}`,
      },
      {
        kind: "data",
        id: "services",
        title: copy.dex.services,
        haystack: `${copy.dex.services} ${copy.services.items.map((item) => item.title).join(" ")}`,
      },
      {
        kind: "data",
        id: "faq",
        title: copy.dex.faq,
        haystack: `${copy.dex.faq} ${copy.faq.items.map((item) => item.q).join(" ")}`,
      },
      {
        kind: "data",
        id: "contact",
        title: copy.dex.contact,
        haystack: `${copy.dex.contact} github email`,
      },
    ];
    const field: DexEntry[] = [featuredProject, ...projects].map((project) => ({
      kind: "project" as const,
      project,
      title: project.title,
      haystack: `${project.title} ${project.tags.join(" ")} ${project.blurb[locale]}`,
    }));
    return { files, field };
  }, [copy, locale]);

  const source = tab === "files" ? catalog.files : catalog.field;
  const needle = query.trim().toLowerCase();
  const entries = needle
    ? source.filter((entry) => entry.haystack.toLowerCase().includes(needle))
    : source;
  const safeIndex = entries.length === 0 ? 0 : Math.min(index, entries.length - 1);
  const current = entries[safeIndex];

  useEffect(() => {
    document.getElementById(`dex-entry-${safeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [safeIndex, tab, needle]);

  function selectTab(next: Tab) {
    setTab(next);
    setIndex(0);
    setPanel("list");
  }

  function move(delta: number) {
    if (entries.length === 0) return;
    setIndex((value) => {
      const base = Math.min(value, entries.length - 1);
      return (base + delta + entries.length) % entries.length;
    });
  }

  function openEntry(nextIndex: number) {
    setIndex(nextIndex);
    if (isCompact()) setPanel("detail");
  }

  function pressA() {
    if (!current) return;
    if (isCompact() && panel === "list") {
      setPanel("detail");
      return;
    }
    if (current.kind === "project" && current.project.url) {
      window.open(current.project.url, "_blank", "noopener,noreferrer");
    }
  }

  function pressB() {
    if (isCompact() && panel === "detail") {
      setPanel("list");
      return;
    }
    move(-1);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        move(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        move(-1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectTab("files");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        selectTab("field");
      } else if (event.key === "Enter") {
        event.preventDefault();
        pressA();
      } else if (event.key === "Escape") {
        pressB();
      } else if (event.key === "/" && !(event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        document.getElementById("dex-search")?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#ffb4a8]">
            {copy.dex.brand} · {site.aka}
          </p>
          <h1 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.hero.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#f0d2cc] sm:text-base">
            {copy.hero.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-black/30 p-1 text-sm font-semibold">
          <Link
            href="/"
            hrefLang="pt-BR"
            className={`rounded-full px-3 py-1 ${locale === "pt" ? "bg-white text-[#7f1218]" : "text-white"}`}
            aria-current={locale === "pt" ? "page" : undefined}
          >
            PT
          </Link>
          <Link
            href="/en"
            hrefLang="en"
            className={`rounded-full px-3 py-1 ${locale === "en" ? "bg-white text-[#7f1218]" : "text-white"}`}
            aria-current={locale === "en" ? "page" : undefined}
          >
            EN
          </Link>
        </div>
      </div>

      <div className="shell rounded-[36px] p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-[#8fd6ff] to-[#1d6cb5] shadow-[inset_0_-6px_10px_rgba(0,0,0,.35)]">
              <span className="h-5 w-5 rounded-full bg-[#e7f7ff]/80" />
            </span>
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-white">
                {copy.dex.brand}
              </p>
              <p className="text-xs text-white/80">{copy.dex.region}</p>
            </div>
          </div>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ffd15c] shadow-[0_0_10px_#ffd15c]" />
            <span className="h-3 w-3 rounded-full bg-[#7dffb2] shadow-[0_0_10px_#7dffb2]" />
          </div>
        </div>

        <div
          className="dex-device rounded-[22px] bg-[#10141c] p-3 shadow-[inset_0_0_0_3px_#07090d]"
          data-panel={panel}
        >
          <div className="lcd relative grid h-[72vh] min-h-[520px] max-h-[680px] overflow-hidden rounded-xl md:grid-cols-[minmax(240px,0.86fr)_1.14fr]">
            <div className="lcd-scan" />
            <div className="boot-overlay absolute inset-0 z-20 grid place-items-center bg-[#071526] font-mono text-sm uppercase tracking-[0.35em] text-[#9ad7ff]">
              {copy.dex.boot}
            </div>

            <div className="dex-list-pane relative z-10 flex min-h-0 flex-col border-[#16406a] p-3 md:border-r">
              <div className="mb-3 grid grid-cols-2 gap-2 font-mono text-[11px] uppercase tracking-wide">
                <button
                  type="button"
                  onClick={() => selectTab("files")}
                  className={`rounded-md px-2 py-2 ${tab === "files" ? "bg-[#ffd15c] text-[#2a1408]" : "bg-[#0c2238] text-[#9ad7ff]"}`}
                  aria-pressed={tab === "files"}
                >
                  {copy.dex.files}
                </button>
                <button
                  type="button"
                  onClick={() => selectTab("field")}
                  className={`rounded-md px-2 py-2 ${tab === "field" ? "bg-[#ffd15c] text-[#2a1408]" : "bg-[#0c2238] text-[#9ad7ff]"}`}
                  aria-pressed={tab === "field"}
                >
                  {copy.dex.field}
                </button>
              </div>
              <label className="sr-only" htmlFor="dex-search">
                {copy.dex.search}
              </label>
              <input
                id="dex-search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIndex(0);
                  setPanel("list");
                }}
                placeholder={copy.dex.searchPh}
                className="mb-3 rounded-md border border-[#1d4e7a] bg-[#061018] px-3 py-2 font-mono text-xs text-[#e7f4ff] outline-none placeholder:text-[#6f93b3] focus:border-[#7fd3ff]"
              />
              <div className="dex-list min-h-0 flex-1 space-y-1 overflow-y-auto pr-1" role="listbox" aria-label={copy.dex.brand}>
                {entries.length === 0 ? (
                  <p className="px-2 py-6 text-sm text-[#8eb4d4]">{copy.dex.empty}</p>
                ) : (
                  entries.map((entry, entryIndex) => {
                    const selected = entryIndex === safeIndex;
                    const number = pad(source.indexOf(entry) + 1);
                    return (
                      <button
                        key={entry.kind === "project" ? entry.project.slug : entry.id}
                        id={`dex-entry-${entryIndex}`}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => openEntry(entryIndex)}
                        className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left font-mono text-sm ${
                          selected ? "bg-[#12375c] text-white" : "text-[#c5ddf0] hover:bg-[#0c2740]"
                        }`}
                      >
                        <span className="w-4 text-[#ffd15c]">{selected ? "▸" : ""}</span>
                        <span className="w-9 text-[#7fd3ff]">{number}</span>
                        <span className="truncate">{entry.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="dex-detail relative z-10 flex min-h-0 flex-col overflow-y-auto p-4 sm:p-5" aria-live="polite">
              {current ? (
                <EntryView
                  entry={current}
                  number={pad(source.indexOf(current) + 1)}
                  locale={locale}
                  copy={copy}
                  faqOpen={faqOpen}
                  onFaq={setFaqOpen}
                  onBack={() => setPanel("list")}
                />
              ) : (
                <p className="text-sm text-[#8eb4d4]">{copy.dex.empty}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid items-center gap-4 rounded-[28px] bg-[#121820] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06)] sm:grid-cols-[auto_1fr_auto] sm:px-6">
          <div className="grid h-28 w-28 grid-cols-3 grid-rows-3 place-items-center justify-self-center sm:justify-self-start">
            <span />
            <PadButton label={copy.dex.up} onClick={() => move(-1)}>
              ▲
            </PadButton>
            <span />
            <PadButton label={copy.dex.toFiles} onClick={() => selectTab("files")}>
              ◀
            </PadButton>
            <span className="h-6 w-6 rounded-full bg-[#2a3342]" />
            <PadButton label={copy.dex.toField} onClick={() => selectTab("field")}>
              ▶
            </PadButton>
            <span />
            <PadButton label={copy.dex.down} onClick={() => move(1)}>
              ▼
            </PadButton>
            <span />
          </div>
          <p className="text-center font-mono text-[11px] uppercase leading-5 tracking-wide text-[#9eb0c6]">
            {copy.dex.hint}
          </p>
          <div className="flex items-center justify-center gap-4 sm:justify-end">
            <RoundButton label={copy.dex.back} tone="blue" onClick={pressB}>
              B
            </RoundButton>
            <RoundButton label={copy.dex.open} tone="amber" onClick={pressA}>
              A
            </RoundButton>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-[#e7c7c1]">
        © {new Date().getFullYear()} {copy.footer.rights}
      </p>
    </div>
  );
}

function PadButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="dpad-btn grid h-9 w-9 place-items-center rounded-md bg-[#3a4456] text-xs text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)]"
    >
      {children}
    </button>
  );
}

function RoundButton({
  label,
  tone,
  onClick,
  children,
}: {
  label: string;
  tone: "amber" | "blue";
  onClick: () => void;
  children: string;
}) {
  const toneClass =
    tone === "amber"
      ? "bg-[#ffd15c] text-[#2a1408]"
      : "bg-[#3d7eff] text-white";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`hardware-btn grid h-16 w-16 place-items-center rounded-full text-lg font-bold shadow-[inset_0_-6px_0_rgba(0,0,0,.2)] ${toneClass}`}
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}

function EntryView({
  entry,
  number,
  locale,
  copy,
  faqOpen,
  onFaq,
  onBack,
}: {
  entry: DexEntry;
  number: string;
  locale: Locale;
  copy: Dictionary;
  faqOpen: number;
  onFaq: (index: number) => void;
  onBack: () => void;
}) {
  const title = entry.title;
  const seed = entry.kind === "project" ? entry.project.slug : entry.id;

  return (
    <article className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7fd3ff]">
        <p>
          {copy.dex.no} {number}
        </p>
        <button type="button" className="md:hidden" onClick={onBack}>
          {copy.dex.back}
        </button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="rounded-xl border border-[#1d4e7a] bg-[#04101c] p-2">
          <Sprite seed={seed} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          {entry.kind === "project" ? (
            <p className="mt-1 text-xs uppercase tracking-wide text-[#ffd15c]">
              {entry.project.featured ? copy.dex.flagship : copy.dex.entry}
              {" · "}
              {entry.project.liveNote ? copy.dex.offline : copy.dex.live}
            </p>
          ) : (
            <p className="mt-1 text-xs uppercase tracking-wide text-[#ffd15c]">{copy.dex.files}</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex-1 text-sm leading-6 text-[#d5e8f7]">
        {entry.kind === "project" ? (
          <ProjectBody project={entry.project} locale={locale} copy={copy} />
        ) : null}
        {entry.kind === "data" && entry.id === "profile" ? <ProfileBody copy={copy} /> : null}
        {entry.kind === "data" && entry.id === "services" ? <ServicesBody copy={copy} /> : null}
        {entry.kind === "data" && entry.id === "faq" ? (
          <FaqBody items={copy.faq.items} open={faqOpen} onOpen={onFaq} />
        ) : null}
        {entry.kind === "data" && entry.id === "contact" ? <ContactBody copy={copy} /> : null}
      </div>
    </article>
  );
}

function ProfileBody({ copy }: { copy: Dictionary }) {
  return (
    <div className="space-y-3">
      <p>{copy.about.p1}</p>
      <p>{copy.about.p2}</p>
      <p>{copy.about.p3}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {["Next.js", "TypeScript", "React", "Stripe", "Vercel", "React Native", "SEO"].map((skill) => (
          <span key={skill} className="rounded-full bg-[#12375c] px-2.5 py-1 font-mono text-[11px] text-[#d7f1ff]">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#ffd15c] px-4 py-2 text-sm font-semibold text-[#2a1408]"
        >
          GitHub
        </a>
        <a
          href={`mailto:${site.email}`}
          className="rounded-full border border-[#1d4e7a] px-4 py-2 text-sm font-semibold text-white"
        >
          {copy.contact.email}
        </a>
      </div>
    </div>
  );
}

function ServicesBody({ copy }: { copy: Dictionary }) {
  return (
    <div className="space-y-4">
      <p className="text-[#8eb4d4]">{copy.services.subtitle}</p>
      {copy.services.items.map((item) => (
        <section key={item.title} className="rounded-xl border border-[#16406a] bg-[#0a2036] p-3">
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-1">{item.body}</p>
          <ul className="mt-2 space-y-1 text-[#b7d4ea]">
            {item.points.map((point) => (
              <li key={point}>· {point}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function FaqBody({
  items,
  open,
  onOpen,
}: {
  items: Dictionary["faq"]["items"];
  open: number;
  onOpen: (index: number) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, itemIndex) => {
        const isOpen = open === itemIndex;
        return (
          <div key={item.q} className="rounded-xl border border-[#16406a] bg-[#0a2036]">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left font-semibold text-white"
                aria-expanded={isOpen}
                onClick={() => onOpen(isOpen ? -1 : itemIndex)}
              >
                {item.q}
                <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
            </h3>
            {isOpen ? <p className="px-3 pb-3 text-[#b7d4ea]">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function ContactBody({ copy }: { copy: Dictionary }) {
  return (
    <div className="space-y-4">
      <p>{copy.contact.subtitle}</p>
      <a
        href={site.github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-full bg-[#ffd15c] px-4 py-2 text-sm font-semibold text-[#2a1408]"
      >
        {copy.contact.github}
      </a>
      <ContactForm copy={copy.contact} />
    </div>
  );
}

function ProjectBody({
  project,
  locale,
  copy,
}: {
  project: Project;
  locale: Locale;
  copy: Dictionary;
}) {
  return (
    <div className="space-y-4">
      <p>{project.blurb[locale]}</p>
      {project.featured ? <p className="text-[#8eb4d4]">{copy.featured.body}</p> : null}
      {project.liveNote ? (
        <p className="rounded-lg bg-[#3a2414] px-3 py-2 text-[#ffd7a8]">{project.liveNote[locale]}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#12375c] px-2.5 py-1 font-mono text-[11px] uppercase text-[#d7f1ff]">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#ffd15c] px-4 py-2 text-sm font-semibold text-[#2a1408]"
          >
            {copy.dex.open}
          </a>
        ) : (
          <p>{copy.work.unavailable}</p>
        )}
        {project.github?.map((repo) => (
          <a
            key={repo}
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#1d4e7a] px-3 py-2 font-mono text-xs text-white"
          >
            {repo.replace("https://github.com/betows/", "")}
          </a>
        ))}
      </div>
    </div>
  );
}
