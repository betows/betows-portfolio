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

export function Dex({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const [tab, setTab] = useState<Tab>("files");
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
    setPanel("detail");
  }

  function pressA() {
    if (!current) return;
    if (panel === "list") {
      setPanel("detail");
      return;
    }
    if (current.kind === "project" && current.project.url) {
      window.open(current.project.url, "_blank", "noopener,noreferrer");
    }
  }

  function pressB() {
    if (panel === "detail") {
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
    <div className="dex-page mx-auto flex w-full max-w-[440px]">
      <h1 className="sr-only">{copy.hero.title}</h1>
      <div className="shell flex h-full w-full flex-col gap-2 px-3 py-3">
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="lens" aria-hidden="true">
            <span className="lens-core" />
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-[#3a0a08] bg-[#ff3b30]" aria-hidden="true" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-[#3a0a08] bg-[#ffe14a]" aria-hidden="true" />
            <Link
              href="/"
              hrefLang="pt-BR"
              className={`pixel-press border-2 border-[#3a0a08] px-1.5 py-0.5 font-[family-name:var(--font-pixel)] text-[10px] leading-none shadow-[2px_2px_0_#3a0a08] ${locale === "pt" ? "bg-[#ffe14a] text-[#3a0a08]" : "bg-[#ffd0c8] text-[#3a0a08]"}`}
              aria-current={locale === "pt" ? "page" : undefined}
            >
              PT
            </Link>
            <Link
              href="/en"
              hrefLang="en"
              className={`pixel-press border-2 border-[#3a0a08] px-1.5 py-0.5 font-[family-name:var(--font-pixel)] text-[10px] leading-none shadow-[2px_2px_0_#3a0a08] ${locale === "en" ? "bg-[#ffe14a] text-[#3a0a08]" : "bg-[#ffd0c8] text-[#3a0a08]"}`}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
          </div>
        </div>

        <div className="bezel">
          <div className="dex-device lcd" data-panel={panel}>
            <div className="lcd-grid" />
            <div className="boot-overlay absolute inset-0 z-20 grid place-items-center bg-[#9bbc0f] font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest text-[#0f380f]">
              {copy.dex.boot}
            </div>

            <div className="dex-list-pane relative z-10 flex min-h-0 flex-1 flex-col p-2">
              <div className="mb-2 grid grid-cols-2 gap-2 font-[family-name:var(--font-pixel)] text-[11px]">
                <button
                  type="button"
                  onClick={() => selectTab("files")}
                  className={`pixel-press border-[3px] border-[#0f380f] px-1 py-1 shadow-[3px_3px_0_#0f380f] ${tab === "files" ? "bg-[#0f380f] text-[#9bbc0f]" : "bg-[#9bbc0f] text-[#0f380f]"}`}
                  aria-pressed={tab === "files"}
                >
                  {copy.dex.files}
                </button>
                <button
                  type="button"
                  onClick={() => selectTab("field")}
                  className={`pixel-press border-[3px] border-[#0f380f] px-1 py-1 shadow-[3px_3px_0_#0f380f] ${tab === "field" ? "bg-[#0f380f] text-[#9bbc0f]" : "bg-[#9bbc0f] text-[#0f380f]"}`}
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
                className="mb-2 border-[3px] border-[#0f380f] bg-[#8bac0f] px-2 py-1 text-lg text-[#0f380f] outline-none placeholder:text-[#306230]"
              />
              <div className="dex-list min-h-0 flex-1 overflow-y-auto" role="listbox" aria-label={copy.dex.brand}>
                {entries.length === 0 ? (
                  <p className="px-1 py-4 text-xl">{copy.dex.empty}</p>
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
                        className={`flex w-full items-center gap-2 px-1 py-0.5 text-left text-[22px] leading-6 ${
                          selected ? "bg-[#0f380f] text-[#9bbc0f]" : "text-[#0f380f]"
                        }`}
                      >
                        <span className="w-4">{selected ? ">" : ""}</span>
                        <span className="w-10">{number}</span>
                        <span className="truncate">{entry.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="dex-detail relative z-10 min-h-0 flex-1 overflow-y-auto p-2" aria-live="polite">
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
                <p className="text-xl">{copy.dex.empty}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 pb-1" aria-hidden="true">
          {Array.from({ length: 7 }, (_, slot) => (
            <span key={slot} className="h-4 w-1.5 bg-[#1a1a1a]" />
          ))}
        </div>

        <div className="flex items-end justify-between px-2 pb-1">
          <div className="relative grid h-[104px] w-[104px] grid-cols-3 grid-rows-3 place-items-center">
            <span className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-9 -translate-x-1/2 bg-[#1a1a1a]" />
            <span className="pointer-events-none absolute top-1/2 right-0 left-0 h-9 -translate-y-1/2 bg-[#1a1a1a]" />
            <span />
            <PadButton label={copy.dex.up} onClick={() => move(-1)}>
              ▲
            </PadButton>
            <span />
            <PadButton label={copy.dex.toFiles} onClick={() => selectTab("files")}>
              ◀
            </PadButton>
            <span />
            <PadButton label={copy.dex.toField} onClick={() => selectTab("field")}>
              ▶
            </PadButton>
            <span />
            <PadButton label={copy.dex.down} onClick={() => move(1)}>
              ▼
            </PadButton>
            <span />
          </div>
          <div className="flex items-center gap-3 pb-1">
            <RoundButton label={copy.dex.back} tone="blue" onClick={pressB}>
              B
            </RoundButton>
            <RoundButton label={copy.dex.open} tone="amber" onClick={pressA}>
              A
            </RoundButton>
          </div>
        </div>
      </div>
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
      className="relative z-10 grid h-9 w-9 place-items-center bg-[#1a1a1a] font-[family-name:var(--font-pixel)] text-[10px] text-[#f4f4f4]"
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
      ? "bg-[#ffe14a] text-[#1a1a1a]"
      : "bg-[#2f6fed] text-white";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`pixel-press grid h-12 w-12 place-items-center rounded-full border-[3px] border-[#111] font-[family-name:var(--font-pixel)] text-sm shadow-[3px_3px_0_#111] ${toneClass}`}
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
    <article className="flex min-h-full flex-col text-[#0f380f]">
      <div className="flex items-center justify-between gap-2 text-xl">
        <p>
          {copy.dex.no} {number}
        </p>
        <button type="button" className="font-[family-name:var(--font-pixel)] text-[11px]" onClick={onBack}>
          {copy.dex.back}
        </button>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="border-[3px] border-[#0f380f] bg-[#0f380f] p-1">
          <Sprite seed={seed} />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-pixel)] text-lg leading-5">{title}</h2>
          {entry.kind === "project" ? (
            <p className="mt-1 text-lg leading-5">
              {entry.project.featured ? copy.dex.flagship : copy.dex.entry}
              {" · "}
              {entry.project.liveNote ? copy.dex.offline : copy.dex.live}
            </p>
          ) : (
            <p className="mt-1 text-lg leading-5">{copy.dex.files}</p>
          )}
        </div>
      </div>

      <div className="mt-3 text-lg leading-6">
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
          <span key={skill} className="border-2 border-[#0f380f] px-1.5 py-0.5 font-[family-name:var(--font-pixel)] text-[10px]">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="pixel-press border-[3px] border-[#0f380f] bg-[#0f380f] px-3 py-1 font-[family-name:var(--font-pixel)] text-[11px] text-[#9bbc0f]"
        >
          GitHub
        </a>
        <a
          href={`mailto:${site.email}`}
          className="border-[3px] border-[#0f380f] px-3 py-1 font-[family-name:var(--font-pixel)] text-[11px]"
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
      <p>{copy.services.subtitle}</p>
      {copy.services.items.map((item) => (
        <section key={item.title} className="border-[3px] border-[#0f380f] p-2">
          <h3 className="font-[family-name:var(--font-pixel)] text-sm">{item.title}</h3>
          <p className="mt-1">{item.body}</p>
          <ul className="mt-2 space-y-1">
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
          <div key={item.q} className="border-[3px] border-[#0f380f]">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-2 py-2 text-left text-xl"
                aria-expanded={isOpen}
                onClick={() => onOpen(isOpen ? -1 : itemIndex)}
              >
                {item.q}
                <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
            </h3>
            {isOpen ? <p className="px-2 pb-2">{item.a}</p> : null}
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
        className="inline-flex border-[3px] border-[#0f380f] bg-[#0f380f] px-3 py-1 font-[family-name:var(--font-pixel)] text-[11px] text-[#9bbc0f]"
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
      {project.featured ? <p>{copy.featured.body}</p> : null}
      {project.liveNote ? (
        <p className="border-[3px] border-[#0f380f] bg-[#8bac0f] px-2 py-1">{project.liveNote[locale]}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="border-2 border-[#0f380f] px-1.5 py-0.5 font-[family-name:var(--font-pixel)] text-[10px] uppercase">
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
            className="border-[3px] border-[#0f380f] bg-[#0f380f] px-3 py-1 font-[family-name:var(--font-pixel)] text-[11px] text-[#9bbc0f]"
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
            className="border-2 border-[#0f380f] px-2 py-1 text-lg"
          >
            {repo.replace("https://github.com/betows/", "")}
          </a>
        ))}
      </div>
    </div>
  );
}
