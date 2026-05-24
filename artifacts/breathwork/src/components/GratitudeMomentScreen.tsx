import { useState } from 'react';
import './GratitudeMomentScreen.css';

const QUICK_OPTIONS = [
  { id: 'health',    label: 'Health' },
  { id: 'love',      label: 'Love' },
  { id: 'family',    label: 'Family' },
  { id: 'growth',    label: 'Growth' },
  { id: 'work',      label: 'Work' },
  { id: 'moment',    label: 'This moment' },
  { id: 'practice',  label: 'My practice' },
  { id: 'body',      label: 'My body' },
];

const MIN_SELECTED = 3;

interface Props {
  onContinue: (selected: string[], freeText: string) => void;
  onSkip:     () => void;
}

export default function GratitudeMomentScreen({ onContinue, onSkip }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [freeText, setFreeText] = useState('');

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canContinue = selected.size >= MIN_SELECTED;
  const remaining   = Math.max(0, MIN_SELECTED - selected.size);

  return (
    <div className="gm">
      <div className="gm-inner">
        <div className="gm-symbol" aria-hidden="true">
          <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <circle cx="35" cy="35" r="18" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
            <circle cx="35" cy="35" r="4" fill="currentColor" opacity="0.8" />
            <path d="M35 5 L35 65 M5 35 L65 35" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
          </svg>
        </div>

        <div className="gm-header">
          <h2 className="gm-title">Before you breathe</h2>
          <p className="gm-sub">Name three things you are grateful for today.</p>
        </div>

        <div className="gm-chips">
          {QUICK_OPTIONS.map(opt => (
            <button
              key={opt.id}
              className={`gm-chip ${selected.has(opt.id) ? 'on' : ''}`}
              onClick={() => toggle(opt.id)}
            >
              {selected.has(opt.id) && <span className="gm-check" aria-hidden="true">✓</span>}
              {opt.label}
            </button>
          ))}
        </div>

        <div className="gm-free-wrap">
          <input
            className="gm-free"
            type="text"
            placeholder="Anything else… (optional)"
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            maxLength={80}
          />
        </div>

        <button
          className={`gm-btn ${canContinue ? 'ready' : 'waiting'}`}
          onClick={() => canContinue && onContinue([...selected], freeText)}
          disabled={!canContinue}
          aria-disabled={!canContinue}
        >
          {canContinue
            ? 'Continue'
            : `Choose ${remaining} more`}
        </button>

        <button className="gm-skip" onClick={onSkip}>
          Skip
        </button>
      </div>
    </div>
  );
}
