export interface GoalChoice {
  tech: string;
  name: string;
  desc: string;
}

export interface GoalMusic {
  composer: string;
  title: string;
  detail: string;
  why: string;
}

export interface Goal {
  label: string;
  choices: GoalChoice[];
  music: GoalMusic;
}

export interface GoalButton {
  key: string;
  icon: string;
  label: string;
  sub: string;
}

export const GOAL_BUTTONS: GoalButton[] = [
  { key: 'energy',      icon: '🌅', label: 'Energy',      sub: 'Wake up & activate' },
  { key: 'focus',       icon: '🎯', label: 'Focus',       sub: 'Sharp & present' },
  { key: 'adhd',        icon: '👁️', label: 'ADHD / Blink', sub: 'Attention & brain training' },
  { key: 'calm',        icon: '🌊', label: 'Calm',        sub: 'Anxiety & stress relief' },
  { key: 'sleep',       icon: '🌙', label: 'Sleep',       sub: 'Wind down & rest' },
  { key: 'spiritual',   icon: '🕯️', label: 'Spiritual',   sub: 'Meditation & energy work' },
  { key: 'craving',     icon: '🔥', label: 'Craving',     sub: 'Break the urge now' },
  { key: 'anger',       icon: '😤', label: 'Anger',       sub: 'Reset & release' },
  { key: 'performance', icon: '💪', label: 'Performance', sub: 'Physical & endurance' },
  { key: 'health',      icon: '🩺', label: 'Health',      sub: 'Blood pressure & immunity' },
  { key: 'trauma',      icon: '🧬', label: 'Trauma',      sub: 'Release & heal' },
  { key: 'transmute',   icon: '⚗️', label: 'Transmute',   sub: 'Redirect vital energy' },
];

export const GOALS: Record<string, Goal> = {
  energy: {
    label: '🌅 Energy — Wake up & Activate',
    choices: [
      { tech: 'kapalabhati',  name: 'Kapalabhati',       desc: 'Skull-shining pump breath — instant alertness and metabolic fire' },
      { tech: 'bhastrika',    name: 'Bhastrika',          desc: 'Bellows breath — full-force inhale + exhale, surges vitality' },
      { tech: 'surya',        name: 'Surya Bhedana',      desc: 'Right-nostril sun breath — activates solar heating energy' },
    ],
    music: {
      composer: 'Vivaldi',
      title: '"Spring" — The Four Seasons',
      detail: 'Allegro, RV 269',
      why: 'The original sonic sunrise. Vivaldi\'s sparkling Allegro fires the same ascending energy you build with each pump breath — nature waking up at full force.',
    },
  },
  focus: {
    label: '🎯 Focus — Sharp & Present',
    choices: [
      { tech: 'box',          name: 'Box Breathing',      desc: 'Equal 4-4-4-4 — Navy SEAL protocol for alert calm under pressure' },
      { tech: 'coherent',     name: 'Coherent Breathing', desc: '5.5 breaths/min — maximizes HRV and sustained mental clarity' },
      { tech: 'kapalabhati',  name: 'Kapalabhati',        desc: 'Skull-shining breath — increases cerebral blood flow fast' },
    ],
    music: {
      composer: 'Bach',
      title: 'Prelude in C Major',
      detail: 'BWV 846, Well-Tempered Clavier',
      why: 'Bach\'s mathematical perfection mirrors box breathing\'s equal structure. One unbroken thread of logic — used widely as a focus and deep-work anchor.',
    },
  },
  adhd: {
    label: '👁️ ADHD / Blink — Attention & Brain Training',
    choices: [
      { tech: 'blink',        name: 'Blink Protocol',     desc: 'Huberman fast-blink reset — dopamine surge and attentional blink reduction in 60 seconds' },
      { tech: 'coherent',     name: 'Coherent Breathing', desc: '5.5 breaths/min — HRV entrainment calms ADHD nervous system dysregulation' },
      { tech: 'box',          name: 'Box Breathing',      desc: 'Rhythmic 4-4-4-4 — anchors scattered attention through controlled breath timing' },
    ],
    music: {
      composer: 'Ravel',
      title: 'Boléro',
      detail: 'M. 81 (1928)',
      why: 'A single repeating theme that builds for 15 minutes without deviation — it trains sustained attention by giving the distracted mind exactly one thing to follow.',
    },
  },
  calm: {
    label: '🌊 Calm — Anxiety & Stress Relief',
    choices: [
      { tech: 'physiosigh',   name: 'Physiological Sigh', desc: 'Stanford #1 — double inhale + long exhale, works in one breath' },
      { tech: '478',          name: '4-7-8 Breath',       desc: 'Dr. Andrew Weil — anxiety drops within 90 seconds' },
      { tech: 'bhramari',     name: 'Bhramari',           desc: 'Bee hum — quiets the amygdala in under 3 minutes' },
    ],
    music: {
      composer: 'Debussy',
      title: 'Clair de Lune',
      detail: 'Suite Bergamasque, L. 75 (1905)',
      why: 'Moonlight in sound. Debussy\'s slow harmonic waves mirror the long exhale — each phrase opens and resolves exactly as the nervous system releases tension.',
    },
  },
  sleep: {
    label: '🌙 Sleep — Wind Down & Rest',
    choices: [
      { tech: 'bhramari',     name: 'Bhramari',           desc: 'Bee hum — fastest nervous system off-switch before sleep' },
      { tech: 'chandra',      name: 'Chandra Bhedana',    desc: 'Left-nostril moon breath — cools and prepares for deep rest' },
      { tech: '478',          name: '4-7-8 Breath',       desc: 'Relaxation breath — one of the best-known sleep onset aids' },
    ],
    music: {
      composer: 'Chopin',
      title: 'Nocturne Op. 9 No. 2',
      detail: 'E♭ major (1832)',
      why: 'Chopin composed his Nocturnes for the night. This one drifts with the quality of half-sleep — the ornaments trail off like thoughts dissolving before unconsciousness.',
    },
  },
  spiritual: {
    label: '🕯️ Spiritual — Meditation & Energy',
    choices: [
      { tech: 'hamsah',           name: 'Ham-Sah',            desc: 'Samael Aun Weor — the key mantra-breath for transmutation and awakening consciousness' },
      { tech: 'ninepurification', name: '9 Purification',     desc: 'Tibetan Bön — clears anger, attachment, ignorance before meditation' },
      { tech: 'tummo',            name: 'Tummo',              desc: 'Inner Fire — vase breathing, kundalini and heat generation' },
    ],
    music: {
      composer: 'Bach',
      title: 'Air on the G String',
      detail: 'Suite No. 3 in D, BWV 1068',
      why: 'One of the few pieces scientists describe as "transcendent" in fMRI studies. The single sustained melody lifts awareness above thought — perfect for entering meditative states.',
    },
  },
  craving: {
    label: '🔥 Craving — Break the Urge Now',
    choices: [
      { tech: 'transmutation', name: 'Transmutation Breath', desc: '4-2-8 Wheel — redirects the energy upward at the moment of the urge' },
      { tech: 'physiosigh',    name: 'Physiological Sigh',   desc: 'Fastest physiological reset — one breath interrupts the impulse circuit' },
      { tech: 'box',           name: 'Box Breathing',        desc: '19-second gap between impulse and action — clinically validated' },
    ],
    music: {
      composer: 'Beethoven',
      title: 'Moonlight Sonata — 1st Movement',
      detail: 'Op. 27 No. 2, Adagio sostenuto (1801)',
      why: 'Beethoven channels intense desire into stillness. The steady triplet pulse is the sound of redirected energy — urgent feeling transformed into measured, purposeful motion.',
    },
  },
  anger: {
    label: '😤 Anger — Reset & Release',
    choices: [
      { tech: 'bhramari',         name: 'Bhramari',          desc: "Bee hum — directly quiets the brain's anger and fear center" },
      { tech: 'chandra',          name: 'Chandra Bhedana',   desc: 'Left-nostril cooling breath — reduces fire and heat energy' },
      { tech: 'ninepurification', name: '9 Purification',    desc: 'Tibetan — first three breaths specifically clear anger through the right channel' },
    ],
    music: {
      composer: 'Bach',
      title: 'Toccata & Fugue in D minor',
      detail: 'BWV 565 (c. 1703–1707)',
      why: 'The most visceral release in all of music. Those opening descending chords hold and channel rage the way a lightning rod holds lightning — anger enters, transforms, and resolves.',
    },
  },
  performance: {
    label: '💪 Performance — Physical & Endurance',
    choices: [
      { tech: 'wimhof',    name: 'Wim Hof',       desc: 'Supercharge oxygen, flush CO₂, voluntary immune control' },
      { tech: 'bhastrika', name: 'Bhastrika',     desc: 'Bellows breath — generates maximum prana and physical vitality' },
      { tech: 'box',       name: 'Box Breathing', desc: 'Pre-performance nervous system calibration — alert and calm' },
    ],
    music: {
      composer: 'Beethoven',
      title: 'Symphony No. 5 — 1st Movement',
      detail: 'Op. 67, Allegro con brio (1808)',
      why: 'Those four notes are the most famous call to action in all of music. Beethoven primes the body for maximum effort — played before performance, it signals every cell to engage.',
    },
  },
  health: {
    label: '🩺 Health — Blood Pressure & Immunity',
    choices: [
      { tech: 'bhramari',  name: 'Bhramari',           desc: 'Most researched breath for blood pressure — measurable drop in 10 minutes' },
      { tech: 'coherent',  name: 'Coherent Breathing', desc: '20 min daily — largest long-term BP and HRV improvements in research' },
      { tech: 'wimhof',    name: 'Wim Hof',            desc: 'Clinically documented immune system activation and inflammation reduction' },
    ],
    music: {
      composer: 'Mozart',
      title: 'Eine kleine Nachtmusik',
      detail: '1st mvt — Allegro, K. 525 (1787)',
      why: "Mozart's most life-affirming music — bright, ordered, perfectly proportioned. Studies show it raises dopamine and supports immune function. Medicine in sound form.",
    },
  },
  trauma: {
    label: '🧬 Trauma — Release & Heal',
    choices: [
      { tech: 'rebirthing',       name: 'Rebirthing Breathwork',   desc: "Leonard Orr's circular breath — accesses and releases stored emotional material" },
      { tech: 'transformational', name: 'Transformational Breath', desc: 'Judith Kravitz — open-mouth belly breath + body mapping for trauma layers' },
      { tech: 'bhramari',         name: 'Bhramari',                desc: 'Vagus nerve stimulation — calms the trauma-activated nervous system' },
    ],
    music: {
      composer: 'Handel',
      title: 'Sarabande in D minor',
      detail: 'HWV 437, Suite No. 4 (c. 1703)',
      why: 'Achingly slow and inevitable — Handel\'s Sarabande creates exactly the container trauma needs: something that holds pain with dignity, without rushing it toward resolution.',
    },
  },
  transmute: {
    label: '⚗️ Transmute — Redirect Vital Energy',
    choices: [
      { tech: 'hamsah',        name: 'Ham-Sah',              desc: 'Samael Aun Weor — the foundational Gnostic mantra-breath for energy transmutation' },
      { tech: 'transmutation', name: 'Transmutation Breath', desc: '4-2-8 Wheel — redirects the energy upward at the moment of the urge' },
      { tech: 'tummo',         name: 'Tummo',                desc: 'Inner Fire — vase breath moves energy from base to crown of spine' },
    ],
    music: {
      composer: 'Bach',
      title: 'Chaconne in D minor',
      detail: 'Partita No. 2, BWV 1004 (1720)',
      why: 'Bach\'s greatest achievement — 15 minutes of transformation built from a single bass line. It spirals upward through every emotional state: the musical mirror of alchemical transmutation.',
    },
  },
};
