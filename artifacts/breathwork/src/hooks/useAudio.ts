import { useRef, useCallback } from 'react';

export function useAudio(getVolume: () => number) {
  const acRef = useRef<AudioContext | null>(null);

  const ensureAC = useCallback(() => {
    if (!acRef.current) {
      acRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (acRef.current.state === 'suspended') {
      acRef.current.resume();
    }
    return acRef.current;
  }, []);

  const tone = useCallback((freq: number, dur: number, v = 1) => {
    const ac = ensureAC();
    const g = getVolume() * v;
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

    const gn2 = ac.createGain();
    gn2.connect(ac.destination);
    gn2.gain.setValueAtTime(0, now);
    gn2.gain.linearRampToValueAtTime(g * 0.05, now + 0.06);
    gn2.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.55);
    const o2 = ac.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = freq * 2.01;
    o2.connect(gn2);
    o2.start(now);
    o2.stop(now + dur * 0.55);
  }, [ensureAC, getVolume]);

  const tick = useCallback(() => {
    const ac = ensureAC();
    const g = getVolume();
    if (g < 0.001) return;
    const now = ac.currentTime;
    const gn = ac.createGain();
    gn.connect(ac.destination);
    gn.gain.setValueAtTime(g * 0.03, now);
    gn.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    const o = ac.createOscillator();
    o.type = 'sine';
    o.frequency.value = 820;
    o.connect(gn);
    o.start(now);
    o.stop(now + 0.1);
  }, [ensureAC, getVolume]);

  const hum = useCallback((dur: number) => {
    const ac = ensureAC();
    const g = getVolume();
    if (g < 0.001) return;
    const now = ac.currentTime;
    const gn = ac.createGain();
    gn.connect(ac.destination);
    gn.gain.setValueAtTime(g * 0.15, now);
    gn.gain.linearRampToValueAtTime(g * 0.18, now + 0.3);
    gn.gain.exponentialRampToValueAtTime(0.001, now + dur);
    const o = ac.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = 120;
    o.connect(gn);
    o.start(now);
    o.stop(now + dur);
    const lfo = ac.createOscillator();
    lfo.frequency.value = 6;
    const lfog = ac.createGain();
    lfog.gain.value = 0.06;
    lfo.connect(lfog);
    lfog.connect(gn.gain);
    lfo.start(now);
    lfo.stop(now + dur);
  }, [ensureAC, getVolume]);

  const pumpTone = useCallback(() => {
    const ac = ensureAC();
    const g = getVolume();
    if (g < 0.001) return;
    const now = ac.currentTime;
    const gn = ac.createGain();
    gn.connect(ac.destination);
    gn.gain.setValueAtTime(g * 0.12, now);
    gn.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    const o = ac.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(280, now);
    o.frequency.exponentialRampToValueAtTime(160, now + 0.18);
    o.connect(gn);
    o.start(now);
    o.stop(now + 0.18);
  }, [ensureAC, getVolume]);

  const doneTone = useCallback(() => {
    tone(528, 2.5);
    setTimeout(() => tone(396, 2), 400);
    setTimeout(() => tone(639, 1.8), 800);
  }, [tone]);

  const powerBreathTone = useCallback(() => {
    const ac = ensureAC();
    const g = getVolume();
    if (g < 0.001) return;
    const now = ac.currentTime;
    const gn = ac.createGain();
    gn.connect(ac.destination);
    gn.gain.setValueAtTime(g * 0.09, now);
    gn.gain.linearRampToValueAtTime(g * 0.13, now + 0.12);
    gn.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    const o = ac.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(220, now);
    o.frequency.linearRampToValueAtTime(320, now + 0.12);
    o.frequency.linearRampToValueAtTime(180, now + 0.4);
    o.connect(gn);
    o.start(now);
    o.stop(now + 0.4);
  }, [ensureAC, getVolume]);

  const S = {
    inhale: () => tone(396, 2.5),
    hold: () => tone(528, 1.8),
    exhale: () => tone(285, 3),
    fire: () => tone(432, 1.5, 1.2),
    ret: () => tone(174, 4),
    recov: () => tone(639, 2),
    sun: () => tone(417, 2),
    moon: () => tone(285, 2.5),
  };

  return { ensureAC, tone, tick, hum, pumpTone, doneTone, powerBreathTone, S };
}
