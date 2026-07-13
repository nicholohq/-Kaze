# Kaze — Handoff Document

## Project Overview

Kaze is a Japanese-themed Ethereum portfolio tracker built with SvelteKit 5 (runes mode). Users can track crypto holdings, import wallets via MetaMask or manual address, watch coins, and view market rankings.

- **Live:** https://kazecrypto.vercel.app
- **Repo:** https://github.com/nicholohq/Kaze.git

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit 2 + Svelte 5 (runes) |
| Language | TypeScript |
| Bundler | Vite 8 |
| Adapter | `@sveltejs/adapter-vercel` |
| Database | Turso (libSQL) — `@libsql/client` |
| Auth | bcryptjs + jsonwebtoken (JWT, 7d expiry) |
| Charting | `lightweight-charts` (TradingView) |
| Wallet | MetaMask (`window.ethereum`) + Alchemy SDK |
| Market Data | CoinGecko API (with TTL cache + dedup) |
| Fonts | Noto Serif JP + Zen Kaku Gothic New (Google Fonts) |
| Deployment | Vercel (serverless functions) |

---

## Design System

### Theme
- **Motif:** The Great Wave off Kanagawa (Hokusai ukiyo-e)
- **Primary asset:** `static/greatwave.jpg` — full-screen hero, 220px banner, login bg
- **Pattern:** Seigaiha wave scale overlay on nav

### Color Tokens (`src/app.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--wave-deep` | `#1a2a3a` | Primary dark bg |
| `--wave-mid` | `#2c4a6a` | Secondary text |
| `--wave-foam` | `#e8f0f8` | Light text on dark |
| `--vermilion` | `#c41a1a` | Primary CTA, accents |
| `--gold` | `#c5a059` | Highlights, focus rings |
| `--matcha` | `#6b8f5e` | Positive numbers |
| `--crimson` | `#dc3545` | Negative numbers, errors |
| `--charcoal` | `#2c2c2c` | Borders, shadows |
| `--linen` | `#f5f0e8` | Page base bg |
| `--paper` | `#ffffff` | Card/surface bg |
| `--ink` | `#1a1a1a` | Body text |

### Typography
- **Serif (headings):** `'Noto Serif JP'` — loaded in `app.html`
- **Gothic (body):** `'Zen Kaku Gothic New'` — loaded in `app.html`

### Spacing Scale
`--s1: 4px` | `--s2: 8px` | `--s3: 16px` | `--s4: 24px` | `--s5: 32px` | `--s6: 48px`

### Key Visual Patterns
- **Hard-edge borders:** `4px solid var(--charcoal)` (`--border`)
- **Offset shadows:** `5px 5px 0 var(--charcoal)` (`--shadow`)
- **Card lift:** `translateY(-4px)` + vermilion shadow on hover
- **Section titles:** Kanji via CSS `::before { content: attr(data-kanji) }`
- **Section reveal:** IntersectionObserver-driven fade+translate
- **Scroll progress:** Fixed 4px vermilion bar at top of page
- **Buttons:** Hard-edge 2px border, offset shadow, hover lift, active press
- **Transitions:** Three-tier easing — `--ease-fast: 0.15s ease`, `--ease: 0.22s cubic-bezier(0.16,1,0.3,1)`, `--ease-slow: 0.4s cubic-bezier(0.16,1,0.3,1)`

---

## Architecture

### Route Structure (`src/routes/`)

```
+page.svelte          Landing page (hero + features), redirects to /dashboard if authed
+layout.svelte        Root layout — auth check, Loader, scroll progress bar
+layout.ts            Sets ssr = false
+error.svelte         Themed error boundary (404/500)
login/+page.svelte   Sign in / Sign up form, greatwave.jpg full-screen bg
dashboard/+page.svelte   Main app — overview, chart, holdings, watchlist, market rankings
dashboard/+layout.server.ts  Server-side auth redirect (SSR)
settings/+page.svelte      Account info, wallet connect
settings/+layout.server.ts  Server-side auth redirect (SSR)
```

### API Routes (`src/routes/api/`)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/login` | POST | Login, sets session cookie |
| `/api/auth/signup` | POST | Create account, sets session cookie |
| `/api/auth/logout` | POST | Clear session cookie |
| `/api/auth/me` | GET | Return current user from cookie |
| `/api/holdings` | GET/POST | List/add holdings |
| `/api/holdings/[id]` | DELETE | Remove holding |
| `/api/watchlist` | GET/POST | List/add watchlist items |
| `/api/watchlist/[id]` | DELETE | Remove watchlist item |
| `/api/wallet/balances` | POST | Fetch on-chain balances via Alchemy |
| `/api/market/top` | GET | Top 100 coins from CoinGecko |
| `/api/market/simple` | GET | Simple price for coin IDs |
| `/api/market/[coinId]` | GET | Coin detail + history |

### Server Modules (`src/lib/server/`)

| File | Purpose |
|------|---------|
| `db.ts` | Turso client singleton |
| `migrate.ts` | Auto-create tables on startup |
| `auth.ts` | bcrypt hash/verify + JWT sign/verify |
| `coingecko.ts` | CoinGecko fetcher with TTL cache + pending-promise dedup |
| `alchemy.ts` | Alchemy lazy singleton for on-chain data |

### Client Stores (`src/lib/stores/`)

| Store | File | Key State |
|-------|------|-----------|
| `auth` | `auth.svelte.ts` | `user`, `loading` — login/signup/logout/check |
| `portfolio` | `portfolio.svelte.ts` | `holdings`, `watchlist`, `marketCoins`, `prices`, `walletData`, `totalValue` (derived), `totalChange24h` (derived) |

### Components (`src/lib/components/`)

| Component | Purpose |
|-----------|---------|
| `Nav.svelte` | Sticky top nav — Seigaiha pattern bg, brand, settings, username, logout |
| `Loader.svelte` | Full-screen loading — animated ring + wave path + 風 kanji |
| `GreatWaveArt.svelte` | 220px greatwave.jpg banner for dashboard/settings |
| `SeigaihaPattern.svelte` | SVG wave scale pattern for nav overlay |
| `PortfolioOverview.svelte` | Total portfolio value, 24h change, asset count, wallet badge |
| `PortfolioChart.svelte` | Lightweight Charts line chart with timeframe buttons |
| `HoldingsTable.svelte` | Holdings list — desktop table + mobile card layout, add/remove |
| `WalletConnect.svelte` | MetaMask connect button (callback prop `onconnected`) |
| `AddressInput.svelte` | Manual address paste + validation (callback prop `onconnected`) |
| `MarketRankings.svelte` | Top 100 coins table with search, add-to-watchlist |
| `Watchlist.svelte` | Watched coins list with price/change |

### Actions (`src/lib/actions.ts`)
- `reveal(node)` — IntersectionObserver that adds `visible` class for scroll-triggered animations

---

## Data Flow

1. **Auth:** `+layout.svelte` calls `auth.check()` on mount → sets `auth.user` → children render
2. **Dashboard:** `portfolio.fetchAll()` fetches holdings, watchlist, market coins in parallel
3. **Price polling:** `portfolio.startPricePolling()` runs every 60s, clears on unmount
4. **Wallet import:** MetaMask connect or address paste → `POST /api/wallet/balances` (Alchemy) → auto-adds ETH + ERC-20 tokens as holdings with `source: 'wallet'`
5. **CoinGecko:** All requests go through `withCache()` (TTL: 5min top coins, 1min simple price, 5min detail/history) with pending-promise dedup to prevent cache stampede

---

## Auth Flow

- JWT stored in `session` cookie (`httpOnly`, `secure`, `sameSite: lax`, 7d maxAge)
- `hooks.server.ts` decodes JWT → sets `event.locals.user`
- `+layout.server.ts` for dashboard/settings redirects to `/login` if no user
- API routes check `if (!locals.user)` for protected endpoints
- Logout clears cookie server-side + sets `auth.user = null`

---

## Database Schema (Turso — libSQL)

```sql
users     — id, username (unique), password_hash, wallet_address, created_at
holdings  — id, user_id, coin_id, contract_address, amount, purchase_price, purchase_date, source ('manual'|'wallet'), created_at
watchlists — id, user_id, coin_id, created_at
```

Auto-migrated on server start via `migrate.ts`.

---

## External APIs

| API | Auth | Usage | Rate Limits |
|-----|------|-------|-------------|
| CoinGecko | None (public) | Market data, prices, history | ~10-30 req/min (public) |
| Alchemy SDK | API key (`ALCHEMY_API_KEY`) | On-chain ETH + ERC-20 balances | Varies by plan |
| MetaMask | Browser wallet | Address discovery via `eth_requestAccounts` | N/A |

---

## Environment Variables

| Variable | Required | Used In |
|----------|----------|---------|
| `TURSO_DB_URL` | Yes | Turso database URL |
| `TURSO_AUTH_TOKEN` | Yes | Turso auth token |
| `JWT_SECRET` | Yes | JWT signing secret |
| `ALCHEMY_API_KEY` | Yes | Alchemy SDK for on-chain data |

Set on Vercel: `vercel env add TURSO_DB_URL` (etc.)

---

## Deployment

- **Host:** Vercel (serverless)
- **Adapter:** `@sveltejs/adapter-vercel` via `vite.config.ts`
- **Build:** `npm run build` (or Vercel auto-detects)
- **Live:** https://kazecrypto.vercel.app

---

## File Tree (src/)

```
src/
  app.html                    — HTML shell, Google Fonts, favicon
  app.css                     — Design tokens, global styles (.btn, .panel, .input, .reveal, .section-title)
  hooks.server.ts             — JWT cookie decode, auto-migrate DB
  lib/
    actions.ts                — reveal() IntersectionObserver action
    components/
      Nav.svelte              — Sticky nav, Seigaiha pattern, scroll shadow
      Loader.svelte           — Animated loading screen
      GreatWaveArt.svelte     — 220px wave banner
      SeigaihaPattern.svelte  — SVG wave scale pattern
      PortfolioOverview.svelte — Total value, 24h change, wallet badge
      PortfolioChart.svelte   — Lightweight Charts line chart
      HoldingsTable.svelte    — Desktop table + mobile cards, add/remove
      WalletConnect.svelte    — MetaMask connect button
      AddressInput.svelte     — Manual address input + validation
      MarketRankings.svelte   — Top 100 searchable table
      Watchlist.svelte        — Watched coins list
    server/
      db.ts                   — Turso client singleton
      migrate.ts              — Schema auto-migration
      auth.ts                 — bcrypt + JWT helpers
      coingecko.ts            — CoinGecko with TTL cache + dedup
      alchemy.ts              — Alchemy lazy singleton
    stores/
      auth.svelte.ts          — Auth store (login, signup, logout, check)
      portfolio.svelte.ts     — Portfolio store (holdings, prices, watchlist, wallet, polling)
  routes/
    +page.svelte              — Landing page
    +layout.svelte            — Root layout (auth gate, loader, scroll progress)
    +layout.ts                — ssr = false
    +error.svelte             — Error boundary
    login/+page.svelte        — Sign in / sign up
    dashboard/+page.svelte    — Dashboard
    dashboard/+layout.server.ts — SSR auth guard
    settings/+page.svelte     — Account settings
    settings/+layout.server.ts — SSR auth guard
    api/auth/*                — Login, signup, logout, me
    api/holdings/*            — CRUD holdings
    api/watchlist/*           — CRUD watchlist
    api/wallet/balances       — Import wallet via Alchemy
    api/market/*              — CoinGecko proxy (top, simple, detail)
```

---

## Recent Work (2026-07-13)

- UI/UX Pro Max skill applied — Exaggerated Minimalism landing, oversized typography (`clamp(4rem, 12vw, 10rem)`), dashboard 3-col grid at 1024px+, mobile card layouts, scroll-aware nav shadow, CSS variable-driven chart colors, refined easing curves, emoji audit (all replaced with SVG icons)
- See commit `ae26362`
