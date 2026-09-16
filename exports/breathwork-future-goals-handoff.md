# Breathwork — Future Goals & AI Handoff

Exported: 17 September 2026

## Purpose and instructions for the next AI

This is a portable planning document, not authorization to implement or queue work. The owner requested that all updates stop. Preserve these goals for later review; ask which goal to resume before making changes. No tasks were started, accepted, cancelled or merged by this export.

Source: current project task records, the existing ROADMAP.md, and the recent design/backup conversation. Platform status is recorded honestly: cancellation was requested but not confirmed. There are 20 outstanding records: 17 drafts, 2 queued tasks, and 1 ready but unmerged task. Do not assume a ready task is present in the GitHub source.

Repository: https://github.com/joaof0000/the-breathing-app
Recovery guide: docs/RECOVERY.md in the repository.
Independent backup: breathwork-backup.zip (331 files, approximately 46.5 MB). This new document must be saved separately; it is not inside that earlier ZIP and has not been pushed to GitHub.

## Recommended order IF work is resumed

1. Protect personal data: implement and validate session-history backup/restore. GitHub and the project ZIP contain code/assets, not browser or phone journals.
2. Fix the reported voice-cue failures with 528 Hz and rain; provide truthful sound-combination explanations. Verify actual audio playback, not just toggle state.
3. Add regression checks for bundled music and mobile type safety; review the Expo package compatibility warnings before native testing.
4. Review the ready mobile browsing work before deciding whether to integrate it. Then improve search and discovery.
5. Complete language, accessibility, volume, sharing and mood-history improvements below.
6. Revisit visual exploration and longer-term programs/distribution only when explicitly requested.

These priorities are a suggested handoff order, not a newly approved schedule.

## Complete outstanding task index

| Reference | Goal | Status at export |
|---|---|---|
| #20 | Show how your mood has shifted over time | Draft idea — not approved |
| #23 | Track key actions in Google Analytics (technique chosen, session finished, mood rated) | Draft idea — not approved |
| #26 | Let users export and import their session history as a backup | Draft idea — not approved |
| #48 | Show the nostril sequence diagram in the mobile app's technique detail screens | Draft idea — not approved |
| #51 | Make type errors in mobile code impossible to miss before they ship | Draft idea — not approved |
| #57 | Announce round transitions aloud so eyes-closed users always know where they are | Draft idea — not approved |
| #58 | Let users control how loud the voice cues are, separately from the tones | Draft idea — not approved |
| #60 | Let users browse all techniques and read about them before starting | Ready in a separate task workspace — not merged |
| #61 | Close the info drawer automatically when the user switches technique | Draft idea — not approved |
| #62 | Remember whether the user had the info drawer open when they return to the session screen | Draft idea — not approved |
| #64 | Keep the screen on during mobile breathwork sessions | Draft idea — not approved |
| #65 | Translate the session screen's own labels so non-English users see a fully translated app | Draft idea — not approved |
| #66 | Let users change their language from the home screen, not just during a session | Draft idea — not approved |
| #67 | Let users preview their share card before posting it | Draft idea — not approved |
| #68 | Track mood before a session so the share card shows a real before→after shift | Draft idea — not approved |
| #69 | Bring session share cards to the mobile app | Draft idea — not approved |
| #70 | Give users a smooth volume slider instead of five fixed steps | Still queued on platform at export; user requested cancellation |
| #73 | Make sure every session's music keeps working after updates | Draft idea — not approved |
| #74 | Keep voice cues clear over rain, wind, and frequency tones | Still queued on platform at export; user requested cancellation |
| #75 | Help users find the right technique faster | Draft idea — not approved |

## Additional conversation goals and constraints

### Refine the app's breathing animation signature — deferred
- Seek a distinctive, subtle animation rather than an intense or generic wellness orb. Keep the candlelit brown/gold identity.
- Avoid anatomical lungs, torso, belly silhouettes and egg-like containers. Preserve the rest of the lesson layout and translated copy.
- Explorations: A — Breathing Glyph; B — Luminous Veil; C — Resonant Field. None was approved for integration; selection of a Canvas frame was not approval.
- The first Organic Light replacement remains the onboarding baseline. The separate Breath Science diaphragm picture was replaced with a single animated line; do not accidentally restore the old anatomy artwork.
- Include reduced-motion support and verify that Canvas previews open directly on the relevant section. See mockup source and docs/canvas-recovery.json.

### Improve demonstration videos — explicitly deferred
The owner felt the video needed improvement but instructed us to leave it as is. Review video quality/availability only if this goal is reopened; do not change video links automatically.

### Explain audio combinations honestly
The current product offers one background layer: music, a frequency, or a nature sound. Mixing them is technically possible, not a hardware impossibility or established medical restriction. Explain the app's deliberate one-background-at-a-time rule as a clarity choice. Voice cues should remain available with any chosen background. Lower the background temporarily during speech and restore it afterward; do not silently hide playback failures.

### Keep recovery independent of the original account
- Preserve the full ZIP on a USB drive and keep independent access to GitHub.
- A smaller code-only ZIP is an optional future handoff convenience; audio makes up most of the full archive. Keep the full asset backup as well.
- Browser/phone history, journals, secrets, integrations, conversations and platform task state need separate handling. Never commit private wellness data or credentials to the public repository.
- Recreate workspace URLs and integration connections after import. Read recovery instructions before running deployment or sync scripts.

## Detailed outstanding task specifications

The following are exported task descriptions, not proof of current implementation. References to files, line numbers, estimates and APIs may be stale. Inspect the imported code before using them. Some original task descriptions contain abbreviated text.

### #20 — Show how your mood has shifted over time

Status: Draft idea — not approved
Dependencies recorded: #16

# Mood Trend Chart

  ## What & Why
  Users now capture a mood rating after every session. The natural next step is to visualize those ratings as a trend over time — a small sparkline or bar chart in the session history area showing how their mood has shifted over the last 30 days. This turns individual data points into a meaningful pattern.

  ## Done looks like
  - A compact mood trend chart appears above the history log when at least 3 mood-rated sessions exist
  - Shows last 30 days of mood data as a small bar or line chart (using SVG, no external library needed)
  - Bars are color-coded: low ratings in muted red/amber, high ratings in gold/green
  - A summary line like "Your mood has improved over the last 7 days" when a positive trend is detected

  ## Relevant files
  - `artifacts/breathwork/src/components/HistoryPanel.tsx`
  - `artifacts/breathwork/src/components/HistoryPanel.css`
  - `artifacts/breathwork/src/hooks/useSessionStorage.ts` (SessionRecord.mood)
  

---

### #23 — Track key actions in Google Analytics (technique chosen, session finished, mood rated)

Status: Draft idea — not approved
Dependencies recorded: #17

# Custom GA4 Event Tracking

  ## What & Why
  GA4 is now installed and tracking page views. The next step is custom events so you can see *what users actually do* — not just that they visited, but which techniques they choose, how long they practice, and whether they complete sessions or drop off early.

  ## Done looks like
  - `select_technique` event fires when a user taps a technique tab (includes technique name as a parameter)
  - `session_complete` event fires when a session finishes naturally (includes technique, duration in seconds, mood rating if given)
  - `session_abandoned` event fires when the user stops a session early (includes technique and elapsed time)
  - `journal_saved` event fires when a journal entry (mood/note) is submitted
  - Events visible in GA4 Realtime and Events reports

  ## Steps
  1. Create a small `src/analytics.ts` helper that wraps `window.gtag` with TypeScript types and a guard for when gtag isn't loaded (dev builds, ad blockers)
  2. Call the helper at the relevant points in `SessionScreen.tsx` and `BreathRing.tsx`

  ## Relevant files
  - `artifacts/breathwork/src/components/SessionScreen.tsx` — technique selection, session start/stop/complete
  - `artifacts/breathwork/src/components/BreathRing.tsx` — journal save
  - `artifacts/breathwork/index.html` — GA4 already installed here
  

---

### #26 — Let users export and import their session history as a backup

Status: Draft idea — not approved
Dependencies recorded: #24

# Let users export and import their session history as a backup

  ## What & Why
  The reset flow now clears all session history permanently. Users who want a clean slate but don't want to lose their history have no recourse. An export-before-reset nudge, or a standalone backup/restore feature, would give users confidence to use the reset without fear of losing meaningful data.

  ## Done looks like
  - A "Download backup" option (JSON or CSV) in the edit modal or history panel before resetting
  - Optionally, an "Import history" button on the WelcomeScreen or settings area to restore from a previously exported file
  - The existing CSV export in HistoryPanel could be extended or leveraged

  ## Relevant files
  - `artifacts/breathwork/src/components/GoalScreen.tsx` — edit modal (reset flow lives here)
  - `artifacts/breathwork/src/components/HistoryPanel.tsx` — existing CSV export
  - `artifacts/breathwork/src/hooks/useSessionStorage.ts` — loadSessions / saveSessions

---

### #48 — Show the nostril sequence diagram in the mobile app's technique detail screens

Status: Draft idea — not approved
Dependencies recorded: #41

# Show the nostril sequence diagram in the mobile app's technique detail screens

## What & Why
The web app's InfoDrawer now shows a static L/R nostril sequence for nadi, surya, chandra, and 9 Purification techniques. The mobile app has its own technique detail/info screens but lacks the same diagram, leaving mobile users without this visual reference.

## Done looks like
- The mobile app's technique info/detail screens include a compact static nostril sequence diagram for the four nostril techniques (matching NOSTRIL_TECHS list)
- Diagram uses the same color conventions (moon blue for L, sun orange for R, gold for both) adapted to the mobile design system

## Relevant files
- `artifacts/breathwork-mobile/` — mobile app source
- `artifacts/breathwork/src/components/InfoDrawer.tsx` — reference implementation of NostrilSequenceDiagram
- `artifacts/breathwork/src/data/techniques.ts` — NOSTRIL_TECHS, getPhases

---

### #51 — Make type errors in mobile code impossible to miss before they ship

Status: Draft idea — not approved
Dependencies recorded: #42

# Make type errors in mobile code impossible to miss before they ship

## What & Why
The mobile typecheck now passes, but it only runs when someone explicitly invokes it. Registering it as a named validation step means it runs automatically as part of the project's CI/quality gate, so regressions get caught immediately rather than silently accumulating.

## Done looks like
- `pnpm --filter @workspace/breathwork-mobile run typecheck` is registered as a validation step in the workspace validation config
- The root `pnpm run typecheck` is also registered (it already covers mobile)
- Both steps appear in the project's CI/validation gate alongside the web app's typecheck

## Relevant files
- `artifacts/breathwork-mobile/tsconfig.json`
- `artifacts/breathwork-mobile/package.json` (typecheck script)
- Workspace validation config (check `.local/skills/validation/SKILL.md` for setup)

---

### #57 — Announce round transitions aloud so eyes-closed users always know where they are

Status: Draft idea — not approved
Dependencies recorded: #44

# Announce round transitions aloud so eyes-closed users always know where they are

## What & Why
Voice cues now announce phase names, but when a new round begins there's no verbal signal. Users with eyes closed can lose track of which round they're in, especially during longer techniques.

## Done looks like
- When a new round starts, the voice speaks "Round 2 of 3" (or similar) before the first phase cue
- The announcement only fires when voice cues are enabled
- Works naturally with the existing phase-cue sequencing

## Relevant files
- `artifacts/breathwork-mobile/app/session.tsx` — round transition logic in the secondsElapsed useEffect (around line 180), and the voice cue effect (lines 135-142)
- `artifacts/breathwork-mobile/hooks/useAudioTones.ts` — companion pattern for audio hooks

---

### #58 — Let users control how loud the voice cues are, separately from the tones

Status: Draft idea — not approved
Dependencies recorded: #44

# Let users control how loud the voice cues are, separately from the tones

## What & Why
The current voice cues use the device's default speech volume, which can't be tuned independently from the tone volume. Users who want quiet tones but clear voice prompts (or vice versa) have no way to balance the two.

## Done looks like
- A voice volume control appears next to the tone volume bar when voice cues are enabled
- The level persists across sessions (AsyncStorage, like VOLUME_KEY)
- expo-speech's `volume` option (0–1) is passed when calling Speech.speak

## Relevant files
- `artifacts/breathwork-mobile/app/session.tsx` — VOICE_KEY, saveVoice, the Speech.speak call (line 140), and the volume bar UI (lines 256-289)

---

### #60 — Let users browse all techniques and read about them before starting

Status: Ready in a separate task workspace — not merged
Dependencies recorded: #46

# Let users browse all techniques and read about them before starting

## What & Why
The pick screen's "Browse all techniques" button skips directly into a session with box breathing rather than showing a list of all available techniques. Users have no way to discover and compare techniques outside of their selected goal's short list. A proper browse screen would let anyone read about any technique before committing.

## Done looks like
- A browse/explore screen lists all techniques (from TECH_INFO in `artifacts/breathwork-mobile/data/techniques.ts`)
- Each technique card has the same ⓘ info button added to the pick screen in task #46
- Tapping a technique starts a session with that technique
- The "Browse all techniques" button on `artifacts/breathwork-mobile/app/pick.tsx` navigates to this new screen instead of jumping straight into box breathing

---

### #61 — Close the info drawer automatically when the user switches technique

Status: Draft idea — not approved
Dependencies recorded: #47

# Close the info drawer automatically when the user switches technique

## What & Why
When the ⓘ info drawer is open and the user clicks a different technique tab, the drawer stays open but immediately updates its content to the new technique — which can feel disorienting. Closing it on tab switch gives cleaner feedback that a new technique is selected, and lets the user consciously re-open info for the new choice.

## Done looks like
- Selecting a technique tab closes the info drawer if it is open
- The existing `activateTech` callback (which already calls `setInfoOpen(false)`) handles this — just verify it's wired correctly after the ⓘ button was added

## Relevant files
- `artifacts/breathwork/src/components/SessionScreen.tsx` — `activateTech` at line ~476 already sets `setInfoOpen(false)`, confirm it still fires correctly

---

### #62 — Remember whether the user had the info drawer open when they return to the session screen

Status: Draft idea — not approved
Dependencies recorded: #47

# Remember whether the user had the info drawer open when they return to the session screen

## What & Why
The info drawer state resets every time the user navigates away from and back to the session screen. Users who regularly reference technique info have to re-open it each visit. Persisting the preference across navigations is a small polish win.

## Done looks like
- If the info drawer was open when the user left the session screen, it re-opens on return (scoped to the same session/tab — localStorage or sessionStorage is fine)

## Relevant files
- `artifacts/breathwork/src/components/SessionScreen.tsx` — `infoOpen` state at line ~60

---

### #64 — Keep the screen on during mobile breathwork sessions

Status: Draft idea — not approved
Dependencies recorded: #52

# Keep the screen on during mobile breathwork sessions

## What & Why
The web app now uses the Wake Lock API to prevent screen dimming during sessions. The mobile app (Expo/React Native) needs the same treatment using `expo-keep-awake`, which is the correct native solution for this platform. Without it, phone screens will still dim and auto-lock during mobile sessions.

## Done looks like
- `expo-keep-awake` is installed and activated when a session is running in the mobile app
- The wake lock is released when the session ends or the user navigates away
- No visible UI change — works silently in the background

## Relevant files
- `artifacts/breathwork-mobile/` (session screen component)

---

### #65 — Translate the session screen's own labels so non-English users see a fully translated app

Status: Draft idea — not approved
Dependencies recorded: #63

# Translate the session screen's own labels

## What & Why
The language picker lets users choose EN/PT/ES, but the session screen itself still shows hardcoded English text: "TONE VOLUME", "TECHNIQUE", "LANGUAGE", "Ready", "Begin", "Stop", "Complete", "Go Again", "Home", "Round X of Y". Non-English users see the info drawer in their language but everything else in English.

## Done looks like
- A small i18n map (similar to COMPACT/SEQ_TITLE in TechInfoDrawer.tsx) covers all session screen labels
- All static text on the session screen updates when the language changes
- No third-party i18n library needed — a plain record type is sufficient

## Relevant files
- `artifacts/breathwork-mobile/app/session.tsx` — contains all hardcoded labels
- `artifacts/breathwork-mobile/hooks/useLang.ts` — lang state and setter
- `artifacts/breathwork-mobile/components/TechInfoDrawer.tsx` — reference for the translation map pattern

---

### #66 — Let users change their language from the home screen, not just during a session

Status: Draft idea — not approved
Dependencies recorded: #63

# Let users change their language from the home screen

## What & Why
The language picker is currently only visible in the session screen's pre-session panel, which users reach after choosing a technique. Users who want to change language before picking a technique have no obvious way to do so from the home tab.

## Done looks like
- A language picker (EN/PT/ES chips, matching the session screen design) is reachable from the home tab — either inline or via a small settings icon
- Choosing a language there writes to AsyncStorage (key: breathwork_lang) and the change is reflected everywhere immediately

## Relevant files
- `artifacts/breathwork-mobile/app/(tabs)/index.tsx` — home screen where the picker should appear
- `artifacts/breathwork-mobile/hooks/useLang.ts` — shared lang state/setter

---

### #67 — Let users preview their share card before posting it

Status: Draft idea — not approved
Dependencies recorded: #53

# Let users preview their share card before posting it

## What & Why
Right now the share card is generated and immediately sent to the native share sheet or downloaded — users never see what the card looks like before it goes out. Showing a preview modal first lets them confirm the design and feel proud of what they share, which increases the share rate.

## Done looks like
- After tapping "↗ Share", a modal/sheet opens showing the generated PNG at full size
- A "Share" / "Download" button triggers the actual share from within the modal
- A "Close" button discards without sharing
- The preview renders quickly by reusing the same canvas generation logic from `useShareCard.ts`

## Relevant files
- `artifacts/breathwork/src/hooks/useShareCard.ts`
- `artifacts/breathwork/src/components/BreathRing.tsx`
- `artifacts/breathwork/src/components/SessionScreen.tsx`

---

### #68 — Track mood before a session so the share card shows a real before→after shift

Status: Draft idea — not approved
Dependencies recorded: #53

# Track mood before a session so the share card shows a real before→after shift

## What & Why
The share card currently only shows post-session mood because there is no pre-session mood capture. Adding a quick "How do you feel right now?" prompt before the session starts would enable a genuine before→after emoji pair on the card (e.g. 😔 → 🌟), making it much more compelling to share and more meaningful as a personal insight.

## Done looks like
- A one-tap mood picker (same 5 emoji scale) appears on the idle session screen before the user taps Begin
- The pre-session mood is passed through to `finishSession` and stored alongside the session record
- The share card in `useShareCard.ts` renders both emojis with an arrow between them when a before-mood is present

## Relevant files
- `artifacts/breathwork/src/components/BreathRing.tsx` (idle state UI)
- `artifacts/breathwork/src/components/SessionScreen.tsx` (finishSession, handleShare)
- `artifacts/breathwork/src/hooks/useShareCard.ts`
- `artifacts/breathwork/src/hooks/useSessionStorage.ts` (SessionRecord interface)

---

### #69 — Bring session share cards to the mobile app

Status: Draft idea — not approved
Dependencies recorded: #53

# Bring session share cards to the mobile app

## What & Why
The web app now generates and shares a styled PNG summary card after each session. The mobile app (`artifacts/breathwork-mobile`) has its own post-session journal flow but no share capability. Mobile is the primary surface where people share to Instagram, WhatsApp, and X — so this is where the organic-acquisition value is highest.

## Done looks like
- A Share button appears on the post-session journal screen in the mobile app
- Tapping it generates a 1080×1080 PNG card matching the web card's dark-gold design, using Expo's `expo-sharing` and `react-native-view-shot` (or equivalent canvas approach)
- The native share sheet opens with the image pre-attached on both iOS and Android
- Falls back gracefully when sharing is unavailable

## Relevant files
- `artifacts/breathwork-mobile/` (post-session screen, journal component)
- `artifacts/breathwork/src/hooks/useShareCard.ts` (reference for card design)

---

### #70 — Give users a smooth volume slider instead of five fixed steps

Status: Still queued on platform at export; user requested cancellation
Dependencies recorded: #55

# Give users a smooth volume slider instead of five fixed steps

## What & Why
The current volume control uses five discrete bar steps (20%, 40%, 60%, 80%, 100%). This is easy to tap but coarse — users who want, say, 30% or 55% can't get there. A continuous slider (or a finer step range) would let users dial in exactly the level they want, especially useful mid-session when they can't easily fiddle with steps.

## Done looks like
- The five-bar row is replaced (or supplemented) with a React Native Slider or a custom touch-draggable control
- Volume is settable from 0–100 continuously
- The new control works both in the pre-session panel and the mid-session row added in this task
- Persists to AsyncStorage the same way the existing saveVolume does

## Relevant files
- `artifacts/breathwork-mobile/app/session.tsx` — VolumeBars JSX variable, volRow/volBar styles
- `artifacts/breathwork-mobile/hooks/useAudioTones.ts` — volume prop already accepts 0–1 float

---

### #73 — Make sure every session's music keeps working after updates

Status: Draft idea — not approved
Dependencies recorded: #59

# Make sure every session's music keeps working after updates

## What & Why
Session music now uses a local classical recording library. A small automated check should ensure each selectable goal continues to resolve to a bundled, playable asset so a future content change cannot silently send users back to a fallback tone.

## Done looks like
- Every goal with session music resolves to an existing local asset
- The playback hook's fallback path is covered for a missing or rejected asset
- The check runs with the web app's normal validation commands

## Relevant files
- artifacts/breathwork/src/hooks/useSessionMusic.ts
- artifacts/breathwork/public/music/
- artifacts/breathwork/package.json

---

### #74 — Keep voice cues clear over rain, wind, and frequency tones

Status: Still queued on platform at export; user requested cancellation
Dependencies recorded: None

# Keep voice cues clear over rain, wind, and frequency tones

## What & Why
The published web app can fail to load its bundled voice files because their paths ignore the app's deployment base path. When cues do load, continuous background audio can mask them. Users should always hear inhale, hold, and exhale instructions over 528 Hz or a nature sound.

## Done looks like
- Voice files load correctly in local previews and path-based published builds
- Spoken cues remain available with music, a frequency, or a nature sound
- The active background layer briefly lowers while each cue speaks, then returns smoothly
- The sound controls explain why users choose one background layer at a time while voice cues remain compatible
- Mobile-width end-to-end checks confirm both 528 Hz + voice and rain + voice work without console errors

## Relevant files
- artifacts/breathwork/src/hooks/useVoiceCues.ts
- artifacts/breathwork/src/hooks/useBackgroundAudio.ts
- artifacts/breathwork/src/hooks/useSessionMusic.ts
- artifacts/breathwork/src/components/SessionScreen.tsx
- artifacts/breathwork/src/i18n/lang.ts

---

### #75 — Help users find the right technique faster

Status: Draft idea — not approved
Dependencies recorded: #60

# Help users find the right technique faster

## What & Why
The new browse screen makes every technique discoverable, but scanning a long list will become harder as the library grows. Search and simple filters would help users quickly narrow the list to a practice they recognize or need.

## Done looks like
- The explore screen has a search field that matches technique names and descriptions
- Users can filter techniques by helpful properties such as calming, energizing, or restorative
- Empty results explain that no techniques match and let users clear the filter
- Existing info buttons and tap-to-start behavior continue to work

## Relevant files
- artifacts/breathwork-mobile/app/explore.tsx
- artifacts/breathwork-mobile/data/techniques.ts

---

## Longer-term ideas from the previous roadmap

These are exploratory ideas, not commitments. Some may already be partially implemented; verify before creating duplicate work. The original roadmap is preserved in the appendix for completeness.

- Structured multi-day programs: calm, energy and other guided practice journeys.
- Streak milestone celebrations; technique of the day; saved session presets.
- Additional ambient soundscapes.
- Rule-based recommendations using time of day, preferences and practice history.
- Named custom breathing patterns, optionally shareable.
- Technique research cards with citations and carefully qualified claims.
- A beginner learning program and situation-based technique collections.
- Health-platform mindful-minute integration; wearable heart-rate support.
- Installable/offline web app and opt-in practice reminders. Verify current platform notification support rather than relying on the old roadmap.
- App Store / Google Play preparation and an SEO-focused public landing page.
- Friend challenges, optional community features and practitioner profiles, subject to privacy/authentication design.
- App-wide reduced-motion, voice commands, font-size controls and high-contrast options.
- Possible monetization: freemium, one-time purchase, paid programs, or a coaching marketplace. No pricing or payment model has been approved.

## Quality and privacy guardrails

Preserve English/Portuguese/Spanish support, mobile responsiveness, accessibility and existing session data. Test audio on intended devices. Validate any medical/scientific claims and avoid promises of guaranteed outcomes. Mood changes should reflect actual measurements, not inferred or invented improvement. Analytics must not transmit journal text or sensitive mood/health information by default; resolve privacy and consent before adding events. Old roadmap claims about competitor superiority, effort, medical benefits and platform capabilities are not verified facts.

## Appendix — Historical ROADMAP.md (verbatim)

IMPORTANT: The following August 2026 roadmap contains outdated status labels. The current task index above takes precedence. This appendix is retained so no future idea is lost, not to assert that its active queue or suggested priorities remain correct.

---

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
