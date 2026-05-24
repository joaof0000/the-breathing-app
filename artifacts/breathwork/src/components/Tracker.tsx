import { useMemo } from 'react';
import { loadSessions, calcStreak } from '../hooks/useSessionStorage';
import { TECH_LABELS } from '../data/techniques';
import { useLang } from '../i18n/LangContext';
import './Tracker.css';

interface Props {
  refreshKey: number;
  onManualLog: () => void;
  onReset: () => void;
}

export default function Tracker({ refreshKey, onManualLog, onReset }: Props) {
  const { t } = useLang();

  const data = useMemo(() => {
    const sessions = loadSessions();
    const streak = calcStreak(sessions);
    const total = sessions.length;
    const last = sessions.length ? sessions[sessions.length - 1] : null;
    const lastLabel = last ? `${TECH_LABELS[last.tech] || last.tech} · ${last.date} ${last.time}` : null;
    return { streak, total, lastLabel };
  }, [refreshKey]);

  return (
    <div className="tracker-section">
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
