import type { Locale } from "./site";

export type Project = {
  slug: string;
  title: string;
  url: string | null;
  github?: string[];
  tags: string[];
  featured?: boolean;
  liveNote?: { pt: string; en: string };
  blurb: { pt: string; en: string };
};

export const featuredProject: Project = {
  slug: "appoint",
  title: "Appoint",
  url: "https://appointcorp.com",
  tags: ["marketplace", "landing", "Next.js"],
  featured: true,
  blurb: {
    pt: "Landing para contratar eletricista, diarista e encanador em Blumenau, Joinville e BC — no ar em appointcorp.com.",
    en: "Landing to book an electrician, cleaner, or plumber in Blumenau, Joinville, and BC — live at appointcorp.com.",
  },
};

export const projects: Project[] = [
  {
    slug: "dra-isadora-spada",
    title: "Dra. Isadora Spada",
    url: "https://dra-isadora-spada.vercel.app",
    tags: ["landing", "Next.js", "SEO", "clínica"],
    blurb: {
      pt: "Landing de harmonização facial em Blumenau: botox, preenchimento, LipSense® e mentoria Ilumme — SEO local e conversão via WhatsApp.",
      en: "Facial harmonization landing for a Blumenau clinic: Botox, fillers, LipSense®, and Ilumme mentorship — local SEO and WhatsApp conversion.",
    },
  },
  {
    slug: "digital-packs",
    title: "Digital Packs",
    url: "https://digital-packs.vercel.app",
    tags: ["SaaS kits", "Stripe", "Next.js"],
    blurb: {
      pt: "Kits digitais instantâneos para PMEs de serviço local — vitrine de produtos com Stripe e Next.js.",
      en: "Instant digital kits for local service SMBs — product storefront on Next.js with Stripe.",
    },
  },
  {
    slug: "formalizou",
    title: "Formalizou",
    url: "https://formalizou.vercel.app",
    tags: ["landing", "Next.js", "contabilidade"],
    blurb: {
      pt: "Site do escritório de contabilidade online para ME e EPP: planos, FAQ, comparativo e captura por WhatsApp.",
      en: "Marketing site for an online accounting firm serving SMBs: plans, FAQ, comparison table, and WhatsApp capture.",
    },
  },
  {
    slug: "ilumme",
    title: "gerizza",
    url: "https://gerizza.com",
    tags: ["SaaS", "Next.js", "mentoria"],
    blurb: {
      pt: "Plataforma de mentoria (Ilumme / gerizza): label própria, landing pública, alunos, conteúdo e operação — no ar em gerizza.com.",
      en: "Mentorship platform (Ilumme / gerizza): branded label, public landing, students, content, and ops — live at gerizza.com.",
    },
  },
  {
    slug: "noshow-ops",
    title: "No-Show Ops",
    url: "https://noshow-ops.vercel.app",
    tags: ["ops", "landing"],
    blurb: {
      pt: "Landing operacional para reduzir faltas em agenda — produto em prévia, ainda não à venda.",
      en: "Ops landing focused on reducing appointment no-shows — preview product, not for sale yet.",
    },
  },
  {
    slug: "companion-app-call-cthulhu",
    title: "O Arquivo",
    url: "https://pesadelo.vercel.app",
    tags: ["app", "Next.js", "RPG"],
    blurb: {
      pt: "Companion de Call of Cthulhu: diário de campanha, dossiês e arquivos da investigação — também em companion-app-call-cthulhu.vercel.app.",
      en: "Call of Cthulhu companion: campaign journal, dossiers, and investigation files — also at companion-app-call-cthulhu.vercel.app.",
    },
  },
  {
    slug: "findmaya",
    title: "Maya — Último Sinal",
    url: "https://findmaya.vercel.app",
    tags: ["experiência", "Next.js"],
    blurb: {
      pt: "Experiência narrativa no “iPhone da Maya”: pistas, mensagens e um sumiço — produto interativo, não um site institucional.",
      en: "Narrative experience inside “Maya’s iPhone”: clues, messages, and a disappearance — an interactive piece, not a brochure site.",
    },
  },
  {
    slug: "checklist",
    title: "Checklist",
    url: "https://checklist.vercel.app",
    tags: ["app", "produtividade"],
    blurb: {
      pt: "App web de checklists para organizar tarefas e rotinas no navegador.",
      en: "Browser checklist app for everyday tasks and routines.",
    },
  },
  {
    slug: "rumo",
    title: "Rumo",
    url: "https://rumo.vercel.app",
    tags: ["SaaS", "landing", "AI"],
    blurb: {
      pt: "Landing de um SaaS de vendas com IA: scoring de leads, conteúdo automático e retenção.",
      en: "Marketing site for an AI sales SaaS: lead scoring, automated content, and retention tools.",
    },
  },
  {
    slug: "itinerar",
    title: "rotei",
    url: "https://rotei.com",
    tags: ["SaaS", "viagem", "Next.js"],
    blurb: {
      pt: "Planejador de viagens com mapa: roteiros, rotas, horários e planejamento em grupo — no ar em rotei.com.",
      en: "Travel planner with maps: day-by-day itineraries, routes, timing, and group planning — live at rotei.com.",
    },
  },
  {
    slug: "v0-sales-page-for-immersion",
    title: "Aceleração Magnetiza",
    url: "https://v0-sales-page-for-immersion.vercel.app",
    tags: ["landing", "v0", "educação"],
    blurb: {
      pt: "Página de vendas da imersão Ilumme Educação — captação de pacientes para profissionais de HOF, com oferta, depoimentos e FAQ.",
      en: "Sales page for Ilumme Educação’s immersion — patient-acquisition training for facial-harmonization pros, with offer, proof, and FAQ.",
    },
  },
  {
    slug: "v0-santa-bella-website",
    title: "Santa Bella",
    url: "https://santabellasc.com",
    tags: ["website", "v0"],
    blurb: {
      pt: "Site institucional Santa Bella — presença da marca no ar em santabellasc.com.",
      en: "Santa Bella brand website — live at santabellasc.com.",
    },
  },
  {
    slug: "v0-contract-generator-saa-s",
    title: "Contrator",
    url: "https://v0-contract-generator-saa-s.vercel.app",
    tags: ["SaaS", "v0", "contratos"],
    blurb: {
      pt: "SaaS para criar e baixar contratos de prestação de serviço em minutos — modelos, revisão e PDF para MEI e freelancers.",
      en: "SaaS to draft and download service contracts in minutes — templates, review, and PDF for freelancers and small firms.",
    },
  },
  {
    slug: "capiclicker",
    title: "Capiclicker",
    url: "https://capiclicker.com",
    tags: ["jogo", "clicker"],
    blurb: {
      pt: "Capivara Clicker: jogo de browser para clicar, evoluir e cuidar da capivara — no ar em capiclicker.com.",
      en: "Capivara Clicker: a browser game where you click, grow, and look after the capybara — live at capiclicker.com.",
    },
  },
  {
    slug: "capivara",
    title: "Capivara",
    url: "https://capivara.vercel.app",
    tags: ["SaaS", "fintech", "privacidade"],
    blurb: {
      pt: "Gestão de inadimplência para o varejo: consulta anônima de CPF, alerta de risco e carteira de clientes protegida.",
      en: "Delinquency ops for local retail: anonymous CPF checks, risk alerts, and a privacy-first customer list.",
    },
  },
  {
    slug: "v0-dj-andre-heat-website",
    title: "André Heat",
    url: "https://djandreheat.com.br",
    tags: ["website", "v0"],
    blurb: {
      pt: "Site de DJ e produtor brasileiro: bio, press kit e materiais para booking — no ar em djandreheat.com.br.",
      en: "Site for a Brazilian DJ and producer: bio, press kit, and booking materials — live at djandreheat.com.br.",
    },
  },
];

const leadSlugs = [
  "itinerar",
  "ilumme",
  "v0-santa-bella-website",
  "capiclicker",
  "v0-dj-andre-heat-website",
] as const;

export function orderedProjects(): Project[] {
  const lead = leadSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => project !== undefined);
  const rest = projects.filter((project) => !lead.some((item) => item.slug === project.slug));
  return [featuredProject, ...lead, ...rest];
}

export function projectBlurb(project: Project, locale: Locale) {
  return project.blurb[locale];
}

export function allWork(): Project[] {
  return [featuredProject, ...projects];
}
