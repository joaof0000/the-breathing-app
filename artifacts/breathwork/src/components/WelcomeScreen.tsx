import { useState, useRef, useEffect } from 'react';
import { saveProfile, loadProfile } from '../hooks/useProfile';
import './WelcomeScreen.css';

const GRATITUDE_OPTS = [
  { id: 'health',   label: 'Health' },
  { id: 'love',     label: 'Love' },
  { id: 'family',   label: 'Family' },
  { id: 'growth',   label: 'Growth' },
  { id: 'work',     label: 'Work' },
  { id: 'moment',   label: 'This moment' },
  { id: 'practice', label: 'My practice' },
  { id: 'body',     label: 'My body' },
];
const MIN_GRAT = 3;

interface Props {
  onNew:         (gratitude: string) => void;
  onExperienced: (gratitude: string) => void;
}

type Step = 'name' | 'gratitude' | 'choice';

export default function WelcomeScreen({ onNew, onExperienced }: Props) {
  const existingName = loadProfile().name;
  const [step, setStep] = useState<Step>(existingName ? 'gratitude' : 'name');
  const [name, setName]           = useState(existingName || '');
  const [picked, setPicked]       = useState<Set<string>>(new Set());
  const [freeText, setFreeText]   = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step !== 'name') return;
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, [step]);

  const saveName = (val: string) => {
    const existing = loadProfile();
    saveProfile({ ...existing, name: val.trim() || 'Friend' });
  };

  const handleNameContinue = () => {
    saveName(name);
    setStep('gratitude');
  };

  const toggleGrat = (id: string) => {
    setPicked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const buildGratitudeString = () => {
    const labels = [...picked].map(id => GRATITUDE_OPTS.find(o => o.id === id)?.label ?? id);
    if (freeText.trim()) labels.push(freeText.trim());
    return labels.join(', ');
  };

  const canContinueGrat = picked.size >= MIN_GRAT;
  const remaining = Math.max(0, MIN_GRAT - picked.size);

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

        {/* ── Step 1: Name ── */}
        {step === 'name' && (
          <div className="welcome-name-block">
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
              onKeyDown={e => { if (e.key === 'Enter') handleNameContinue(); }}
              maxLength={40}
              autoComplete="given-name"
            />
            <button className="welcome-btn" onClick={handleNameContinue}>
              Continue
            </button>
            <a href="#" className="welcome-skip" onClick={e => { e.preventDefault(); saveName(''); setStep('gratitude'); }}>
              Skip
            </a>
          </div>
        )}

        {/* ── Step 2: Gratitude ── */}
        {step === 'gratitude' && (
          <div className="welcome-grat-block">
            <p className="welcome-grat-title">What are you grateful for today?</p>
            <p className="welcome-grat-sub">Choose at least 3.</p>
            <div className="welcome-grat-chips">
              {GRATITUDE_OPTS.map(opt => (
                <button
                  key={opt.id}
                  className={`welcome-grat-chip ${picked.has(opt.id) ? 'on' : ''}`}
                  onClick={() => toggleGrat(opt.id)}
                >
                  {picked.has(opt.id) && <span className="wgc-check">✓ </span>}
                  {opt.label}
                </button>
              ))}
            </div>
            <input
              className="welcome-grat-free"
              type="text"
              placeholder="Anything else… (optional)"
              value={freeText}
              onChange={e => setFreeText(e.target.value)}
              maxLength={80}
            />
            <button
              className={`welcome-btn ${!canContinueGrat ? 'welcome-btn-dim' : ''}`}
              onClick={() => canContinueGrat && setStep('choice')}
              disabled={!canContinueGrat}
            >
              {canContinueGrat ? 'Continue' : `Choose ${remaining} more`}
            </button>
            {!existingName && (
              <button className="welcome-back" onClick={() => setStep('name')}>
                ← Back
              </button>
            )}
          </div>
        )}

        {/* ── Step 3: Breathing choice ── */}
        {step === 'choice' && (
          <div className="welcome-choice-block">
            <p className="welcome-choice-label">How comfortable are you with breathwork?</p>
            <div className="welcome-choices">
              <button className="welcome-choice-btn" onClick={() => onNew(buildGratitudeString())}>
                <span className="wcb-icon">🌱</span>
                <span className="wcb-text">
                  <strong>I'm new to breathing</strong>
                  <span>Teach me the basics</span>
                </span>
              </button>
              <button className="welcome-choice-btn" onClick={() => onExperienced(buildGratitudeString())}>
                <span className="wcb-icon">🌬️</span>
                <span className="wcb-text">
                  <strong>I know how to breathe</strong>
                  <span>Let's go</span>
                </span>
              </button>
            </div>
            <button className="welcome-back" onClick={() => setStep('gratitude')}>
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
