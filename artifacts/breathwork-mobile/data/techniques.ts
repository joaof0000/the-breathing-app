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

// ─── Technique info data (mirrors the web app's InfoDrawer content) ───────────

export interface InfoSection {
  title?: string;
  steps: string[];
}

export interface TechInfo {
  title: string;
  intro: string[];
  sections?: InfoSection[];
  tip?: string;
  warn?: string;
  feel: string;
  see: string;
  note: string;
}

export const TECH_INFO: Record<string, TechInfo> = {
  '478': {
    title: '4-7-8 Relaxation Breath',
    intro: ["Dr. Andrew Weil's adaptation of ancient pranayama. The extended exhale activates the parasympathetic nervous system — your body's rest-and-digest mode."],
    sections: [{ title: 'Pattern', steps: ['Inhale through nose — 4 seconds', 'Hold — 7 seconds, body relaxed', 'Exhale through mouth — 8 seconds, audible whoosh'] }],
    tip: "Tongue tip behind upper front teeth throughout. Ratio matters more than exact pace — if 4-7-8 feels too long, slow your count.",
    feel: '1 session', see: '1–2 weeks daily',
    note: "One session before bed shifts you within 90 seconds. Two weeks daily practice and your baseline anxiety drops measurably.",
  },
  box: {
    title: 'Box Breathing',
    intro: ["Used by Navy SEALs for instant calm under pressure. Four equal sides."],
    sections: [{ title: 'Pattern', steps: ['Inhale — 4s', 'Hold full — 4s', 'Exhale — 4s', 'Hold empty — 4s'] }],
    feel: '2–4 minutes', see: '1 week daily',
    note: "You will feel calmer within a single 4-minute session. One week of daily practice and your stress response visibly changes under pressure.",
  },
  wimhof: {
    title: 'Wim Hof Method',
    intro: ["Controlled hyperventilation → breath retention → recovery. Activates the sympathetic nervous system and gives voluntary influence over immune response."],
    sections: [{ title: 'Each Round', steps: ['30 Power Breaths: Deep belly-to-chest inhale through nose, let exhale go without forcing. Continuous rhythm.', 'Retention: After 30th breath, exhale fully and hold empty lungs. Timer runs — press when you need to breathe.', 'Recovery: One deep inhale, hold 15 seconds, release.'] }],
    warn: "Always seated or lying down. Never in water or while driving.",
    feel: '1 session', see: '2–4 weeks',
    note: "The first session produces noticeable altered states. 2–4 weeks of daily practice and measurable immune and cold tolerance changes occur — documented in clinical studies.",
  },
  tummo: {
    title: 'Tummo — Inner Fire',
    intro: ["Tibetan Buddhist vase breathing. Visualization + pelvic contraction + breath retention generates measurable internal heat. Harvard-documented in Himalayan monks."],
    sections: [{ title: 'Each Cycle', steps: ['Visualize a flame at your navel. Hold the image throughout.', 'Inhale (5s): Deep belly breath, imagine air feeding the flame.', 'Vase Hold (10s): Swallow gently. Contract pelvic floor upward. Press lower belly inward. Two forces meet at the navel. Flame blazes up the spine.', 'Power Exhale (5s): Release, exhale through rounded lips. Heat radiates out.'] }],
    tip: "Visualization is not optional — studies show temperature effects are minimal without it.",
    feel: '2–3 sessions', see: '4–6 weeks',
    note: "Warmth and energy sensations begin in the first few sessions. Consistent daily practice over 4–6 weeks develops real heat generation and a stable energized meditation state.",
  },
  nadi: {
    title: 'Nadi Shodhana — Alternate Nostril Breathing',
    intro: ['"Nadi" means energy channel. "Shodhana" means purification. This technique balances the solar (right/heating) and lunar (left/cooling) energy channels. When both are clear and equal, the central channel opens.', 'Use your right hand. Thumb closes the right nostril. Ring finger closes the left nostril.'],
    feel: '1 session', see: '2–4 weeks',
    note: "Mental balance and calm within the first session. Two to four weeks daily and focus, emotional stability, and meditation depth all improve measurably.",
  },
  surya: {
    title: 'Surya Bhedana — Right Nostril / Sun Breath',
    intro: ['"Surya" means sun. Always inhale through the right (solar/Pingala) nostril, exhale through the left (lunar/Ida). This activates the sympathetic nervous system — heating, energizing, focusing.'],
    sections: [{ title: 'Pattern', steps: ['Close left nostril with ring finger', 'Inhale through right nostril — 4 seconds', 'Close both — Hold — 4 seconds', 'Release left, exhale through left — 4 seconds'] }],
    tip: "Use in the morning or when you need energy. Avoid before sleep — it is activating. Complement with Chandra Bhedana to balance.",
    feel: '1 session', see: '1–2 weeks',
    note: "Alertness and warmth within 2–3 minutes. One to two weeks daily practice and the activation effect becomes consistent and sustainable.",
  },
  chandra: {
    title: 'Chandra Bhedana — Left Nostril / Moon Breath',
    intro: ['"Chandra" means moon. Always inhale through the left (lunar/Ida) nostril, exhale through the right (solar/Pingala). This activates the parasympathetic nervous system — cooling, calming, grounding.'],
    sections: [{ title: 'Pattern', steps: ['Close right nostril with thumb', 'Inhale through left nostril — 4 seconds', 'Close both — Hold — 4 seconds', 'Release right, exhale through right — 4 seconds'] }],
    tip: "Use in the evening, before sleep, or when you feel overheated or angry. Counterpart to Surya Bhedana.",
    feel: '1 session', see: '1–2 weeks',
    note: "Cooling and calming within the first 3 minutes. Daily use before bed produces measurably better sleep quality within two weeks.",
  },
  ujjayi: {
    title: 'Ujjayi — Victorious / Ocean Breath',
    intro: ['"Ujjayi" means "to become victorious." The technique creates a soft ocean or hissing sound by slightly constricting the back of the throat on both inhale and exhale. This is the foundation of most Ashtanga and Vinyasa yoga practice.'],
    sections: [{ title: 'The Technique', steps: ['Breathe through the nose only, both directions.', 'Slightly constrict the back of the throat — imagine fogging a mirror with your mouth closed. Both inhale and exhale have the same sound.', 'Inhale (5s): Slow, controlled, audible hiss up the spine.', 'Exhale (5s): Slow, controlled, audible ocean sound. Belly draws in gently.'] }],
    feel: '1 session', see: '2–3 weeks',
    note: "Calming effect and body heat within the first few minutes. Two to three weeks of daily practice and breath control, focus, and heat regulation all improve substantially.",
  },
  kapalabhati: {
    title: 'Kapalabhati — Skull-Shining Breath',
    intro: ['"Kapala" means skull, "bhati" means light or shining. Rapid sharp exhales pump the diaphragm and clear the nasal passages. The inhale is passive — the air flows in by itself. One of the six Shatkarmas (purification practices) in traditional Hatha yoga.'],
    sections: [{ title: 'The Technique', steps: ['Sit tall. Take a deep natural inhale.', 'Sharp exhale: Forcefully contract the abdomen — belly button to spine. Air shoots out the nose.', 'Passive inhale: Release the abdomen. Air flows in automatically. You do not inhale consciously.', 'Rhythm: approximately 1–2 pumps per second. Build speed gradually over weeks.', 'Standard: 3 rounds of 30 pumps with rest between.'] }],
    warn: "Not recommended during pregnancy, menstruation, or if you have high blood pressure, heart disease, epilepsy, or recent abdominal surgery.",
    feel: '1 session', see: '1–2 weeks',
    note: "Immediate alertness and sinus clearing within 30 seconds. One to two weeks and the energy effect becomes reliable and the technique becomes effortless.",
  },
  bhastrika: {
    title: 'Bhastrika — Bellows Breath',
    intro: ['"Bhastrika" means bellows — the device used to fan a fire. Both the inhale AND exhale are active and forceful, like a bellows pumping air. This is the most vigorous pranayama — more intense than Kapalabhati.'],
    sections: [{ title: 'The Technique', steps: ['Sit upright. Take a deep preparatory breath.', 'Force BOTH inhale and exhale — belly expands sharply on inhale, contracts sharply on exhale. Both are active, both are equal.', 'Rate: about 1 breath per second. Slower than Kapalabhati.', 'Standard: 10–20 breaths per round, 3 rounds, rest between.', 'After the last breath: deep inhale, hold as long as comfortable, then exhale slowly.'] }],
    warn: "Very powerful. Not for beginners. Not during pregnancy, hypertension, hernia, epilepsy. If you feel lightheaded, stop immediately and breathe naturally.",
    feel: '1 session', see: '1–2 weeks',
    note: "Full body vitality surge within the first session. One to two weeks and lung capacity, energy, and heat generation all increase noticeably.",
  },
  bhramari: {
    title: 'Bhramari — Bee Breath / Humming Breath',
    intro: ['"Bhramari" means bee. The exhale is a continuous humming sound — like a bee — made with the mouth closed. The hum creates vibration throughout the skull and chest that directly stimulates the vagus nerve, induces nitric oxide production, and measurably reduces blood pressure and cortisol. Most researched pranayama for immediate nervous system calming.'],
    sections: [{ title: 'The Technique', steps: ['Sit quietly. Optional: plug ears with thumbs (Shanmukhi Mudra) for deeper effect.', 'Deep inhale through the nose — fill the lungs fully.', 'Exhale with a steady HMMMMmmm hum — lips closed, teeth slightly apart. Feel the vibration in the skull, sinuses, and chest. The hum should be continuous until the lungs are empty.', 'The pitch of the hum matters — try a low, resonant hum. Experiment to find where the vibration is strongest in your skull.'] }],
    feel: '3–5 minutes', see: '1–2 weeks',
    note: "Blood pressure drops within a single 10-minute session — this is the most researched effect. One to two weeks daily and baseline stress reactivity decreases measurably.",
  },
  sitali: {
    title: 'Sitali — Cooling Breath',
    intro: ['"Sitali" means cooling or soothing. One of the rare pranayamas where air enters through the mouth — curled tongue acts as a straw. Cools the body, reduces heat, calms anger and fever.'],
    sections: [{ title: 'The Technique', steps: ["Curl the tongue into a tube shape (like a straw) and stick it slightly out of the mouth. If you can't curl your tongue, open the mouth slightly and inhale through the teeth (Sitkari).", 'Inhale through the tongue/straw (5s): Draw air in slowly over the tongue. You will feel the cooling effect immediately.', 'Close mouth, exhale through nose (6s).', 'Repeat for 5–10 minutes or until cool.'] }],
    tip: "Not for use in cold weather or by people with very sensitive teeth. Ideal in summer, after exercise, during fever, or when anger or frustration is producing heat.",
    feel: '1 session', see: 'Immediate',
    note: "Cooling effect within 2 minutes of practice. Most immediate result of any pranayama — use it specifically for heat, fever, and hot anger.",
  },
  murcha: {
    title: 'Murcha — Swooning Breath',
    intro: ['"Murcha" means to faint or swoon — because when done correctly, it can induce a state of profound inner stillness that feels like the boundary between waking and unconsciousness. One of the most advanced pranayamas. Uses Jalandhara Bandha (chin lock) with extended inner retention.'],
    sections: [{ title: 'The Technique', steps: ['Sit in a stable meditation posture. Spine erect.', 'Deep inhale (8s): Fill the lungs completely.', 'Hold (12s) — apply Jalandhara Bandha: At the top of the inhale, gently drop the chin toward the chest. Press the chin into the notch above the sternum. Hold the breath while maintaining this chin lock.', 'Release the chin, exhale slowly (8s): Lift the chin before exhaling. Let the breath go slowly and completely.', 'Rest (4s) before repeating.'] }],
    warn: "Advanced practice. Do not attempt with neck injuries, cervical spine issues, or high blood pressure. Only practice after establishing comfort with basic pranayama. Always seated on the floor.",
    feel: '1–2 sessions', see: '4–6 weeks',
    note: "The inner stillness state emerges within the first real sessions if the technique is correct. Four to six weeks of consistent daily practice and the depth of meditation that follows is incomparable.",
  },
  ninepurification: {
    title: 'Nine Purification Breaths — Tibetan Bön',
    intro: ["This is the foundational clearing practice used in Tibetan Bön Buddhism before any meditation session. The nine breaths systematically clear three specific poisons from three specific energy channels: anger from the right channel, attachment from the left channel, and ignorance from the central channel."],
    sections: [{ title: 'The Three Sets', steps: ['Set 1 — Clear Anger (Right channel): Inhale through left nostril (block right). Exhale forcefully through right. Do 3 times. Visualize: blue smoke out with the exhale.', 'Set 2 — Clear Attachment (Left channel): Inhale through right nostril (block left). Exhale forcefully through left. Do 3 times. Visualize: red smoke out.', 'Set 3 — Clear Ignorance (Both channels): Inhale through both nostrils. Exhale forcefully through both, sending out black/dark smoke. Do 3 times.'] }],
    feel: '1 session', see: 'Daily practice',
    note: "Immediate clarity and preparation for meditation within each session. Daily use establishes a consistent clean baseline before practice.",
  },
  coherent: {
    title: 'Coherent Breathing — 5.5 Breaths per Minute',
    intro: ["Popularized by James Nestor (Breath, 2020) and Stephen Elliott. Breathing at exactly 5.5 breaths per minute — approximately 5.5 seconds in, 5.5 seconds out — maximizes Heart Rate Variability (HRV). Higher HRV is the single best measurable predictor of longevity, cardiovascular health, and stress resilience."],
    sections: [{ title: 'The Technique', steps: ['Breathe in through the nose for 6 seconds.', 'Breathe out through the nose for 6 seconds.', 'No hold, no pause. Continuous in-and-out rhythm.', 'Duration: 10–20 minutes for maximum HRV effect. The longer the better.'] }],
    feel: '10–20 min', see: '2–4 weeks',
    note: "HRV improves measurably within the first session. Two to four weeks of daily 20-minute practice produces the largest consistent long-term health improvements of any breathwork protocol studied.",
  },
  physiosigh: {
    title: 'Physiological Sigh — Double Inhale',
    intro: ["Researched and popularized by Dr. Andrew Huberman and the Stanford Neuroscience lab. A 2023 randomized controlled trial found it was the single most effective breathing technique for reducing acute stress — outperforming mindfulness meditation, box breathing, and cyclic hyperventilation. It works in as little as one breath."],
    sections: [{ title: 'The Technique', steps: ['First inhale: Breathe in deeply through the nose. Fill the lungs about 80%.', 'Second inhale: Without exhaling, take one more sharp sniff through the nose to top off the lungs completely. This re-inflates any collapsed alveoli.', 'Long, slow exhale: Release all the air through your mouth — slowly, completely, for as long as possible. This activates the vagus nerve maximally.'] }],
    tip: "The science: The double inhale maximally inflates the alveoli and increases the surface area for CO₂ transfer. The long exhale then offloads maximum CO₂, which is the actual trigger for the calming response — not oxygen.",
    feel: '1 breath (30 sec)', see: '1 week daily',
    note: "One breath gives immediate relief. One week of daily 5-minute practice and baseline anxiety, mood, and respiration rate all improve measurably.",
  },
  rebirthing: {
    title: 'Rebirthing Breathwork',
    intro: ["Developed by Leonard Orr in the 1970s — the grandfather of the modern Western breathwork movement. Uses circular connected breathing — no pause between inhale and exhale, ever — to access suppressed memories, release stored trauma, and reach states of expanded consciousness."],
    sections: [{ title: 'The Core Technique — Circular Connected Breathing', steps: ['Full inhale: Deep belly-to-chest breath through the nose (or mouth). Belly expands fully.', 'Relaxed exhale: Let the air fall out — gravity, not effort. No pushing. No pause after exhale.', 'Immediately begin the next inhale. The breath is one continuous connected loop.'] }],
    warn: "This is not a solo beginner practice. The traditional method is done one-on-one with a trained Rebirther for a series of 10 sessions. The altered states can be intense.",
    feel: 'First session', see: '10 sessions',
    note: "Effects are felt in the first session. The traditional protocol of 10 two-hour sessions with a trained facilitator produces the deepest clearing of suppressed emotions and trauma patterns.",
  },
  transformational: {
    title: 'Transformational Breath® — Dr. Judith Kravitz',
    intro: ["Developed by Dr. Judith Kravitz, a student of Leonard Orr. Transformational Breath® evolved from Rebirthing but made key innovations: it emphasizes open-mouth abdominal breathing (not chest), combines breath with body mapping, movement, sound, and music."],
    sections: [{ title: 'What Makes It Different', steps: ['Open mouth, belly-focused inhale: Inhale deeply through the open mouth, expanding the lower abdomen fully.', 'Passive exhale: The exhale is a soft, relaxed release — like misting a mirror. No force.', 'Connected circular rhythm: No pause between inhale and exhale. Continuous loop.', 'Body mapping: A practitioner applies gentle pressure to areas where the breath is restricted.'] }],
    feel: 'First session', see: '3–6 sessions',
    note: "Immediate shifts in energy, emotion, and mental clarity in the first session. Three to six sessions with a facilitator to access deeper layers of stored experience.",
  },
  reversebreathing: {
    title: 'Reverse Breathing — Taoist / Qigong',
    intro: ["Also called Taoist Breathing or Paradoxical Breathing. The exact opposite of natural diaphragmatic breathing — contracts the belly on the inhale. Used in Tai Chi, Qigong, and traditional Chinese martial arts to build and direct Qi."],
    sections: [{ title: 'The Technique', steps: ['Inhale through the nose: Gently pull the lower abdomen inward and upward — draw the belly button toward the spine. Simultaneously, allow the chest and upper ribcage to expand.', 'Exhale through the nose: Release the belly — let it expand outward and downward. The chest and ribcage soften and release.', 'Build the practice gradually. Start with 5–10 breaths.'] }],
    warn: "Not recommended for pregnant women. If you feel lightheaded, stop immediately and return to natural breathing.",
    feel: '2–3 sessions', see: '4–6 weeks',
    note: "The body begins adjusting in the first few sessions and energy sensations emerge. Four to six weeks of daily practice integrates it as a natural breathing pattern.",
  },
  kumbhaka: {
    title: 'Kumbhaka — Breath Retention',
    intro: ['"Kumbha" means pot or vessel. Kumbhaka is the deliberate suspension of breath — either after full inhalation (Antara Kumbhaka) or after full exhalation (Bahya Kumbhaka). In ancient yogic texts, Kumbhaka is described as the most powerful practice of all pranayama.'],
    sections: [
      { title: 'Antara Kumbhaka — Inner Retention (hold after inhale)', steps: ['Inhale fully and deeply through the nose.', 'At the top of the breath, gently close the throat (soft seal, like stopping a yawn).', 'Hold for a comfortable count — 4 seconds, then 8, then 16 as you build.', 'Exhale slowly and completely through the nose.'] },
      { title: 'Bahya Kumbhaka — Outer Retention (hold after exhale)', steps: ['Exhale fully and completely through the nose — empty the lungs as much as possible.', 'After the exhale, hold the empty lungs.', 'Hold for a comfortable count — start with 4 seconds.'] },
    ],
    warn: "Never practice Bahya Kumbhaka if you have high blood pressure, heart disease, or are pregnant. Never force either form of retention. Practice seated.",
    feel: '1 session', see: '3–4 weeks',
    note: "Depth and calm from the first session. Three to four weeks of daily practice and lung capacity, breath hold times, and meditative depth all improve substantially.",
  },
  hamsah: {
    title: 'Ham-Sah — The Natural Mantra',
    intro: ['In Gnostic and Tantra traditions, "HAM" (pronounced hum) is the sound of the inhale and "SAH" (pronounced saw) is the sound of the exhale. The breath itself continuously chants this mantra automatically — 21,600 times per day. By consciously aligning with this rhythm, you align with the Cosmic Breath.'],
    sections: [{ title: 'The Technique', steps: ['Sit in meditation posture. Spine erect.', 'Inhale (8s): As air enters, mentally hear/feel the sound "HAMmmm" resonating from the base of the spine upward to the crown.', 'Brief hold at crown (2s): Energy pauses at the sahasrara (crown center).', 'Exhale with audible SAH (3s): Release the breath with a soft, breathy "saaaah" sound. Feel energy distributing throughout the body.', 'Maintain this for 10–20 minutes minimum for meditative depth.'] }],
    feel: '5–10 min', see: '4–6 weeks',
    note: "Shifts in consciousness quality begin within the first real session. Four to six weeks of daily practice and the mantra becomes self-sustaining — you hear it without trying.",
  },
  transmutation: {
    title: 'Transmutation Breath — Redirecting Vital Energy',
    intro: ["One of the oldest practices across traditions — Taoist, Tantric, Gnostic, and Hermetic. The core principle: instead of releasing sexual energy outward, you redirect it upward through the spine — transforming raw biological drive into creative power, spiritual vitality, and higher consciousness."],
    sections: [{ title: 'The 4-2-8 Wheel', steps: ['Sit upright. Spine straight. Close your eyes.', 'Inhale through the nose — 4 seconds. Visualize the energy at the base of your spine. Draw it upward with the breath — imagine it rising through each vertebra like light moving up a column.', 'Hold — 2 seconds. Energy pauses at the heart center. Feel warmth or pressure there.', 'Exhale — 8 seconds while making a low, soft vibratory hum in your chest and solar plexus. Visualize the energy radiating outward from your heart and crown.'] }],
    tip: "The question is never whether the energy is present. It always is. The question is only where you direct it.",
    feel: 'First session', see: '2–4 weeks daily',
    note: "The shift from pressure to warmth is felt in the first real session. Two to four weeks of consistent practice and creative output, mental clarity, and emotional stability all increase measurably.",
  },
  blink: {
    title: 'Huberman Blink Protocols',
    intro: ["Dr. Andrew Huberman (Stanford Neuroscience) identified that blinking is not just eye lubrication — it is a neurological control switch. Each blink resets your brain's time perception and attention. You can deliberately use blink rate to shift your mental state."],
    sections: [
      { title: 'Protocol 1 — Fast Blinks: Boost Alertness', steps: ['Rapid blinking increases dopamine signaling. Blink rapidly — 1 blink per second or faster — for 30–60 seconds.', 'After the rapid blinks, open your eyes wide and fix your gaze softly on a point in front of you for 30 seconds.'] },
      { title: 'Protocol 2 — Slow Blinks: Rest & Sleep', steps: ['Blink slowly and deliberately — close your eyes fully, hold for 1–2 seconds, open slowly. One blink every 3–5 seconds.', 'Continue for 2–5 minutes. Combine with slow nasal breathing — in 4s, out 6s — for maximum effect.'] },
      { title: 'Protocol 3 — 17-Minute Attention Training', steps: ['Set a timer for 17 minutes. Pick a fixed point to look at.', 'Maintain soft visual focus on that point. When attention drifts, simply notice and return. Let blinks happen naturally.', 'Research suggests 17 minutes is the minimum for this practice to begin rewiring attentional circuits.'] },
    ],
    feel: '1 session', see: '2 weeks daily',
    note: "The attentional shift from fast-blink protocol is felt within 2 minutes. Two weeks of Protocol 3 daily practice and attentional lapses reduce measurably.",
  },
  naturalwalk: {
    title: 'Natural Walk — Guolin Qigong Xi-Xi-Hu',
    intro: ["Developed by Guo Lin (1906–1984) as a cancer recovery practice. The double-inhale walking breath fully inflates both lung lobes — something ordinary breathing rarely achieves. The extended exhale activates the parasympathetic nervous system. Clinical studies in China documented measurable immune improvement in cancer patients after sustained practice."],
    sections: [
      { title: 'The Breath — Xi Xi Hu', steps: ['Xi — short inhale through the nose, belly expands (lower lungs fill) — 2 seconds.', 'Xi — second short inhale through the nose, chest lifts (upper lungs fill) — 2 seconds.', 'Hu — one long, slow exhale through the nose — 6 seconds.', 'No hold. No pause. Continuous rhythm. The exhale is longer than both inhales combined.'] },
      { title: 'The Walk', steps: ['Walk slowly — a relaxed stroll, not exercise pace.', 'Heel touches first, then roll to toe.', 'Arms swing naturally and loosely at your sides.', 'Eyes: soft gaze outward and forward. This deliberately interrupts the inner noise loop.', 'Body upright, shoulders down. Smile slightly — this activates the parasympathetic response.'] },
      { title: 'The Mind', steps: ["Do not focus inside your body. Let attention rest gently on what is around you — trees, sky, ground. This is the opposite of most meditation, and it is intentional."] },
    ],
    tip: "Walk slowly. Heel to toe. Inhale short through the nose — belly fills. Inhale again short — chest fills. Exhale long and slow through the nose. Repeat. Let your arms swing. Look outward. Smile slightly. Don't think. Just breathe and walk.",
    feel: '1 week daily', see: '4 weeks',
    note: "Minimum 30 minutes per session for therapeutic effect. Ideal: 60 minutes, morning, outdoors. Start with 15–20 minutes if new to the practice.",
  },
};
