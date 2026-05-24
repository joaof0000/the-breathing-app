# Threat Model

## Project Overview

Breathwork is a public, production-deployed breathwork timer built as a pnpm workspace with a React 18 + Vite frontend in `artifacts/breathwork/` and a minimal Express API server in `artifacts/api-server/`. The app’s meaningful functionality is currently client-side only: breathing sessions, technique selection, profile preferences, history, and language settings are stored in the user’s own browser `localStorage`. There is no implemented authentication, no server-side user data store, and no production business workflow beyond serving the SPA and a health endpoint.

## Assets

- **Client-side wellness history and preferences** — breathing session history, mood/notes, selected techniques, language, and profile fields stored in browser `localStorage`. This data is private to the user’s browser session and could be exposed if arbitrary script execution occurs in the frontend.
- **Frontend integrity** — the JavaScript bundle, embedded analytics script, font loads, and static content must not be modifiable by untrusted input. If the frontend can be script-injected, an attacker could read or alter all locally stored session data.
- **Service availability** — the app should remain usable for public visitors. Because there is almost no backend processing, the main availability concern is accidental expansion of server-side attack surface in future changes.
- **Application secrets and server trust** — the present code does not expose application secrets to the client, and the API server does not currently process sensitive data. This remains important if the unused backend grows later.

## Trust Boundaries

- **Browser runtime to localStorage** — all session records and preferences cross from UI code into persistent browser storage. The browser and any injected script share this trust boundary, so client-side script integrity is the key protection.
- **Browser to third-party origins** — the frontend loads Google Fonts, Google Analytics, YouTube links, and Wikimedia-hosted audio over HTTPS. These are outbound client-side requests rather than server-side fetches, so they primarily affect privacy and client-side integrity rather than backend compromise.
- **Browser to API server** — the deployed Express server exposes `/api/*`, but currently only `GET /api/healthz` is implemented. If future routes are added, all user input crossing this boundary must be treated as untrusted.
- **Production vs dev-only artifacts** — `artifacts/mockup-sandbox/` is a development/experimental surface and is assumed not to be deployed to production. Security findings confined to that sandbox should normally be excluded unless production reachability is demonstrated.

## Scan Anchors

- **Production entry points**: `artifacts/breathwork/index.html`, `artifacts/breathwork/src/main.tsx`, `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/health.ts`
- **Highest-risk current code areas**: frontend local persistence hooks in `artifacts/breathwork/src/hooks/`, any HTML injection sinks in `artifacts/breathwork/src/components/`, and any future Express routes under `artifacts/api-server/src/routes/`
- **Public surface**: the entire SPA and `GET /api/healthz` are public; there are no authenticated or admin-only surfaces today
- **Dev-only areas to skip unless proven reachable**: `artifacts/mockup-sandbox/`

## Threat Categories

### Tampering

Because the app is primarily a client-side SPA, the main tampering risk is untrusted data being rendered into executable HTML, script, or CSS in the browser. The project must ensure that user-controlled values from `localStorage`, URL state, or future integrations are rendered as data rather than executable content. Any future backend routes must validate request bodies and ignore client-side claims about authorization or sensitive state.

### Information Disclosure

The most relevant disclosure risk is client-side script compromise. If arbitrary JavaScript executes in the origin, it can read the user’s locally stored history, mood notes, and profile preferences. The project therefore must avoid XSS sinks, avoid exposing secrets in frontend code, and avoid returning sensitive internal details from any future API routes. Current backend logging should continue to redact authorization and cookie headers if new authenticated routes are added.

### Denial of Service

The current backend performs almost no work, so production DoS risk is low today. The app must preserve this property by keeping public API endpoints minimal, bounding any future expensive processing, and treating large uploads or unbounded request bodies as out of scope unless explicitly implemented with limits.

### Elevation of Privilege

There is no user role system or privileged server-side action today, so classic privilege-escalation threats are not currently applicable. If authentication, admin features, or per-user backend data are introduced later, authorization must be enforced server-side on every protected route and any database or file operations must use safe, non-interpreted APIs.
