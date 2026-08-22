# The Artrobe — Artist Portfolio

## Project

Artisanal digital portfolio for Jahnvi. High-performance, immersive feel.
Deployed via Netlify (`netlify.toml`).

## Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Content:** Static TS data in `src/data/` (artworks) + Markdown with gray-matter (journal)
- **Build output:** `out/` (static export)

## Architecture notes

- Gallery tap-to-detail uses `/gallery/[id]` routing via `ArtworkDetail.tsx`
- StoryPanel overlay is only used on the home Featured section (`HomeClient.tsx`)
- Use `router.push()` for tap-to-detail on mobile — fixed-position overlays break on Android Chrome due to compositor fling in vertical scroll contexts

## Commands

```bash
npm run dev      # dev server
npm run build    # static export to out/
npm run start    # preview build
```

## Key paths

```
src/
  app/            ← App Router pages
  components/     ← UI components
  data/           ← artwork & content definitions
  lib/            ← utilities
out/              ← static build output (gitignored)
```
