import './_group.css';

// Static English content — no i18n context needed
const c = {
  title: 'The foundation',
  sub: 'Everything in breathwork starts here.',
  svgInhale: 'INHALE',
  svgExhale: 'EXHALE',
  legend: 'Belly rises on inhale — chest stays still',
  step1: 'Place one hand on your chest, one on your belly.',
  step2: 'When you breathe correctly, only the belly hand moves. The chest stays still.',
  step3: 'Breathe in through the nose, out through the mouth. Slow and gentle.',
  callout:
    'This is belly breathing — diaphragmatic breath. It activates your rest system, lowers cortisol, and is the foundation of every technique in this app.',
  videosTitle: 'Watch a demonstration',
  video1Title: 'How to belly breathe',
  video1Sub: 'Step-by-step diaphragmatic breathing',
  video2Title: 'Belly vs chest breathing',
  video2Sub: 'See the difference clearly explained',
  cta: 'I understand — continue',
};

export function CurrentSignature() {
  return (
    <div className="bbs-group-root">
      <div className="belly">
        <div className="belly-inner">

          <h2 className="belly-title">{c.title}</h2>
          <p className="belly-sub">{c.sub}</p>

          <div className="belly-diagram belly-diagram-organic" role="img" aria-label={c.legend}>
            <div className="belly-tide-visual" aria-hidden="true">
              <span className="belly-tide-glow belly-tide-glow-one" />
              <span className="belly-tide-glow belly-tide-glow-two" />
              <span className="belly-tide-ripple belly-tide-ripple-one" />
              <span className="belly-tide-ripple belly-tide-ripple-two" />
              <span className="belly-tide-ripple belly-tide-ripple-three" />
              <span className="belly-tide-orbit belly-tide-orbit-one" />
              <span className="belly-tide-orbit belly-tide-orbit-two" />
              <span className="belly-tide-spark belly-tide-spark-one" />
              <span className="belly-tide-spark belly-tide-spark-two" />
              <span className="belly-tide-core">
                <span className="belly-tide-core-light" />
                <span className="belly-diag-phase belly-diag-inhale">{c.svgInhale}</span>
                <span className="belly-diag-phase belly-diag-exhale">{c.svgExhale}</span>
              </span>
            </div>
            <div className="belly-diag-legend" aria-hidden="true">
              <span className="belly-diag-dot bd-gold" />
              <span className="belly-diag-legend-text">{c.legend}</span>
            </div>
          </div>

          <div className="belly-steps">
            <div className="belly-step">
              <span className="belly-step-num">1</span>
              <p className="belly-step-text">{c.step1}</p>
            </div>

            <div className="belly-step">
              <span className="belly-step-num">2</span>
              <p className="belly-step-text">{c.step2}</p>
            </div>

            <div className="belly-step">
              <span className="belly-step-num">3</span>
              <p className="belly-step-text">{c.step3}</p>
            </div>

            <div className="belly-callout">
              <p>{c.callout}</p>
            </div>
          </div>

          {/* Video resources */}
          <div className="belly-videos">
            <p className="belly-videos-title">{c.videosTitle}</p>
            <div className="belly-video-links">
              <a
                className="belly-video-link"
                href="https://www.youtube.com/results?search_query=diaphragmatic+belly+breathing+tutorial+how+to"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="belly-video-play">▶</span>
                <span className="belly-video-text">
                  <strong>{c.video1Title}</strong>
                  <span>{c.video1Sub}</span>
                </span>
              </a>
              <a
                className="belly-video-link"
                href="https://www.youtube.com/results?search_query=belly+vs+chest+breathing+difference+demonstration"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="belly-video-play">▶</span>
                <span className="belly-video-text">
                  <strong>{c.video2Title}</strong>
                  <span>{c.video2Sub}</span>
                </span>
              </a>
            </div>
          </div>

          <button className="belly-btn" onClick={() => {}}>
            {c.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
