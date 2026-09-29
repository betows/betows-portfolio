import type { Dictionary } from "@/lib/dictionary";
import { featuredProject, projectBlurb, projects } from "@/lib/projects";
import { site, type Locale } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { FaqList } from "./FaqList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { CloudMark, HeroArt, MarketplaceArt } from "./HeroArt";
import { Reveal } from "./Reveal";

const skills = [
  "Next.js",
  "TypeScript",
  "React",
  "Stripe",
  "Vercel",
  "React Native",
  "SEO",
  "Tailwind",
];

export function HomePage({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  return (
    <div className="relative flex min-h-full flex-col">
      <Header locale={locale} copy={copy} />

      <div className="border-b border-line bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 text-center text-sm sm:px-6">
          <p>{copy.announce}</p>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink sm:inline-flex"
          >
            {copy.announceCta}
          </a>
        </div>
      </div>

      <main className="flex-1">
        <section className="px-4 pb-8 pt-10 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-cream px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="rise font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  {copy.hero.kicker}
                </p>
                <h1 className="rise rise-delay-1 mt-4 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                  {copy.hero.title}
                </h1>
                <p className="rise rise-delay-2 mt-6 max-w-lg text-lg leading-8 text-muted">
                  {copy.hero.subtitle}
                </p>
                <div className="rise rise-delay-3 mt-8 flex flex-wrap gap-3">
                  <a
                    href="#work"
                    className="inline-flex items-center rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-deep"
                  >
                    {copy.hero.primary}
                  </a>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
                  >
                    {copy.hero.secondary}
                  </a>
                </div>
              </div>
              <div className="rise rise-delay-2 relative">
                <span className="absolute -left-3 top-8 hidden h-5 w-5 rounded-md bg-white sm:block" />
                <span className="absolute -right-2 bottom-16 hidden h-5 w-5 rounded-md bg-lime sm:block" />
                <HeroArt />
              </div>
            </div>
          </div>
        </section>

        <section aria-label={copy.skillsLabel} className="py-8">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {copy.skillsLabel}
          </p>
          <div className="marquee overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-2xl font-semibold tracking-tight text-ink/35 sm:text-3xl">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {copy.featured.kicker}
              </p>
              <div className="mt-6 grid gap-6 rounded-[36px] border border-line bg-cream p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {copy.featured.title}
                  </h2>
                  <p className="mt-4 text-xl leading-8 text-ink-soft">{copy.featured.lead}</p>
                  <p className="mt-4 max-w-xl text-[16px] leading-7 text-muted">{copy.featured.body}</p>
                  {featuredProject.liveNote ? (
                    <p className="mt-4 max-w-xl rounded-2xl bg-paper-deep px-4 py-3 text-sm leading-6 text-ink-soft">
                      {featuredProject.liveNote[locale]}
                    </p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {featuredProject.url ? (
                      <a
                        href={featuredProject.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-lime px-4 py-2.5 text-sm font-semibold"
                      >
                        {copy.featured.live}
                      </a>
                    ) : null}
                    {featuredProject.github?.map((repo) => (
                      <a
                        key={repo}
                        href={repo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold"
                      >
                        {repo.replace("https://github.com/betows/", "")}
                      </a>
                    ))}
                  </div>
                </div>
                <MarketplaceArt />
              </div>
            </Reveal>

            <Reveal className="mt-20">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {copy.work.kicker}
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {copy.work.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{copy.work.subtitle}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Reveal key={project.slug}>
                  <article className="flex h-full flex-col rounded-[28px] border border-line bg-cream p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-paper-deep px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-7 text-muted">
                      {projectBlurb(project, locale)}
                    </p>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex w-fit items-center gap-1 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:bg-lime-deep"
                      >
                        {copy.work.visit}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <p className="mt-6 text-sm text-muted">{copy.work.unavailable}</p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {copy.services.kicker}
              </p>
              <h2 className="mx-auto mt-3 max-w-3xl text-center text-4xl font-semibold tracking-tight sm:text-5xl">
                {copy.services.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-muted">
                {copy.services.subtitle}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {copy.services.items.map((item) => (
                <Reveal key={item.title}>
                  <article className="h-full rounded-[28px] border border-line bg-cream p-7">
                    <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-muted">{item.body}</p>
                    <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime-deep" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6">
          <Reveal>
            <div className="mx-auto grid max-w-6xl gap-8 rounded-[36px] border border-line bg-cream p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {copy.about.kicker}
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {copy.about.title}
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-muted">
                <p>{copy.about.p1}</p>
                <p>{copy.about.p2}</p>
                <p>{copy.about.p3}</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="faq" className="scroll-mt-24 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-8 text-center">
              <div className="flex justify-center">
                <CloudMark />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {copy.faq.kicker}
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {copy.faq.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">{copy.faq.subtitle}</p>
            </Reveal>
            <Reveal>
              <FaqList items={copy.faq.items} />
            </Reveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-4 pb-20 pt-8 sm:px-6">
          <Reveal>
            <div className="mx-auto grid max-w-6xl gap-10 rounded-[36px] bg-cream p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {copy.contact.kicker}
                </p>
                <h2 className="mt-3 max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
                  {copy.contact.title}
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-8 text-muted">{copy.contact.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-lime px-5 py-3 text-sm font-semibold"
                  >
                    {copy.contact.github}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold"
                  >
                    {copy.contact.email}
                  </a>
                </div>
              </div>
              <ContactForm copy={copy.contact} />
            </div>
          </Reveal>
        </section>
      </main>

      <Footer copy={copy} />
      <div className="paper-grain" aria-hidden="true" />
    </div>
  );
}
