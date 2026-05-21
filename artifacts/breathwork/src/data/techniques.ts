export interface Phase {
  name: string;
  s: number;
  cls: string;
  snd: string;
  nos?: { l: string; r: string };
  hum?: boolean;
}

export interface TechTab {
  id: string;
  label: string;
}

export const TABS: TechTab[] = [
  { id: '478',              label: '4-7-8' },
  { id: 'box',              label: 'Box' },
  { id: 'wimhof',           label: 'Wim Hof' },
  { id: 'tummo',            label: 'Tummo' },
  { id: 'nadi',             label: 'Nadi Shodhana' },
  { id: 'surya',            label: 'Surya Bhedana' },
  { id: 'chandra',          label: 'Chandra Bhedana' },
  { id: 'ujjayi',           label: 'Ujjayi' },
  { id: 'kapalabhati',      label: 'Kapalabhati' },
  { id: 'bhastrika',        label: 'Bhastrika' },
  { id: 'bhramari',         label: 'Bhramari' },
  { id: 'sitali',           label: 'Sitali' },
  { id: 'murcha',           label: 'Murcha' },
  { id: 'ninepurification', label: '9 Purification' },
  { id: 'coherent',         label: 'Coherent' },
  { id: 'physiosigh',       label: 'Physio Sigh' },
  { id: 'blink',            label: 'Blink' },
  { id: 'rebirthing',       label: 'Rebirthing' },
  { id: 'transformational', label: 'Transform. Breath' },
  { id: 'reversebreathing', label: 'Reverse Breath' },
  { id: 'kumbhaka',         label: 'Kumbhaka' },
  { id: 'hamsah',           label: 'Ham-Sah' },
  { id: 'transmutation',    label: 'Transmutation' },
  { id: 'custom',           label: 'Custom' },
];

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
  custom: 'Custom',
  sitali: 'Sitali',
  murcha: 'Murcha',
  ninepurification: '9 Purification Breaths',
  coherent: 'Coherent Breathing',
  physiosigh: 'Physiological Sigh',
  rebirthing: 'Rebirthing',
  transformational: 'Transform. Breath',
  reversebreathing: 'Reverse Breathing',
  kumbhaka: 'Kumbhaka',
  hamsah: 'Ham-Sah',
  transmutation: 'Transmutation',
  blink: 'Blink Protocol',
};

export const NOSTRIL_TECHS = ['nadi', 'surya', 'chandra', 'ninepurification'];
export const PUMP_TECHS = ['kapalabhati', 'bhastrika'];

export const YT_LINKS: Record<string, string> = {
  '478':              'https://www.youtube.com/results?search_query=andrew+weil+4-7-8+breathing+demonstration',
  box:                'https://www.youtube.com/results?search_query=box+breathing+tutorial+4+sides',
  wimhof:             'https://www.youtube.com/watch?v=tybOi4hjZFQ',
  tummo:              'https://www.youtube.com/results?search_query=tummo+inner+fire+breathing+meditation+tutorial',
  nadi:               'https://www.youtube.com/results?search_query=nadi+shodhana+alternate+nostril+breathing+tutorial',
  surya:              'https://www.youtube.com/results?search_query=surya+bhedana+right+nostril+sun+breathing+tutorial',
  chandra:            'https://www.youtube.com/results?search_query=chandra+bhedana+left+nostril+breathing+tutorial+cooling',
  ujjayi:             'https://www.youtube.com/results?search_query=ujjayi+breath+ocean+breath+how+to+tutorial',
  kapalabhati:        'https://www.youtube.com/results?search_query=kapalabhati+skull+shining+breath+of+fire+tutorial+yoga',
  bhastrika:          'https://www.youtube.com/results?search_query=bhastrika+pranayama+bellows+breath+tutorial',
  bhramari:           'https://www.youtube.com/results?search_query=bhramari+pranayama+bee+breath+humming+tutorial',
  sitali:             'https://www.youtube.com/results?search_query=sitali+pranayama+cooling+breath+tutorial',
  murcha:             'https://www.youtube.com/results?search_query=murcha+pranayama+swooning+breath+tutorial',
  ninepurification:   'https://www.youtube.com/results?search_query=nine+purification+breaths+Tibetan+Buddhist+meditation',
  coherent:           'https://www.youtube.com/results?search_query=coherent+breathing+5+breaths+per+minute+HRV+tutorial',
  physiosigh:         'https://www.youtube.com/results?search_query=physiological+sigh+double+inhale+Huberman+Stanford+tutorial',
  rebirthing:         'https://www.youtube.com/results?search_query=rebirthing+breathwork+Leonard+Orr+circular+breathing+explained',
  transformational:   'https://www.youtube.com/results?search_query=transformational+breath+Judith+Kravitz+breathwork+tutorial',
  reversebreathing:   'https://www.youtube.com/results?search_query=reverse+breathing+Taoist+Qigong+paradoxical+breathing+tutorial',
  kumbhaka:           'https://www.youtube.com/results?search_query=kumbhaka+pranayama+breath+retention+tutorial+yoga',
  hamsah:             'https://www.youtube.com/results?search_query=ham+sah+mantra+breathwork+transmutation+pranayama',
  transmutation:      'https://www.youtube.com/results?search_query=sexual+energy+transmutation+breathwork+kundalini+upward+energy',
  blink:              'https://www.youtube.com/results?search_query=huberman+blink+protocol+dopamine+focus+attention',
  custom:             '',
};

export const YT_LABELS: Record<string, string> = {
  '478':              'Watch: Dr. Andrew Weil demonstrates 4-7-8 Breath',
  box:                'Watch: Box Breathing explained',
  wimhof:             'Watch: Official Wim Hof guided breathing — beginners (3 rounds)',
  tummo:              'Watch: Tummo Inner Fire breathing tutorial',
  nadi:               'Watch: Nadi Shodhana — Alternate Nostril tutorial',
  surya:              'Watch: Surya Bhedana — Sun breathing tutorial',
  chandra:            'Watch: Chandra Bhedana — Moon breathing tutorial',
  ujjayi:             'Watch: Ujjayi ocean breath — how to',
  kapalabhati:        'Watch: Kapalabhati — Breath of Fire tutorial',
  bhastrika:          'Watch: Bhastrika — Bellows Breath tutorial',
  bhramari:           'Watch: Bhramari — Bee Breath tutorial',
  sitali:             'Watch: Sitali — Cooling Breath tutorial',
  murcha:             'Watch: Murcha — Swooning Breath tutorial',
  ninepurification:   'Watch: Nine Purification Breaths tutorial',
  coherent:           'Watch: Coherent Breathing — 5.5 breaths/min tutorial',
  physiosigh:         'Watch: Physiological Sigh — Stanford tutorial',
  rebirthing:         'Watch: Rebirthing Breathwork — Leonard Orr method explained',
  transformational:   'Watch: Transformational Breath® — Judith Kravitz method',
  reversebreathing:   'Watch: Reverse Breathing — Taoist Qigong tutorial',
  kumbhaka:           'Watch: Kumbhaka — Breath Retention tutorial',
  hamsah:             'Watch: Ham-Sah mantra breathwork tutorial',
  transmutation:      'Watch: Sexual Energy Transmutation — breathwork and practice',
  blink:              'Watch: Huberman Blink Protocol — focus and attention reset',
};

export const REC_DURATION: Record<string, string> = {
  '478':              '5 min recommended',
  box:                '5 min recommended',
  wimhof:             '3 rounds',
  tummo:              '5–10 min',
  nadi:               '5–10 min',
  surya:              '5 min',
  chandra:            '5 min',
  ujjayi:             '10–20 min',
  kapalabhati:        '3–5 min',
  bhastrika:          '3–5 min',
  bhramari:           '5–10 min',
  sitali:             '5 min',
  murcha:             '5–10 min',
  ninepurification:   '5 min',
  coherent:           '10–20 min',
  physiosigh:         '5 min',
  rebirthing:         '20 min',
  transformational:   '20 min',
  reversebreathing:   '5–10 min',
  kumbhaka:           '5–10 min',
  hamsah:             '10–15 min',
  transmutation:      '5–15 min',
  blink:              '5 min',
  custom:             '',
};

export function getPhases(tech: string, customIn = 4, customH1 = 4, customOut = 4, customH2 = 4): Phase[] {
  switch (tech) {
    case '478': return [
      { name: 'Inhale', s: 4, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Hold', s: 7, cls: 'p-hold', snd: 'hold' },
      { name: 'Exhale', s: 8, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'box': return [
      { name: 'Inhale', s: 4, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Hold', s: 4, cls: 'p-hold', snd: 'hold' },
      { name: 'Exhale', s: 4, cls: 'p-exhale', snd: 'exhale' },
      { name: 'Hold', s: 4, cls: 'p-hold2', snd: 'hold' },
    ];
    case 'tummo': return [
      { name: 'Deep Inhale', s: 5, cls: 'p-fire', snd: 'fire' },
      { name: 'Vase Hold — Contract', s: 10, cls: 'p-hold', snd: 'hold' },
      { name: 'Power Exhale', s: 5, cls: 'p-exhale', snd: 'exhale' },
      { name: 'Rest', s: 3, cls: 'p-inhale', snd: 'inhale' },
    ];
    case 'ujjayi': return [
      { name: 'Inhale — Ocean Sound', s: 5, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Exhale — Ocean Sound', s: 5, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'nadi': return [
      { name: 'Inhale — Left',  s: 4, cls: 'p-moon', snd: 'moon', nos: { l: 'active', r: 'closed' } },
      { name: 'Hold',           s: 4, cls: 'p-hold', snd: 'hold', nos: { l: 'closed', r: 'closed' } },
      { name: 'Exhale — Right', s: 4, cls: 'p-sun',  snd: 'sun',  nos: { l: 'closed', r: 'active' } },
      { name: 'Inhale — Right', s: 4, cls: 'p-sun',  snd: 'sun',  nos: { l: 'closed', r: 'active' } },
      { name: 'Hold',           s: 4, cls: 'p-hold', snd: 'hold', nos: { l: 'closed', r: 'closed' } },
      { name: 'Exhale — Left',  s: 4, cls: 'p-moon', snd: 'moon', nos: { l: 'active', r: 'closed' } },
    ];
    case 'surya': return [
      { name: 'Inhale — Right', s: 4, cls: 'p-sun',  snd: 'sun',  nos: { l: 'closed', r: 'active' } },
      { name: 'Hold',           s: 4, cls: 'p-hold', snd: 'hold', nos: { l: 'closed', r: 'closed' } },
      { name: 'Exhale — Left',  s: 4, cls: 'p-moon', snd: 'moon', nos: { l: 'active', r: 'closed' } },
    ];
    case 'chandra': return [
      { name: 'Inhale — Left',  s: 4, cls: 'p-moon', snd: 'moon', nos: { l: 'active', r: 'closed' } },
      { name: 'Hold',           s: 4, cls: 'p-hold', snd: 'hold', nos: { l: 'closed', r: 'closed' } },
      { name: 'Exhale — Right', s: 4, cls: 'p-sun',  snd: 'sun',  nos: { l: 'closed', r: 'active' } },
    ];
    case 'sitali': return [
      { name: 'Inhale — Curl Tongue (Straw)', s: 5, cls: 'p-moon', snd: 'moon' },
      { name: 'Exhale — Through Nose', s: 6, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'murcha': return [
      { name: 'Deep Inhale',       s: 8,  cls: 'p-inhale', snd: 'inhale' },
      { name: 'Hold + Chin Lock',  s: 12, cls: 'p-hold',   snd: 'hold' },
      { name: 'Slow Exhale',       s: 8,  cls: 'p-exhale', snd: 'exhale' },
      { name: 'Rest',              s: 4,  cls: 'p-inhale', snd: 'inhale' },
    ];
    case 'ninepurification': return [
      { name: 'Set 1 — Anger: Inhale Left',  s: 5, cls: 'p-moon',   snd: 'moon',   nos: { l: 'active', r: 'closed' } },
      { name: 'Set 1 — Exhale Right',         s: 6, cls: 'p-sun',    snd: 'sun',    nos: { l: 'closed', r: 'active' } },
      { name: 'Set 2 — Attach: Inhale Right', s: 5, cls: 'p-sun',    snd: 'sun',    nos: { l: 'closed', r: 'active' } },
      { name: 'Set 2 — Exhale Left',          s: 6, cls: 'p-moon',   snd: 'moon',   nos: { l: 'active', r: 'closed' } },
      { name: 'Set 3 — Both Nostrils',        s: 5, cls: 'p-inhale', snd: 'inhale', nos: { l: 'active', r: 'active' } },
      { name: 'Set 3 — Exhale Both',          s: 6, cls: 'p-exhale', snd: 'exhale', nos: { l: 'active', r: 'active' } },
    ];
    case 'coherent': return [
      { name: 'Inhale — Nose', s: 6, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Exhale — Nose', s: 6, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'physiosigh': return [
      { name: 'First Inhale — Deep',     s: 3, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Second Inhale — Top Off', s: 2, cls: 'p-inhale', snd: 'hold' },
      { name: 'Long Slow Exhale',        s: 8, cls: 'p-exhale', snd: 'exhale' },
      { name: 'Rest',                    s: 2, cls: 'p-inhale', snd: 'inhale' },
    ];
    case 'rebirthing':
    case 'transformational': return [
      { name: 'Inhale — Full',    s: 3, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Exhale — Release', s: 3, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'reversebreathing': return [
      { name: 'Inhale — Pull Belly In', s: 5, cls: 'p-hold',   snd: 'inhale' },
      { name: 'Exhale — Release Belly', s: 5, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'kumbhaka': return [
      { name: 'Inhale',           s: 4, cls: 'p-inhale', snd: 'inhale' },
      { name: 'Hold Full Lungs',  s: 8, cls: 'p-hold',   snd: 'hold' },
      { name: 'Exhale',           s: 4, cls: 'p-exhale', snd: 'exhale' },
      { name: 'Hold Empty Lungs', s: 4, cls: 'p-hold2',  snd: 'hold' },
    ];
    case 'hamsah': return [
      { name: 'Inhale — HAM (mentally)', s: 8, cls: 'p-fire',   snd: 'fire' },
      { name: 'Hold — Energy at Crown',  s: 2, cls: 'p-hold',   snd: 'hold' },
      { name: 'Exhale — SAH (aloud)',    s: 3, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'transmutation': return [
      { name: 'Inhale — Draw Energy Up', s: 4, cls: 'p-fire',   snd: 'fire' },
      { name: 'Hold — Heart Center',     s: 2, cls: 'p-hold',   snd: 'hold' },
      { name: 'Exhale — Hum & Radiate',  s: 8, cls: 'p-exhale', snd: 'exhale', hum: true },
    ];
    case 'blink': return [
      { name: 'Fast Blinks — Alert',   s: 45, cls: 'p-fire',   snd: 'fire' },
      { name: 'Open Gaze — Fix & Hold', s: 30, cls: 'p-hold',  snd: 'hold' },
      { name: 'Slow Blinks — Rest',    s: 60, cls: 'p-moon',   snd: 'moon' },
      { name: 'Rest & Notice',         s: 15, cls: 'p-exhale', snd: 'exhale' },
    ];
    case 'custom': {
      const p: Phase[] = [{ name: 'Inhale', s: customIn, cls: 'p-inhale', snd: 'inhale' }];
      if (customH1 > 0) p.push({ name: 'Hold', s: customH1, cls: 'p-hold', snd: 'hold' });
      p.push({ name: 'Exhale', s: customOut, cls: 'p-exhale', snd: 'exhale' });
      if (customH2 > 0) p.push({ name: 'Hold', s: customH2, cls: 'p-hold2', snd: 'hold' });
      return p;
    }
    default: return [];
  }
}

export const REFERENCE_TABLE = [
  { situation: '😰 Acute Anxiety', best: { tech: 'physiosigh', name: 'Physiological Sigh' }, also: '4-7-8 · Box Breathing' },
  { situation: '💤 Can\'t Sleep', best: { tech: '478', name: '4-7-8' }, also: 'Bhramari · Chandra Bhedana' },
  { situation: '⚡ Need Energy Now', best: { tech: 'kapalabhati', name: 'Kapalabhati' }, also: 'Bhastrika · Surya Bhedana' },
  { situation: '🧘 Before Meditation', best: { tech: 'nadi', name: 'Nadi Shodhana' }, also: 'Bhramari · Tummo' },
  { situation: '🌙 Before Sleep', best: { tech: 'bhramari', name: 'Bhramari' }, also: 'Chandra Bhedana · 4-7-8' },
  { situation: '🔥 Craving / Urge', best: { tech: 'transmutation', name: 'Transmutation' }, also: 'Box Breathing · 4-7-8' },
  { situation: '⚗️ Energy Transmutation', best: { tech: 'hamsah', name: 'Ham-Sah' }, also: 'Transmutation · Tummo' },
  { situation: '💪 Performance', best: { tech: 'wimhof', name: 'Wim Hof' }, also: 'Bhastrika · Box Breathing' },
  { situation: '🥶 Cold Exposure', best: { tech: 'wimhof', name: 'Wim Hof' }, also: 'Bhastrika · Tummo' },
  { situation: '🩸 Blood Pressure', best: { tech: 'bhramari', name: 'Bhramari' }, also: 'Chandra Bhedana · Nadi Shodhana' },
  { situation: '🧠 Brain Fog', best: { tech: 'kapalabhati', name: 'Kapalabhati' }, also: 'Bhastrika · Surya Bhedana' },
  { situation: '🌀 Spiritual / Energy', best: { tech: 'tummo', name: 'Tummo' }, also: 'Nadi Shodhana · Ujjayi' },
  { situation: '🫀 Immune System', best: { tech: 'wimhof', name: 'Wim Hof' }, also: 'Bhastrika · Nadi Shodhana' },
  { situation: '❄️ Overheating / Fever', best: { tech: 'sitali', name: 'Sitali' }, also: 'Chandra Bhedana · 4-7-8' },
  { situation: '💓 HRV / Long-term Health', best: { tech: 'coherent', name: 'Coherent Breathing' }, also: 'Nadi Shodhana · Box Breathing' },
  { situation: '⚡ Emergency Calm', best: { tech: 'physiosigh', name: 'Physiological Sigh' }, also: '4-7-8 · Box Breathing' },
  { situation: '🧬 Trauma Release', best: { tech: 'rebirthing', name: 'Rebirthing' }, also: 'Transform. Breath · Wim Hof' },
  { situation: '🥋 Martial Arts / Qi', best: { tech: 'reversebreathing', name: 'Reverse Breathing' }, also: 'Kumbhaka · Bhastrika' },
  { situation: '🪷 Pre-meditation Clearing', best: { tech: 'ninepurification', name: '9 Purification' }, also: 'Nadi Shodhana · Bhramari' },
  { situation: '🔬 Deep Consciousness', best: { tech: 'murcha', name: 'Murcha' }, also: 'Tummo · Kumbhaka' },
];
