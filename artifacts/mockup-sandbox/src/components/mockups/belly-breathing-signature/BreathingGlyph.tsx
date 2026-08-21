import './_group.css';
import './breathing-glyph.css';

const c = {
  title: 'The foundation',
  sub: 'Everything in breathwork starts here.',
  svgInhale: 'INHALE',
  svgExhale: 'EXHALE',
  legend: 'Belly rises on inhale — chest stays still',
  step1: 'Place one hand on your chest, one on your belly.',
  step2: 'When you breathe correctly, only the belly hand moves. The chest stays still.',
  step3: 'Breathe in through the nose, out through the mouth. Slow and gentle.',
  callout: 'This is belly breathing — diaphragmatic breath. It activates your rest system, lowers cortisol, and is the foundation of every technique in this app.',
  videosTitle: 'Watch a demonstration',
  video1Title: 'How to belly breathe',
  video1Sub: 'Step-by-step diaphragmatic breathing',
  video2Title: 'Belly vs chest breathing',
  video2Sub: 'See the difference clearly explained',
  cta: 'I understand — continue',
};

export function BreathingGlyph() {
  return (
    <div className="bbs-group-root">
      <div className="belly">
        <div className="belly-inner">
          <h2 className="belly-title">{c.title}</h2>
          <p className="belly-sub">{c.sub}</p>

          <div className="belly-diagram belly-diagram-organic" role="img" aria-label={c.legend}>
            <div className="breathing-glyph-visual" aria-hidden="true">
              <svg className="breathing-glyph-svg" viewBox="0 0 220 220">
                <ellipse className="glyph-orbit" cx="110" cy="110" rx="88" ry="38" transform="rotate(28 110 110)" />
                <ellipse className="glyph-orbit glyph-orbit-two" cx="110" cy="110" rx="88" ry="38" transform="rotate(-28 110 110)" />
                <circle className="glyph-ring" cx="110" cy="110" r="72" />
                <circle className="glyph-ring glyph-ring-inner" cx="110" cy="110" r="53" />
                <g className="glyph-rays">
                  <line className="glyph-ray" x1="110" y1="27" x2="110" y2="47" />
                  <line className="glyph-ray" x1="110" y1="173" x2="110" y2="193" />
                  <line className="glyph-ray" x1="27" y1="110" x2="47" y2="110" />
                  <line className="glyph-ray" x1="173" y1="110" x2="193" y2="110" />
                </g>
                <g>
                  <path className="glyph-petal" d="M110 110 C86 92 83 67 110 50 C137 67 134 92 110 110Z" />
                  <path className="glyph-petal" d="M110 110 C128 86 153 83 170 110 C153 137 128 134 110 110Z" />
                  <path className="glyph-petal" d="M110 110 C134 128 137 153 110 170 C83 153 86 128 110 110Z" />
                  <path className="glyph-petal" d="M110 110 C92 134 67 137 50 110 C67 83 92 86 110 110Z" />
                </g>
                <circle className="glyph-core-halo" cx="110" cy="110" r="12" />
                <circle className="glyph-core" cx="110" cy="110" r="4" />
                <text className="glyph-phase glyph-inhale" x="110" y="29">{c.svgInhale}</text>
                <text className="glyph-phase glyph-exhale" x="110" y="29">{c.svgExhale}</text>
              </svg>
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