import './BellyBreathingScreen.css';

interface Props {
  onContinue: () => void;
}

export default function BellyBreathingScreen({ onContinue }: Props) {
  return (
    <div className="belly">
      <div className="belly-inner">

        <h2 className="belly-title">The foundation</h2>
        <p className="belly-sub">Everything in breathwork starts here.</p>

        {/* Animated breathing diagram */}
        <div className="belly-diagram" aria-hidden="true">
          <div className="belly-diag-phase-wrap">
            <span className="belly-diag-phase belly-diag-inhale">INHALE</span>
            <span className="belly-diag-phase belly-diag-exhale">EXHALE</span>
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
            {/* Chest label */}
            <text x="100" y="86" className="bd-label">CHEST</text>
            <text x="100" y="166" className="bd-label bd-label-belly">BELLY</text>
            {/* Down arrow for diaphragm on inhale */}
            <path d="M 100 150 L 100 162 M 95 157 L 100 163 L 105 157" className="bd-arrow bd-arrow-down" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="belly-diag-legend">
            <span className="belly-diag-dot bd-gold" />
            <span className="belly-diag-legend-text">Belly rises on inhale — chest stays still</span>
          </div>
        </div>

        <div className="belly-steps">
          <div className="belly-step">
            <span className="belly-step-num">1</span>
            <p className="belly-step-text">
              Place one hand on your <strong>chest</strong>, one on your <strong>belly</strong>.
            </p>
          </div>

          <div className="belly-step">
            <span className="belly-step-num">2</span>
            <p className="belly-step-text">
              When you breathe correctly, <strong>only the belly hand moves</strong>. The chest stays still.
            </p>
          </div>

          <div className="belly-step">
            <span className="belly-step-num">3</span>
            <p className="belly-step-text">
              Breathe <strong>in through the nose</strong>, out through the mouth. Slow and gentle.
            </p>
          </div>

          <div className="belly-callout">
            <p>
              This is <em>belly breathing</em> — diaphragmatic breath. It activates your rest system,
              lowers cortisol, and is the foundation of every technique in this app.
            </p>
          </div>
        </div>

        {/* Video resources */}
        <div className="belly-videos">
          <p className="belly-videos-title">Watch a demonstration</p>
          <div className="belly-video-links">
            <a
              className="belly-video-link"
              href="https://www.youtube.com/results?search_query=diaphragmatic+belly+breathing+tutorial+how+to"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="belly-video-play">▶</span>
              <span className="belly-video-text">
                <strong>How to belly breathe</strong>
                <span>Step-by-step diaphragmatic breathing</span>
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
                <strong>Belly vs chest breathing</strong>
                <span>See the difference clearly explained</span>
              </span>
            </a>
          </div>
        </div>

        <button className="belly-btn" onClick={onContinue}>
          I understand — continue
        </button>
      </div>
    </div>
  );
}
