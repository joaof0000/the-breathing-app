# The Breathing App

A sophisticated breathwork timer featuring 24 techniques, an animated breath ring, synthesized audio tones, session tracking, and a goal-based technique picker.

## Features

- **24 breathing techniques** — Wim Hof, Box Breathing, Bhramari, Kapalabhati, 4-7-8, Tummo, and many more
- **15 goal categories** — Energy, Focus, Sleep, Calm, Anger, Trauma, Grief, Bleak, and more
- **Animated breath ring** — SVG ring that fills during each phase, colour-coded by phase type
- **Web Audio API** — synthesised tones for every phase, bee hum for Bhramari
- **Session tracking** — day streak, total sessions, 90-day activity heatmap
- **Session history** — with mood log and CSV export
- **Favourites** — heart any technique for instant access
- **Goal-based picker** — choose your intention, get the right technique + classical music suggestion
- **Multilingual** — English, Portuguese, Spanish
- **Gratitude moments** — optional pre-session reflection

## Tech Stack

- React 18 + Vite 7
- TypeScript 5.9
- Plain CSS (no Tailwind)
- Web Audio API (no external audio dependencies)
- localStorage (no backend required)
- pnpm workspaces monorepo

## Running Locally

```bash
# Install dependencies
pnpm install

# Start the breathwork app
pnpm --filter @workspace/breathwork run dev
```

The app runs on the port defined by the `PORT` environment variable.

## Project Structure

```
artifacts/breathwork/src/
  components/     # UI components (BreathRing, GoalScreen, SessionScreen, …)
  data/           # Technique and goal definitions
  hooks/          # Audio, session storage, favourites
  i18n/           # EN / PT / ES translations
```

## Live App

Deployed at [Replit](https://replit.com).
