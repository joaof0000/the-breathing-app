import { useMemo } from 'react';
import { loadSessions, calcStreak } from '../hooks/useSessionStorage';
import { TECH_LABELS } from '../data/techniques';
import './Tracker.css';

interface Props {
  refreshKey: number;
  onManualLog: () => void;
  onReset: () => void;
}

export default function Tracker({ refreshKey, onManualLog, onReset }: Props) {
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
        <span>Session Tracker</span>
        <button className="tracker-reset" onClick={onReset} title="Reset all data">↺ Reset</button>
      </div>
      <div className="tracker-stats">
        <div className="stat-box">
          <div className="stat-val">{data.streak}</div>
          <div className="stat-lbl">Day streak</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{data.total}</div>
          <div className="stat-lbl">Total sessions</div>
        </div>
      </div>
      {data.lastLabel && (
        <div className="tracker-last">Last: {data.lastLabel}</div>
      )}
      <button className="tracker-log-btn" onClick={onManualLog}>+ Log a session</button>
    </div>
  );
}
