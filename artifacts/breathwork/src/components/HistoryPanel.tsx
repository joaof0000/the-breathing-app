import { useMemo, useState } from 'react';
import { loadSessions, saveSessions } from '../hooks/useSessionStorage';
import { TECH_LABELS } from '../data/techniques';
import './HistoryPanel.css';

interface Props {
  refreshKey: number;
  onRefresh: () => void;
}

function fmtDur(secs: number) {
  if (!secs) return '—';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function HistoryPanel({ refreshKey, onRefresh }: Props) {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);

  const { sessions, techs } = useMemo(() => {
    const ss = loadSessions();
    const techs = [...new Set(ss.map(s => s.tech))];
    return { sessions: ss, techs };
  }, [refreshKey]);

  const filtered = useMemo(() => {
    if (filter === 'all') return sessions;
    return sessions.filter(s => s.tech === filter);
  }, [sessions, filter]);

  const hasInsights = useMemo(() => sessions.some(s => s.insight), [sessions]);

  const exportCSV = () => {
    const headers = ['Date', 'Time', 'Technique', 'Duration'];
    if (hasInsights) headers.push('Insight');
    const rows = [headers];
    sessions.forEach(s => {
      const row = [s.date, s.time, TECH_LABELS[s.tech] || s.tech, fmtDur(s.dur)];
      if (hasInsights) row.push(s.insight ? `"${s.insight.replace(/"/g, '""')}"` : '');
      rows.push(row);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'breathwork_sessions.csv';
    a.click();
  };

  const clearHistory = () => {
    if (!confirm('Clear all session history? This cannot be undone.')) return;
    saveSessions([]);
    onRefresh();
  };

  return (
    <div className="history-section">
      <button className="history-toggle" onClick={() => setOpen(o => !o)}>
        <span>Session History ({sessions.length})</span>
        <span className="history-caret">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="history-body">
          {techs.length > 1 && (
            <div className="history-filters">
              <button className={`hf-btn ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>All</button>
              {techs.map(t => (
                <button key={t} className={`hf-btn ${filter === t ? 'on' : ''}`} onClick={() => setFilter(t)}>
                  {TECH_LABELS[t] || t}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="history-empty">No sessions recorded yet</div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Technique</th>
                  <th>Duration</th>
                  <th>Time</th>
                  {hasInsights && <th>Insight</th>}
                </tr>
              </thead>
              <tbody>
                {[...filtered].reverse().slice(0, 50).map((s, i) => (
                  <tr key={i}>
                    <td>{s.date}</td>
                    <td>{TECH_LABELS[s.tech] || s.tech}</td>
                    <td>{fmtDur(s.dur)}</td>
                    <td>{s.time}</td>
                    {hasInsights && (
                      <td className="history-insight">{s.insight || '—'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="history-actions">
            {sessions.length > 0 && (
              <>
                <button className="history-export" onClick={exportCSV}>Export CSV ↓</button>
                <button className="history-export" onClick={clearHistory} style={{ color: 'var(--fire)' }}>Clear history</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
