# Kaze

A crypto portfolio tracker. Japanese-themed, built with SvelteKit.

Kaze means "wind" in Japanese. In Hokusai's *The Great Wave off Kanagawa*, the wind drives the wave. Kaze helps you track your Ethereum portfolio.

## Features

- Wallet Import -- MetaMask or any Ethereum address via Alchemy
- Live Prices -- prices and market data from CoinGecko
- Portfolio Chart -- TradingView Lightweight Charts with multiple timeframes
- Holdings Table -- track coins you own
- Market Rankings -- top 100 coins by market cap
- Watchlist -- track coins you are interested in
- Great Wave Design -- ukiyo-e inspired interface with Hokusai's Great Wave
- User Accounts -- JWT auth with Turso (libSQL)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | SvelteKit + TypeScript + Svelte 5 Runes |
| Database | Turso (libSQL) |
| Auth | JWT (bcryptjs + jsonwebtoken) |
| Charts | Lightweight Charts (TradingView) |
| Prices | CoinGecko API (free, no key) |
| On-chain | Alchemy SDK |
| Wallet | MetaMask (ethers) |
| Styling | Custom CSS with Japanese design tokens |
| Deploy | Vercel |

## Getting Started

```bash
git clone https://github.com/nicholohq/Kaze.git
cd kaze
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```
TURSO_DB_URL=libsql://kaze-nicholohq.aws-ap-northeast-1.turso.io
TURSO_AUTH_TOKEN=your_turso_token
JWT_SECRET=your_random_secret
ALCHEMY_API_KEY=your_alchemy_key
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Deployment

Deploy to Vercel with the environment variables above. The database schema auto-migrates on first start.

## Project Structure

```
src/
  lib/
    components/     UI components
    server/         Server-side utilities
    stores/         Svelte 5 runes stores
  routes/
    api/            API routes (auth, holdings, market, wallet, watchlist)
    dashboard/      Main app
    login/          Auth page
    settings/       User preferences
  app.css           Design system
```
