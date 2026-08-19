import { useMemo, useState, useEffect } from 'react';
import { loadSessions, calcStreak } from '../hooks/useSessionStorage';
import { TECH_LABELS } from '../data/techniques';
import { useLang } from '../i18n/LangContext';
import './Tracker.css';

const MILESTONES = [7, 30, 100, 365];
const MILESTONE_KEY = 'breathwork_milestone_seen';

function getSeenMilestones(): number[] {
  try { return JSON.parse(localStorage.getItem(MILESTONE_KEY) || '[]'); } catch { return []; }
}
function markMilestoneSeen(n: number) {
  const seen = getSeenMilestones();
  if (!seen.includes(n)) {
    try { localStorage.setItem(MILESTONE_KEY, JSON.stringify([...seen, n])); } catch {}
  }
}

const MILESTONE_MESSAGES: Record<number, string> = {
  7:   '🔥 7-day streak! A new habit is forming.',
  30:  '🌟 30 days! Your nervous system thanks you.',
  100: '✨ 100 days. You\'ve transformed your baseline.',
  365: '🏆 One full year of breathwork. Extraordinary.',
};

interface Props {
  refreshKey: number;
  onManualLog: () => void;
  onReset: () => void;
}

export default function Tracker({ refreshKey, onManualLog, onReset }: Props) {
  const { t } = useLang();
  const [milestone, setMilestone] = useState<number | null>(null);

  const data = useMemo(() => {
    const sessions = loadSessions();
    const streak = calcStreak(sessions);
    const total = sessions.length;
    const last = sessions.length ? sessions[sessions.length - 1] : null;
    const lastLabel = last ? `${TECH_LABELS[last.tech] || last.tech} · ${last.date} ${last.time}` : null;
    return { streak, total, lastLabel };
  }, [refreshKey]);

  useEffect(() => {
    const seen = getSeenMilestones();
    const hit = MILESTONES.find(m => data.streak >= m && !seen.includes(m));
    if (!hit) return;
    setMilestone(hit);
    markMilestoneSeen(hit);
    const timer = setTimeout(() => setMilestone(null), 5000);
    return () => clearTimeout(timer);
  }, [data.streak]);

  return (
    <div className="tracker-section">
      {milestone && (
        <div className="milestone-banner" onClick={() => setMilestone(null)}>
          {MILESTONE_MESSAGES[milestone]}
        </div>
      )}
      <div className="tracker-title">
        <span>{t.tracker.title}</span>
        <button className="tracker-reset" onClick={onReset} title={t.tracker.reset}>{t.tracker.reset}</button>
      </div>
      <div className="tracker-stats">
        <div className="stat-box">
          <div className="stat-val">{data.streak}</div>
          <div className="stat-lbl">{t.tracker.streak}</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{data.total}</div>
          <div className="stat-lbl">{t.tracker.total}</div>
        </div>
      </div>
      {data.lastLabel && (
        <div className="tracker-last">{t.tracker.last} {data.lastLabel}</div>
      )}
      <button className="tracker-log-btn" onClick={onManualLog}>{t.tracker.logSession}</button>
    </div>
  );
}
