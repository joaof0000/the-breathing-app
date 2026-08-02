# Breathwork — Product Roadmap

A living document of feature ideas, organized by category and effort. Updated August 2026.

---

## Where we are today

### Web app (merged and live)
- 24 breathing techniques across 4 engines (duration, pump, bhramari, Wim Hof)
- Goal-based technique picker (12 intentions)
- Animated SVG ring with phase colors
- Web Audio API tones (inhale, exhale, hold, hum, pump, done)
- Background audio layer: nature sounds + Solfeggio frequencies (synthesized)
- Voice-guided cues — ElevenLabs-generated MP3s, male/female voice picker, volume control
- Session tracker: day streak + total count
- 90-day activity heatmap
- Session history with CSV export
- Quick-reference situation→technique table
- Collapsible info drawers for all 24 techniques, including nostril sequence diagrams
- Post-session journal: mood rating (1–5 emoji) + optional note
- Resume shortcut for last practiced technique
- Single-screen onboarding + name + daily intention personalization
- Multi-language support (EN, PT, ES)
- Sacred geometry animated background
- Google Analytics (GA4)

### Mobile app — Expo (merged and live)
- Same 24 techniques + goal-based picker
- Animated breath ring with haptic feedback at every phase
- Session history, 90-day heatmap, streak tracking
- Nostril indicator during alternate-nostril sessions
- Technique info drawer

---

## Active queue — accepted work in progress or pending merge

| Task | Status | What it adds |
|---|---|---|
| #42 Fix Expo TypeScript config | Merging | Clean `tsc --noEmit` for mobile; unblocks all future mobile type-safety |
| #43 Breath tone volume (mobile) | Active — built, pending merge | 5-bar volume stepper (20–100%) for audio tones; quick mute/unmute toggle; persisted |
| #44 Spoken breath cues (mobile) | Active — built, pending merge | Voice instructions at each phase via expo-speech; on/off toggle; persisted |
| #46 Technique info on the pick screen | Active | Users can read about a technique before committing to a session |
| #47 Web technique info drawer (desktop) | Active | Info drawer accessible on the web pick screen |

---

## Proposed — drafted, not yet accepted

| Task | Effort | Notes |
|---|---|---|
| #20 Mood trend chart | S | 30/90-day view of mood ratings. Data already exists. Add one insight line ("Your mood improves 34% on days you practice"). Turns passive logging into a reason to keep opening the app. |
| #23 GA event tracking | XS | Track technique chosen, session finished, mood rated. Without this you're flying blind on what users actually do. Foundation for every product decision. |
| #26 Export / import session history | S | Backup and restore via JSON. Trust signal for power users who worry about losing their data. |
| #48 Nostril diagram in mobile detail screens | XS | Parity with web — nostril sequence shown in mobile technique detail |
| #49 Nostril labels in user's language | XS | i18n polish for nostril sequence labels |
| #51 Catch mobile type errors before they ship | S | Automated type-checking gate for the mobile app |
| #52 Keep the screen on during sessions | XS | Wake Lock API — screen stays on for the full session duration |
| #53 Session summary share card | S | Post-session PNG (technique, duration, mood shift, streak, branding) for social sharing |
| #54 Structured multi-day programs | M | "21-day calm", "7-day energy reset", "30-day Wim Hof challenge" — the retention engine |

---

## Quick wins — high impact, under a day each

| Idea | Status | Notes |
|---|---|---|
| Wake lock | Proposed (#52) | Screen stays on during sessions. One function call. Every competing app has this. Without it the phone dims and breaks focus mid-practice. |
| Streak milestone ceremony | | At 7, 21, 66, 100 days — a full-screen animated moment with a unique symbol and a short message ("66 days. Habit confirmed."). Option to share. Turns the streak from a number into an event. |
| Session summary share card | Proposed (#53) | After a session, generate a PNG: technique name, duration, mood shift, streak, app branding. Ready for Instagram or WhatsApp. **Highest-ROI acquisition feature on the list** — users share it, others find the app. |
| "Technique of the day" | | A curated daily suggestion on the home screen. Drives discovery — most users settle into 2–3 techniques and stop exploring. |
| Session presets | | One-tap combos: "Quick 2 min", "Focus burst 5 min", "Sleep wind-down 10 min". Reduces friction for returning users. |
| Mood trend chart | Proposed (#20) | Visualize mood ratings from the journal over 30/90 days. SVG only, no library needed. Data already exists. |
| Ambient soundscapes | | Rain, forest, Tibetan bowls, brown noise, ocean. Layered under breath tones via existing Web Audio plumbing. User picks one per session. |
| Guided voice instructions | ✅ Web · ⏳ Mobile | Web app ships pre-recorded ElevenLabs clips (male/female). Mobile spoken cues are implemented but not merged yet — Task #44 remains pending. |

---

## Medium effort — 1 to 3 days each

| Idea | Status | Notes |
|---|---|---|
| Guided programs | Proposed (#54) | **Highest retention feature in any competing app.** "21-day calm", "7-day energy reset", "30-day Wim Hof challenge". Each day: technique + duration + reflection prompt. Visual journey map. This is what separates Calm and Othership from timer apps. Without it users plateau and churn. |
| Smart recommendation engine | | On app open, suggest a technique based on time of day, mood trend, historical usage, streak. No ML needed — a simple rule tree feels magical. "It's 10pm and your last 3 sessions were stressful — try 4-7-8." |
| Custom technique builder | | Define your own pattern: inhale / hold / exhale / hold. Name it. It appears in the technique list. Stored in localStorage. Optional: share as a URL code. |
| Science cards | | Each technique gets a "Research" pull-up: 1–2 cited studies (PubMed links), a one-line finding, the body mechanism. Makes the app credible. Helps users explain their practice to skeptics. |
| Guided intro program | | 5 sessions that teach breathing before free practice opens. Day 1: belly breathing. Day 2: box breathing. Day 3: 4-7-8. Day 4: Wim Hof round 1. Day 5: pick your own. |
| Curated situation collections | | "Pre-flight anxiety kit", "Morning runner's warmup", "Bedtime in 7 minutes", "Mid-meeting reset (silent)". Makes the app feel like it knows you. |

---

## Larger investments — 3 to 7 days

| Idea | Status | Notes |
|---|---|---|
| Native mobile app (Expo) | ✅ Merged | Haptic feedback, info drawers, heatmap, streak. Voice cues and volume control built, pending merge (#43/#44). |
| Apple Health / Google Fit integration | | Auto-log "Mindful Minutes" after each session. Appears in the user's health summary. High credibility. Strong habit loop reinforcement. |
| PWA (installable web app) | | `manifest.json` + service worker. Users install to home screen on any device. Gets push notifications on Android. Half the retention benefit of native at a fraction of the build cost. |
| Daily reminder (push notification) | | User sets a preferred practice time. Fires if they haven't practiced. Works via PWA on Android, requires native on iOS. |
| Wearable integration | | Real-time heart rate overlaid on the breath ring during a session. No other breathwork app does this seamlessly. Flagship differentiator. |

---

## Platform & distribution

| Idea | Status | Notes |
|---|---|---|
| GitHub auto-sync | ✅ Merged | Every change pushed to GitHub automatically. |
| App Store listing | | Expo app is ready. Listing on App Store and Google Play is the biggest remaining distribution lever. |
| SEO landing page | | A fast static page at the root explaining the app, with technique descriptions. Drives organic search traffic. |

---

## Social & community

| Idea | Notes |
|---|---|
| 30-day challenge with a friend | Send an invite link. Both track streaks together. Simple accountability loop. |
| Anonymous community leaderboard | "You're in the top 8% of practitioners this week." Lightweight, no accounts needed — just a shared counter. |
| Practitioner profiles | Optional public page: techniques used, streak, favorite practice. Community discovery. |

---

## Accessibility

| Idea | Notes |
|---|---|
| Reduced motion mode | Disable the ring animation, use color + text only. |
| Voice control | "Begin", "Stop", "Next technique" via speech recognition. |
| Font size controls | Scale all text independently of system settings. |
| High contrast mode | For visually impaired users. |

---

## Monetization paths

| Model | Pros | Cons |
|---|---|---|
| Freemium (6 free / 24 pro) | Scalable, recurring revenue | Friction, hard conversion |
| One-time purchase ($9.99 "Pro Pack") | Simple, trusted by this audience | No recurring revenue |
| Guided programs as paid add-ons | High perceived value, natural upsell | Requires content investment |
| Coaching marketplace | High revenue potential | Complex, long-term build |

---

## Priority matrix — unbuilt or unmerged features

| Feature | Retention | Acquisition | Effort | Verdict |
|---|---|---|---|---|
| GA event tracking (#23) | — | — | XS | **Do first** — zero UI, makes every future decision smarter |
| Wake lock (#52) | ★★★ | — | XS | **Do first** — removes the #1 daily frustration point |
| Session summary share card (#53) | ★★ | ★★★★ | S | **Do next** — highest acquisition ROI on the list |
| Mood trend chart (#20) | ★★★ | — | S | **Do next** — data exists, just needs a chart |
| Streak milestone ceremony | ★★★★ | ★★ | S | High retention, shareable moment |
| Ambient soundscapes | ★★★ | ★★ | S | Transforms session feel; Web Audio plumbing already in place |
| Session presets | ★★★ | ★ | S | Cuts friction for returning users |
| Guided programs (#54) | ★★★★★ | ★★★ | M | **Biggest long-term bet** — the retention engine |
| Smart recommendation | ★★★★ | ★★ | M | High retention, rule-tree not ML |
| Science cards | ★★★ | ★★★ | M | Credibility + shareability |
| PWA | ★★★★ | ★★★ | S–M | Big distribution gain for low effort |
| Apple Health integration | ★★★★ | ★★★ | L | Strong habit loop |
| App Store listing | ★★★★ | ★★★★★ | L | Biggest distribution move remaining |

---

## Suggested next 3 to ship

1. **GA event tracking** (#23) — already proposed. XS effort. Track technique chosen, session finished, mood rated. Without real event data you can't know which techniques users pick, where they drop off, or whether mood tracking drives retention. Costs almost nothing to add.
2. **Wake lock + session summary share card** (#52 + #53) — two XS/S wins. Wake lock fixes the screen-dimming frustration in one API call. The share card turns every completed session into organic marketing. Ship them together in one pass.
3. **Guided programs** (#54) — the retention engine. Everything else keeps users for a session; this keeps them for months. The gap between this app and the paid category leaders charging $60/year.
