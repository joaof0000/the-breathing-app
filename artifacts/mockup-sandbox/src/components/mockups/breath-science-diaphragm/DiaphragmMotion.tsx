import './_group.css';
import './diaphragm-motion.css';

export function DiaphragmMotion() {
  return (
    <div className="bsci-group-root dm-root">
      <main className="bsci-page">
        <div className="bsci-wrap">
          <button className="bsci-back" onClick={() => window.history.back()}>← Back</button>
          <article className="dm-context bsci-reason">
            <div className="bsci-reason-header"><span className="dm-reason-mark">10</span><div><div className="bsci-reason-num">LAST NOTE</div><div className="bsci-reason-title">Higher CO₂ Tolerance</div></div></div>
            <p className="bsci-reason-body">Training tolerance through slow breathing builds a calmer, more resilient baseline.</p>
            <div className="bsci-stat">The hidden key to calm</div>
          </article>

          <section className="bsci-section bsci-diaphr dm-diaphr-focus">
            <h2 className="bsci-section-title">How to Breathe from Your Diaphragm</h2>
            <p className="bsci-diaphr-intro">Diaphragmatic breathing is the foundation of every technique in this app. It is how you were designed to breathe — and how almost nobody breathes by adulthood.</p>

            <figure className="dm-visual" aria-labelledby="dm-visual-title">
              <div className="dm-visual-top"><span className="dm-kicker">A quiet lesson in motion</span><span className="dm-live"><i /> breathing cycle</span></div>
              <svg viewBox="0 0 360 220" role="img" aria-labelledby="dm-visual-title dm-visual-desc">
                <title id="dm-visual-title">The diaphragm moves down as you inhale and rises as you exhale</title>
                <desc id="dm-visual-desc">A single warm ribbon travels through a field of air. Its lowest point marks the diaphragm descending on inhale; it returns upward on exhale.</desc>
                <defs>
                  <radialGradient id="dmGlow"><stop offset="0" stopColor="#f5c979" stopOpacity=".38" /><stop offset="1" stopColor="#f5c979" stopOpacity="0" /></radialGradient>
                  <linearGradient id="dmRibbon" x1="0" x2="1"><stop stopColor="#b96f4b" /><stop offset=".5" stopColor="#f1bd68" /><stop offset="1" stopColor="#b96f4b" /></linearGradient>
                </defs>
                <circle className="dm-orb" cx="180" cy="110" r="76" fill="url(#dmGlow)" />
                <path className="dm-air dm-air-one" d="M22 74 C85 74 99 74 133 94 S194 150 233 126 S280 74 338 74" />
                <path className="dm-air dm-air-two" d="M22 108 C79 108 108 108 140 119 S194 153 230 138 S286 108 338 108" />
                <path className="dm-ribbon" d="M31 123 C87 123 112 122 143 142 S198 179 231 150 S280 123 329 123" />
                <path className="dm-ribbon-glow" d="M31 123 C87 123 112 122 143 142 S198 179 231 150 S280 123 329 123" />
                <circle className="dm-breath-dot" cx="31" cy="123" r="4" />
                <line className="dm-guide" x1="180" y1="38" x2="180" y2="186" />
                <text className="dm-label dm-label-inhale" x="180" y="207" textAnchor="middle">INHALE · moves down</text>
                <text className="dm-label dm-label-exhale" x="180" y="25" textAnchor="middle">EXHALE · rises back</text>
              </svg>
              <figcaption>The diaphragm is a muscle. It contracts downward to draw air in, then relaxes upward to push air out.</figcaption>
              <div className="dm-legend"><span><b className="dm-swatch dm-swatch-in" /> inhale · makes room</span><span><b className="dm-swatch dm-swatch-out" /> exhale · returns</span></div>
            </figure>

            <div className="bsci-card"><h3 className="bsci-card-title">What is the diaphragm?</h3><p className="bsci-card-body">The diaphragm is a large, dome-shaped muscle at the base of your lungs, separating the chest from the abdomen. When it contracts and flattens downward, it creates a vacuum that draws air deep into the lower lobes — the most oxygen-rich regions.</p></div>
          </section>
        </div>
      </main>
    </div>
  );
}