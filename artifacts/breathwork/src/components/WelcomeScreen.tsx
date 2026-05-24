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

const WHY_CARDS = [
  { icon: '⚡', title: 'Controls your feelings', body: 'Slow breathing calms you down. Fast breathing gives you energy. YOU get to choose.' },
  { icon: '🧠', title: 'Sharpens your brain',    body: 'Deep breaths send more oxygen to your brain. More oxygen = better thinking & focus.' },
  { icon: '😴', title: 'Helps you sleep',         body: 'Slow breaths at bedtime tell your body: "We\'re safe. Time to rest."' },
  { icon: '🛡️', title: 'Protects your body',      body: 'Your nose makes a gas called nitric oxide that fights germs — only when you breathe through it.' },
];

const VIDEOS = [
  {
    id:    'aNXKjGFUlMs',
    title: 'Belly Breathing with Elmo',
    who:   'Sesame Street · 2 min · perfect for beginners',
  },
  {
    id:    'odADwWzNMv4',
    title: 'Why Deep Breathing Works',
    who:   'SciShow · 4 min · the science, made simple',
  },
];

type Step = 'name' | 'gratitude' | 'teach';

interface Props {
  onContinue: (gratitude: string) => void;
  initialStep?: 'teach';
}

function DiaphragmDiagram() {
  return (
    <svg className="teach-diagram-svg" viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Chest vs belly breathing diagram">
      {/* ── WRONG side ── */}
      <text x="70" y="14" textAnchor="middle" className="diag-label-bad">✗ Chest breathing</text>

      {/* torso outline */}
      <path d="M30 20 Q30 110 70 120 Q110 110 110 20 Z" stroke="rgba(229,169,60,0.3)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
      {/* lungs */}
      <ellipse cx="58" cy="55" rx="14" ry="22" fill="rgba(229,169,60,0.12)" stroke="rgba(229,169,60,0.35)" strokeWidth="0.8" />
      <ellipse cx="82" cy="55" rx="14" ry="22" fill="rgba(229,169,60,0.12)" stroke="rgba(229,169,60,0.35)" strokeWidth="0.8" />
      {/* diaphragm — flat = wrong */}
      <path d="M38 80 Q70 80 102 80" stroke="#E5A93C" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
      {/* belly — barely moves */}
      <ellipse cx="70" cy="100" rx="25" ry="9"  fill="rgba(229,169,60,0.06)" stroke="rgba(229,169,60,0.2)" strokeWidth="0.8" />
      {/* chest arrow — rises */}
      <line x1="70" y1="45" x2="70" y2="28" stroke="#ff9999" strokeWidth="2" markerEnd="url(#arr-red)"/>
      <text x="70" y="108" textAnchor="middle" fontSize="8" fill="rgba(229,169,60,0.45)">belly barely moves</text>

      {/* ── RIGHT side ── */}
      <text x="210" y="14" textAnchor="middle" className="diag-label-good">✓ Belly breathing</text>

      <path d="M170 20 Q170 110 210 120 Q250 110 250 20 Z" stroke="rgba(100,220,160,0.35)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
      {/* lungs */}
      <ellipse cx="198" cy="55" rx="14" ry="22" fill="rgba(100,220,160,0.12)" stroke="rgba(100,220,160,0.4)" strokeWidth="0.8" />
      <ellipse cx="222" cy="55" rx="14" ry="22" fill="rgba(100,220,160,0.12)" stroke="rgba(100,220,160,0.4)" strokeWidth="0.8" />
      {/* diaphragm — dropped = right */}
      <path d="M178 84 Q210 96 242 84" stroke="#64dc9a" strokeWidth="1.5" opacity="0.7"/>
      {/* belly expands */}
      <ellipse cx="210" cy="106" rx="33" ry="13" fill="rgba(100,220,160,0.1)" stroke="rgba(100,220,160,0.4)" strokeWidth="0.8"/>
      {/* belly arrow — expands out */}
      <line x1="210" y1="106" x2="210" y2="125" stroke="#64dc9a" strokeWidth="2" markerEnd="url(#arr-grn)"/>
      <text x="210" y="134" textAnchor="middle" fontSize="8" fill="rgba(100,220,160,0.6)">belly rises &amp; falls</text>

      {/* arrowhead markers */}
      <defs>
        <marker id="arr-red" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ff9999"/>
        </marker>
        <marker id="arr-grn" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#64dc9a"/>
        </marker>
      </defs>

      {/* divider */}
      <line x1="140" y1="10" x2="140" y2="130" stroke="rgba(229,169,60,0.12)" strokeWidth="1" strokeDasharray="3 3"/>
    </svg>
  );
}

export default function WelcomeScreen({ onContinue, initialStep }: Props) {
  const existingName = loadProfile().name;
  const defaultStep: Step = initialStep ?? (existingName ? 'gratitude' : 'name');
  const [step, setStep]         = useState<Step>(defaultStep);
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

  const handleFinish = () => {
    onContinue(buildGratStr());
  };

  return (
    <div className="welcome">
      <div className="welcome-inner">

        {/* Symbol — shown on name/gratitude steps */}
        {step !== 'teach' && (
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

        {step !== 'teach' && (
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
              onClick={() => { if (canContinueGrat) setStep('teach'); }}
              disabled={!canContinueGrat}
            >
              {canContinueGrat ? 'Continue' : `Choose ${remaining} more`}
            </button>
            {!existingName && (
              <button className="welcome-back" onClick={() => setStep('name')}>← Back</button>
            )}
          </div>
        )}

        {/* ── Step 3: Why & How to Breathe ── */}
        {step === 'teach' && (
          <div className="welcome-teach-block">

            <div className="teach-header">
              <div className="teach-symbol" aria-hidden="true">
                <svg viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
                  <circle cx="30" cy="30" r="16" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
                  <circle cx="30" cy="30" r="4"  fill="currentColor" opacity="0.85"/>
                  <path d="M30 4 L30 56" stroke="currentColor" strokeWidth="0.5" opacity="0.18" strokeDasharray="3 4"/>
                </svg>
              </div>
              <h2 className="teach-title">Why breathe consciously?</h2>
              <p className="teach-sub">Your breath is the only thing your body does automatically that <em>you can also control</em>. That makes it a superpower.</p>
            </div>

            {/* Why cards */}
            <div className="teach-why-grid">
              {WHY_CARDS.map(c => (
                <div key={c.icon} className="teach-why-card">
                  <span className="twc-icon">{c.icon}</span>
                  <strong className="twc-title">{c.title}</strong>
                  <span className="twc-body">{c.body}</span>
                </div>
              ))}
            </div>

            {/* Diagram */}
            <div className="teach-diagram-wrap">
              <p className="teach-section-label">HOW BELLY BREATHING WORKS</p>
              <DiaphragmDiagram />
              <div className="teach-diagram-legend">
                <span className="tdl-bad">✗ Chest only — uses ⅓ of your lungs</span>
                <span className="tdl-good">✓ Belly breath — full lung, calms nerves</span>
              </div>
            </div>

            {/* Steps */}
            <div className="teach-steps-wrap">
              <p className="teach-section-label">TRY IT NOW — 3 STEPS</p>
              <div className="teach-steps">
                <div className="teach-step">
                  <span className="ts-num">1</span>
                  <div className="ts-content">
                    <strong>Hands on</strong>
                    <span>Put one hand on your <em>chest</em>, one on your <em>belly</em>.</span>
                  </div>
                </div>
                <div className="teach-step">
                  <span className="ts-num">2</span>
                  <div className="ts-content">
                    <strong>Breathe in through your nose</strong>
                    <span>Only your belly hand should rise. Chest stays still. That's it!</span>
                  </div>
                </div>
                <div className="teach-step">
                  <span className="ts-num">3</span>
                  <div className="ts-content">
                    <strong>Breathe out slowly</strong>
                    <span>Out through your mouth. Feel your belly fall back down. Repeat.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Videos */}
            <div className="teach-videos-wrap">
              <p className="teach-section-label">WATCH &amp; LEARN</p>
              <div className="teach-videos">
                {VIDEOS.map(v => (
                  <a
                    key={v.id}
                    className="teach-video-card"
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="tvc-thumb"
                      src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                      loading="lazy"
                    />
                    <div className="tvc-info">
                      <span className="tvc-play">▶</span>
                      <strong className="tvc-title">{v.title}</strong>
                      <span className="tvc-who">{v.who}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <button className="welcome-btn teach-cta" onClick={handleFinish}>
              I'm ready — let's breathe →
            </button>
            <button className="welcome-back" onClick={() => setStep('gratitude')}>← Back</button>

          </div>
        )}

      </div>
    </div>
  );
}
