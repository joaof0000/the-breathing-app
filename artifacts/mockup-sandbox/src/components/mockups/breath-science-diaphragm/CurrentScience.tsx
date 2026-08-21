import './_group.css';

// Static English content — stubbed from BreathScienceScreen CONTENT.en
const c = {
  // CO₂ reason card (last in the reasons list — card 10)
  co2Icon: '🌬️',
  co2Num: '10',
  co2Title: 'Higher CO₂ Tolerance',
  co2Body: 'Contrary to popular belief, the urge to breathe is triggered by rising CO₂ — not falling O₂. Most people have poor CO₂ tolerance and over-breathe chronically, keeping them anxious and reactive. Training tolerance through breath holds and slow breathing builds a calmer, more resilient baseline.',
  co2Stat: 'The hidden key to calm',

  // Diaphragm section
  diaphTitle: 'How to Breathe from Your Diaphragm',
  diaphIntro: 'Diaphragmatic breathing is the foundation of every technique in this app. It is how you were designed to breathe — and how almost nobody breathes by adulthood.',
  diaphCaption: 'The diaphragm is a muscle. It contracts downward to draw air in, and relaxes upward to push air out.',
  anatExhale: 'EXHALE',
  anatDiaphRises: 'diaphragm rises',
  anatInhale: 'INHALE',
  anatDiaphDescends: 'diaphragm descends',
  diaphWhatTitle: 'What is the diaphragm?',
  diaphWhat: 'The diaphragm is a large, dome-shaped muscle that sits at the base of your lungs, separating the chest from the abdomen. When it contracts and flattens downward, it creates a vacuum that draws air deep into the lower lobes of the lungs — the most oxygen-rich regions. Chest breathing uses roughly ⅓ of lung capacity. Diaphragmatic breathing uses the full lung — plus stimulates the vagus nerve fibres that run through the diaphragm itself.',
};

export function CurrentScience() {
  return (
    <div className="bsci-group-root">
      <div className="bsci-page">
        <div className="bsci-wrap">

          {/* Final CO₂ reason card — context above the target section */}
          <div className="bsci-reason" style={{ marginBottom: '24px' }}>
            <div className="bsci-reason-header">
              <span className="bsci-reason-icon">{c.co2Icon}</span>
              <div>
                <div className="bsci-reason-num">{c.co2Num}</div>
                <div className="bsci-reason-title">{c.co2Title}</div>
              </div>
            </div>
            <p className="bsci-reason-body">{c.co2Body}</p>
            <div className="bsci-stat">{c.co2Stat}</div>
          </div>

          {/* Diaphragm section */}
          <section className="bsci-section bsci-diaphr" style={{ marginBottom: 0 }}>
            <h2 className="bsci-section-title">{c.diaphTitle}</h2>
            <p className="bsci-diaphr-intro">{c.diaphIntro}</p>

            {/* Anatomy comparison diagram — preserved exactly */}
            <div className="bsci-anatomy" aria-hidden="true">
              <svg viewBox="0 0 288 172" fill="none" xmlns="http://www.w3.org/2000/svg" className="bsci-anat-svg">
                {/* ─── EXHALE (left) ─── */}
                <ellipse cx="72" cy="80" rx="50" ry="66" className="bsci-anat-body" />
                <ellipse cx="55" cy="66" rx="16" ry="26" className="bsci-anat-lung" />
                <ellipse cx="89" cy="66" rx="16" ry="26" className="bsci-anat-lung" />
                <line x1="72" y1="44" x2="72" y2="92" className="bsci-anat-sternum" />
                {/* Diaphragm dome-up (exhale) */}
                <path d="M 28 88 Q 72 68 116 88" className="bsci-anat-diaph" strokeWidth="2" strokeLinecap="round" />
                {/* Belly flat */}
                <ellipse cx="72" cy="110" rx="36" ry="10" className="bsci-anat-belly bsci-anat-belly-flat" />
                <text x="72" y="135" className="bsci-anat-phase-lbl bsci-anat-exhale-lbl">{c.anatExhale}</text>
                <text x="72" y="146" className="bsci-anat-sub-lbl">{c.anatDiaphRises}</text>
                {/* Up arrow */}
                <path d="M 72 100 L 72 88 M 67 93 L 72 87 L 77 93" className="bsci-anat-arrow-up" strokeLinecap="round" strokeLinejoin="round" />

                {/* Divider */}
                <line x1="144" y1="8" x2="144" y2="162" className="bsci-anat-divider" />

                {/* ─── INHALE (right) ─── */}
                <ellipse cx="216" cy="80" rx="50" ry="66" className="bsci-anat-body" />
                <ellipse cx="199" cy="66" rx="16" ry="32" className="bsci-anat-lung bsci-anat-lung-full" />
                <ellipse cx="233" cy="66" rx="16" ry="32" className="bsci-anat-lung bsci-anat-lung-full" />
                <line x1="216" y1="44" x2="216" y2="98" className="bsci-anat-sternum" />
                {/* Diaphragm flat-down (inhale) */}
                <path d="M 172 100 Q 216 114 260 100" className="bsci-anat-diaph bsci-anat-diaph-down" strokeWidth="2" strokeLinecap="round" />
                {/* Belly expanded */}
                <ellipse cx="216" cy="128" rx="42" ry="18" className="bsci-anat-belly bsci-anat-belly-full" />
                <text x="216" y="152" className="bsci-anat-phase-lbl bsci-anat-inhale-lbl">{c.anatInhale}</text>
                <text x="216" y="163" className="bsci-anat-sub-lbl">{c.anatDiaphDescends}</text>
                {/* Down arrow */}
                <path d="M 216 108 L 216 120 M 211 115 L 216 121 L 221 115" className="bsci-anat-arrow-down" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="bsci-anat-caption">{c.diaphCaption}</p>
            </div>

            {/* First explanatory card */}
            <div className="bsci-card">
              <h3 className="bsci-card-title">{c.diaphWhatTitle}</h3>
              <p className="bsci-card-body">{c.diaphWhat}</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
