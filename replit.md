# Breathwork

A sophisticated breathwork timer with 24 techniques, animated ring, Web Audio API tones, session tracking, heatmap, history log, and goal-based technique picker.

## Run & Operate

- `pnpm --filter @workspace/breathwork run dev` — run the breathwork app (port 18595)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite 7, plain CSS (no Tailwind)
- Audio: Web Audio API (synthesized tones, bee hum, pump sounds)
- State: localStorage (no backend needed)
- Fonts: Cormorant Garamond + Newsreader (Google Fonts)

## Where things live

- `artifacts/breathwork/` — the main React app (pure frontend)
  - `src/App.tsx` — root component, page navigation (goal ↔ session)
  - `src/components/GoalScreen.tsx` — Page 1: intent selection + picker overlay
  - `src/components/SessionScreen.tsx` — Page 2: breath engines, tabs, options
  - `src/components/BreathRing.tsx` — animated SVG ring with phase colors
  - `src/components/NostrilIndicator.tsx` — nostril L/R indicator for nadi techniques
  - `src/components/InfoDrawer.tsx` — collapsible technique info panels
  - `src/components/Tracker.tsx` — streak + session count stats
  - `src/components/Heatmap.tsx` — 90-day activity heatmap
  - `src/components/HistoryPanel.tsx` — session history log + CSV export
  - `src/components/ReferenceTable.tsx` — quick-reference situation→technique table
  - `src/data/goals.ts` — 12 goal categories with technique choices
  - `src/data/techniques.ts` — 24 technique definitions, phases, YT links, reference table
  - `src/hooks/useAudio.ts` — Web Audio API tones (inhale, exhale, hold, hum, pump, done)
  - `src/hooks/useSessionStorage.ts` — localStorage session persistence + streak calc

## Architecture decisions

- Pure frontend — no backend, no database, no API calls. All state in localStorage.
- CSS Modules approach: each component has a matching `.css` file (no Tailwind) to preserve the original dark-theme design system exactly.
- Four breath engines: `startDuration` (most techniques), `startPump` (kapalabhati/bhastrika), `startBhramari` (with synthesized hum), `startWimHof` (multi-round with interactive retention).
- Design tokens in `src/index.css` root vars: `--bg`, `--card`, `--gold`, `--gdim`, `--text`, `--dim`, `--faint`, `--grn`, `--pur`, `--fire`, `--ice`, `--sun`, `--moon`.

## Product

A complete breathwork practice app featuring:
- **24 techniques** across 4 breath engines
- **Goal-based technique picker** (12 intentions: energy, focus, sleep, calm, spiritual, etc.)
- **Animated SVG ring** that fills during each phase, color-coded by phase type
- **Nostril indicator** for nadi shodhana techniques
- **Web Audio API** synthesized tones for every phase + Bhramari bee hum
- **Session tracker** with day streak and total count
- **90-day activity heatmap** with intensity levels
- **Session history** with CSV export
- **Quick reference table** linking situations to ideal techniques
- **Collapsible info drawers** with full technique descriptions for all 24 methods

## User preferences

_Populate as needed._

## Gotchas

- The breathwork app is pure frontend — no backend needed.
- Audio requires user gesture (tap Begin) before first tone due to browser AudioContext policy.
- The Wim Hof engine uses interactive retention: user taps "Breathe now" to end the hold phase.
- `localStorage` key is `breathwork_v4`.
