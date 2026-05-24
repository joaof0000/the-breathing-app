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

type Step = 'name' | 'gratitude' | 'belly' | 'done';

interface Props {
  onContinue: (gratitude: string) => void;
}

export default function WelcomeScreen({ onContinue }: Props) {
  const existingName = loadProfile().name;
  const [step, setStep]         = useState<Step>(existingName ? 'gratitude' : 'name');
  const [name, setName]         = useState(existingName || '');
  const [picked, setPicked]     = useState<Set<string>>(new Set());
  const [freeText, setFreeText] = useState('');
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

  const canContinueGrat = picked.size >= MIN_GRAT;
  const remaining       = Math.max(0, MIN_GRAT - picked.size);

  const buildGratStr = () => {
    const labels = [...picked].map(id => GRATITUDE_OPTS.find(o => o.id === id)?.label ?? id);
    if (freeText.trim()) labels.push(freeText.trim());
    return labels.join(', ');
  };

  const handleGratContinue = () => {
    if (!canContinueGrat) return;
    setStep('belly');
  };

  const handleFinish = () => {
    onContinue(buildGratStr());
  };

  return (
    <div className="welcome">
      <div className="welcome-inner">

        {/* Symbol — only on name/gratitude steps */}
        {step !== 'belly' && (
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
        )}

        {step !== 'belly' && (
          <>
            <h1 className="welcome-title">Breathwork</h1>
            <p className="welcome-tagline">Your sanctuary for conscious breathing</p>
          </>
        )}

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
            <a href="#" className="welcome-skip"
              onClick={e => { e.preventDefault(); saveName(''); setStep('gratitude'); }}>
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
              className={`welcome-btn${!canContinueGrat ? ' welcome-btn-dim' : ''}`}
              onClick={handleGratContinue}
              disabled={!canContinueGrat}
            >
              {canContinueGrat ? 'Continue' : `Choose ${remaining} more`}
            </button>
            {!existingName && (
              <button className="welcome-back" onClick={() => setStep('name')}>← Back</button>
            )}
          </div>
        )}

        {/* ── Step 3: Belly breathing ── */}
        {step === 'belly' && (
          <div className="welcome-belly-block">
            <div className="welcome-belly-symbol" aria-hidden="true">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
                <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
                <circle cx="40" cy="40" r="5"  fill="currentColor" opacity="0.8" />
                <path d="M40 18 L40 62" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 4" />
              </svg>
            </div>

            <h2 className="welcome-belly-title">Why breathwork?</h2>
            <p className="welcome-belly-sub">Everything starts here.</p>

            <div className="welcome-belly-steps">
              <div className="welcome-belly-step">
                <span className="wbs-num">1</span>
                <p className="wbs-text">
                  Place one hand on your <strong>chest</strong>, one on your <strong>belly</strong>.
                </p>
              </div>
              <div className="welcome-belly-step">
                <span className="wbs-num">2</span>
                <p className="wbs-text">
                  When you breathe correctly, <strong>only the belly hand moves</strong>. The chest stays still.
                </p>
              </div>
              <div className="welcome-belly-step">
                <span className="wbs-num">3</span>
                <p className="wbs-text">
                  Breathe <strong>in through the nose</strong>, out through the mouth. Slow and gentle.
                </p>
              </div>
              <div className="welcome-belly-callout">
                <p>
                  This is <em>belly breathing</em> — diaphragmatic breath. It activates your rest system,
                  lowers cortisol, and is the foundation of every technique in this app.
                </p>
              </div>
            </div>

            <button className="welcome-btn" onClick={handleFinish}>
              I understand — let's go
            </button>
            <button className="welcome-back" onClick={() => setStep('gratitude')}>← Back</button>
          </div>
        )}

      </div>
    </div>
  );
}
