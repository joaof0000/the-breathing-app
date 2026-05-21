import { useState } from 'react';
import { GOAL_BUTTONS, GOALS } from '../data/goals';
import GratitudePicker from './GratitudePicker';
import heroImg from '../assets/hero.png';
import './GoalScreen.css';

interface Props {
  onSelectTech: (tech: string | null) => void;
  gratitude: string;
  onGratitudeChange: (g: string) => void;
}

const TECH_ICONS: Record<string, string> = {
  wimhof:           '❄',
  bhastrika:        '💨',
  kapalabhati:      '⚡',
  box:              '◻',
  physiosigh:       '💧',
  '478':            '🌊',
  bhramari:         '🐝',
  coherent:         '〰',
  surya:            '☀',
  chandra:          '🌙',
  tummo:            '🔥',
  hamsah:           '☯',
  ninepurification: '🪷',
  blink:            '👁',
  transmutation:    '↑',
  rebirthing:       '∞',
  transformational: '🌀',
  nadi:             '◑',
  custom:           '✦',
  '55':             '〜',
  '777':            '🌿',
};

const TECH_COLORS: Record<string, string> = {
  wimhof:           'rgba(100,180,255,0.18)',
  bhastrika:        'rgba(255,140,60,0.18)',
  kapalabhati:      'rgba(255,200,40,0.18)',
  box:              'rgba(140,180,140,0.16)',
  physiosigh:       'rgba(80,160,220,0.18)',
  '478':            'rgba(60,120,200,0.18)',
  bhramari:         'rgba(180,140,80,0.18)',
  coherent:         'rgba(120,180,160,0.18)',
  surya:            'rgba(255,180,40,0.18)',
  chandra:          'rgba(180,160,220,0.18)',
  tummo:            'rgba(255,80,40,0.18)',
  hamsah:           'rgba(200,160,80,0.18)',
  ninepurification: 'rgba(180,100,200,0.16)',
  blink:            'rgba(80,200,180,0.16)',
  transmutation:    'rgba(200,120,160,0.18)',
  rebirthing:       'rgba(60,180,180,0.16)',
  transformational: 'rgba(140,80,220,0.16)',
  nadi:             'rgba(100,160,180,0.16)',
  custom:           'rgba(200,180,100,0.16)',
};

export default function GoalScreen({ onSelectTech, gratitude, onGratitudeChange }: Props) {
  const [activePicker, setActivePicker] = useState<string | null>(null);

  const goal    = activePicker ? GOALS[activePicker] : null;
  const goalBtn = activePicker ? GOAL_BUTTONS.find(b => b.key === activePicker) : null;

  return (
    <div className="page1">
      <div className="p1-wrap">

        {/* Hero image */}
        <div className="p1-hero">
          <img src={heroImg} alt="Meditation sanctuary" />
        </div>

        <div className="p1-title">Breathwork</div>
        <p className="p1-sub">What do you need today?</p>

        <div className="goal-grid">
          {GOAL_BUTTONS.map(btn => (
            <button key={btn.key} className="goal-btn" onClick={() => setActivePicker(btn.key)}>
              <span className="goal-icon">{btn.icon}</span>
              <span className="goal-label">{btn.label}</span>
              <span className="goal-sub">{btn.sub}</span>
            </button>
          ))}
        </div>

        {/* Gratitude picker — fills the space below the grid */}
        <div className="p1-gratitude">
          <GratitudePicker selected={gratitude} onSelect={onGratitudeChange} />
        </div>

        <button className="p1-browse" onClick={() => onSelectTech(null)}>
          Browse all techniques →
        </button>
      </div>

      {activePicker && goal && (
        <div
          className="picker-overlay open"
          onClick={e => { if (e.target === e.currentTarget) setActivePicker(null); }}
        >
          {/* Visual header — fills the blank space above the sheet */}
          <div className="picker-header-visual" onClick={() => setActivePicker(null)}>
            <div className="phv-icon">{goalBtn?.icon}</div>
            <div className="phv-label">
              {goal.label.replace(/^[^\w]*/, '').replace(/\s*—.*$/, '')}
            </div>
            <div className="phv-sub">{goalBtn?.sub}</div>
            <div className="phv-hint">tap outside to close</div>
          </div>

          <div className="picker-sheet">
            <div className="picker-prompt">Choose your technique</div>
            <div className="picker-choices">
              {goal.choices.map(c => {
                const icon  = TECH_ICONS[c.tech]  || '·';
                const color = TECH_COLORS[c.tech] || 'rgba(229,169,60,0.12)';
                return (
                  <button
                    key={c.tech}
                    className="picker-choice"
                    onClick={() => { setActivePicker(null); onSelectTech(c.tech); }}
                  >
                    <span className="pc-icon" style={{ background: color }}>{icon}</span>
                    <div>
                      <div className="pc-name">{c.name}</div>
                      <div className="pc-desc">{c.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button className="picker-cancel" onClick={() => setActivePicker(null)}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
