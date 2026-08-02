import type { ReactNode } from 'react';
import { useLang } from '../i18n/LangContext';
import { YT_LINKS, NOSTRIL_TECHS, getPhases } from '../data/techniques';
import type { InfoEntry } from '../i18n/lang';
import './InfoDrawer.css';
import './NostrilIndicator.css';

interface Props {
  tech: string;
  open: boolean;
  onClose: () => void;
}

const YT_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff4444">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
  </svg>
);

function renderStep(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function shortLabel(name: string): string {
  return name
    .replace(/^Set \d+ — \w+:\s*/i, '')  // "Set 1 — Anger: Inhale Left" → "Inhale Left"
    .replace(/^Set \d+ — /i, '')           // "Set 3 — Both Nostrils" → "Both Nostrils"
    .replace('Both Nostrils', 'Both')
    .replace('Exhale Both', 'Ex Both')
    .replace(' — Left', ' L')
    .replace(' — Right', ' R')
    .replace(' Left', ' L')
    .replace(' Right', ' R')
    .replace('Inhale', 'In')
    .replace('Exhale', 'Ex');
}

function NostrilSequenceDiagram({ tech }: { tech: string }) {
  if (!NOSTRIL_TECHS.includes(tech)) return null;
  const phases = getPhases(tech).filter(p => p.nos);
  if (phases.length === 0) return null;

  return (
    <div className="nostril-seq">
      {phases.map((phase, i) => {
        const { l, r } = phase.nos!;
        const both = l === 'active' && r === 'active';
        return (
          <div key={i} className="nostril-seq-step">
            <div className="nostril-seq-label">{shortLabel(phase.name)}</div>
            <div className="nostril-seq-pair">
              <div className={`nos left nos-${l}${both ? ' both' : ''}`}>
                <span className="nos-label">L</span>
              </div>
              <div className={`nos right nos-${r}${both ? ' both' : ''}`}>
                <span className="nos-label">R</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InfoContent({ entry, tech, ytHref }: { entry: InfoEntry; tech: string; ytHref?: string }) {
  const { t } = useLang();

  return (
    <>
      <h2>{entry.title}</h2>

      {entry.intro.map((para, i) => (
        <p key={i} style={i > 0 ? { marginTop: '0.4rem' } : undefined}>
          {renderStep(para)}
        </p>
      ))}

      <NostrilSequenceDiagram tech={tech} />

      {entry.sections?.map((sec, si) => (
        <div key={si}>
          {sec.title && <h3>{sec.title}</h3>}
          <ul>
            {sec.steps.map((step, i) => (
              <li key={i}>{renderStep(step)}</li>
            ))}
          </ul>
        </div>
      ))}

      {entry.tip && (
        <div className="tip"><p>{renderStep(entry.tip)}</p></div>
      )}

      {entry.warn && (
        <div className="warn"><p>{renderStep(entry.warn)}</p></div>
      )}

      {entry.feel !== '—' && (
        <div className="time-block">
          <div className="time-row">
            <span className="time-label">{t.infoDrawer.feelIt}</span>
            <span className="time-val">{entry.feel}</span>
            <span className="time-label">{t.infoDrawer.seeResults}</span>
            <span className="time-val">{entry.see}</span>
          </div>
          <p className="time-note">{entry.note}</p>
        </div>
      )}

      {ytHref && entry.ytLabel && (
        <a className="yt-link" href={ytHref} target="_blank" rel="noopener">
          {YT_SVG} {entry.ytLabel}
        </a>
      )}

      {!ytHref && tech === 'wimhof' && (
        <a className="yt-link" href="https://www.youtube.com/watch?v=tybOi4hjZFQ" target="_blank" rel="noopener">
          {YT_SVG} {entry.ytLabel}
        </a>
      )}
    </>
  );
}

export default function InfoDrawer({ tech, open, onClose }: Props) {
  const { t } = useLang();
  const infoMap = t.info as Record<string, InfoEntry>;
  const entry = infoMap[tech];
  const ytHref = (YT_LINKS as Record<string, string>)[tech];

  if (!open) return null;

  return (
    <div className="info-drawer open">
      <div className="info-body">
        {entry ? (
          <InfoContent entry={entry} tech={tech} ytHref={ytHref} />
        ) : (
          <p>{t.infoDrawer.noInfo}</p>
        )}
      </div>
    </div>
  );
}
