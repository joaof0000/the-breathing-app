/**
 * useAudioTones — synthesized breath-phase tones for mobile + web.
 *
 * Web  → Web Audio API (same quality as the web app)
 * Native → expo-av + runtime-generated WAV PCM data URIs (no audio assets needed)
 */

import { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

// ─── WAV generator (native only) ─────────────────────────────────────────────

const wavCache = new Map<string, string>(); // cacheKey → data URI

function buildWavDataUri(
  freq: number,
  durationSec: number,
  volume = 0.28,
  bhramari = false,
): string {
  const key = `${freq}|${durationSec}|${volume.toFixed(3)}|${bhramari}`;
  if (wavCache.has(key)) return wavCache.get(key)!;

  const SR = 11025; // sample rate — good enough for tones, small buffer size
  const n = Math.floor(SR * durationSec);
  const dataBytes = n * 2; // 16-bit mono
  const buf = new ArrayBuffer(44 + dataBytes);
  const view = new DataView(buf);
  const wr = (o: number, s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };

  wr(0, 'RIFF');
  view.setUint32(4, 36 + dataBytes, true);
  wr(8, 'WAVE');
  wr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, SR, true);
  view.setUint32(28, SR * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  wr(36, 'data');
  view.setUint32(40, dataBytes, true);

  const TWO_PI = 2 * Math.PI;
  const atk = Math.min(0.06, durationSec * 0.08);
  const rel = Math.min(0.12, durationSec * 0.12);

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let env = 1;
    if (t < atk) env = t / atk;
    else if (t > durationSec - rel) env = Math.max(0, (durationSec - t) / rel);

    let s: number;
    if (bhramari) {
      // Bee-hum: rich harmonics + 7 Hz amplitude modulation
      const lfo = 1 + 0.35 * Math.sin(TWO_PI * 7 * t);
      s = (
        Math.sin(TWO_PI * freq * t) * 0.50 +
        Math.sin(TWO_PI * freq * 2 * t) * 0.28 +
        Math.sin(TWO_PI * freq * 3 * t) * 0.14 +
        Math.sin(TWO_PI * freq * 4 * t) * 0.08
      ) * lfo * env * volume * 32767;
    } else {
      // Pure sine + subtle octave harmonic
      s = (
        Math.sin(TWO_PI * freq * t) * 0.85 +
        Math.sin(TWO_PI * freq * 2.01 * t) * 0.15
      ) * env * volume * 32767;
    }

    view.setInt16(44 + i * 2, Math.max(-32767, Math.min(32767, Math.round(s))), true);
  }

  // base64 encode in chunks to avoid stack overflow on large buffers
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 8192;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, Math.min(i + chunk, bytes.length))));
  }
  const uri = `data:audio/wav;base64,${btoa(binary)}`;
  wavCache.set(key, uri);
  return uri;
}

// ─── Phase → frequency / duration map ────────────────────────────────────────

function clsToFreq(cls: string): number {
  switch (cls) {
    case 'p-inhale': return 396;
    case 'p-hold':
    case 'p-hold2':  return 528;
    case 'p-exhale': return 285;
    case 'p-fire':   return 432;
    case 'p-ice':    return 174;
    case 'p-sun':    return 417;
    case 'p-moon':   return 285;
    default:         return 396;
  }
}

// Tone duration caps — we play a short cue at the START of each phase.
const TONE_DUR: Record<string, number> = {
  'p-inhale': 2.4,
  'p-hold':   1.8,
  'p-hold2':  1.8,
  'p-exhale': 2.8,
  'p-fire':   1.4,
  'p-ice':    3.8,
  'p-sun':    1.8,
  'p-moon':   2.4,
};

// ─── Web Audio helpers ────────────────────────────────────────────────────────

function webTone(ac: AudioContext, freq: number, dur: number, vol: number, v = 1) {
  const g = vol * v;
  if (g < 0.001) return;
  const now = ac.currentTime;
  const gn = ac.createGain();
  gn.connect(ac.destination);
  gn.gain.setValueAtTime(0, now);
  gn.gain.linearRampToValueAtTime(g * 0.18, now + 0.08);
  gn.gain.exponentialRampToValueAtTime(0.001, now + dur);
  const o = ac.createOscillator();
  o.type = 'sine';
  o.frequency.value = freq;
  o.connect(gn);
  o.start(now);
  o.stop(now + dur);
  // Subtle octave harmonic
  const gn2 = ac.createGain();
  gn2.connect(ac.destination);
  gn2.gain.setValueAtTime(0, now);
  gn2.gain.linearRampToValueAtTime(g * 0.045, now + 0.06);
  gn2.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.55);
  const o2 = ac.createOscillator();
  o2.type = 'sine';
  o2.frequency.value = freq * 2.01;
  o2.connect(gn2);
  o2.start(now);
  o2.stop(now + dur * 0.55);
}

function webHum(ac: AudioContext, dur: number, vol: number) {
  if (vol < 0.001) return;
  const now = ac.currentTime;
  const gn = ac.createGain();
  gn.connect(ac.destination);
  gn.gain.setValueAtTime(vol * 0.15, now);
  gn.gain.linearRampToValueAtTime(vol * 0.18, now + 0.3);
  gn.gain.exponentialRampToValueAtTime(0.001, now + dur);
  const o = ac.createOscillator();
  o.type = 'sawtooth';
  o.frequency.value = 120;
  o.connect(gn);
  o.start(now);
  o.stop(now + dur);
  const lfo = ac.createOscillator();
  lfo.frequency.value = 7;
  const lfog = ac.createGain();
  lfog.gain.value = 0.06;
  lfo.connect(lfog);
  lfog.connect(gn.gain);
  lfo.start(now);
  lfo.stop(now + dur);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface AudioTonesOptions {
  /** 0–1; 0 = silent */
  volume: number;
}

export function useAudioTones({ volume }: AudioTonesOptions) {
  // Phase changes should use the latest setting without restarting the tone
  // currently playing when the user adjusts volume.
  const volumeRef = useRef(volume);
  volumeRef.current = volume;
  // Web AudioContext ref
  const acRef = useRef<AudioContext | null>(null);
  // Native sound ref — we keep one Sound at a time (reused across phases)
  const soundRef = useRef<import('expo-av').Audio.Sound | null>(null);
  // Invalidates async native playback work when a newer tone replaces it.
  const nativePlaybackRequestRef = useRef(0);
  // Tracks the running bhramari hum on web so we can stop it on phase change
  const humStopRef = useRef<(() => void) | null>(null);

  // ── Setup native audio mode (background, silent-mode) ──
  useEffect(() => {
    if (Platform.OS === 'web') return;
    (async () => {
      try {
        const { Audio } = await import('expo-av');
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
        });
      } catch {
        // non-fatal
      }
    })();
  }, []);

  const cancelNativePlayback = useCallback(() => {
    nativePlaybackRequestRef.current += 1;
    const sound = soundRef.current;
    soundRef.current = null;
    if (sound) {
      void (async () => {
        await sound.stopAsync().catch(() => {});
        await sound.unloadAsync().catch(() => {});
      })();
    }
  }, []);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      humStopRef.current?.();
      if (Platform.OS !== 'web') cancelNativePlayback();
    };
  }, [cancelNativePlayback]);

  // ── Ensure Web AudioContext ──
  const ensureAC = useCallback((): AudioContext | null => {
    if (Platform.OS !== 'web') return null;
    if (!acRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      acRef.current = new AC();
    }
    if (acRef.current.state === 'suspended') acRef.current.resume();
    return acRef.current;
  }, []);

  // ── Native: play a WAV data URI ──
  const nativePlay = useCallback(async (uri: string) => {
    const requestId = nativePlaybackRequestRef.current + 1;
    nativePlaybackRequestRef.current = requestId;
    let createdSound: import('expo-av').Audio.Sound | null = null;

    try {
      const { Audio } = await import('expo-av');
      if (requestId !== nativePlaybackRequestRef.current) return;

      const previousSound = soundRef.current;
      soundRef.current = null;
      if (previousSound) {
        await previousSound.stopAsync().catch(() => {});
        await previousSound.unloadAsync().catch(() => {});
      }
      if (requestId !== nativePlaybackRequestRef.current) return;

      const { sound } = await Audio.Sound.createAsync({ uri });
      createdSound = sound;
      if (requestId !== nativePlaybackRequestRef.current) {
        await sound.unloadAsync().catch(() => {});
        return;
      }

      soundRef.current = sound;
      await sound.playAsync();
      if (requestId !== nativePlaybackRequestRef.current) {
        if (soundRef.current === sound) soundRef.current = null;
        await sound.stopAsync().catch(() => {});
        await sound.unloadAsync().catch(() => {});
        return;
      }

      // Auto-unload after playback
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          if (soundRef.current === sound) soundRef.current = null;
        }
      });
    } catch {
      if (createdSound && soundRef.current === createdSound) {
        soundRef.current = null;
      }
      createdSound?.unloadAsync().catch(() => {});
      // audio failure is non-fatal
    }
  }, []);

  // ── Stop any running bhramari hum ──
  const stopHum = useCallback(() => {
    const stop = humStopRef.current;
    humStopRef.current = null;
    stop?.();
    if (Platform.OS !== 'web') {
      cancelNativePlayback();
    }
  }, [cancelNativePlayback]);

  // ── Play a phase tone ──
  const playPhase = useCallback(
    (cls: string, phaseName: string, phaseDurSec: number) => {
      const currentVolume = volumeRef.current;
      if (currentVolume <= 0) return;

      // Stop any ongoing hum first
      if (humStopRef.current) stopHum();

      const isBhramariHum = cls === 'p-moon' && phaseName.toLowerCase().includes('hum');
      const freq = isBhramariHum ? 120 : clsToFreq(cls);
      const dur = isBhramariHum ? phaseDurSec : (TONE_DUR[cls] ?? 2);

      if (Platform.OS === 'web') {
        const ac = ensureAC();
        if (!ac) return;
        if (isBhramariHum) {
          webHum(ac, dur, currentVolume);
          humStopRef.current = () => { /* web hum auto-fades */ };
        } else {
          webTone(ac, freq, dur, currentVolume);
        }
      } else {
        const wavUri = buildWavDataUri(freq, dur, currentVolume * 0.28, isBhramariHum);
        void nativePlay(wavUri);
        if (isBhramariHum) {
          humStopRef.current = stopHum;
        }
      }
    },
    [ensureAC, nativePlay, stopHum],
  );

  // ── Completion chime ──
  const playDone = useCallback(() => {
    if (volume <= 0) return;
    if (Platform.OS === 'web') {
      const ac = ensureAC();
      if (!ac) return;
      webTone(ac, 528, 2.5, volume);
      setTimeout(() => webTone(ac, 396, 2, volume), 400);
      setTimeout(() => webTone(ac, 639, 1.8, volume), 800);
    } else {
      // Play chimes sequentially on native
      const play = async () => {
        try {
          const { Audio } = await import('expo-av');
          const chimes = [
            { freq: 528, dur: 2.5 },
            { freq: 396, dur: 2.0 },
            { freq: 639, dur: 1.8 },
          ];
          for (let i = 0; i < chimes.length; i++) {
            const { freq, dur } = chimes[i];
            await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : 400));
            if (soundRef.current) {
              await soundRef.current.stopAsync().catch(() => {});
              await soundRef.current.unloadAsync().catch(() => {});
              soundRef.current = null;
            }
            const uri = buildWavDataUri(freq, dur, volume * 0.28, false);
            const { sound } = await Audio.Sound.createAsync({ uri });
            soundRef.current = sound;
            await sound.playAsync();
          }
        } catch {
          // non-fatal
        }
      };
      void play();
    }
  }, [volume, ensureAC]);

  return { playPhase, playDone, stopHum };
}
