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
}: Props) {
  const offset = CIRC * (1 - Math.min(1, Math.max(0, fill)));
  const isIdle = !running && !showWimHofPrompt;

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
          <button className="btn-begin" onClick={onBegin}>Begin</button>
        )}

        {running && !showWimHofPrompt && (
          <>
            <div className="r-phase">{phaseName}</div>
            <div className="r-count">{countdown}</div>
            {info && <div className="r-info">{info}</div>}
            <button className="btn-stop" onClick={onStop}>■ Stop</button>
          </>
        )}

        {showWimHofPrompt && (
          <div className="wh-prompt">
            <div className="wh-prompt-text">{wimHofPromptText}</div>
            {wimHofLiveTimer && <div className="wh-live-timer">{wimHofLiveTimer}</div>}
            {onWimHofStop && (
              <button className="wh-stop-btn" onClick={onWimHofStop}>
                {wimHofPromptText?.includes('Breathe') ? '■ Stop' : 'Breathe now →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
