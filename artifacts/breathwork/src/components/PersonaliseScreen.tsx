import { useState } from 'react';
import { saveProfile, loadProfile } from '../hooks/useProfile';
import './PersonaliseScreen.css';

interface Props {
  onDone: () => void;
}

export default function PersonaliseScreen({ onDone }: Props) {
  const [intention, setIntention] = useState('');

  const handleContinue = () => {
    const existing = loadProfile();
    saveProfile({ ...existing, intention: intention.trim() });
    onDone();
  };

  return (
    <div className="personalise">
      <div className="personalise-inner">
        <div className="personalise-symbol" aria-hidden="true">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
            <circle cx="30" cy="30" r="14" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
            <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.85" />
          </svg>
        </div>

        <h2 className="personalise-title">One more thing</h2>
        <p className="personalise-sub">
          What's your intention for today? We'll highlight the best technique for you.
        </p>

        <div className="personalise-fields">
          <div className="pf-group">
            <label className="pf-label" htmlFor="ps-intention">Today's intention</label>
            <input
              id="ps-intention"
              className="pf-input"
              type="text"
              placeholder="e.g. calm, focus, energy…"
              value={intention}
              onChange={e => setIntention(e.target.value)}
              maxLength={60}
            />
            <p className="pf-hint">
              We'll highlight the best-matching goal for you.
            </p>
          </div>
        </div>

        <button className="personalise-btn" onClick={handleContinue}>
          {intention.trim() ? 'Begin my practice' : 'Skip'}
        </button>
      </div>
    </div>
  );
}
