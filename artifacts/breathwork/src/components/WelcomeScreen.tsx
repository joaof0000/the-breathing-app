import { useLang } from '../i18n/LangContext';
import './WelcomeScreen.css';

interface Props {
  onBegin: () => void;
}

export default function WelcomeScreen({ onBegin }: Props) {
  const { t } = useLang();
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

        <p className="welcome-tagline">{t.welcome.tagline}</p>

        <p className="welcome-body">{t.welcome.body}</p>

        <button className="welcome-btn" onClick={onBegin}>
          {t.welcome.begin}
        </button>

        <p className="welcome-hint">{t.welcome.hint}</p>
      </div>
    </div>
  );
}
