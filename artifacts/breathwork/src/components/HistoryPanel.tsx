import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { loadSessions, saveSessions } from '../hooks/useSessionStorage';
import { TECH_LABELS } from '../data/techniques';
import { useLang } from '../i18n/LangContext';
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
  const { t } = useLang();
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

  const hasInsights = useMemo(() => sessions.some(s => s.note || s.insight || s.mood), [sessions]);
  const MOOD_EMOJIS = ['😔', '😐', '🙂', '😊', '🌟'];

  const moodChartData = useMemo(() => {
    return sessions
      .filter(s => s.mood && s.mood > 0)
      .slice(-30)
      .map(s => ({ date: s.date.slice(5), mood: s.mood as number }));
  }, [sessions]);

  const excerptNote = (s: { note?: string; insight?: string }) => {
    const text = s.note ?? s.insight ?? '';
    return text.length > 80 ? text.slice(0, 77) + '…' : text;
  };

  const exportCSV = () => {
    const headers = [t.history.date, t.history.time, t.history.technique, t.history.duration];
    if (hasInsights) { headers.push('Mood'); headers.push('Note'); }
    const rows = [headers];
    sessions.forEach(s => {
      const row = [s.date, s.time, TECH_LABELS[s.tech] || s.tech, fmtDur(s.dur)];
      if (hasInsights) {
        const noteText = s.note ?? s.insight ?? '';
        row.push(s.mood ? String(s.mood) : '');
        row.push(noteText ? `"${noteText.replace(/"/g, '""')}"` : '');
      }
      rows.push(row);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'breathwork_sessions.csv';
    a.click();
  };

  const clearHistory = () => {
    if (!confirm(t.session.clearConfirm)) return;
    saveSessions([]);
    onRefresh();
  };

  return (
    <div className="history-section">
      <button className="history-toggle" onClick={() => setOpen(o => !o)}>
        <span>{t.history.title(sessions.length)}</span>
        <span className="history-caret">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="history-body">
          {techs.length > 1 && (
            <div className="history-filters">
              <button className={`hf-btn ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>{t.history.all}</button>
              {techs.map(tc => (
                <button key={tc} className={`hf-btn ${filter === tc ? 'on' : ''}`} onClick={() => setFilter(tc)}>
                  {TECH_LABELS[tc] || tc}
                </button>
              ))}
            </div>
          )}

          {moodChartData.length >= 2 && (
            <div className="mood-chart-wrap">
              <div className="mood-chart-label">Mood trend</div>
              <ResponsiveContainer width="100%" height={90}>
                <LineChart data={moodChartData} margin={{ top: 4, right: 8, bottom: 0, left: -28 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#C4A882' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                  <YAxis domain={[1, 5]} ticks={[1, 3, 5]} tick={{ fontSize: 9, fill: '#C4A882' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(44,31,20,0.95)', border: '1px solid rgba(229,169,60,0.2)', borderRadius: 8, fontSize: 11 }}
                    labelStyle={{ color: '#C4A882' }}
                    formatter={(v: number) => [MOOD_EMOJIS[v - 1] ?? v, 'Mood']}
                  />
                  <Line type="monotone" dataKey="mood" stroke="#E5A93C" strokeWidth={2} dot={{ r: 3, fill: '#E5A93C', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="history-empty">{t.history.empty}</div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>{t.history.date}</th>
                  <th>{t.history.technique}</th>
                  <th>{t.history.duration}</th>
                  <th>{t.history.time}</th>
                  {hasInsights && <th>Mood &amp; Note</th>}
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
                      <td className="history-insight">
                        {s.mood ? <span className="history-mood-emoji">{MOOD_EMOJIS[s.mood - 1]}</span> : null}
                        {excerptNote(s) ? <span>{excerptNote(s)}</span> : null}
                        {!s.mood && !excerptNote(s) ? '—' : null}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="history-actions">
            {sessions.length > 0 && (
              <>
                <button className="history-export" onClick={exportCSV}>{t.history.exportCSV}</button>
                <button className="history-export" onClick={clearHistory} style={{ color: 'var(--fire)' }}>{t.history.clearHistory}</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
