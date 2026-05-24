import { useLang } from '../i18n/LangContext';
import './BreathRing.css';

interface Props {
  fill: number;
  phaseClass: string;
  phaseName: string;
  countdown: string;
  info: string;
  running: boolean;
  onBegin: () => void;
  onStop: () => void;
  showWimHofPrompt?: boolean;
  wimHofPromptText?: string;
  wimHofLiveTimer?: string;
  onWimHofStop?: () => void;
  showJournal?: boolean;
  journalText?: string;
  onJournalChange?: (t: string) => void;
  onSaveInsight?: () => void;
  onSkipInsight?: () => void;
  idleIntention?: string;
  idleTechLabel?: string;
  idleGratitude?: string;
}

const CIRC = 2 * Math.PI * 95;

export default function BreathRing({
  fill,
  phaseClass,
  phaseName,
  countdown,
  info,
  running,
  onBegin,
  onStop,
  showWimHofPrompt,
  wimHofPromptText,
  wimHofLiveTimer,
  onWimHofStop,
  showJournal,
  journalText,
  onJournalChange,
  onSaveInsight,
  onSkipInsight,
  idleIntention,
  idleTechLabel,
  idleGratitude,
}: Props) {
  const { t } = useLang();
  const phases = t.phases as Record<string, string>;

  const offset = CIRC * (1 - Math.min(1, Math.max(0, fill)));
  const isIdle = !running && !showWimHofPrompt && !showJournal;

  const displayPhase = phases[phaseName] ?? phaseName;

  return (
    <div className={`ring-wrap ${phaseClass}${isIdle ? ' ring-idle' : ''}`}>
      <svg className="ring-svg" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="95" className="ring-track" />
        <circle
          cx="110" cy="110" r="95"
          className="ring-fill"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ transition: fill === 0 ? 'none' : 'stroke-dashoffset 0.5s linear' }}
        />
      </svg>

      <div className="ring-content">
        {isIdle && (
          <>
            {idleTechLabel && (
              <div className="ring-idle-tech">{idleTechLabel}</div>
            )}
            {idleGratitude && (
              <div className="ring-idle-grateful">{t.ring.gratefulFor}<br />
                <span className="ring-idle-grateful-text">{idleGratitude}</span>
              </div>
            )}
            {idleIntention && (
              <div className="ring-idle-intention">"{idleIntention}"</div>
            )}
            <button className="btn-begin" onClick={onBegin}>{t.ring.begin}</button>
          </>
        )}

        {running && !showWimHofPrompt && !showJournal && (
          <>
            <div className="r-phase">{displayPhase}</div>
            <div className="r-count">{countdown}</div>
            {info && <div className="r-info">{info}</div>}
            <button className="btn-stop" onClick={onStop}>{t.ring.stop}</button>
          </>
        )}

        {showWimHofPrompt && (
          <div className="wh-prompt">
            <div className="wh-prompt-text">{wimHofPromptText}</div>
            {wimHofLiveTimer && <div className="wh-live-timer">{wimHofLiveTimer}</div>}
            {onWimHofStop && (
              <button className="wh-stop-btn" onClick={onWimHofStop}>
                {t.session.wimhofBreatheNow}
              </button>
            )}
          </div>
        )}

        {showJournal && (
          <div className="journal-prompt">
            <div className="journal-label">{t.ring.journalLabel}</div>
            <textarea
              className="journal-textarea"
              placeholder={t.ring.journalPlaceholder}
              value={journalText}
              onChange={e => onJournalChange?.(e.target.value)}
              rows={3}
            />
            <button className="journal-save-btn" onClick={onSaveInsight}>
              {t.ring.saveInsight}
            </button>
            <button className="journal-skip-btn" onClick={onSkipInsight}>
              {t.ring.skipInsight}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
