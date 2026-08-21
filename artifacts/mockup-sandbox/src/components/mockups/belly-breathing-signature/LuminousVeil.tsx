import './_group.css';
import './luminous-veil.css';

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

export function LuminousVeil() {
  return (
    <div className="bbs-group-root">
      <div className="belly">
        <div className="belly-inner">
          <h2 className="belly-title">{c.title}</h2>
          <p className="belly-sub">{c.sub}</p>

          <div className="belly-diagram belly-diagram-organic" role="img" aria-label={c.legend}>
            <div className="luminous-veil-visual" aria-hidden="true">
              <svg className="luminous-veil-svg" viewBox="0 0 360 236" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="veil-wash" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f6d59a" stopOpacity="0.08" />
                    <stop offset="0.48" stopColor="#e2a66d" stopOpacity="0.46" />
                    <stop offset="1" stopColor="#b95f50" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="veil-thread" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#f1c77f" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#f1c77f" stopOpacity="0.72" />
                    <stop offset="1" stopColor="#f1c77f" stopOpacity="0" />
                  </linearGradient>
                  <filter id="veil-blur">
                    <feGaussianBlur stdDeviation="14" />
                  </filter>
                  <filter id="veil-soft">
                    <feGaussianBlur stdDeviation="3.5" />
                  </filter>
                </defs>

                <ellipse className="veil-aura" cx="180" cy="120" rx="108" ry="44" fill="#cf8463" />
                <g className="veil-fold veil-fold-back">
                  <path d="M52 139 C94 69 142 92 180 113 C221 135 268 145 307 87 C276 171 222 187 172 158 C126 131 91 143 52 139Z" fill="url(#veil-wash)" />
                  <path d="M58 148 C105 106 130 119 177 145 C224 171 265 151 302 112" fill="none" stroke="#e8b87d" strokeOpacity="0.2" strokeWidth="1.2" />
                </g>
                <g className="veil-fold veil-fold-front">
                  <path d="M43 133 C88 102 118 84 162 111 C209 140 247 152 317 121 C272 174 218 177 171 150 C119 120 87 158 43 133Z" fill="url(#veil-wash)" />
                  <path d="M45 131 C88 113 119 99 163 123 C207 148 249 158 313 127" fill="none" stroke="url(#veil-thread)" strokeWidth="1.5" />
                  <path d="M60 151 C103 125 126 119 165 140 C211 165 250 166 294 147" fill="none" stroke="#f3ca8b" strokeOpacity="0.28" strokeWidth="1" />
                </g>
                <g className="veil-drift">
                  <path d="M67 92 C115 70 143 83 177 101 C216 121 248 119 287 92" fill="none" stroke="#f4c982" strokeOpacity="0.36" strokeWidth="1" />
                  <path d="M75 175 C112 152 137 158 174 173 C212 189 245 180 282 158" fill="none" stroke="#cb825f" strokeOpacity="0.36" strokeWidth="1" />
                </g>
                <g className="veil-phase veil-phase-inhale">
                  <text x="180" y="54" textAnchor="middle">INHALE</text>
                  <line x1="127" y1="66" x2="233" y2="66" />
                </g>
                <g className="veil-phase veil-phase-exhale">
                  <text x="180" y="54" textAnchor="middle">EXHALE</text>
                  <line x1="143" y1="66" x2="217" y2="66" />
                </g>
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