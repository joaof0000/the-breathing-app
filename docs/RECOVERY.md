# Recovering Breathwork without the original Replit account

Repository: https://github.com/joaof0000/the-breathing-app

## Before deleting an account

- Verify that you can sign in to **GitHub independently** and open this repository. Deleting the GitHub account that owns it is different from deleting a Replit account; keep that GitHub account or transfer the repository first.
- Download a separate repository ZIP or clone onto your own computer. A copy kept only in this Replit workspace is not an independent backup.
- Export web session history using the app's CSV export from each browser/site where you used it. Save it privately, not in this repository. Browser data is origin-specific: the Replit site and GitHub Pages can hold different histories.
- CSV is an archive, not a full settings backup or an implemented import format. Mobile AsyncStorage history has no export/import UI. Do not erase the phone app or its storage if you need that history.
- Preserve any needed conversations, account settings and platform task descriptions separately. ROADMAP.md is a code-side roadmap, not a complete export of the Replit task queue.
- Reconnect integrations under the new account. Recreate required secrets through its Secrets interface, never in Git. Secret values and account credentials are deliberately excluded.

## What the Git repository preserves

Web and Expo mobile source, API scaffold, shared packages, dependency lockfile, artwork, bundled audio, attachments, screenshots, mockup source, artifact configuration, deployment workflow, and committed documentation/history.

`docs/canvas-recovery.json` is a reference snapshot, not an automatic Canvas import. It records available shape metadata/component paths with workspace URLs removed. Recreate previews from the components under `artifacts/mockup-sandbox/src/components/mockups/`; use a new workspace's preview URLs. Off-screen clusters may be summarized by the Canvas API.

Dependencies, build output, caches, platform internals, original workspace URLs, browser localStorage, phone AsyncStorage, secrets, and integration credentials are not included. The current app does not store session history in the API/database scaffold.

## Restore locally

Install Node.js 24 and pnpm 10, then:

```sh
git clone https://github.com/joaof0000/the-breathing-app.git
cd the-breathing-app
pnpm install --frozen-lockfile
pnpm run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/breathwork run dev
```

Open http://localhost:3000. For a web production build:

```sh
PORT=3000 BASE_PATH=/the-breathing-app/ pnpm --filter @workspace/breathwork run build
```

The output is `artifacts/breathwork/dist/public`. Set BASE_PATH to the intended hosting path, or `/` for a root-hosted site.

For mobile development:

```sh
cd artifacts/breathwork-mobile
pnpm exec expo start
```

Expo device testing and store distribution require their own setup. A web build does not validate native audio behavior.

## Restore on a new Replit account

Import the GitHub repository, install locked dependencies, and configure the artifact workflows using the checked-in configuration. Reconnect GitHub if automatic sync is wanted. Do not reuse old preview domains or integration credentials.

## Verification scope and outstanding issues

The backup pass checked all workspace TypeScript projects, the GitHub Pages-path web build, API build, and Git whitespace errors. These checks cannot establish that every feature is error-free.

The previously reported voice-cue playback/path and background-mixing issue remains pending. This backup does not implement queued feature work. Browser and mobile histories are **not backed up by this commit**.