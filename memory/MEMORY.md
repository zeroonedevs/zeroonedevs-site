# ZeroOne CodeClub Site — Memory

## Stack
- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS 4, Framer Motion 12, Radix/shadcn
- Neon (serverless PostgreSQL), bcryptjs + jose (JWT auth)
- Package manager: bun (`bun run build`, `bun run dev`)

## Project structure
- `src/app/` — pages, API routes, layout
- `src/components/sections/` — Hero, Marquee, About, Work, Achievements, Team, Apply, Timeline, Numbers
- `src/components/ui/` — Navbar, FadeIn, Counter, ScrollProgress
- `src/lib/` — db.ts (Neon), auth.ts (JWT), utils.ts (cn)
- Admin at `/admin` with JWT cookie auth (middleware.ts)

## Key design system
- Background: `#0a0a0a`, Text: `#efefef`
- Accent: `blue-500` / `blue-600`
- Font: Inter (variable `--font-inter`)
- Borders: `border-white/[.07]` to `border-white/[.15]`
- Section labels: `font-mono text-[10px] uppercase tracking-[.22em] text-white/25`

## Improvements made (Feb 2025)
1. **Hero** — dot-grid texture background, Counter-animated stats (500+, 48, ₹20L+, 12)
2. **ScrollProgress** — blue progress bar fixed at top of page (`z-[100]`)
3. **Navbar** — IntersectionObserver active-section tracking; highlights current section link
4. **Achievements** — Added missing `id="achievements"` so sections can be linked
5. **Team** — hover-to-pause carousel scroll; bio + stack text revealed on hover (max-h transition)
6. **layout.tsx** — Improved OG/Twitter metadata, added ScrollProgress

## DB schema (Neon)
- `admins`, `projects`, `achievements`, `team_members` (seeded via POST /api/seed)
- team_members has: name, role, stack, bio, bg_color, skin_color, hair_color, hair_type, shoulder_tone

## Known TODOs
- Apply form submits nowhere (just a setTimeout mock) — needs API or Formspree
- Achievements bento is static layout; DB data prop (`_db`) is intentionally ignored for now
- No real `og:image` asset exists yet
