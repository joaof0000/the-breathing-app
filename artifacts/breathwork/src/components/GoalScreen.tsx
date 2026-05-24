import { useState } from 'react';
import { GOAL_BUTTONS, GOALS } from '../data/goals';
import { useLang } from '../i18n/LangContext';
import heroImg from '../assets/hero.png';
import { matchIntentionToGoal, timeOfDayGreeting } from '../hooks/useProfile';
import './GoalScreen.css';

interface Props {
  onSelectTech: (tech: string | null, goalKey?: string) => void;
  name?: string;
  intention?: string;
  onBack?: () => void;
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

export default function GoalScreen({ onSelectTech, name, intention, onBack }: Props) {
  const { t } = useLang();
  const [activePicker, setActivePicker] = useState<string | null>(null);

  const goal    = activePicker ? GOALS[activePicker] : null;
  const goalBtn = activePicker ? GOAL_BUTTONS.find(b => b.key === activePicker) : null;

  const goalLabels = t.goals as Record<string, { label: string; sub: string }>;

  const highlightKey = intention ? matchIntentionToGoal(intention) : null;
  const greeting = name ? `${timeOfDayGreeting()}, ${name}` : null;

  return (
    <div className="page1">
      <div className="p1-wrap">

        <div className="p1-hero">
          <img src={heroImg} alt="Meditation sanctuary" />
        </div>

        <div className="p1-title">Breathwork</div>

        {greeting ? (
          <p className="p1-greeting">{greeting}</p>
        ) : null}

        <p className="p1-sub">{t.goal.subtitle}</p>

        <div className="goal-grid">
          {GOAL_BUTTONS.map(btn => {
            const gl = goalLabels[btn.key] ?? { label: btn.label, sub: btn.sub };
            return (
              <button
                key={btn.key}
                className={`goal-btn${highlightKey === btn.key ? ' goal-btn--highlight' : ''}`}
                onClick={() => setActivePicker(btn.key)}
                aria-pressed={highlightKey === btn.key}
              >
                <span className="goal-icon">{btn.icon}</span>
                <span className="goal-label">{gl.label}</span>
                <span className="goal-sub">{gl.sub}</span>
                {highlightKey === btn.key && (
                  <span className="goal-intention-badge" aria-label="Matches your intention">✦</span>
                )}
              </button>
            );
          })}
        </div>

        <button className="p1-browse" onClick={() => onSelectTech(null)}>
          {t.goal.browse}
        </button>

        {onBack && (
          <button className="p1-back" onClick={onBack}>← Revisit intro</button>
        )}

      </div>

      {activePicker && goal && (
        <div
          className="picker-overlay open"
          onClick={e => { if (e.target === e.currentTarget) setActivePicker(null); }}
        >
          <div className="picker-header-visual" onClick={() => setActivePicker(null)}>
            <div className="phv-icon">{goalBtn?.icon}</div>
            <div className="phv-label">
              {(goalLabels[activePicker]?.label ?? goal.label).replace(/^[^\w]*/, '').replace(/\s*—.*$/, '')}
            </div>
            <div className="phv-sub">{goalLabels[activePicker]?.sub ?? goalBtn?.sub}</div>
            <div className="phv-hint">{t.goal.tapOutside}</div>
          </div>

          <div className="picker-sheet">
            <div className="picker-prompt">{t.goal.chooseYourTech}</div>
            <div className="picker-choices">
              {goal.choices.map(c => {
                const icon  = TECH_ICONS[c.tech]  || '·';
                const color = TECH_COLORS[c.tech] || 'rgba(229,169,60,0.12)';
                const infoEntry = (t.info as Record<string, { title: string }>)[c.tech];
                const techName = infoEntry?.title ?? c.name;
                return (
                  <button
                    key={c.tech}
                    className="picker-choice"
                    onClick={() => { setActivePicker(null); onSelectTech(c.tech, activePicker ?? undefined); }}
                  >
                    <span className="pc-icon" style={{ background: color }}>{icon}</span>
                    <div>
                      <div className="pc-name">{techName}</div>
                      <div className="pc-desc">{c.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {goal.music && (
              <div className="picker-music">
                <div className="pm-label">
                  <span className="pm-note">♩</span>
                  {t.goal.suggestedListening}
                </div>
                <div className="pm-composer">{goal.music.composer}</div>
                <div className="pm-title">{goal.music.title}</div>
                <div className="pm-detail">{goal.music.detail}</div>
                <p className="pm-why">{goal.music.why}</p>
              </div>
            )}

            <button className="picker-cancel" onClick={() => setActivePicker(null)}>{t.goal.back}</button>
          </div>
        </div>
      )}
    </div>
  );
}
