import { useState, useRef, useEffect } from 'react';
import { GOAL_BUTTONS, GOALS } from '../data/goals';
import { useLang } from '../i18n/LangContext';
import heroImg from '../assets/hero.png';
import { matchIntentionToGoal, timeOfDayGreeting, saveProfile, deleteProfile } from '../hooks/useProfile';
import { TECH_LABELS } from '../data/techniques';
import './GoalScreen.css';

interface Props {
  onSelectTech: (tech: string | null, goalKey?: string) => void;
  name?: string;
  intention?: string;
  onBack?: () => void;
  lastTech?: string | null;
  onProfileUpdate?: () => void;
  onLearnMore?: () => void;
  onReset?: () => void;
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

export default function GoalScreen({ onSelectTech, name, intention, onBack, lastTech, onProfileUpdate, onLearnMore, onReset }: Props) {
  const { t } = useLang();
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editIntention, setEditIntention] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const goal    = activePicker ? GOALS[activePicker] : null;
  const goalBtn = activePicker ? GOAL_BUTTONS.find(b => b.key === activePicker) : null;

  const goalLabels = t.goals as Record<string, { label: string; sub: string }>;

  const highlightKey = intention ? matchIntentionToGoal(intention) : null;
  const greeting = name ? `${timeOfDayGreeting()}, ${name}` : null;
  const lastTechName = lastTech ? (TECH_LABELS[lastTech] ?? lastTech) : null;

  const openEdit = () => {
    setEditName(name ?? '');
    setEditIntention(intention ?? '');
    setEditOpen(true);
  };

  useEffect(() => {
    if (!editOpen) return;
    const t = setTimeout(() => nameInputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [editOpen]);

  const handleEditSave = () => {
    saveProfile({ name: editName.trim(), intention: editIntention.trim() });
    setEditOpen(false);
    onProfileUpdate?.();
  };

  const handleReset = () => {
    deleteProfile();
    setEditOpen(false);
    setConfirmReset(false);
    onReset?.();
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setConfirmReset(false);
  };

  return (
    <div className="page1">
      <div className="p1-wrap">

        <div className="p1-hero">
          <img src={heroImg} alt="Meditation sanctuary" />
        </div>

        <div className="p1-title">Breathwork</div>

        {greeting ? (
          <p className="p1-greeting">
            {greeting}
            <button
              className="p1-edit-btn"
              onClick={openEdit}
              aria-label="Edit profile"
              title="Edit name &amp; intention"
            >✎</button>
          </p>
        ) : (
          <button
            className="p1-edit-btn p1-edit-btn--standalone"
            onClick={openEdit}
            aria-label="Edit profile"
            title="Edit name &amp; intention"
          >✎</button>
        )}

        <p className="p1-sub">{t.goal.subtitle}</p>

        {lastTech && lastTechName && (
          <button
            className="p1-resume"
            onClick={() => onSelectTech(lastTech)}
          >
            <span className="p1-resume-icon">{TECH_ICONS[lastTech] || '·'}</span>
            <span className="p1-resume-text">
              <span className="p1-resume-label">Resume</span>
              <span className="p1-resume-name">{lastTechName}</span>
            </span>
          </button>
        )}

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

        <div className="p1-footer-links">
          {onBack && (
            <button className="p1-back" onClick={onBack}>← Revisit intro</button>
          )}
          {onLearnMore && (
            <button className="p1-learn" onClick={onLearnMore}>How to breathe →</button>
          )}
        </div>

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

      {editOpen && (
        <div
          className="edit-overlay open"
          onClick={e => { if (e.target === e.currentTarget) handleEditClose(); }}
        >
          <div className="edit-sheet">
            <div className="edit-title">Edit profile</div>

            {!confirmReset ? (
              <>
                <label className="edit-label" htmlFor="edit-name">Your name</label>
                <input
                  id="edit-name"
                  ref={nameInputRef}
                  className="edit-input"
                  type="text"
                  placeholder="Name (optional)"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleEditSave(); if (e.key === 'Escape') handleEditClose(); }}
                  maxLength={40}
                  autoComplete="given-name"
                />

                <label className="edit-label" htmlFor="edit-intention">Your intention</label>
                <input
                  id="edit-intention"
                  className="edit-input"
                  type="text"
                  placeholder="e.g. I want to feel calmer (optional)"
                  value={editIntention}
                  onChange={e => setEditIntention(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleEditSave(); if (e.key === 'Escape') handleEditClose(); }}
                  maxLength={120}
                />

                <div className="edit-actions">
                  <button className="edit-save" onClick={handleEditSave}>Save</button>
                  <button className="edit-cancel" onClick={handleEditClose}>Cancel</button>
                </div>

                <button className="edit-reset-link" onClick={() => setConfirmReset(true)}>
                  Reset &amp; start over
                </button>
              </>
            ) : (
              <div className="edit-confirm-reset">
                <p className="edit-confirm-msg">
                  This will delete your profile and session history. You'll go back through the intro. This cannot be undone.
                </p>
                <div className="edit-actions">
                  <button className="edit-reset-confirm-btn" onClick={handleReset}>Yes, reset everything</button>
                  <button className="edit-cancel" onClick={() => setConfirmReset(false)}>Keep my data</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
