import { useMemo, useRef, useState } from 'react';
import { loadSessions } from '../hooks/useSessionStorage';
import './Heatmap.css';

interface Props {
  refreshKey: number;
}

function dateKey(d: Date) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function intensityClass(mins: number | undefined) {
  if (mins === undefined) return 'hm-empty';
  if (mins === 0) return 'hm-0';
  if (mins < 5) return 'hm-1';
  if (mins < 10) return 'hm-2';
  if (mins < 15) return 'hm-3';
  if (mins < 30) return 'hm-4';
  return 'hm-5';
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Heatmap({ refreshKey }: Props) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const { weeks, year } = useMemo(() => {
    const sessions = loadSessions();
    const today = new Date();
    const yr = today.getFullYear();

    const dayMap: Record<string, number> = {};
    sessions.forEach(s => {
      if (!dayMap[s.date]) dayMap[s.date] = 0;
      dayMap[s.date] += Math.round((s.dur || 300) / 60);
    });

    // Build 90 days back from today
    const end = new Date(today);
    const start = new Date(today);
    start.setDate(start.getDate() - 89);

    // Align to Sunday
    const startDow = start.getDay();
    const alignedStart = new Date(start);
    alignedStart.setDate(alignedStart.getDate() - startDow);

    const weeks: Array<{ monthLabel: string | null; days: Array<{ key: string | null; mins: number | undefined; label: string }> }> = [];

    const cur = new Date(alignedStart);
    while (cur <= end) {
      const week: typeof weeks[0] = { monthLabel: null, days: [] };
      for (let d = 0; d < 7; d++) {
        const key = dateKey(cur);
        const inRange = cur >= start && cur <= end;
        const isFirstOfMonth = cur.getDate() === 1;
        if (d === 0 && isFirstOfMonth) {
          week.monthLabel = MONTHS[cur.getMonth()];
        }
        week.days.push({
          key: inRange ? key : null,
          mins: inRange ? (dayMap[key] ?? 0) : undefined,
          label: inRange ? `${cur.toDateString()} — ${dayMap[key] ? dayMap[key] + ' min' : 'rest day'}` : '',
        });
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }

    return { weeks, year: yr };
  }, [refreshKey]);

  const handleMouseEnter = (e: React.MouseEvent, label: string) => {
    if (!label) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({ text: label, x: rect.left + rect.width / 2, y: rect.top - 8 });
  };

  return (
    <div className="heatmap-section">
      <div className="heatmap-title">
        <span>Activity — 90 days</span>
        <span className="heatmap-year">{year}</span>
      </div>
      <div className="heatmap-scroll">
        <div className="heatmap-grid">
          {weeks.map((week, wi) => (
            <div key={wi} className="heatmap-month-col">
              <div className="heatmap-month-label">{week.monthLabel || ''}</div>
              <div className="heatmap-week">
                {week.days.map((day, di) => (
                  <div
                    key={di}
                    className={`hm-day ${intensityClass(day.mins)}`}
                    onMouseEnter={day.key ? e => handleMouseEnter(e, day.label) : undefined}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <span className="hm-leg" style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }} />
        <span className="hm-leg" style={{ background: '#1a3d1a' }} />
        <span className="hm-leg" style={{ background: '#1f5c1f' }} />
        <span className="hm-leg" style={{ background: '#278527' }} />
        <span className="hm-leg" style={{ background: '#2eb02e' }} />
        <span className="hm-leg" style={{ background: '#3ddd3d' }} />
        <span>More</span>
      </div>
      {tooltip && (
        <div
          ref={tooltipRef}
          className="hm-tooltip"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)', display: 'block', position: 'fixed' }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
