import { useState, useRef, useEffect } from 'react';
import { saveProfile, loadProfile } from '../hooks/useProfile';
import { useLang } from '../i18n/LangContext';
import './WelcomeScreen.css';

interface Props {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: Props) {
  const { t } = useLang();
  const existingName = loadProfile().name;
  const [name, setName] = useState(existingName || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleBegin = () => {
    const trimmed = name.trim();
    if (trimmed) {
      const existing = loadProfile();
      saveProfile({ ...existing, name: trimmed });
    }
    onContinue();
  };

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

        <h1 className="welcome-title">{t.appTitle}</h1>
        <p className="welcome-tagline">{t.welcome.tagline}</p>

        <div className="welcome-name-block">
          <input
            ref={inputRef}
            className="welcome-name-input"
            type="text"
            placeholder={t.welcome.namePlaceholder}
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleBegin(); }}
            maxLength={40}
            autoComplete="given-name"
          />
          <button className="welcome-btn" onClick={handleBegin}>
            {t.welcome.begin}
          </button>
        </div>

      </div>
    </div>
  );
}
