import { useLang } from '../i18n/LangContext';
import './BreathingChoiceScreen.css';

interface Props {
  onNew:         () => void;
  onExperienced: () => void;
}

export default function BreathingChoiceScreen({ onNew, onExperienced }: Props) {
  const { t } = useLang();
  const c = t.choice;

  return (
    <div className="bchoice">
      <div className="bchoice-inner">
        <div className="bchoice-symbol" aria-hidden="true">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
            <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
            <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.85" />
            <path d="M40 8 C40 8 28 24 28 40 C28 56 40 72 40 72" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
            <path d="M40 8 C40 8 52 24 52 40 C52 56 40 72 40 72" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
          </svg>
        </div>

        <h2 className="bchoice-title">{c.title}</h2>
        <p className="bchoice-sub">{c.sub}</p>

        <div className="bchoice-options">
          <button className="bchoice-btn bchoice-btn-new" onClick={onNew}>
            <span className="bchoice-btn-icon">🌱</span>
            <span className="bchoice-btn-text">
              <strong>{c.newTitle}</strong>
              <span>{c.newSub}</span>
            </span>
          </button>

          <button className="bchoice-btn bchoice-btn-exp" onClick={onExperienced}>
            <span className="bchoice-btn-icon">🌬️</span>
            <span className="bchoice-btn-text">
              <strong>{c.expTitle}</strong>
              <span>{c.expSub}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
