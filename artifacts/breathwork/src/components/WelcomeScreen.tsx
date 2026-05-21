import './WelcomeScreen.css';

interface Props {
  onBegin: () => void;
}

export default function WelcomeScreen({ onBegin }: Props) {
  return (
    <div className="welcome">
      <div className="welcome-inner">
        <div className="welcome-symbol" aria-hidden="true">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
            <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
            <circle cx="40" cy="40" r="12" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
            <circle cx="40" cy="40" r="3.5" fill="currentColor" opacity="0.9" />
            <line x1="40" y1="4" x2="40" y2="76" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="4" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>

        <h1 className="welcome-title">Breathwork</h1>

        <p className="welcome-tagline">Your sanctuary for conscious breathing</p>

        <p className="welcome-body">
          This app guides you through 24 time-honoured breathing techniques — from ancient pranayama 
          to modern stress-relief methods. Each practice is matched to an intention, so you always 
          begin with purpose and arrive exactly where you need to be.
        </p>

        <button className="welcome-btn" onClick={onBegin}>
          Begin
        </button>

        <p className="welcome-hint">You can return here anytime from the settings.</p>
      </div>
    </div>
  );
}
