# Roberto Amaral — betows portfolio

Bilingual personal site (PT-BR + EN) for [Roberto Amaral](https://github.com/betows): landing pages, SaaS/systems, and product builds.

The interface is **betowdex**, an original handheld catalog. Browse numbered project entries and info files (profile, services, FAQ, contact) with the on-screen list, search, and the D-pad. It is not a Nintendo or Pokémon product and does not use their names, characters, or artwork.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Figtree + Geist Mono
- `/` = Portuguese, `/en` = English
- JSON-LD (`Person`, `ProfessionalService`, `FAQPage`), sitemap, robots, hreflang, OG

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (PT) and [http://localhost:3000/en](http://localhost:3000/en) (EN).

```bash
npm run build
npm start
```

## Environment

Optional production URL for canonical, sitemap, and Open Graph:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, the app uses `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` on Vercel, or `http://localhost:3000` in development.

## Contact

GitHub is the primary CTA: [github.com/betows](https://github.com/betows).  
The contact form opens a `mailto:` to `robertoamaral56@gmail.com` — nothing is stored on the server.

## Projects

Work listed in `src/lib/projects.ts` comes from the Vercel inventory plus Appoint as the flagship. Live `*.vercel.app` links were checked; Appoint’s public landing currently 404s and is noted in the UI. Dead custom domains (e.g. `betows.github.io`) are omitted. gerizza.com is used for the Ilumme/gerizza product.

## Deploy

Connect the repo to Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production domain after the first deploy.
