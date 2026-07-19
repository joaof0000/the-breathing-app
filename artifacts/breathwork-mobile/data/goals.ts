export interface GoalChoice {
  tech: string;
  name: string;
  desc: string;
}

export interface GoalButton {
  key: string;
  icon: string;
  iconLib: 'Ionicons' | 'MaterialCommunityIcons';
  label: string;
  sub: string;
}

export const GOAL_BUTTONS: GoalButton[] = [
  { key: 'energy',      icon: 'flash',              iconLib: 'Ionicons',                   label: 'Energy',      sub: 'Wake up & activate' },
  { key: 'focus',       icon: 'locate',             iconLib: 'Ionicons',                   label: 'Focus',       sub: 'Sharp & present' },
  { key: 'calm',        icon: 'water',              iconLib: 'Ionicons',                   label: 'Calm',        sub: 'Anxiety & stress relief' },
  { key: 'sleep',       icon: 'moon',               iconLib: 'Ionicons',                   label: 'Sleep',       sub: 'Wind down & rest' },
  { key: 'spiritual',   icon: 'flame',              iconLib: 'Ionicons',                   label: 'Spiritual',   sub: 'Meditation & energy' },
  { key: 'craving',     icon: 'alert-circle',       iconLib: 'Ionicons',                   label: 'Craving',     sub: 'Break the urge now' },
  { key: 'anger',       icon: 'thunderstorm',       iconLib: 'Ionicons',                   label: 'Anger',       sub: 'Reset & release' },
  { key: 'performance', icon: 'barbell',            iconLib: 'Ionicons',                   label: 'Performance', sub: 'Physical & endurance' },
  { key: 'health',      icon: 'heart',              iconLib: 'Ionicons',                   label: 'Health',      sub: 'Blood pressure & immunity' },
  { key: 'trauma',      icon: 'leaf',               iconLib: 'Ionicons',                   label: 'Trauma',      sub: 'Release & heal' },
  { key: 'transmute',   icon: 'sync-circle',        iconLib: 'Ionicons',                   label: 'Transmute',   sub: 'Redirect vital energy' },
  { key: 'adhd',        icon: 'eye',                iconLib: 'Ionicons',                   label: 'ADHD / Focus', sub: 'Attention reset' },
  { key: 'recovery',    icon: 'medical',            iconLib: 'Ionicons',                   label: 'Recovery',    sub: 'Illness & healing' },
  { key: 'bleak',       icon: 'cloud-outline',      iconLib: 'Ionicons',                   label: 'Low Mood',    sub: 'When the light feels far' },
  { key: 'grief',       icon: 'heart-dislike',      iconLib: 'Ionicons',                   label: 'Grief',       sub: 'Loss & letting go' },
];

export const GOALS: Record<string, { label: string; choices: GoalChoice[] }> = {
  energy: {
    label: 'Energy — Wake up & Activate',
    choices: [
      { tech: 'kapalabhati',  name: 'Kapalabhati',       desc: 'Skull-shining pump breath — instant alertness and metabolic fire' },
      { tech: 'bhastrika',    name: 'Bhastrika',          desc: 'Bellows breath — full-force inhale + exhale, surges vitality' },
      { tech: 'surya',        name: 'Surya Bhedana',      desc: 'Right-nostril sun breath — activates solar heating energy' },
    ],
  },
  focus: {
    label: 'Focus — Sharp & Present',
    choices: [
      { tech: 'box',          name: 'Box Breathing',      desc: 'Equal 4-4-4-4 — Navy SEAL protocol for alert calm under pressure' },
      { tech: 'coherent',     name: 'Coherent Breathing', desc: '5.5 breaths/min — maximizes HRV and sustained mental clarity' },
      { tech: 'kapalabhati',  name: 'Kapalabhati',        desc: 'Skull-shining breath — increases cerebral blood flow fast' },
    ],
  },
  adhd: {
    label: 'ADHD / Focus — Attention Reset',
    choices: [
      { tech: 'blink',        name: 'Blink Protocol',     desc: 'Huberman fast-blink reset — dopamine and attentional reset in 60s' },
      { tech: 'coherent',     name: 'Coherent Breathing', desc: '5.5 breaths/min — HRV entrainment calms nervous system dysregulation' },
      { tech: 'box',          name: 'Box Breathing',      desc: 'Rhythmic 4-4-4-4 — anchors scattered attention through breath timing' },
    ],
  },
  calm: {
    label: 'Calm — Anxiety & Stress Relief',
    choices: [
      { tech: 'physiosigh',   name: 'Physiological Sigh', desc: 'Stanford #1 — double inhale + long exhale, works in one breath' },
      { tech: '478',          name: '4-7-8 Breath',       desc: 'Dr. Andrew Weil — anxiety drops within 90 seconds' },
      { tech: 'bhramari',     name: 'Bhramari',           desc: 'Bee hum — quiets the amygdala in under 3 minutes' },
    ],
  },
  sleep: {
    label: 'Sleep — Wind Down & Rest',
    choices: [
      { tech: 'bhramari',     name: 'Bhramari',           desc: 'Bee hum — fastest nervous system off-switch before sleep' },
      { tech: 'chandra',      name: 'Chandra Bhedana',    desc: 'Left-nostril moon breath — cools and prepares for deep rest' },
      { tech: '478',          name: '4-7-8 Breath',       desc: 'Relaxation breath — one of the best-known sleep onset aids' },
    ],
  },
  spiritual: {
    label: 'Spiritual — Meditation & Energy',
    choices: [
      { tech: 'hamsah',           name: 'Ham-Sah',            desc: 'The key mantra-breath for transmutation and awakening consciousness' },
      { tech: 'ninepurification', name: '9 Purification',     desc: 'Tibetan Bön — clears anger, attachment, ignorance before meditation' },
      { tech: 'tummo',            name: 'Tummo',              desc: 'Inner Fire — vase breathing, kundalini and heat generation' },
    ],
  },
  craving: {
    label: 'Craving — Break the Urge Now',
    choices: [
      { tech: 'transmutation', name: 'Transmutation Breath', desc: '4-2-8 Wheel — redirects the energy upward at the moment of the urge' },
      { tech: 'physiosigh',    name: 'Physiological Sigh',   desc: 'Fastest physiological reset — one breath interrupts the impulse circuit' },
      { tech: 'box',           name: 'Box Breathing',        desc: '19-second gap between impulse and action — clinically validated' },
    ],
  },
  anger: {
    label: 'Anger — Reset & Release',
    choices: [
      { tech: 'bhramari',         name: 'Bhramari',          desc: "Bee hum — directly quiets the brain's anger and fear center" },
      { tech: 'chandra',          name: 'Chandra Bhedana',   desc: 'Left-nostril cooling breath — reduces fire and heat energy' },
      { tech: 'ninepurification', name: '9 Purification',    desc: 'Tibetan — first three breaths specifically clear anger' },
    ],
  },
  performance: {
    label: 'Performance — Physical & Endurance',
    choices: [
      { tech: 'wimhof',    name: 'Wim Hof',       desc: 'Supercharge oxygen, flush CO₂, voluntary immune control' },
      { tech: 'bhastrika', name: 'Bhastrika',     desc: 'Bellows breath — generates maximum prana and physical vitality' },
      { tech: 'box',       name: 'Box Breathing', desc: 'Pre-performance nervous system calibration — alert and calm' },
    ],
  },
  health: {
    label: 'Health — Blood Pressure & Immunity',
    choices: [
      { tech: 'bhramari',  name: 'Bhramari',           desc: 'Most researched breath for blood pressure — measurable drop in 10 min' },
      { tech: 'coherent',  name: 'Coherent Breathing', desc: '20 min daily — largest long-term BP and HRV improvements in research' },
      { tech: 'wimhof',    name: 'Wim Hof',            desc: 'Clinically documented immune system activation and inflammation reduction' },
    ],
  },
  trauma: {
    label: 'Trauma — Release & Heal',
    choices: [
      { tech: 'rebirthing',       name: 'Rebirthing',           desc: "Leonard Orr's circular breath — accesses and releases stored emotional material" },
      { tech: 'transformational', name: 'Transformational Breath', desc: 'Open-mouth belly breath + body mapping for trauma layers' },
      { tech: 'bhramari',         name: 'Bhramari',             desc: 'Vagus nerve stimulation — calms the trauma-activated nervous system' },
    ],
  },
  transmute: {
    label: 'Transmute — Redirect Vital Energy',
    choices: [
      { tech: 'hamsah',        name: 'Ham-Sah',              desc: 'The foundational Gnostic mantra-breath for energy transmutation' },
      { tech: 'transmutation', name: 'Transmutation Breath', desc: '4-2-8 Wheel — redirects the energy upward at the moment of the urge' },
      { tech: 'tummo',         name: 'Tummo',                desc: 'Inner Fire — vase breath moves energy from base to crown' },
    ],
  },
  recovery: {
    label: 'Recovery — Illness & Healing',
    choices: [
      { tech: 'naturalwalk',  name: 'Natural Walk',      desc: 'Guolin Qigong — clinically documented immune activation through walking breath' },
      { tech: 'bhramari',     name: 'Bhramari',          desc: 'Bee hum — vagus nerve stimulation with measurable anti-inflammatory effects' },
      { tech: 'coherent',     name: 'Coherent Breathing', desc: '5.5 breaths/min — maximizes HRV, the body\'s best resilience marker' },
    ],
  },
  bleak: {
    label: 'Low Mood — Depression & Dark Days',
    choices: [
      { tech: 'coherent',  name: 'Coherent Breathing', desc: 'Most researched non-drug intervention for low mood — 20 min daily' },
      { tech: 'bhramari',  name: 'Bhramari',           desc: 'Bee hum — quiets the inner critic and dark thought loops' },
      { tech: '478',       name: '4-7-8 Breath',       desc: 'Breaks the shallow breath pattern that locks in low mood' },
    ],
  },
  grief: {
    label: 'Grief — Loss & Letting Go',
    choices: [
      { tech: 'rebirthing',  name: 'Rebirthing Breathwork', desc: 'Circular connected breath — allows suppressed grief to surface and move' },
      { tech: 'bhramari',    name: 'Bhramari',              desc: 'Gentle hum — holds sadness with warmth, soothes the tightened chest' },
      { tech: 'naturalwalk', name: 'Natural Walk',          desc: 'Moving breath — walking and breathing integrates grief gently over time' },
    ],
  },
};
