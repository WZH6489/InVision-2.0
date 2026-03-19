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

## Copy & design system

- Shared styles: `../css/site.css` (imported from `src/app/[locale]/layout.tsx`).
- Tokens and Next-specific overrides: `src/app/globals.css`.
- UI strings: `messages/zh.json`, `messages/en.json`, `messages/zh-hant.json` (single DOM/CSS across locales).

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
  created_at timestamptz default now()
);
```

3. Submit the modal in the app; rows appear only when both env vars are set.

The **legacy static HTML** site remains in the parent directory for reference and gradual content migration.
