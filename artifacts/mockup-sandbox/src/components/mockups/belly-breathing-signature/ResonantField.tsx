import './_group.css';
import './resonant-field.css';

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

export function ResonantField() {
  return (
    <div className="bbs-group-root">
      <div className="belly">
        <div className="belly-inner">
          <h2 className="belly-title">{c.title}</h2>
          <p className="belly-sub">{c.sub}</p>

          <div className="belly-diagram belly-diagram-organic" role="img" aria-label={c.legend}>
            <div className="resonant-field-visual" aria-hidden="true">
              <svg className="resonant-field-svg" viewBox="0 0 340 226" preserveAspectRatio="xMidYMid meet">
                <path className="resonant-field-horizon" d="M28 113 C83 103 110 121 153 113 S226 103 312 113" />
                <ellipse className="resonant-field-contour" cx="170" cy="113" rx="43" ry="21" />
                <ellipse className="resonant-field-contour" cx="170" cy="113" rx="63" ry="31" />
                <ellipse className="resonant-field-contour" cx="170" cy="113" rx="86" ry="43" />
                <ellipse className="resonant-field-contour" cx="170" cy="113" rx="111" ry="56" />
                <ellipse className="resonant-field-contour" cx="170" cy="113" rx="137" ry="70" />
                <path className="resonant-field-trace" d="M24 83 C67 67 91 92 128 82 S188 66 225 82 S275 96 316 79" />
                <path className="resonant-field-trace" d="M22 145 C65 160 94 133 130 145 S190 160 228 145 S275 131 318 148" />
                <circle className="resonant-field-center" cx="170" cy="113" r="3.5" />
              </svg>
              <span className="resonant-field-phase resonant-field-inhale">{c.svgInhale}</span>
              <span className="resonant-field-phase resonant-field-exhale">{c.svgExhale}</span>
            </div>
            <div className="belly-diag-legend" aria-hidden="true">
              <span className="belly-diag-dot bd-gold" />
              <span className="belly-diag-legend-text">{c.legend}</span>
            </div>
          </div>

          <div className="belly-steps">
            <div className="belly-step"><span className="belly-step-num">1</span><p className="belly-step-text">{c.step1}</p></div>
            <div className="belly-step"><span className="belly-step-num">2</span><p className="belly-step-text">{c.step2}</p></div>
            <div className="belly-step"><span className="belly-step-num">3</span><p className="belly-step-text">{c.step3}</p></div>
            <div className="belly-callout"><p>{c.callout}</p></div>
          </div>

          <div className="belly-videos">
            <p className="belly-videos-title">{c.videosTitle}</p>
            <div className="belly-video-links">
              <a className="belly-video-link" href="https://www.youtube.com/results?search_query=diaphragmatic+belly+breathing+tutorial+how+to" target="_blank" rel="noopener noreferrer">
                <span className="belly-video-play">▶</span><span className="belly-video-text"><strong>{c.video1Title}</strong><span>{c.video1Sub}</span></span>
              </a>
              <a className="belly-video-link" href="https://www.youtube.com/results?search_query=belly+vs+chest+breathing+difference+demonstration" target="_blank" rel="noopener noreferrer">
                <span className="belly-video-play">▶</span><span className="belly-video-text"><strong>{c.video2Title}</strong><span>{c.video2Sub}</span></span>
              </a>
            </div>
          </div>

          <button className="belly-btn" onClick={() => {}}>{c.cta}</button>
        </div>
      </div>
    </div>
  );
}