import './BellyBreathingScreen.css';

interface Props {
  onContinue: () => void;
}

export default function BellyBreathingScreen({ onContinue }: Props) {
  return (
    <div className="belly">
      <div className="belly-inner">
        <div className="belly-symbol" aria-hidden="true">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
            <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.8" />
            <path d="M40 18 L40 62" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 4" />
          </svg>
        </div>

        <h2 className="belly-title">The foundation</h2>
        <p className="belly-sub">Everything in breathwork starts here.</p>

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

        <button className="belly-btn" onClick={onContinue}>
          I understand — continue
        </button>
      </div>
    </div>
  );
}
