# Breathwork — Product Roadmap

A living document of feature ideas, organized by category and effort. Use this to decide what to build next. Mark ideas with ✅ when shipped, ⏳ when in progress, ❌ when ruled out.

---

## Where we are today

- 24 breathing techniques across 4 engines (duration, pump, bhramari, Wim Hof)
- Goal-based technique picker (12 intentions)
- Animated SVG ring with phase colors
- Web Audio API tones (inhale, exhale, hold, hum, pump, done)
- Session tracker: day streak + total count
- 90-day activity heatmap
- Session history with CSV export
- Quick-reference situation→technique table
- Collapsible info drawers for all 24 techniques
- Post-session journal: mood rating (1–5 emoji) + optional note
- Resume shortcut for last practiced technique
- Minimal single-screen onboarding
- Multi-language support (EN, PT, ES)
- Sacred geometry animated background
- Google Analytics (GA4)

---

## Quick wins — high impact, under a day each

| Idea | Status | Notes |
|---|---|---|
| Wake lock | | Screen stays on during sessions. One function call — `navigator.wakeLock.request('screen')`. Every competing app has this. Without it the phone dims and breaks focus mid-practice. |
| Ambient soundscapes | | Rain, forest, Tibetan bowls, brown noise, ocean. Layered under breath tones via existing Web Audio. User picks one per session. Transforms the feel of a session. |
| Streak milestone ceremony | | At 7, 21, 66, 100 days — a full-screen animated moment with a unique symbol and a short message ("66 days. Habit confirmed."). Option to share. Turns the streak from a number into an event. |
| Session summary share card | | After a session, generate a PNG: technique name, duration, mood shift, streak, app branding. Ready for Instagram or WhatsApp. Highest-ROI marketing feature — users share it, others find the app. |
| "Technique of the day" | | A curated daily suggestion on the home screen. Drives discovery — most users settle into 2–3 techniques and stop exploring. |
| Session presets | | One-tap combos: "Quick 2 min", "Focus burst 5 min", "Sleep wind-down 10 min". Reduces friction for returning users. |
| Mood trend chart | | Visualize mood ratings from the journal over 30/90 days. Add an insight line: "Your mood improves 34% on days you practice." SVG only, no library needed. Data already exists. |

---

## Medium effort — 1 to 3 days each

| Idea | Status | Notes |
|---|---|---|
| Guided programs | | **Highest retention feature in any competing app.** Structured multi-day courses: "21-day calm", "7-day energy reset", "30-day Wim Hof challenge". Each day: technique + duration + reflection prompt. Visual journey map. This is what separates Calm and Othership from timer apps. Without it users plateau and churn. |
| Smart recommendation engine | | On app open, suggest a technique based on time of day, mood trend, historical usage, streak. No ML needed — a simple rule tree feels magical. "It's 10pm and your last 3 sessions were stressful — try 4-7-8." |
| Custom technique builder | | Define your own pattern: inhale / hold / exhale / hold. Name it. It appears in the technique list. Stored in localStorage. Optional: share as a URL code. |
| Science cards | | Each technique gets a "Research" pull-up: 1–2 cited studies (PubMed links), a one-line finding, the body mechanism. Makes the app credible. Helps users explain their practice to skeptics. |
| Guided intro program | | 5 sessions that teach breathing before free practice opens. Replaces static onboarding with a week of real learning. Day 1: belly breathing. Day 2: box breathing. Day 3: 4-7-8. Day 4: Wim Hof round 1. Day 5: pick your own. |
| Curated situation collections | | "Pre-flight anxiety kit", "Morning runner's warmup", "Bedtime in 7 minutes", "Mid-meeting reset (silent)". Makes the app feel like it knows you. |

---

## Larger investments — 3 to 7 days

| Idea | Status | Notes |
|---|---|---|
| Guided voice instructions | | A calm voice reads each phase: "Inhale deeply… hold… exhale slowly…" Changes the category from timer app to guided practice. Options: (1) Web Speech API — free, device voice, available now, robotic; (2) Pre-recorded clips — warm and professional, requires production; (3) AI voice via ElevenLabs — natural, costs per character. |
| Native mobile app (Expo) | | Biggest distribution lever. Adds haptic feedback at every phase, wake lock, home screen icon, push notification reminders. Users return to installed apps, not bookmarked websites. |
| Apple Health / Google Fit integration | | Auto-log "Mindful Minutes" after each session. Appears in the user's health summary. High credibility. Strong habit loop reinforcement. |
| Wearable integration | | Real-time heart rate overlaid on the breath ring during a session. No other breathwork app does this seamlessly. Would be a flagship differentiator. |

---

## Social & community

| Idea | Status | Notes |
|---|---|---|
| 30-day challenge with a friend | | Send an invite link. Both track streaks together. Simple accountability loop. |
| Anonymous community leaderboard | | "You're in the top 8% of practitioners this week." Lightweight, no accounts needed — just a shared counter. |
| Practitioner profiles | | Optional public page: techniques used, streak, favorite practice. Community discovery. |

---

## Accessibility

| Idea | Status | Notes |
|---|---|---|
| Reduced motion mode | | Disable the ring animation, use color + text only. |
| Voice control | | "Begin", "Stop", "Next technique" via speech recognition. |
| Font size controls | | Scale all text independently of system settings. |
| High contrast mode | | For visually impaired users. |

---

## Monetization paths

| Model | Pros | Cons |
|---|---|---|
| Freemium (6 free / 24 pro) | Scalable, recurring revenue | Friction, hard conversion |
| One-time purchase ($9.99 "Pro Pack") | Simple, trusted by this audience | No recurring revenue |
| Guided programs as paid add-ons | High perceived value | Requires content investment |
| Coaching marketplace | High revenue potential | Complex, long-term build |

---

## Platform & distribution

| Idea | Status | Notes |
|---|---|---|
| PWA (installable web app) | | Add `manifest.json` + service worker. Users install to home screen on any device. Gets push notifications on Android. Half a day of work. |
| Daily reminder | | User sets a preferred practice time. Push notification fires if they haven't practiced. Works via PWA on Android, requires native app on iOS. |
| App Store listing | | Requires native Expo app first. Then list on App Store and Google Play. |
| SEO landing page | | A fast static page at the root explaining the app, with technique descriptions. Drives organic search traffic. |

---

## Priority matrix

| Feature | Retention | Acquisition | Effort |
|---|---|---|---|
| Wake lock | ★★★ | — | XS |
| Ambient soundscapes | ★★★ | ★★ | S |
| Mood trend chart | ★★★ | — | S |
| Streak milestone ceremony | ★★★★ | ★★ | S |
| Session summary share card | ★★ | ★★★★ | S |
| Guided programs | ★★★★★ | ★★★ | M |
| Smart recommendation | ★★★★ | ★★ | M |
| Science cards | ★★★ | ★★★ | M |
| Guided voice | ★★★★ | ★★★★ | M–L |
| Native mobile app | ★★★★★ | ★★★★★ | L |
| Apple Health integration | ★★★★ | ★★★ | L |

---

## Suggested next 3 to ship

1. **Wake lock** — removes a daily friction point. 1 hour of work.
2. **Ambient soundscapes** — makes sessions feel immersive and intentional. 1 day.
3. **Guided programs** — the retention engine. 2–3 days. The single biggest gap between this app and the paid category leaders charging $60/year.
