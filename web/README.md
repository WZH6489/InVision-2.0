# 视未 — Next.js + i18n app

This folder is a **Next.js 16** application with **next-intl** subpath routing:

| Locale   | URL prefix example |
|----------|--------------------|
| 简体中文 (default) | `/` (no prefix), `/process`, … |
| English | `/en`, `/en/process`, … |
| 繁體    | `/zh-hant`, `/zh-hant/process`, … |

## Commands

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Node.js version

Use **Node 20, 22, or 24** locally. **Node 25+** is too new for the Vercel CLI and some of its dependencies.

This repo pins **22** in `.nvmrc` (Vercel also honors it when the project root is `web`).

```bash
# nvm
cd web && nvm install && nvm use

# fnm
cd web && fnm use

# volta (if configured)
volta pin node@22
```

Then run `npm install`, `npm run dev`, or `npx vercel --prod`.

## Copy & design system

- Shared styles: `../css/site.css` (imported from `src/app/[locale]/layout.tsx`).
- Tokens and Next-specific overrides: `src/app/globals.css`.
- UI strings: `messages/zh.json`, `messages/en.json`, `messages/zh-hant.json` (single DOM/CSS across locales).
- Inner subpages (`/process`, `/rules`, …) and About/Services/Contact bodies: `messages/innerPages/{locale}.json`, merged in `src/i18n/request.ts` as `InnerPages`.

## Booking API + Supabase

1. Copy `.env.example` to `.env.local` and fill values.
2. Create a `bookings` table, for example:

```sql
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  tier text not null,
  preferred_date date,
  time_slot text not null,
  notes text,
  locale text,
  full_name text not null,
  email text not null,
  phone text,
  trajectory text,
  tension text,
  created_at timestamptz default now()
);
```

3. Submit the modal in the app; rows appear only when both env vars are set.

The **legacy static HTML** site remains in the parent directory for reference and gradual content migration.

**Languages:** the header uses `next-intl`’s `<Link locale="…">` with the current path — not separate `index-en.html` files — so layout/CSS stay identical across locales.

If you already have a `bookings` table without `full_name` / `email` / `phone`, run an `ALTER TABLE` to add those columns before turning on Supabase in `.env.local`.

Add concierge intake columns:

```sql
alter table public.bookings add column if not exists trajectory text;
alter table public.bookings add column if not exists tension text;
```
