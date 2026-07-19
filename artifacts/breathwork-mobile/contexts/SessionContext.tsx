import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SK = 'breathwork_mobile_v1';
const LAST_TECH_KEY = 'breathwork_mobile_last_tech';

export interface SessionRecord {
  id: string;
  date: string;
  tech: string;
  ts: number;
  time: string;
  dur: number;
}

interface SessionContextType {
  sessions: SessionRecord[];
  streak: number;
  lastTech: string | null;
  recordSession: (tech: string, durSecs: number) => Promise<void>;
  isLoaded: boolean;
}

const SessionContext = createContext<SessionContextType | null>(null);

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function calcStreak(sessions: SessionRecord[]): number {
  if (!sessions.length) return 0;
  const days = [...new Set(sessions.map(s => s.date))].sort();
  let n = 0;
  let chk = todayStr();
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i] === chk) {
      n++;
      const d = new Date(chk + 'T12:00:00');
      d.setDate(d.getDate() - 1);
      chk = d.toISOString().slice(0, 10);
    } else {
      break;
    }
  }
  return n;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [lastTech, setLastTech] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [raw, lt] = await Promise.all([
          AsyncStorage.getItem(SK),
          AsyncStorage.getItem(LAST_TECH_KEY),
        ]);
        if (raw) setSessions(JSON.parse(raw) as SessionRecord[]);
        if (lt) setLastTech(lt);
      } catch {
      } finally {
        setIsLoaded(true);
      }
    }
    void load();
  }, []);

  const recordSession = useCallback(async (tech: string, durSecs: number) => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr =
      now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const newRecord: SessionRecord = { id, date: dateStr, tech, ts: Date.now(), time: timeStr, dur: durSecs };

    setSessions(prev => {
      const updated = [...prev, newRecord];
      void AsyncStorage.setItem(SK, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
    setLastTech(tech);
    try {
      await AsyncStorage.setItem(LAST_TECH_KEY, tech);
    } catch {
    }
  }, []);

  const streak = calcStreak(sessions);

  return (
    <SessionContext.Provider value={{ sessions, streak, lastTech, recordSession, isLoaded }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextType {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}
