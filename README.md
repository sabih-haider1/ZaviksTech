# ZaviksTech

Marketing site and lead-management backend for **ZaviksTech** — an independent
IT & digital services practice: IT support, web & app development,
cybersecurity consulting, business automation, managed IT and social media
management.

Built on a bespoke editorial design language — "The Practice Ledger" (see
[DESIGN.md](DESIGN.md)): a warm paper canvas, ink typography, deep pine plates
and a single copper signal colour.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Prisma** + **PostgreSQL** — lead capture and admin
- Credentials auth with a signed session cookie (admin only)
- **Resend** for transactional email
- **Zod** + **React Hook Form** for validation

## Features

- Marketing pages: home, services (index + seven detail pages), about, contact
  (with a map), and legal.
- Lead capture: contact form, per-service forms and a homepage popup —
  validated, rate-limited, honeypot-protected, persisted and emailed.
- Protected admin dashboard to view and manage leads.
- SEO: metadata, canonical URLs, sitemap, robots, JSON-LD (Organization,
  Service, FAQ, Breadcrumb) and a dynamic Open Graph image.
- Accessible and responsive, with a reduced-motion-aware, progressively
  enhanced motion system.

## Getting started

```bash
pnpm install
cp .env.example .env    # then fill in real values
pnpm prisma:migrate     # set up the database
pnpm db:seed            # create the admin user
pnpm dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env` and provide `DATABASE_URL`, `AUTH_SECRET`, the
admin bootstrap credentials, the Resend variables (`RESEND_API_KEY`,
`EMAIL_FROM`, `LEAD_NOTIFICATION_EMAIL`) and the public site/contact variables.
`.env` is gitignored and must never be committed.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (`prisma generate` + `next build`) |
| `pnpm start` | Serve the production build |
| `pnpm lint` / `pnpm typecheck` | Lint / type-check |
| `pnpm prisma:migrate` / `pnpm db:seed` | Database migration / seed |

## License

© ZaviksTech. All rights reserved.
