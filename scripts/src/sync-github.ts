/**
 * sync-github.ts
 *
 * Pushes the current HEAD to joaof0000/the-breathing-app on GitHub.
 *
 * Strategy: generate a temporary SSH deploy key, register it via the GitHub
 * API (through the Replit Connectors proxy), push via SSH, then delete the key.
 * This avoids needing a raw OAuth token in the environment.
 *
 * Called automatically from scripts/post-merge.sh after every task merge.
 *
 * Requirements:
 *   - REPLIT_CONNECTORS_HOSTNAME (defaults to connectors.replit.com)
 *   - REPL_IDENTITY or REPLIT_CLI (for Replit identity token)
 *   - GitHub integration connected at https://replit.com/account
 */

import { execSync, execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync, mkdirSync } from "node:fs";
import { tmpdir, homedir } from "node:os";
import { join } from "node:path";

const GITHUB_REPO = "joaof0000/the-breathing-app";
const GITHUB_SSH_REMOTE = `git@github.com:${GITHUB_REPO}.git`;
const DEPLOY_KEY_TITLE = "replit-auto-sync";

function run(cmd: string): void {
  execSync(cmd, { stdio: "inherit" });
}

function capture(cmd: string): string {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

async function buildIdentityHeaders(): Promise<Record<string, string>> {
  // Try the replit CLI first (most reliable)
  const replitBin = process.env.REPLIT_CLI ?? "replit";
  const connHostname =
    process.env.REPLIT_CONNECTORS_HOSTNAME ?? "connectors.replit.com";
  const audience = `https://${connHostname}`;

  try {
    const token = execFileSync(replitBin, [
      "identity",
      "create",
      "--audience",
      audience,
    ], { encoding: "utf8" }).trim();
    return {
      Accept: "application/json",
      "Replit-Authentication": `Bearer ${token}`,
    };
  } catch {
    // Fall back to REPL_IDENTITY env var
  }

  const replIdentity = process.env.REPL_IDENTITY;
  if (replIdentity) {
    return {
      Accept: "application/json",
      "X-Replit-Token": `repl ${replIdentity}`,
    };
  }

  throw new Error(
    "Cannot obtain Replit identity token — " +
      "neither `replit identity create` succeeded nor REPL_IDENTITY is set."
  );
}

async function githubApiProxy(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {}
): Promise<{ status: number; body: unknown }> {
  const connHostname =
    process.env.REPLIT_CONNECTORS_HOSTNAME ?? "connectors.replit.com";
  const baseUrl = `https://${connHostname}`;
  const url = `${baseUrl}/api/v2/proxy${path.startsWith("/") ? "" : "/"}${path}`;

  const idHeaders = await buildIdentityHeaders();
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      ...idHeaders,
      "Content-Type": "application/json",
      "Connector-Name": "github",
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  let body: unknown;
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json") || ct.includes("text/")) {
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
  } else {
    body = null;
  }

  return { status: res.status, body };
}

async function createDeployKey(publicKey: string): Promise<number> {
  const { status, body } = await githubApiProxy(
    `/repos/${GITHUB_REPO}/keys`,
    {
      method: "POST",
      body: {
        title: `${DEPLOY_KEY_TITLE}-${Date.now()}`,
        key: publicKey,
        read_only: false,
      },
    }
  );

  if (status !== 201) {
    throw new Error(
      `Failed to create deploy key (HTTP ${status}): ${JSON.stringify(body)}`
    );
  }

  const keyId = (body as { id: number }).id;
  if (!keyId) {
    throw new Error(`Deploy key response missing 'id': ${JSON.stringify(body)}`);
  }
  return keyId;
}

async function deleteDeployKey(keyId: number): Promise<void> {
  const { status } = await githubApiProxy(
    `/repos/${GITHUB_REPO}/keys/${keyId}`,
    { method: "DELETE" }
  );
  // 204 = success, 308 = redirect (also success in practice), 404 = already gone
  if (status !== 204 && status !== 308 && status !== 404) {
    console.warn(`Warning: deploy key deletion returned HTTP ${status}`);
  }
}

async function main() {
  // 1. Generate a temporary ED25519 SSH keypair
  const keyDir = join(tmpdir(), `replit-sync-${Date.now()}`);
  mkdirSync(keyDir, { recursive: true });
  const keyPath = join(keyDir, "deploy_key");
  const pubKeyPath = `${keyPath}.pub`;

  console.log("Generating temporary SSH keypair...");
  execFileSync("ssh-keygen", [
    "-t", "ed25519",
    "-f", keyPath,
    "-N", "",   // no passphrase
    "-q",
  ]);
  const publicKey = capture(`cat ${pubKeyPath}`);

  // 2. Register the deploy key via GitHub API proxy
  console.log("Registering deploy key on GitHub...");
  let keyId: number;
  try {
    keyId = await createDeployKey(publicKey);
    console.log(`Deploy key created (id: ${keyId})`);
  } catch (err) {
    // Clean up key files
    try { unlinkSync(keyPath); unlinkSync(pubKeyPath); } catch { /* ignore */ }
    throw err;
  }

  // 3. Git push via SSH using the deploy key
  const branch = capture("git rev-parse --abbrev-ref HEAD");
  const shortSha = capture("git rev-parse --short HEAD");
  console.log(`Pushing branch=${branch} sha=${shortSha} → ${GITHUB_REPO}...`);

  // Ensure SSH known_hosts has github.com so we don't get an interactive prompt
  const sshDir = join(homedir(), ".ssh");
  mkdirSync(sshDir, { recursive: true, mode: 0o700 });
  execSync(
    `ssh-keyscan -H github.com >> ${sshDir}/known_hosts 2>/dev/null || true`
  );

  let pushSucceeded = false;
  try {
    execSync(
      `git push "${GITHUB_SSH_REMOTE}" HEAD:main`,
      {
        stdio: "inherit",
        env: {
          ...process.env,
          GIT_SSH_COMMAND: `ssh -i ${keyPath} -o BatchMode=yes -o IdentitiesOnly=yes`,
        },
      }
    );
    pushSucceeded = true;
    console.log(`✓ Pushed to github.com/${GITHUB_REPO} (main)`);
  } finally {
    // 4. Always clean up the deploy key and temp files
    console.log("Cleaning up deploy key...");
    try {
      await deleteDeployKey(keyId);
      console.log("Deploy key removed.");
    } catch (err) {
      console.warn("Warning: could not delete deploy key:", (err as Error).message);
    }
    try { unlinkSync(keyPath); } catch { /* ignore */ }
    try { unlinkSync(pubKeyPath); } catch { /* ignore */ }
  }

  if (!pushSucceeded) {
    process.exit(1);
  }
}

main().catch((err: Error) => {
  console.error("GitHub sync failed:", err.message);
  process.exit(1);
});
