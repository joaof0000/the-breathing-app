export interface Phase {
  name: string;
  s: number;
  cls: string;
}

export const TECH_LABELS: Record<string, string> = {
  '478': '4-7-8',
  box: 'Box',
  wimhof: 'Wim Hof',
  tummo: 'Tummo',
  nadi: 'Nadi Shodhana',
  surya: 'Surya Bhedana',
  chandra: 'Chandra Bhedana',
  ujjayi: 'Ujjayi',
  kapalabhati: 'Kapalabhati',
  bhastrika: 'Bhastrika',
  bhramari: 'Bhramari',
  sitali: 'Sitali',
  murcha: 'Murcha',
  ninepurification: '9 Purification',
  coherent: 'Coherent',
  physiosigh: 'Physio Sigh',
  rebirthing: 'Rebirthing',
  transformational: 'Transform. Breath',
  reversebreathing: 'Reverse Breath',
  kumbhaka: 'Kumbhaka',
  hamsah: 'Ham-Sah',
  transmutation: 'Transmutation',
  blink: 'Blink Protocol',
  naturalwalk: 'Natural Walk',
  custom: 'Custom',
};

export const NOSTRIL_TECHS = ['nadi', 'surya', 'chandra', 'ninepurification'];

export function getPhaseColor(cls: string, colors: Record<string, string>): string {
  switch (cls) {
    case 'p-inhale': return colors.phaseInhale ?? '#6A9E7F';
    case 'p-hold':
    case 'p-hold2': return colors.phaseHold ?? '#8E7A9C';
    case 'p-exhale': return colors.phaseExhale ?? '#C4A882';
    case 'p-fire': return colors.phaseFire ?? '#D4663A';
    case 'p-ice': return colors.phaseIce ?? '#5AAABF';
    case 'p-sun': return colors.phaseSun ?? '#D4854A';
    case 'p-moon': return colors.phaseMoon ?? '#7A8FC2';
    default: return colors.primary ?? '#E5A93C';
  }
}

export function getPhases(tech: string, customIn = 4, customH1 = 4, customOut = 4, customH2 = 4): Phase[] {
  switch (tech) {
    case '478': return [
      { name: 'Inhale', s: 4, cls: 'p-inhale' },
      { name: 'Hold', s: 7, cls: 'p-hold' },
      { name: 'Exhale', s: 8, cls: 'p-exhale' },
    ];
    case 'box': return [
      { name: 'Inhale', s: 4, cls: 'p-inhale' },
      { name: 'Hold', s: 4, cls: 'p-hold' },
      { name: 'Exhale', s: 4, cls: 'p-exhale' },
      { name: 'Hold', s: 4, cls: 'p-hold2' },
    ];
    case 'wimhof': return [
      { name: 'Deep Inhale', s: 2, cls: 'p-inhale' },
      { name: 'Full Release', s: 1, cls: 'p-exhale' },
      { name: 'Breath Retention', s: 20, cls: 'p-hold' },
      { name: 'Recovery Breath', s: 5, cls: 'p-inhale' },
    ];
    case 'tummo': return [
      { name: 'Deep Inhale', s: 5, cls: 'p-fire' },
      { name: 'Vase Hold', s: 10, cls: 'p-hold' },
      { name: 'Power Exhale', s: 5, cls: 'p-exhale' },
      { name: 'Rest', s: 3, cls: 'p-inhale' },
    ];
    case 'ujjayi': return [
      { name: 'Inhale — Ocean Sound', s: 5, cls: 'p-inhale' },
      { name: 'Exhale — Ocean Sound', s: 5, cls: 'p-exhale' },
    ];
    case 'nadi': return [
      { name: 'Inhale — Left',  s: 4, cls: 'p-moon' },
      { name: 'Hold',           s: 4, cls: 'p-hold' },
      { name: 'Exhale — Right', s: 4, cls: 'p-sun'  },
      { name: 'Inhale — Right', s: 4, cls: 'p-sun'  },
      { name: 'Hold',           s: 4, cls: 'p-hold' },
      { name: 'Exhale — Left',  s: 4, cls: 'p-moon' },
    ];
    case 'surya': return [
      { name: 'Inhale — Right Nostril', s: 4, cls: 'p-sun'  },
      { name: 'Hold',                   s: 4, cls: 'p-hold' },
      { name: 'Exhale — Left Nostril',  s: 4, cls: 'p-moon' },
    ];
    case 'chandra': return [
      { name: 'Inhale — Left Nostril',  s: 4, cls: 'p-moon' },
      { name: 'Hold',                   s: 4, cls: 'p-hold' },
      { name: 'Exhale — Right Nostril', s: 4, cls: 'p-sun'  },
    ];
    case 'sitali': return [
      { name: 'Inhale — Curl Tongue', s: 5, cls: 'p-moon' },
      { name: 'Exhale — Through Nose', s: 6, cls: 'p-exhale' },
    ];
    case 'murcha': return [
      { name: 'Deep Inhale',      s: 8,  cls: 'p-inhale' },
      { name: 'Hold + Chin Lock', s: 12, cls: 'p-hold'   },
      { name: 'Slow Exhale',      s: 8,  cls: 'p-exhale' },
      { name: 'Rest',             s: 4,  cls: 'p-inhale' },
    ];
    case 'ninepurification': return [
      { name: 'Inhale Left — Anger',   s: 5, cls: 'p-moon'   },
      { name: 'Exhale Right',          s: 6, cls: 'p-sun'    },
      { name: 'Inhale Right — Attach', s: 5, cls: 'p-sun'    },
      { name: 'Exhale Left',           s: 6, cls: 'p-moon'   },
      { name: 'Inhale Both — Ignor.',  s: 5, cls: 'p-inhale' },
      { name: 'Exhale Both',           s: 6, cls: 'p-exhale' },
    ];
    case 'coherent': return [
      { name: 'Inhale', s: 6, cls: 'p-inhale' },
      { name: 'Exhale', s: 6, cls: 'p-exhale' },
    ];
    case 'physiosigh': return [
      { name: 'First Inhale — Deep',     s: 3, cls: 'p-inhale' },
      { name: 'Second Inhale — Top Off', s: 2, cls: 'p-inhale' },
      { name: 'Long Slow Exhale',        s: 8, cls: 'p-exhale' },
      { name: 'Rest',                    s: 2, cls: 'p-inhale' },
    ];
    case 'rebirthing':
    case 'transformational': return [
      { name: 'Inhale — Full',    s: 3, cls: 'p-inhale' },
      { name: 'Exhale — Release', s: 3, cls: 'p-exhale' },
    ];
    case 'reversebreathing': return [
      { name: 'Inhale — Pull Belly In', s: 5, cls: 'p-hold'   },
      { name: 'Exhale — Release Belly', s: 5, cls: 'p-exhale' },
    ];
    case 'kumbhaka': return [
      { name: 'Inhale',           s: 4, cls: 'p-inhale' },
      { name: 'Hold Full Lungs',  s: 8, cls: 'p-hold'   },
      { name: 'Exhale',           s: 4, cls: 'p-exhale' },
      { name: 'Hold Empty Lungs', s: 4, cls: 'p-hold2'  },
    ];
    case 'hamsah': return [
      { name: 'Inhale — HAM (silently)', s: 8, cls: 'p-fire'   },
      { name: 'Hold — Energy at Crown',  s: 2, cls: 'p-hold'   },
      { name: 'Exhale — SAH (aloud)',    s: 3, cls: 'p-exhale' },
    ];
    case 'transmutation': return [
      { name: 'Inhale — Draw Energy Up', s: 4, cls: 'p-fire'   },
      { name: 'Hold — Heart Center',     s: 2, cls: 'p-hold'   },
      { name: 'Exhale — Hum & Radiate',  s: 8, cls: 'p-exhale' },
    ];
    case 'blink': return [
      { name: 'Fast Blinks — Alert',    s: 45, cls: 'p-fire'   },
      { name: 'Open Gaze — Hold',       s: 30, cls: 'p-hold'   },
      { name: 'Slow Blinks — Rest',     s: 60, cls: 'p-moon'   },
      { name: 'Rest & Notice',          s: 15, cls: 'p-exhale' },
    ];
    case 'naturalwalk': return [
      { name: 'Xi — Inhale Belly', s: 2, cls: 'p-inhale' },
      { name: 'Xi — Inhale Chest', s: 2, cls: 'p-inhale' },
      { name: 'Hu — Long Exhale',  s: 6, cls: 'p-exhale' },
    ];
    case 'kapalabhati': return [
      { name: 'Pump — Sharp Exhale', s: 1, cls: 'p-fire'   },
      { name: 'Passive Inhale',      s: 1, cls: 'p-inhale' },
    ];
    case 'bhastrika': return [
      { name: 'Forceful Inhale', s: 2, cls: 'p-fire'   },
      { name: 'Forceful Exhale', s: 2, cls: 'p-exhale' },
    ];
    case 'bhramari': return [
      { name: 'Deep Inhale',       s: 5, cls: 'p-inhale' },
      { name: 'Hum on Exhale',     s: 8, cls: 'p-moon'   },
      { name: 'Natural Rest',      s: 2, cls: 'p-inhale' },
    ];
    case 'custom': {
      const p: Phase[] = [{ name: 'Inhale', s: customIn, cls: 'p-inhale' }];
      if (customH1 > 0) p.push({ name: 'Hold', s: customH1, cls: 'p-hold' });
      p.push({ name: 'Exhale', s: customOut, cls: 'p-exhale' });
      if (customH2 > 0) p.push({ name: 'Hold', s: customH2, cls: 'p-hold2' });
      return p;
    }
    default: return [
      { name: 'Inhale', s: 4, cls: 'p-inhale' },
      { name: 'Exhale', s: 4, cls: 'p-exhale' },
    ];
  }
}

export function cycleSeconds(tech: string): number {
  return getPhases(tech).reduce((sum, p) => sum + p.s, 0);
}
