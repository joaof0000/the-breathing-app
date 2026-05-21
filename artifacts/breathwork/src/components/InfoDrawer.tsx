import './InfoDrawer.css';

interface Props {
  tech: string;
  open: boolean;
  onClose: () => void;
}

const YT_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff4444">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
  </svg>
);

const TB = ({ feel, see, note }: { feel: string; see: string; note: string }) => (
  <div className="time-block">
    <div className="time-row">
      <span className="time-label">Feel it</span><span className="time-val">{feel}</span>
      <span className="time-label">See results</span><span className="time-val">{see}</span>
    </div>
    <p className="time-note">{note}</p>
  </div>
);

const YTL = ({ href, label }: { href: string; label: string }) => (
  <a className="yt-link" href={href} target="_blank" rel="noopener">{YT_SVG} {label}</a>
);

function InfoContent({ tech }: { tech: string }) {
  switch (tech) {
    case '478': return (
      <>
        <h2>4-7-8 Relaxation Breath</h2>
        <p>Dr. Andrew Weil's adaptation of ancient pranayama. The extended exhale activates the parasympathetic nervous system — your body's rest-and-digest mode.</p>
        <h3>Pattern (repeats for your chosen duration)</h3>
        <ul>
          <li><strong>Inhale</strong> through nose — 4 seconds</li>
          <li><strong>Hold</strong> — 7 seconds, body relaxed</li>
          <li><strong>Exhale</strong> through mouth — 8 seconds, audible whoosh</li>
        </ul>
        <div className="tip"><p>Tip: Tongue tip behind upper front teeth throughout. Ratio matters more than exact pace — if 4-7-8 feels too long, slow your count.</p></div>
        <TB feel="1 session" see="1–2 weeks daily" note="One session before bed shifts you within 90 seconds. Two weeks daily practice and your baseline anxiety drops measurably." />
        <YTL href="https://www.youtube.com/results?search_query=andrew+weil+4-7-8+breathing+demonstration" label="Watch: Dr. Andrew Weil demonstrates 4-7-8 Breath" />
      </>
    );
    case 'box': return (
      <>
        <h2>Box Breathing</h2>
        <p>Used by Navy SEALs for instant calm under pressure. Four equal sides.</p>
        <h3>Pattern</h3>
        <ul>
          <li><strong>Inhale</strong> — 4s</li><li><strong>Hold full</strong> — 4s</li>
          <li><strong>Exhale</strong> — 4s</li><li><strong>Hold empty</strong> — 4s</li>
        </ul>
        <TB feel="2–4 minutes" see="1 week daily" note="You will feel calmer within a single 4-minute session. One week of daily practice and your stress response visibly changes under pressure." />
        <YTL href="https://www.youtube.com/results?search_query=box+breathing+tutorial+4+sides" label="Watch: Box Breathing explained" />
      </>
    );
    case 'wimhof': return (
      <>
        <h2>Wim Hof Method</h2>
        <p>Controlled hyperventilation → breath retention → recovery. Activates the sympathetic nervous system and gives voluntary influence over immune response.</p>
        <h3>Each Round</h3>
        <ul>
          <li><strong>30 Power Breaths:</strong> Deep belly-to-chest inhale through nose, let exhale go without forcing. Continuous rhythm.</li>
          <li><strong>Retention:</strong> After 30th breath, exhale fully and hold empty lungs. Timer runs — press when you need to breathe.</li>
          <li><strong>Recovery:</strong> One deep inhale, hold 15 seconds, release.</li>
        </ul>
        <div className="warn"><p>Always seated or lying down. Never in water or while driving.</p></div>
        <TB feel="1 session" see="2–4 weeks" note="The first session produces noticeable altered states. 2–4 weeks of daily practice and measurable immune and cold tolerance changes occur — documented in clinical studies." />
        <YTL href="https://www.youtube.com/watch?v=tybOi4hjZFQ" label="Watch: Official Wim Hof guided breathing — beginners (3 rounds)" />
      </>
    );
    case 'tummo': return (
      <>
        <h2>Tummo — Inner Fire</h2>
        <p>Tibetan Buddhist vase breathing. Visualization + pelvic contraction + breath retention generates measurable internal heat. Harvard-documented in Himalayan monks.</p>
        <h3>Each Cycle</h3>
        <ul>
          <li><strong>Visualize</strong> a flame at your navel. Hold the image throughout.</li>
          <li><strong>Inhale (5s):</strong> Deep belly breath, imagine air feeding the flame.</li>
          <li><strong>Vase Hold (10s):</strong> Swallow gently. Contract pelvic floor upward. Press lower belly inward. Two forces meet at the navel. Flame blazes up the spine.</li>
          <li><strong>Power Exhale (5s):</strong> Release, exhale through rounded lips. Heat radiates out.</li>
        </ul>
        <div className="tip"><p>Visualization is not optional — studies show temperature effects are minimal without it.</p></div>
        <TB feel="2–3 sessions" see="4–6 weeks" note="Warmth and energy sensations begin in the first few sessions. Consistent daily practice over 4–6 weeks develops real heat generation and a stable energized meditation state." />
        <YTL href="https://www.youtube.com/results?search_query=tummo+inner+fire+breathing+meditation+tutorial" label="Watch: Tummo Inner Fire breathing tutorial" />
      </>
    );
    case 'nadi': return (
      <>
        <h2>Nadi Shodhana — Alternate Nostril Breathing</h2>
        <p>"Nadi" means energy channel. "Shodhana" means purification. This technique balances the solar (right/masculine/heating) and lunar (left/feminine/cooling) energy channels, called Pingala and Ida Nadi. When both are clear and equal, the central channel — Sushumna — opens. This is foundational to Kundalini yoga and Hatha yoga.</p>
        <p style={{ marginTop: '0.4rem' }}>Use your <strong>right hand</strong>. Thumb closes the right nostril. Ring finger (or ring + pinky) closes the left nostril. Index and middle fingers rest on the forehead or fold inward.</p>
        <TB feel="1 session" see="2–4 weeks" note="Mental balance and calm within the first session. Two to four weeks daily and focus, emotional stability, and meditation depth all improve measurably." />
        <YTL href="https://www.youtube.com/results?search_query=nadi+shodhana+alternate+nostril+breathing+tutorial" label="Watch: Nadi Shodhana — Alternate Nostril tutorial" />
      </>
    );
    case 'surya': return (
      <>
        <h2>Surya Bhedana — Right Nostril / Sun Breath</h2>
        <p>"Surya" means sun. Always inhale through the right (solar/Pingala) nostril, exhale through the left (lunar/Ida). This activates the sympathetic nervous system — heating, energizing, focusing. Associated with masculine solar energy.</p>
        <h3>Pattern</h3>
        <ul>
          <li><strong>Close left nostril</strong> with ring finger</li>
          <li><strong>Inhale through right nostril</strong> — 4 seconds</li>
          <li><strong>Close both</strong> — Hold — 4 seconds</li>
          <li><strong>Release left, exhale through left</strong> — 4 seconds</li>
        </ul>
        <div className="tip"><p>Use in the morning or when you need energy. Avoid before sleep — it is activating. Complement with Chandra Bhedana to balance.</p></div>
        <TB feel="1 session" see="1–2 weeks" note="Alertness and warmth within 2–3 minutes. One to two weeks daily practice and the activation effect becomes consistent and sustainable." />
        <YTL href="https://www.youtube.com/results?search_query=surya+bhedana+right+nostril+sun+breathing+tutorial" label="Watch: Surya Bhedana — Sun breathing tutorial" />
      </>
    );
    case 'chandra': return (
      <>
        <h2>Chandra Bhedana — Left Nostril / Moon Breath</h2>
        <p>"Chandra" means moon. Always inhale through the left (lunar/Ida) nostril, exhale through the right (solar/Pingala). This activates the parasympathetic nervous system — cooling, calming, grounding. Associated with feminine lunar energy.</p>
        <h3>Pattern</h3>
        <ul>
          <li><strong>Close right nostril</strong> with thumb</li>
          <li><strong>Inhale through left nostril</strong> — 4 seconds</li>
          <li><strong>Close both</strong> — Hold — 4 seconds</li>
          <li><strong>Release right, exhale through right</strong> — 4 seconds</li>
        </ul>
        <div className="tip"><p>Use in the evening, before sleep, or when you feel overheated or angry. Counterpart to Surya Bhedana.</p></div>
        <TB feel="1 session" see="1–2 weeks" note="Cooling and calming within the first 3 minutes. Daily use before bed produces measurably better sleep quality within two weeks." />
        <YTL href="https://www.youtube.com/results?search_query=chandra+bhedana+left+nostril+breathing+tutorial+cooling" label="Watch: Chandra Bhedana — Moon breathing tutorial" />
      </>
    );
    case 'ujjayi': return (
      <>
        <h2>Ujjayi — Victorious / Ocean Breath</h2>
        <p>"Ujjayi" means "to become victorious." The technique creates a soft ocean or hissing sound by slightly constricting the back of the throat on both inhale and exhale. This is the foundation of most Ashtanga and Vinyasa yoga practice — the breath that guides and regulates the entire practice.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Breathe through the nose only, both directions.</li>
          <li><strong>Slightly constrict the back of the throat</strong> — imagine fogging a mirror with your mouth closed, or whispering "haaah" with the mouth closed. Both inhale and exhale have the same sound.</li>
          <li><strong>Inhale (5s):</strong> Slow, controlled, audible hiss up the spine.</li>
          <li><strong>Exhale (5s):</strong> Slow, controlled, audible ocean sound. Belly draws in gently.</li>
        </ul>
        <TB feel="1 session" see="2–3 weeks" note="Calming effect and body heat within the first few minutes. Two to three weeks of daily practice and breath control, focus, and heat regulation all improve substantially." />
        <YTL href="https://www.youtube.com/results?search_query=ujjayi+breath+ocean+breath+how+to+tutorial" label="Watch: Ujjayi ocean breath — how to" />
      </>
    );
    case 'kapalabhati': return (
      <>
        <h2>Kapalabhati — Skull-Shining Breath</h2>
        <p>"Kapala" means skull, "bhati" means light or shining. Rapid sharp exhales pump the diaphragm and clear the nasal passages and sinuses. The inhale is passive — you don't breathe in, the air flows in by itself. One of the six Shatkarmas (purification practices) in traditional Hatha yoga.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Sit tall. Take a deep natural inhale.</li>
          <li><strong>Sharp exhale:</strong> Forcefully contract the abdomen — belly button to spine. Air shoots out the nose.</li>
          <li><strong>Passive inhale:</strong> Release the abdomen. Air flows in automatically. You do not inhale consciously.</li>
          <li>Rhythm: approximately 1–2 pumps per second. Build speed gradually over weeks.</li>
          <li>Standard: 3 rounds of 30 pumps with rest between.</li>
        </ul>
        <div className="warn"><p>Not recommended during pregnancy, menstruation, or if you have high blood pressure, heart disease, epilepsy, or recent abdominal surgery.</p></div>
        <TB feel="1 session" see="1–2 weeks" note="Immediate alertness and sinus clearing within 30 seconds. One to two weeks and the energy effect becomes reliable and the technique becomes effortless." />
        <YTL href="https://www.youtube.com/results?search_query=kapalabhati+skull+shining+breath+of+fire+tutorial+yoga" label="Watch: Kapalabhati — Breath of Fire tutorial" />
      </>
    );
    case 'bhastrika': return (
      <>
        <h2>Bhastrika — Bellows Breath</h2>
        <p>"Bhastrika" means bellows — the device used to fan a fire. Both the inhale AND exhale are active and forceful, like a bellows pumping air. This is the most vigorous pranayama — both inhalation and exhalation are equally powered. More intense than Kapalabhati.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Sit upright. Take a deep preparatory breath.</li>
          <li><strong>Force BOTH inhale and exhale</strong> — belly expands sharply on inhale, contracts sharply on exhale. Both are active, both are equal.</li>
          <li>Rate: about 1 breath per second. Slower than Kapalabhati.</li>
          <li>Standard: 10–20 breaths per round, 3 rounds, rest between.</li>
          <li>After the last breath: deep inhale, hold as long as comfortable, then exhale slowly.</li>
        </ul>
        <div className="warn"><p>Very powerful. Not for beginners. Not during pregnancy, hypertension, hernia, epilepsy. If you feel lightheaded, stop immediately and breathe naturally.</p></div>
        <TB feel="1 session" see="1–2 weeks" note="Full body vitality surge within the first session. One to two weeks and lung capacity, energy, and heat generation all increase noticeably." />
        <YTL href="https://www.youtube.com/results?search_query=bhastrika+pranayama+bellows+breath+tutorial" label="Watch: Bhastrika — Bellows Breath tutorial" />
      </>
    );
    case 'bhramari': return (
      <>
        <h2>Bhramari — Bee Breath / Humming Breath</h2>
        <p>"Bhramari" means bee. The exhale is a continuous humming sound — like a bee — made with the mouth closed. The hum creates vibration throughout the skull and chest that directly stimulates the vagus nerve, induces nitric oxide production, and measurably reduces blood pressure and cortisol. Most researched pranayama for immediate nervous system calming.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Sit quietly. Optional: plug ears with thumbs (Shanmukhi Mudra) for deeper effect.</li>
          <li><strong>Deep inhale through the nose</strong> — fill the lungs fully.</li>
          <li><strong>Exhale with a steady HMMMMmmm hum</strong> — lips closed, teeth slightly apart. Feel the vibration in the skull, sinuses, and chest. The hum should be continuous until the lungs are empty.</li>
          <li>The pitch of the hum matters — try a low, resonant hum. You can experiment with pitch to find where the vibration is strongest in your skull.</li>
        </ul>
        <TB feel="3–5 minutes" see="1–2 weeks" note="Blood pressure drops within a single 10-minute session — this is the most researched effect. One to two weeks daily and baseline stress reactivity decreases measurably." />
        <YTL href="https://www.youtube.com/results?search_query=bhramari+pranayama+bee+breath+humming+tutorial" label="Watch: Bhramari — Bee Breath tutorial" />
      </>
    );
    case 'sitali': return (
      <>
        <h2>Sitali — Cooling Breath</h2>
        <p>"Sitali" means cooling or soothing. One of the rare pranayamas where air enters through the mouth — curled tongue acts as a straw. Cools the body, reduces heat, calms anger and fever, and is one of the few techniques specifically for overheating states.</p>
        <h3>The Technique</h3>
        <ul>
          <li><strong>Curl the tongue</strong> into a tube shape (like a straw) and stick it slightly out of the mouth. If you can't curl your tongue, open the mouth slightly and inhale through the teeth (this is called Sitkari and has the same effect).</li>
          <li><strong>Inhale through the tongue/straw (5s):</strong> Draw air in slowly over the tongue. You will feel the cooling effect immediately.</li>
          <li><strong>Close mouth, exhale through nose (6s).</strong></li>
          <li>Repeat for 5–10 minutes or until cool.</li>
        </ul>
        <div className="tip"><p>Not for use in cold weather or by people with very sensitive teeth. Ideal in summer, after exercise, during fever, or when anger or frustration is producing heat.</p></div>
        <TB feel="1 session" see="Immediate" note="Cooling effect within 2 minutes of practice. Most immediate result of any pranayama — use it specifically for heat, fever, and hot anger." />
        <YTL href="https://www.youtube.com/results?search_query=sitali+pranayama+cooling+breath+tutorial" label="Watch: Sitali — Cooling Breath tutorial" />
      </>
    );
    case 'murcha': return (
      <>
        <h2>Murcha — Swooning Breath</h2>
        <p>"Murcha" means to faint or swoon — because when done correctly, it can induce a state of profound inner stillness that feels like the boundary between waking and unconsciousness. One of the most advanced pranayamas. Uses Jalandhara Bandha (chin lock) with extended inner retention to send prana into the higher centers.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Sit in a stable meditation posture. Spine erect.</li>
          <li><strong>Deep inhale (8s):</strong> Fill the lungs completely.</li>
          <li><strong>Hold (12s) — apply Jalandhara Bandha:</strong> At the top of the inhale, gently drop the chin toward the chest (no strain). Press the chin into the notch above the sternum. Hold the breath while maintaining this chin lock. This redirects prana to the brain center.</li>
          <li><strong>Release the chin, exhale slowly (8s):</strong> Lift the chin before exhaling. Let the breath go slowly and completely.</li>
          <li>Rest (4s) before repeating.</li>
        </ul>
        <div className="warn"><p>Advanced practice. Do not attempt with neck injuries, cervical spine issues, or high blood pressure. Only practice after establishing comfort with basic pranayama. Always seated on the floor, never on a chair or bed.</p></div>
        <TB feel="1–2 sessions" see="4–6 weeks" note="The inner stillness state emerges within the first real sessions if the technique is correct. Four to six weeks of consistent daily practice and the depth of meditation that follows is incomparable." />
        <YTL href="https://www.youtube.com/results?search_query=murcha+pranayama+swooning+breath+tutorial" label="Watch: Murcha — Swooning Breath tutorial" />
      </>
    );
    case 'ninepurification': return (
      <>
        <h2>Nine Purification Breaths — Tibetan Bön</h2>
        <p>This is the foundational clearing practice used in Tibetan Bön Buddhism and Tibetan Buddhism before any meditation session. The nine breaths systematically clear three specific poisons from three specific energy channels: anger from the right channel (Ro-ma), attachment/desire from the left channel (Rkyang-ma), and ignorance/delusion from the central channel (Dbu-ma). Modern practice often does three rounds of three breaths (nine total) to clear all channels.</p>
        <h3>The Three Sets</h3>
        <ul>
          <li><strong>Set 1 — Clear Anger (Right channel):</strong> Inhale through left nostril (block right with finger or visualization). Exhale forcefully through right. Do 3 times. Visualize: blue smoke out with the exhale.</li>
          <li><strong>Set 2 — Clear Attachment (Left channel):</strong> Inhale through right nostril (block left). Exhale forcefully through left. Do 3 times. Visualize: red smoke out with the exhale.</li>
          <li><strong>Set 3 — Clear Ignorance (Both channels):</strong> Inhale through both nostrils. Exhale forcefully through both, sending out black/dark smoke. Do 3 times.</li>
        </ul>
        <TB feel="1 session" see="Daily practice" note="Immediate clarity and preparation for meditation within each session. Daily use establishes a consistent clean baseline before practice." />
        <YTL href="https://www.youtube.com/results?search_query=nine+purification+breaths+Tibetan+Buddhist+meditation" label="Watch: Nine Purification Breaths tutorial" />
      </>
    );
    case 'coherent': return (
      <>
        <h2>Coherent Breathing — 5.5 Breaths per Minute</h2>
        <p>Popularized by James Nestor (Breath, 2020) and Stephen Elliott (The New Science of Breath). Breathing at exactly 5.5 breaths per minute — approximately 5.5 seconds in, 5.5 seconds out — maximizes Heart Rate Variability (HRV). Higher HRV is the single best measurable predictor of longevity, cardiovascular health, stress resilience, and cognitive performance. This is the resonant frequency of the human cardiovascular system.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Breathe in through the nose for <strong>6 seconds</strong>.</li>
          <li>Breathe out through the nose for <strong>6 seconds</strong>.</li>
          <li>No hold, no pause. Continuous in-and-out rhythm.</li>
          <li>Duration: 10–20 minutes for maximum HRV effect. The longer the better.</li>
        </ul>
        <TB feel="10–20 min" see="2–4 weeks" note="HRV improves measurably within the first session. Two to four weeks of daily 20-minute practice produces the largest consistent long-term health improvements of any breathwork protocol studied." />
        <YTL href="https://www.youtube.com/results?search_query=coherent+breathing+5+breaths+per+minute+HRV+tutorial" label="Watch: Coherent Breathing — 5.5 breaths/min tutorial" />
      </>
    );
    case 'physiosigh': return (
      <>
        <h2>Physiological Sigh — Double Inhale</h2>
        <p>Researched and popularized by Dr. Andrew Huberman and the Stanford Neuroscience lab. A 2023 randomized controlled trial found it was <strong>the single most effective breathing technique</strong> for reducing acute stress — outperforming mindfulness meditation, box breathing, and cyclic hyperventilation. It works in as little as one breath.</p>
        <h3>The Technique</h3>
        <ul>
          <li><strong>First inhale:</strong> Breathe in deeply through the nose. Fill the lungs about 80%.</li>
          <li><strong>Second inhale:</strong> Without exhaling, take one more sharp sniff through the nose to top off the lungs completely. This re-inflates any collapsed alveoli.</li>
          <li><strong>Long, slow exhale:</strong> Release all the air through your mouth — slowly, completely, for as long as possible. This activates the vagus nerve maximally.</li>
        </ul>
        <div className="tip"><p><strong>The science:</strong> The double inhale maximally inflates the alveoli and increases the surface area for CO₂ transfer. The long exhale then offloads maximum CO₂, which is the actual trigger for the calming response — not oxygen.</p></div>
        <TB feel="1 breath (30 sec)" see="1 week daily" note="One breath gives immediate relief. One week of daily 5-minute practice and baseline anxiety, mood, and respiration rate all improve measurably." />
        <YTL href="https://www.youtube.com/results?search_query=physiological+sigh+double+inhale+Huberman+Stanford+tutorial" label="Watch: Physiological Sigh — Stanford tutorial" />
      </>
    );
    case 'rebirthing': return (
      <>
        <h2>Rebirthing Breathwork</h2>
        <p>Developed by Leonard Orr in the 1970s — the grandfather of the modern Western breathwork movement. Uses <strong>circular connected breathing</strong> — no pause between inhale and exhale, ever — to access suppressed memories, release stored trauma, and reach states of expanded consciousness.</p>
        <h3>The Core Technique — Circular Connected Breathing</h3>
        <ul>
          <li><strong>Full inhale:</strong> Deep belly-to-chest breath through the nose (or mouth). Belly expands fully.</li>
          <li><strong>Relaxed exhale:</strong> Let the air fall out — gravity, not effort. No pushing. No pause after exhale.</li>
          <li>Immediately begin the next inhale. <strong>The breath is one continuous connected loop.</strong></li>
        </ul>
        <div className="warn"><p><strong>This is not a solo beginner practice.</strong> The traditional method is done one-on-one with a trained Rebirther for a series of 10 sessions. The altered states can be intense.</p></div>
        <TB feel="First session" see="10 sessions" note="Effects are felt in the first session. The traditional protocol of 10 two-hour sessions with a trained facilitator produces the deepest clearing of suppressed emotions and trauma patterns." />
        <YTL href="https://www.youtube.com/results?search_query=rebirthing+breathwork+Leonard+Orr+circular+breathing+explained" label="Watch: Rebirthing Breathwork — Leonard Orr method explained" />
      </>
    );
    case 'transformational': return (
      <>
        <h2>Transformational Breath® — Dr. Judith Kravitz</h2>
        <p>Developed by Dr. Judith Kravitz, a student of Leonard Orr. Transformational Breath® evolved from Rebirthing but made key innovations: it emphasizes <strong>open-mouth abdominal breathing</strong> (not chest), combines breath with body mapping, movement, sound, and music.</p>
        <h3>What Makes It Different</h3>
        <ul>
          <li><strong>Open mouth, belly-focused inhale:</strong> Inhale deeply through the open mouth, expanding the lower abdomen fully.</li>
          <li><strong>Passive exhale:</strong> The exhale is a soft, relaxed release — like misting a mirror. No force.</li>
          <li><strong>Connected circular rhythm:</strong> No pause between inhale and exhale. Continuous loop.</li>
          <li><strong>Body mapping:</strong> A practitioner applies gentle pressure to areas where the breath is restricted.</li>
        </ul>
        <TB feel="First session" see="3–6 sessions" note="Immediate shifts in energy, emotion, and mental clarity in the first session. Three to six sessions with a facilitator to access deeper layers of stored experience." />
        <YTL href="https://www.youtube.com/results?search_query=transformational+breath+Judith+Kravitz+breathwork+tutorial" label="Watch: Transformational Breath® — Judith Kravitz method" />
      </>
    );
    case 'reversebreathing': return (
      <>
        <h2>Reverse Breathing — Taoist / Qigong</h2>
        <p>Also called Taoist Breathing or Paradoxical Breathing. The exact opposite of natural diaphragmatic breathing — <strong>contracts the belly on the inhale</strong>. Used in Tai Chi, Qigong, and traditional Chinese martial arts to build and direct Qi.</p>
        <h3>The Technique</h3>
        <ul>
          <li><strong>Inhale through the nose:</strong> Gently <strong>pull the lower abdomen inward and upward</strong> — draw the belly button toward the spine. Simultaneously, allow the chest and upper ribcage to expand.</li>
          <li><strong>Exhale through the nose:</strong> Release the belly — let it expand outward and downward. The chest and ribcage soften and release.</li>
          <li>Build the practice gradually. Start with 5–10 breaths.</li>
        </ul>
        <div className="warn"><p>Not recommended for pregnant women. If you feel lightheaded, stop immediately and return to natural breathing.</p></div>
        <TB feel="2–3 sessions" see="4–6 weeks" note="The body begins adjusting in the first few sessions and energy sensations emerge. Four to six weeks of daily practice integrates it as a natural breathing pattern." />
        <YTL href="https://www.youtube.com/results?search_query=reverse+breathing+Taoist+Qigong+paradoxical+breathing+tutorial" label="Watch: Reverse Breathing — Taoist Qigong tutorial" />
      </>
    );
    case 'kumbhaka': return (
      <>
        <h2>Kumbhaka — Breath Retention</h2>
        <p>"Kumbha" means pot or vessel. Kumbhaka is the deliberate suspension of breath — either after full inhalation (<em>Antara Kumbhaka</em>) or after full exhalation (<em>Bahya Kumbhaka</em>). In ancient yogic texts, Kumbhaka is described as the most powerful practice of all pranayama.</p>
        <h3>Antara Kumbhaka — Inner Retention (hold after inhale)</h3>
        <ul>
          <li>Inhale fully and deeply through the nose.</li>
          <li>At the top of the breath, <strong>gently close the throat</strong> (soft seal, like stopping a yawn).</li>
          <li>Hold for a count that is comfortable — 4 seconds, then 8, then 16 as you build.</li>
          <li>Exhale slowly and completely through the nose.</li>
        </ul>
        <h3>Bahya Kumbhaka — Outer Retention (hold after exhale)</h3>
        <ul>
          <li>Exhale fully and completely through the nose — empty the lungs as much as possible.</li>
          <li>After the exhale, <strong>hold the empty lungs</strong>.</li>
          <li>Hold for a comfortable count — start with 4 seconds.</li>
        </ul>
        <div className="warn"><p><strong>Never practice Bahya Kumbhaka if you have high blood pressure, heart disease, or are pregnant.</strong> Never force either form of retention. Practice seated.</p></div>
        <TB feel="1 session" see="3–4 weeks" note="Depth and calm from the first session. Three to four weeks of daily practice and lung capacity, breath hold times, and meditative depth all improve substantially." />
        <YTL href="https://www.youtube.com/results?search_query=kumbhaka+pranayama+breath+retention+tutorial+yoga" label="Watch: Kumbhaka — Breath Retention tutorial" />
      </>
    );
    case 'hamsah': return (
      <>
        <h2>Ham-Sah — The Natural Mantra</h2>
        <p>In Gnostic and Tantra traditions, "HAM" (pronounced hum) is the sound of the inhale and "SAH" (pronounced saw) is the sound of the exhale. The breath itself continuously chants this mantra automatically — 21,600 times per day. By consciously aligning with this rhythm, you align with the Cosmic Breath.</p>
        <h3>The Technique</h3>
        <ul>
          <li>Sit in meditation posture. Spine erect.</li>
          <li><strong>Inhale (8s):</strong> As air enters, mentally hear/feel the sound "HAMmmm" resonating from the base of the spine upward to the crown.</li>
          <li><strong>Brief hold at crown (2s):</strong> Energy pauses at the sahasrara (crown center).</li>
          <li><strong>Exhale with audible SAH (3s):</strong> Release the breath with a soft, breathy "saaaah" sound. Feel energy distributing throughout the body.</li>
          <li>Maintain this for 10–20 minutes minimum for meditative depth.</li>
        </ul>
        <TB feel="5–10 min" see="4–6 weeks" note="Shifts in consciousness quality begin within the first real session. Four to six weeks of daily practice and the mantra becomes self-sustaining — you hear it without trying." />
        <YTL href="https://www.youtube.com/results?search_query=ham+sah+mantra+breathwork+transmutation+pranayama" label="Watch: Ham-Sah mantra breathwork tutorial" />
      </>
    );
    case 'transmutation': return (
      <>
        <h2>Transmutation Breath — Redirecting Vital Energy</h2>
        <p>One of the oldest practices across traditions — Taoist, Tantric, Gnostic, and Hermetic. The core principle: instead of releasing sexual energy outward, you redirect it <em>upward</em> through the spine — transforming raw biological drive into creative power, spiritual vitality, and higher consciousness.</p>
        <h3>The 4-2-8 Wheel — Core Transmutation Breath</h3>
        <ul>
          <li><strong>Sit upright.</strong> Spine straight. Close your eyes.</li>
          <li><strong>Inhale through the nose — 4 seconds.</strong> Visualize the energy at the base of your spine. Draw it upward with the breath — imagine it rising through each vertebra like light moving up a column.</li>
          <li><strong>Hold — 2 seconds.</strong> Energy pauses at the heart center. Feel warmth or pressure there.</li>
          <li><strong>Exhale — 8 seconds</strong> while making a low, soft vibratory hum in your chest and solar plexus. Visualize the energy radiating outward from your heart and crown, distributing through your whole body like light filling a room.</li>
        </ul>
        <div className="tip"><p><strong>The Gnostic view:</strong> Samael Aun Weor taught that this energy contains the entire creative power of the universe in miniature. The question is never whether the energy is present. It always is. The question is only where you direct it.</p></div>
        <TB feel="First session" see="2–4 weeks daily" note="The shift from pressure to warmth is felt in the first real session. Two to four weeks of consistent practice and creative output, mental clarity, and emotional stability all increase measurably." />
        <YTL href="https://www.youtube.com/results?search_query=sexual+energy+transmutation+breathwork+kundalini+upward+energy" label="Watch: Sexual Energy Transmutation — breathwork and practice" />
      </>
    );
    case 'blink': return (
      <>
        <h2>Huberman Blink Protocols</h2>
        <p>Dr. Andrew Huberman (Stanford Neuroscience) identified that blinking is not just eye lubrication — it is a neurological control switch. Each blink resets your brain's time perception and attention. You can deliberately use blink rate to shift your mental state.</p>
        <h3>Protocol 1 — Fast Blinks: Boost Alertness & Focus</h3>
        <ul>
          <li>Rapid blinking increases dopamine signaling. <strong>Blink rapidly</strong> — 1 blink per second or faster — for <strong>30–60 seconds.</strong></li>
          <li>After the rapid blinks, <strong>open your eyes wide</strong> and fix your gaze softly on a point in front of you for 30 seconds.</li>
        </ul>
        <h3>Protocol 2 — Slow Blinks: Downshift to Rest & Sleep</h3>
        <ul>
          <li><strong>Blink slowly and deliberately</strong> — close your eyes fully, hold for 1–2 seconds, open slowly. One blink every 3–5 seconds.</li>
          <li>Continue for <strong>2–5 minutes.</strong> Combine with slow nasal breathing — in 4s, out 6s — for maximum effect.</li>
        </ul>
        <h3>Protocol 3 — 17-Minute Attentional Blink Training</h3>
        <ul>
          <li>Set a timer for 17 minutes. Pick a fixed point to look at.</li>
          <li><strong>Maintain soft visual focus</strong> on that point. When attention drifts, simply notice and return. Let blinks happen naturally.</li>
          <li>The 17 minutes is not arbitrary — research suggests this is the minimum for the practice to begin rewiring attentional circuits.</li>
        </ul>
        <TB feel="1 session" see="2 weeks daily" note="The attentional shift from fast-blink protocol is felt within 2 minutes. Two weeks of Protocol 3 daily practice and attentional lapses reduce measurably." />
        <YTL href="https://www.youtube.com/results?search_query=huberman+blink+protocol+dopamine+focus+attention" label="Watch: Huberman Blink Protocol — focus and attention reset" />
      </>
    );
    case 'custom': return (
      <>
        <h2>Custom Pattern</h2>
        <p>Set your own inhale, hold, exhale, and hold-out durations using the controls above. Any pattern you choose will loop for the selected duration.</p>
        <h3>Suggestions</h3>
        <ul>
          <li><strong>Relaxation:</strong> Inhale 4 · Hold 0 · Exhale 8 · Hold 0</li>
          <li><strong>Box:</strong> Inhale 4 · Hold 4 · Exhale 4 · Hold 4</li>
          <li><strong>2:1:</strong> Inhale 4 · Hold 0 · Exhale 8 · Hold 0</li>
          <li><strong>Deep meditation:</strong> Inhale 8 · Hold 8 · Exhale 8 · Hold 4</li>
        </ul>
        <div className="tip"><p>Set either hold to 0 to skip that phase. The extended exhale ratio (exhale longer than inhale) activates the parasympathetic nervous system.</p></div>
      </>
    );
    default: return <p>No information available for this technique.</p>;
  }
}

export default function InfoDrawer({ tech, open, onClose }: Props) {
  return (
    <div className={`info-drawer ${open ? 'open' : ''}`}>
      <div className="info-drawer-content">
        <InfoContent tech={tech} />
        <button className="btn-close" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
