/**
 * useShareCard — generates a PNG share card for a completed breathwork session
 * and triggers the native Web Share sheet (falling back to download).
 */

const MOOD_EMOJIS = ['😔', '😐', '🙂', '😊', '🌟'];

function fmtDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

export async function generateShareCard(opts: {
  techLabel: string;
  durationSecs: number;
  mood: number;       // 1-5, or 0 for none
  streak: number;
}): Promise<Blob> {
  const { techLabel, durationSecs, mood, streak } = opts;

  const SIZE = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // ── Background gradient ──────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, SIZE * 0.6, SIZE);
  bg.addColorStop(0, '#2C1F14');
  bg.addColorStop(0.55, '#3A2618');
  bg.addColorStop(1, '#2A1C10');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // ── Subtle radial glow centre ────────────────────────────────────────────
  const glow = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE * 0.52);
  glow.addColorStop(0, 'rgba(229,169,60,0.07)');
  glow.addColorStop(1, 'rgba(229,169,60,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // ── Decorative ring ─────────────────────────────────────────────────────
  ctx.save();
  ctx.strokeStyle = 'rgba(229,169,60,0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, 380, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(229,169,60,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, 440, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // ── Top wordmark ─────────────────────────────────────────────────────────
  ctx.save();
  ctx.font = '500 38px "Poppins", sans-serif';
  ctx.fillStyle = 'rgba(229,169,60,0.65)';
  ctx.letterSpacing = '0.18em';
  ctx.textAlign = 'center';
  ctx.fillText('BREATHWORK', SIZE / 2, 108);
  ctx.restore();

  // ── Gold separator line ──────────────────────────────────────────────────
  ctx.save();
  const sepGrad = ctx.createLinearGradient(SIZE / 2 - 160, 0, SIZE / 2 + 160, 0);
  sepGrad.addColorStop(0, 'rgba(229,169,60,0)');
  sepGrad.addColorStop(0.5, 'rgba(229,169,60,0.5)');
  sepGrad.addColorStop(1, 'rgba(229,169,60,0)');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(SIZE / 2 - 160, 128);
  ctx.lineTo(SIZE / 2 + 160, 128);
  ctx.stroke();
  ctx.restore();

  // ── Technique name ───────────────────────────────────────────────────────
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F5F0E8';

  // Dynamic font size based on label length
  const techFontSize = techLabel.length <= 10 ? 96
    : techLabel.length <= 16 ? 76
    : techLabel.length <= 22 ? 60
    : 48;
  ctx.font = `300 ${techFontSize}px "Cormorant Garamond", serif`;
  ctx.fillText(techLabel, SIZE / 2, 360);
  ctx.restore();

  // ── "Session complete" label ─────────────────────────────────────────────
  ctx.save();
  ctx.font = '400 28px "Poppins", sans-serif';
  ctx.fillStyle = 'rgba(196,168,130,0.7)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.12em';
  ctx.fillText('SESSION COMPLETE', SIZE / 2, 410);
  ctx.restore();

  // ── Duration pill ────────────────────────────────────────────────────────
  const durText = fmtDuration(durationSecs);
  const pillY = 480;
  ctx.save();
  ctx.font = '600 42px "Poppins", sans-serif';
  const durWidth = ctx.measureText(durText).width;
  const pillW = durWidth + 80;
  const pillH = 72;
  const pillX = SIZE / 2 - pillW / 2;
  const pillR = pillH / 2;

  // Pill background
  ctx.fillStyle = 'rgba(229,169,60,0.12)';
  ctx.strokeStyle = 'rgba(229,169,60,0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillR);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#E5A93C';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(durText, SIZE / 2, pillY + pillH / 2);
  ctx.restore();

  // ── Mood emoji ───────────────────────────────────────────────────────────
  if (mood >= 1 && mood <= 5) {
    const emoji = MOOD_EMOJIS[mood - 1];
    ctx.save();
    ctx.font = '90px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, SIZE / 2, 640);
    ctx.restore();

    ctx.save();
    ctx.font = '300 28px "Newsreader", serif';
    ctx.fillStyle = 'rgba(196,168,130,0.7)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('how I feel', SIZE / 2, 702);
    ctx.restore();
  }

  // ── Streak ───────────────────────────────────────────────────────────────
  if (streak > 0) {
    const streakY = mood >= 1 ? 790 : 660;
    ctx.save();
    ctx.font = `600 ${streak > 9 ? 52 : 58}px "Poppins", sans-serif`;
    ctx.fillStyle = '#E5A93C';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${streak}`, SIZE / 2, streakY);
    ctx.restore();

    ctx.save();
    ctx.font = '300 26px "Poppins", sans-serif';
    ctx.fillStyle = 'rgba(196,168,130,0.65)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(streak === 1 ? 'day streak' : 'day streak 🔥', SIZE / 2, streakY + 40);
    ctx.restore();
  }

  // ── Bottom separator ─────────────────────────────────────────────────────
  ctx.save();
  const sepGrad2 = ctx.createLinearGradient(SIZE / 2 - 200, 0, SIZE / 2 + 200, 0);
  sepGrad2.addColorStop(0, 'rgba(229,169,60,0)');
  sepGrad2.addColorStop(0.5, 'rgba(229,169,60,0.3)');
  sepGrad2.addColorStop(1, 'rgba(229,169,60,0)');
  ctx.strokeStyle = sepGrad2;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(SIZE / 2 - 200, 940);
  ctx.lineTo(SIZE / 2 + 200, 940);
  ctx.stroke();
  ctx.restore();

  // ── Bottom tagline ───────────────────────────────────────────────────────
  ctx.save();
  ctx.font = '300 26px "Poppins", sans-serif';
  ctx.fillStyle = 'rgba(138,117,96,0.8)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.08em';
  ctx.fillText('breathwork.app', SIZE / 2, 980);
  ctx.restore();

  // ── Convert to Blob ──────────────────────────────────────────────────────
  return new Promise((resolve, reject) => {
    canvas.toBlob(b => {
      if (b) resolve(b);
      else reject(new Error('Canvas toBlob failed'));
    }, 'image/png');
  });
}

/**
 * triggerDownload — saves a blob to disk via a temporary <a> click.
 */
function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * shareCard — MUST be called with a pre-generated blob so that no async work
 * happens between the user's click and navigator.share(). The Web Share API
 * requires a live transient user-activation; any await before calling share()
 * can revoke it and produce a NotAllowedError.
 *
 * Falls back to download when:
 *   - The browser lacks Web Share / file-sharing support
 *   - navigator.share rejects for any reason except user cancellation
 *     (AbortError = user dismissed the sheet — no download in that case)
 */
export async function shareCard(opts: {
  blob: Blob;
  techLabel: string;
}): Promise<void> {
  const { blob, techLabel } = opts;
  const fileName = 'breathwork-session.png';
  const file = new File([blob], fileName, { type: 'image/png' });

  const canShareFiles =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    (navigator.canShare?.({ files: [file] }) ?? false);

  if (canShareFiles) {
    try {
      await navigator.share({
        files: [file],
        title: 'Breathwork session',
        text: `Just completed a ${techLabel} breathwork session 🌬️`,
      });
      return;
    } catch (err) {
      // User dismissed the native share sheet — do nothing
      if (err instanceof Error && err.name === 'AbortError') return;
      // Any other failure (e.g. NotAllowedError) → fall through to download
      console.warn('navigator.share failed, falling back to download:', err);
    }
  }

  triggerDownload(blob, fileName);
}
