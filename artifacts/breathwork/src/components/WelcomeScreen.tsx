import { useState, useRef, useEffect } from 'react';
import { saveProfile, loadProfile } from '../hooks/useProfile';
import './WelcomeScreen.css';

interface Props {
  onNew:        () => void;
  onExperienced: () => void;
}

export default function WelcomeScreen({ onNew, onExperienced }: Props) {
  const existingName = loadProfile().name;
  const [step, setStep] = useState<'name' | 'choice'>(
    existingName ? 'choice' : 'name'
  );
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step !== 'name') return;
    const t = setTimeout(() => inputRef.current?.focus(), 600);
    return () => clearTimeout(t);
  }, [step]);

  const saveName = (nameVal: string) => {
    const existing = loadProfile();
    saveProfile({ ...existing, name: nameVal.trim() || 'Friend' });
  };

  const goToChoice = (nameVal: string) => {
    saveName(nameVal);
    setStep('choice');
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

        <h1 className="welcome-title">Breathwork</h1>
        <p className="welcome-tagline">Your sanctuary for conscious breathing</p>

        {step === 'name' ? (
          <div className="welcome-name-block" key="name-step">
            <label className="welcome-name-label" htmlFor="wn-input">
              What's your name?
            </label>
            <input
              ref={inputRef}
              id="wn-input"
              className="welcome-name-input"
              type="text"
              placeholder="e.g. Sarah"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') goToChoice(name); }}
              maxLength={40}
              autoComplete="given-name"
            />
            <button className="welcome-btn" onClick={() => goToChoice(name)}>
              Continue
            </button>
            <a href="#" className="welcome-skip" onClick={e => { e.preventDefault(); goToChoice(''); }}>
              Skip
            </a>
          </div>
        ) : (
          <div className="welcome-choice-block" key="choice-step">
            <p className="welcome-choice-label">How comfortable are you with breathwork?</p>
            <div className="welcome-choices">
              <button className="welcome-choice-btn" onClick={onNew}>
                <span className="wcb-icon">🌱</span>
                <span className="wcb-text">
                  <strong>I'm new to breathing</strong>
                  <span>Teach me the basics</span>
                </span>
              </button>
              <button className="welcome-choice-btn" onClick={onExperienced}>
                <span className="wcb-icon">🌬️</span>
                <span className="wcb-text">
                  <strong>I know how to breathe</strong>
                  <span>Let's go</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
