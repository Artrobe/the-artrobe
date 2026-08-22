# The Artrobe — Refactoring Audit

_Audit only. No code changed. Findings ranked by impact ÷ risk._
_Date: 2026-07-07 · Scope: `src/` (39 files, ~5,150 LOC) · typecheck: clean · build: passing_

## Overall verdict

The codebase is **healthy and coherent**, not in distress. Sensible structure
(`app/` / `components/` / `components/ui/` / `data/` / `lib/`), passes typecheck,
builds, deploys. There is **no correctness bug** driving a refactor. What follows
is maintainability debt — worth addressing incrementally, not in one risky sweep.

The single dominant issue is **inline styling everywhere despite Tailwind being
installed**. Everything else is minor.

---

## Findings

### 1. Inline styles instead of Tailwind — the main debt · HIGH impact / MED risk
Tailwind is installed and configured but barely used. Pages carry huge inline
`style={{...}}` objects: `workshop` 93, `scan` 50, `about` 42, `ArtworkDetail` 40,
`contact` 22. `fontFamily: 'var(--sans)'` alone is repeated **141 times**;
`var(--serif)` 53 times.

- **Cost:** every text block re-declares font/size/spacing/color by hand. Visual
  consistency is maintained by copy-paste, not by shared classes. Changing the
  body font means editing ~140 sites.
- **Fix (incremental):** extract repeated patterns into a few semantic component
  classes or `@apply` rules in `globals.css` (e.g. `.eyebrow`, `.section-title`,
  `.body-copy`, `.pill-button`). Migrate **one page at a time**, visually verifying
  each — this is a live portfolio where the look *is* the product.
- **Risk:** real regression risk on layout. Do not do in bulk.

### 2. `Artwork` type + mapping duplicated across two files · MED impact / LOW risk
`interface Artwork` is declared in **both** `src/lib/airtable.ts` and
`src/data/artworks.ts` (different shapes — the data file uses nested `story.chapterN`,
the lib uses flat `storyN` + `chapterNHeading`). `fallbackToArtwork()` exists solely
to bridge them.

- **Cost:** two sources of truth for the core domain object; easy to update one and
  forget the other.
- **Fix:** pick the flat `Artwork` (lib) as canonical, export it once, and make the
  static data conform (or keep a clearly-named `RawArtwork` for the nested authoring
  shape). Low risk — pure type/data reshaping, verifiable by typecheck + build.

### 3. `data.records.map((r: any) => ...)` — the only `any` in the codebase · LOW / LOW
`src/lib/airtable.ts:46`. The Airtable response is untyped.
- **Fix:** add a minimal `AirtableRecord` interface for the fields you read. Cheap,
  removes the lone `any`, catches field-name typos.

### 4. Nav rendered per-page, not in layout · LOW impact / MED risk
`TopBar` + `BottomNav` are rendered inside `PageShell` and again directly in
`ArtworkDetail` (which bypasses `PageShell`). `layout.tsx` renders neither.
- **Observation:** this is deliberate — `ArtworkDetail` needs a different chrome
  (back button, scroll story) than the standard pages. Not a bug.
- **Optional:** only worth touching if you want one canonical shell. Higher risk than
  reward right now. **Recommend: leave as-is.**

### 5. Reels hardcoded in multiple files · LOW / LOW
Instagram permalinks live in `HomeClient.tsx`, `workshop/page.tsx`, and reel embed
logic in `InstagramReel.tsx`. `Footer` and `contact` each repeat the full
`instagram.com/the.artrobe?igsh=...` profile URL.
- **Fix:** centralize the profile URL + reel lists in one `src/data/social.ts`.
  Trivial, removes copy-paste drift.

### 6. `console.error` left in production data path · TRIVIAL
`src/lib/airtable.ts:40`. Fine for a build-time fetch, but noisy. Optional: gate
behind `process.env.NODE_ENV !== 'production'` or leave it (it only runs server-side
at build). **Recommend: leave.**

---

## What I'd deliberately NOT do

- **Full stylesheet rewrite in one pass** — too much churn, real visual-regression
  risk, no bug being fixed.
- **Collapsing nav into layout** (finding 4) — the current split is intentional.
- **Adding a state library / data-fetching abstraction** — the app is small and
  static; current `useState` + build-time fetch is appropriate.

## Suggested order if/when you act

1. Finding 5 (centralize social data) — trivial, zero visual risk
2. Finding 2 + 3 (unify `Artwork` type, kill the `any`) — typecheck-verifiable
3. Finding 1 (inline → Tailwind) — **only incrementally, one page + visual check at a time**

Everything else: leave it.
