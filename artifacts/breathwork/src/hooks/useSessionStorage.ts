import { useCallback } from 'react';

const SK = 'breathwork_v4';

export interface SessionRecord {
  date: string;
  tech: string;
  ts: number;
  time: string;
  dur: number;
}

function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

let stOK = false;
try {
  localStorage.setItem('__t__', '1');
  localStorage.removeItem('__t__');
  stOK = true;
} catch {
  stOK = false;
}

let memS: SessionRecord[] = [];

export function loadSessions(): SessionRecord[] {
  if (!stOK) return memS;
  try { return JSON.parse(localStorage.getItem(SK) || '[]') || []; } catch { return []; }
}

export function saveSessions(s: SessionRecord[]) {
  if (!stOK) { memS = s; return; }
  try { localStorage.setItem(SK, JSON.stringify(s)); } catch { /* empty */ }
}

export function calcStreak(sess: SessionRecord[]): number {
  if (!sess.length) return 0;
  const days = [...new Set(sess.map(s => s.date))].sort();
  let n = 0;
  let chk = todayStr();
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i] === chk) {
      n++;
      const d = new Date(chk + 'T12:00:00');
      d.setDate(d.getDate() - 1);
      chk = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    } else break;
  }
  return n;
}

export function useSessionStorage() {
  const record = useCallback((tech: string, durSecs: number) => {
    const s = loadSessions();
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    s.push({ date: todayStr(), tech, ts: Date.now(), time: timeStr, dur: durSecs || 0 });
    saveSessions(s);
  }, []);

  const reset = useCallback(() => {
    saveSessions([]);
  }, []);

  return { record, reset, loadSessions, todayStr };
}
