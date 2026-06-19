import { useCallback, useState } from 'react';

const PRESETS_KEY = 'breathwork_presets';

export interface Preset {
  id: string;
  name: string;
  tech: string;
  dur: number;
}

function loadPresets(): Preset[] {
  try { return JSON.parse(localStorage.getItem(PRESETS_KEY) || '[]'); } catch { return []; }
}

function persist(presets: Preset[]) {
  try { localStorage.setItem(PRESETS_KEY, JSON.stringify(presets)); } catch {}
}

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>(() => loadPresets());

  const addPreset = useCallback((name: string, tech: string, dur: number) => {
    setPresets(prev => {
      const next = [...prev, { id: Date.now().toString(), name: name.trim(), tech, dur }];
      persist(next);
      return next;
    });
  }, []);

  const removePreset = useCallback((id: string) => {
    setPresets(prev => {
      const next = prev.filter(p => p.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return { presets, addPreset, removePreset };
}
