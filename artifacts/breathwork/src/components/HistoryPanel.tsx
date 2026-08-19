import { useMemo, useState } from 'react';
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

  const moodTrend = useMemo(() => {
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - 29);

    const daily = new Map<string, number[]>();
    sessions.forEach(session => {
      if (!session.mood) return;
      const date = new Date(`${session.date}T12:00:00`);
      if (date < cutoff) return;
      const values = daily.get(session.date) ?? [];
      values.push(session.mood);
      daily.set(session.date, values);
    });

    const points = [...daily.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({
        date,
        mood: values.reduce((sum, value) => sum + value, 0) / values.length,
      }));

    if (points.length < 3) return null;

    const first = points[0].mood;
    const last = points[points.length - 1].mood;
    const delta = last - first;
    const direction = delta >= 0.5 ? 'up' : delta <= -0.5 ? 'down' : 'steady';

    return { points, direction };
  }, [sessions]);

  const trendChart = useMemo(() => {
    if (!moodTrend) return null;
    const width = 320;
    const height = 112;
    const paddingX = 16;
    const paddingY = 12;
    const plotWidth = width - paddingX * 2;
    const plotHeight = height - paddingY * 2;
    const xStep = moodTrend.points.length === 1
      ? 0
      : plotWidth / (moodTrend.points.length - 1);
    const coords = moodTrend.points.map((point, index) => ({
      x: paddingX + xStep * index,
      y: paddingY + plotHeight - ((point.mood - 1) / 4) * plotHeight,
    }));
    const line = coords.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
    const area = `${line} L ${coords.at(-1)?.x.toFixed(1)} ${height - paddingY} L ${coords[0].x.toFixed(1)} ${height - paddingY} Z`;

    return { width, height, line, area, coords };
  }, [moodTrend]);
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

          {moodTrend && trendChart && (
            <section className="mood-trend" aria-label={t.history.moodTrendTitle}>
              <div className="mood-trend-header">
                <div>
                  <h3>{t.history.moodTrendTitle}</h3>
                  <p>{t.history.moodTrendHint}</p>
                </div>
                <span className={`mood-trend-badge ${moodTrend.direction}`}>
                  {moodTrend.direction === 'up'
                    ? '↗'
                    : moodTrend.direction === 'down'
                      ? '↘'
                      : '→'}
                </span>
              </div>
              <svg
                className="mood-trend-chart"
                viewBox={`0 0 ${trendChart.width} ${trendChart.height}`}
                role="img"
                aria-label={t.history.moodTrendTitle}
              >
                <defs>
                  <linearGradient id="mood-trend-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[1, 3, 5].map(value => {
                  const y = 12 + (112 - 24) - ((value - 1) / 4) * (112 - 24);
                  return (
                    <line
                      key={value}
                      x1="16"
                      x2="304"
                      y1={y}
                      y2={y}
                      className="mood-trend-grid"
                    />
                  );
                })}
                <path d={trendChart.area} className="mood-trend-area" />
                <path d={trendChart.line} className="mood-trend-line" />
                {trendChart.coords.map((point, index) => (
                  <circle
                    key={moodTrend.points[index].date}
                    cx={point.x}
                    cy={point.y}
                    r="3.5"
                    className="mood-trend-point"
                  />
                ))}
              </svg>
              <p className={`mood-trend-summary ${moodTrend.direction}`}>
                {moodTrend.direction === 'up'
                  ? t.history.moodTrendImproving
                  : moodTrend.direction === 'down'
                    ? t.history.moodTrendDeclining
                    : t.history.moodTrendSteady}
              </p>
            </section>
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
