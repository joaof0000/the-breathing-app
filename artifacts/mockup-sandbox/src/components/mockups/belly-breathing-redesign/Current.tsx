import './_group.css';

// Static English content — no i18n context needed
const c = {
  title: 'The foundation',
  sub: 'Everything in breathwork starts here.',
  svgChest: 'CHEST',
  svgBelly: 'BELLY',
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

export function Current() {
  return (
    <div className="belly-group-root">
      <div className="belly">
        <div className="belly-inner">

          <h2 className="belly-title">{c.title}</h2>
          <p className="belly-sub">{c.sub}</p>

          {/* Animated breathing diagram */}
          <div className="belly-diagram" aria-hidden="true">
            <div className="belly-diag-phase-wrap">
              <span className="belly-diag-phase belly-diag-inhale">{c.svgInhale}</span>
              <span className="belly-diag-phase belly-diag-exhale">{c.svgExhale}</span>
            </div>
            <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="belly-diag-svg">
              {/* Body silhouette */}
              <ellipse cx="100" cy="100" rx="64" ry="88" className="bd-body" />
              {/* Ribcage lines */}
              <path d="M 54 72 Q 44 90 46 112" className="bd-rib" />
              <path d="M 146 72 Q 156 90 154 112" className="bd-rib" />
              <path d="M 58 80 Q 50 96 52 114" className="bd-rib bd-rib2" />
              <path d="M 142 80 Q 150 96 148 114" className="bd-rib bd-rib2" />
              {/* Left lung */}
              <ellipse cx="72" cy="84" rx="22" ry="36" className="bd-lung" />
              {/* Right lung */}
              <ellipse cx="128" cy="84" rx="22" ry="36" className="bd-lung" />
              {/* Sternum */}
              <line x1="100" y1="52" x2="100" y2="118" className="bd-sternum" />
              {/* Diaphragm */}
              <path d="M 42 122 Q 100 148 158 122" className="bd-diaphragm" strokeWidth="2.5" strokeLinecap="round" />
              {/* Belly area */}
              <ellipse cx="100" cy="167" rx="52" ry="26" className="bd-belly" />
              {/* Belly hand indicator */}
              <ellipse cx="100" cy="155" rx="30" ry="8" className="bd-hand" />
              {/* Labels */}
              <text x="100" y="86" className="bd-label">{c.svgChest}</text>
              <text x="100" y="166" className="bd-label bd-label-belly">{c.svgBelly}</text>
              {/* Down arrow for diaphragm on inhale */}
              <path d="M 100 150 L 100 162 M 95 157 L 100 163 L 105 157" className="bd-arrow bd-arrow-down" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="belly-diag-legend">
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
