import { useState, useRef, useCallback, useEffect } from 'react';
import BreathRing from './BreathRing';
import NostrilIndicator from './NostrilIndicator';
import InfoDrawer from './InfoDrawer';
import Tracker from './Tracker';
import Heatmap from './Heatmap';
import HistoryPanel from './HistoryPanel';
import ReferenceTable from './ReferenceTable';
import { TABS, NOSTRIL_TECHS, PUMP_TECHS, YT_LINKS, YT_LABELS, REC_DURATION, TECH_LABELS, getPhases } from '../data/techniques';
import { useAudio } from '../hooks/useAudio';
import { useSessionMusic } from '../hooks/useSessionMusic';
import { useBackgroundAudio, NATURE_SOUNDS, FREQUENCY_SOUNDS } from '../hooks/useBackgroundAudio';
import { useVoiceCues } from '../hooks/useVoiceCues';
import { useSessionStorage, addJournal } from '../hooks/useSessionStorage';
import { useLang } from '../i18n/LangContext';
import type { Translations } from '../i18n/lang';
import './SessionScreen.css';

interface Props {
  initialTech: string | null;
  onBack: () => void;
  gratitude: string;
  goalKey?: string;
}

const INTENTION_ANCHORS = [
  'To anchor my awareness completely into the present moment.',
  'To release what no longer serves me with each exhale.',
  'To meet myself with compassion and without judgment.',
  'To return to the stillness that is always present beneath thought.',
  'To breathe life into the version of myself I am becoming.',
  'To let my nervous system know it is safe.',
  'To transmute restless energy into focused clarity.',
  'To practice showing up — one breath at a time.',
  'To feel, rather than think, my way through this moment.',
  "To honor my body's intelligence and wisdom.",
  'To open space for healing without forcing anything.',
  'To be present with whatever arises — fully and without resistance.',
];

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sc = Math.floor(s % 60);
  return m > 0 ? m + ':' + String(sc).padStart(2, '0') : String(sc);
}

export default function SessionScreen({ initialTech, onBack, gratitude, goalKey }: Props) {
  const { t } = useLang();
  const tRef = useRef<Translations>(t);
  useEffect(() => { tRef.current = t; }, [t]);

  const [tech, setTech] = useState(initialTech || '478');
  const [volume, setVolume] = useState(60);
  const [durMin, setDurMin] = useState(5);
  const [whRounds, setWhRounds] = useState(3);
  const [customIn, setCustomIn] = useState(4);
  const [customH1, setCustomH1] = useState(4);
  const [customOut, setCustomOut] = useState(4);
  const [customH2, setCustomH2] = useState(4);
  const [infoOpen, setInfoOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [intention, setIntention] = useState('');
  const [inspireIdx, setInspireIdx] = useState(0);
  const [intentionFlash, setIntentionFlash] = useState(false);

  const [journalMode, setJournalMode] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [journalMood, setJournalMood] = useState(0);
  const lastSessionTsRef = useRef<number>(0);

  const [fill, setFill] = useState(0);
  const [phaseClass, setPhaseClass] = useState('');
  const [phaseName, setPhaseName] = useState('');
  const [countdown, setCountdown] = useState('');
  const [ringInfo, setRingInfo] = useState('');

  const [nostrilL, setNostrilL] = useState('idle');
  const [nostrilR, setNostrilR] = useState('idle');

  const [whPromptText, setWhPromptText] = useState('');
  const [whLiveTimer, setWhLiveTimer] = useState('');
  const [whWaiting, setWhWaiting] = useState(false);

  const volRef = useRef(volume);
  useEffect(() => { volRef.current = volume; }, [volume]);

  const getVolume = useCallback(() => volRef.current / 100, []);
  const audio = useAudio(getVolume);
  const music = useSessionMusic(goalKey ?? null);
  const bgAudio = useBackgroundAudio(getVolume);
  const voiceCues = useVoiceCues(getVolume);
  const { record } = useSessionStorage();

  useEffect(() => {
    if (music.enabled && bgAudio.enabled) bgAudio.setEnabled(false);
  }, [music.enabled, bgAudio.enabled]);

  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const whRafRef = useRef<number | null>(null);
  const sessionStartRef = useRef(0);
  const whRetStartRef = useRef(0);
  const whWaitingRef = useRef(false);
  const whRoundRef = useRef(0);
  const whStopRetRef = useRef<(() => void) | null>(null);

  const tabsRef = useRef<HTMLDivElement>(null);

  const stopAllEngines = useCallback(() => {
    runningRef.current = false;
    whWaitingRef.current = false;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (whRafRef.current) { cancelAnimationFrame(whRafRef.current); whRafRef.current = null; }
  }, []);

  const finishSession = useCallback((techUsed: string) => {
    const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
    const ts = record(techUsed, elapsed);
    lastSessionTsRef.current = ts;
    setRefreshKey(k => k + 1);
    music.stop();
    bgAudio.stop();
    voiceCues.stop();
    audio.doneTone();
    setRunning(false);
    setWhWaiting(false);
    setFill(0);
    setPhaseClass('');
    setPhaseName('');
    setCountdown('');
    setRingInfo('');
    setNostrilL('idle');
    setNostrilR('idle');
    stopAllEngines();
    setJournalMode(true);
    setJournalText('');
    setJournalMood(0);
  }, [record, audio, music, voiceCues, stopAllEngines]);

  const stopSession = useCallback(() => {
    if (!runningRef.current && !whWaitingRef.current) return;
    music.stop();
    bgAudio.stop();
    voiceCues.stop();
    const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
    if (elapsed > 10) record(tech, elapsed);
    setRefreshKey(k => k + 1);
    setRunning(false);
    setWhWaiting(false);
    setFill(0);
    setPhaseClass('');
    setPhaseName('');
    setCountdown('');
    setRingInfo('');
    setNostrilL('idle');
    setNostrilR('idle');
    stopAllEngines();
  }, [record, tech, music, voiceCues, stopAllEngines]);

  const startDuration = useCallback((techKey: string) => {
    const totalSecs = durMin * 60;
    const phases = getPhases(techKey, customIn, customH1, customOut, customH2);
    if (!phases.length) return;
    let phaseIdx = 0;
    let phaseStart = performance.now();
    let lastTick = -1;
    sessionStartRef.current = Date.now();

    const playPhaseSound = (p: typeof phases[0]) => {
      switch (p.snd) {
        case 'inhale': audio.S.inhale(); voiceCues.play('inhale'); break;
        case 'exhale': audio.S.exhale(); voiceCues.play('exhale'); break;
        case 'hold':   audio.S.hold();   voiceCues.play('hold');   break;
        case 'fire':   audio.S.fire();   break;
        case 'sun':    audio.S.sun();    break;
        case 'moon':   audio.S.moon();   break;
        case 'ret':    audio.S.ret();    break;
        case 'recov':  audio.S.recov();  break;
      }
    };

    const startPhase = (idx: number) => {
      const p = phases[idx];
      setPhaseClass(p.cls);
      setPhaseName(p.name);
      setFill(0);
      if (p.nos) { setNostrilL(p.nos.l); setNostrilR(p.nos.r); }
      playPhaseSound(p);
    };

    startPhase(0);

    const tick = (now: number) => {
      if (!runningRef.current) return;
      const p = phases[phaseIdx];
      const elapsed = (now - phaseStart) / 1000;
      const remaining = p.s - elapsed;
      const totalElapsed = (Date.now() - sessionStartRef.current) / 1000;
      if (totalElapsed >= totalSecs) { finishSession(techKey); return; }

      setCountdown(fmtTime(Math.max(0, Math.ceil(remaining))));
      setFill(elapsed / p.s);

      const floorRem = Math.floor(remaining);
      if (floorRem !== lastTick && remaining > 0.5) {
        lastTick = floorRem;
        if (remaining > 1.5 && remaining < p.s - 0.5) audio.tick();
      }

      if (elapsed >= p.s) {
        phaseIdx = (phaseIdx + 1) % phases.length;
        phaseStart = now;
        lastTick = -1;
        startPhase(phaseIdx);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [durMin, customIn, customH1, customOut, customH2, audio, voiceCues, finishSession]);

  const startPump = useCallback((techKey: string) => {
    const totalSecs = durMin * 60;
    const bpm = techKey === 'bhastrika' ? 50 : 80;
    const interval = 60000 / bpm;
    let count = 0;
    let lastTime = performance.now();
    sessionStartRef.current = Date.now();

    const pumpPhaseName = techKey === 'bhastrika' ? 'Pump — Full Force' : 'Pump — Sharp Exhale';
    const restPhaseName = 'Rest — Breathe naturally';

    setPhaseClass('p-fire');
    setPhaseName(pumpPhaseName);
    setFill(0);
    audio.S.fire();

    const tick = (now: number) => {
      if (!runningRef.current) return;
      const totalElapsed = (Date.now() - sessionStartRef.current) / 1000;
      if (totalElapsed >= totalSecs) { finishSession(techKey); return; }
      if (now - lastTime >= interval) {
        lastTime = now;
        count++;
        audio.pumpTone();
        setCountdown(String(count));
        setFill(f => (f + (1 / 30)) % 1);
        if (count % 30 === 0) {
          setPhaseName(restPhaseName);
          setPhaseClass('p-inhale');
          audio.S.recov();
          setTimeout(() => {
            if (runningRef.current) {
              setPhaseName(pumpPhaseName);
              setPhaseClass('p-fire');
              audio.S.fire();
            }
          }, 3000);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [durMin, audio, finishSession]);

  const startBhramari = useCallback(() => {
    const totalSecs = durMin * 60;
    const phases = [
      { name: 'Deep Inhale', s: 4, cls: 'p-inhale', hum: false },
      { name: 'Hum — MMMMmmm', s: 6, cls: 'p-hold', hum: true },
    ];
    let phaseIdx = 0;
    let phaseStart = performance.now();
    let lastTick = -1;
    sessionStartRef.current = Date.now();

    const startPhase = (idx: number) => {
      const p = phases[idx];
      setPhaseClass(p.cls);
      setPhaseName(p.name);
      setFill(0);
      if (p.hum) { audio.hum(p.s); voiceCues.play('hold'); }
      else { audio.S.inhale(); voiceCues.play('inhale'); }
    };

    startPhase(0);
    const tick = (now: number) => {
      if (!runningRef.current) return;
      const p = phases[phaseIdx];
      const elapsed = (now - phaseStart) / 1000;
      const remaining = p.s - elapsed;
      const totalElapsed = (Date.now() - sessionStartRef.current) / 1000;
      if (totalElapsed >= totalSecs) { finishSession('bhramari'); return; }
      setCountdown(fmtTime(Math.max(0, Math.ceil(remaining))));
      setFill(elapsed / p.s);
      const floorRem = Math.floor(remaining);
      if (floorRem !== lastTick && remaining > 0.5) {
        lastTick = floorRem;
        if (!p.hum && remaining > 1.5 && remaining < p.s - 0.5) audio.tick();
      }
      if (elapsed >= p.s) {
        phaseIdx = (phaseIdx + 1) % phases.length;
        phaseStart = now;
        lastTick = -1;
        startPhase(phaseIdx);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [durMin, audio, voiceCues, finishSession]);

  const startWimHof = useCallback(() => {
    let round = 0;
    let breathCount = 0;
    const BREATH_COUNT = 30;
    const BREATH_INTERVAL = 1500;
    let lastBreathTime = performance.now();
    sessionStartRef.current = Date.now();
    whRoundRef.current = 0;

    const doRound = () => {
      if (!runningRef.current) return;
      round++;
      breathCount = 0;
      whRoundRef.current = round;
      setPhaseClass('p-fire');
      setPhaseName(tRef.current.session.wimhofRound(round));
      setRingInfo(tRef.current.session.wimhofBreath(1, BREATH_COUNT));
      setFill(0);
      setCountdown('');
      audio.powerBreathTone();

      const breathLoop = (now: number) => {
        if (!runningRef.current) return;
        if (whWaitingRef.current) return;
        if (now - lastBreathTime >= BREATH_INTERVAL) {
          lastBreathTime = now;
          breathCount++;
          audio.powerBreathTone();
          setFill(breathCount / BREATH_COUNT);
          setRingInfo(tRef.current.session.wimhofBreath(breathCount, BREATH_COUNT));
          if (breathCount >= BREATH_COUNT) {
            audio.S.exhale();
            setPhaseClass('p-ret');
            setPhaseName(tRef.current.session.wimhofExhale);
            setRingInfo('');
            setFill(0);
            whWaitingRef.current = true;
            setWhWaiting(true);
            whRetStartRef.current = Date.now();
            const retLoop = (_ts: number) => {
              if (!runningRef.current || !whWaitingRef.current) return;
              setWhLiveTimer(fmtTime(Math.floor((Date.now() - whRetStartRef.current) / 1000)));
              setWhPromptText(tRef.current.session.wimhofRetention);
              whRafRef.current = requestAnimationFrame(retLoop);
            };
            whRafRef.current = requestAnimationFrame(retLoop);
            whStopRetRef.current = () => {
              whWaitingRef.current = false;
              setWhWaiting(false);
              if (whRafRef.current) { cancelAnimationFrame(whRafRef.current); whRafRef.current = null; }
              setPhaseClass('p-inhale');
              setPhaseName(tRef.current.session.wimhofRecovPhase);
              setRingInfo(tRef.current.session.wimhofRecovery);
              setFill(0);
              setWhLiveTimer('');
              setWhPromptText('');
              audio.S.recov();
              let recStart = performance.now();
              const recLoop = (ts: number) => {
                if (!runningRef.current) return;
                const el = (ts - recStart) / 1000;
                setFill(el / 15);
                setCountdown(fmtTime(Math.max(0, Math.ceil(15 - el))));
                if (el >= 15) {
                  audio.S.exhale();
                  if (round >= whRounds) { finishSession('wimhof'); }
                  else { lastBreathTime = performance.now(); breathCount = 0; doRound(); }
                  return;
                }
                rafRef.current = requestAnimationFrame(recLoop);
              };
              rafRef.current = requestAnimationFrame(recLoop);
            };
            return;
          }
        }
        whRafRef.current = requestAnimationFrame(breathLoop);
      };
      lastBreathTime = performance.now();
      whRafRef.current = requestAnimationFrame(breathLoop);
    };
    doRound();
  }, [whRounds, audio, finishSession]);

  const launchEngines = useCallback(() => {
    setRunning(true);
    runningRef.current = true;
    whWaitingRef.current = false;
    setWhWaiting(false);
    setWhLiveTimer('');
    setWhPromptText('');
    if (tech === 'wimhof')   { startWimHof();   return; }
    if (tech === 'bhramari') { startBhramari(); return; }
    if (PUMP_TECHS.includes(tech)) { startPump(tech); return; }
    startDuration(tech);
  }, [tech, startWimHof, startBhramari, startPump, startDuration]);

  const beginSession = useCallback(() => {
    audio.ensureAC();
    if (music.enabled) {
      music.play();
      bgAudio.stop();
    } else if (bgAudio.enabled) {
      bgAudio.play();
      music.stop();
    } else {
      music.stop();
      bgAudio.stop();
    }
    const hasIntention = intention.trim().length > 0;
    const hasGratitude = gratitude.trim().length > 0;
    if (hasIntention || hasGratitude) {
      setIntentionFlash(true);
      setTimeout(() => {
        setIntentionFlash(false);
        launchEngines();
      }, 3000);
      return;
    }
    launchEngines();
  }, [audio, music, intention, gratitude, launchEngines]);

  const toggleMusic = useCallback(() => {
    const next = !music.enabled;
    music.setEnabled(next);
    if (next && bgAudio.enabled) bgAudio.setEnabled(false);
  }, [music, bgAudio]);

  const toggleBackgroundAudio = useCallback(() => {
    const next = !bgAudio.enabled;
    bgAudio.setEnabled(next);
    if (next && music.enabled) music.setEnabled(false);
  }, [bgAudio, music]);

  const handleWimHofStop = useCallback(() => {
    if (whStopRetRef.current) { whStopRetRef.current(); whStopRetRef.current = null; }
    else stopSession();
  }, [stopSession]);

  const handleSaveInsight = useCallback(() => {
    if ((journalMood > 0 || journalText.trim()) && lastSessionTsRef.current) {
      addJournal(lastSessionTsRef.current, journalMood, journalText.trim());
      setRefreshKey(k => k + 1);
    }
    setJournalMode(false);
    setJournalText('');
    setJournalMood(0);
    onBack();
  }, [journalMood, journalText, onBack]);

  const handleSkipInsight = useCallback(() => {
    setJournalMode(false);
    setJournalText('');
    setJournalMood(0);
    onBack();
  }, [onBack]);

  const handleInspireMe = useCallback(() => {
    const next = (inspireIdx + 1) % INTENTION_ANCHORS.length;
    setInspireIdx(next);
    setIntention(INTENTION_ANCHORS[next]);
  }, [inspireIdx]);

  const activateTech = useCallback((t: string) => {
    if (running) stopSession();
    setTech(t);
    setInfoOpen(false);
    setTimeout(() => {
      const tab = tabsRef.current?.querySelector(`[data-t="${t}"]`) as HTMLElement;
      if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 50);
  }, [running, stopSession]);

  useEffect(() => {
    if (initialTech) {
      setTech(initialTech);
      setTimeout(() => {
        const tab = tabsRef.current?.querySelector(`[data-t="${initialTech}"]`) as HTMLElement;
        if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }, 100);
    }
  }, [initialTech]);

  const handleManualLog = useCallback(() => {
    record(tech, durMin * 60);
    setRefreshKey(k => k + 1);
  }, [record, tech, durMin]);

  const handleReset = useCallback(() => {
    if (!confirm(t.session.resetConfirm)) return;
    localStorage.removeItem('breathwork_v4');
    setRefreshKey(k => k + 1);
  }, [t]);

  const items = t.gratitude.items as Record<string, string>;
  const gratText = gratitude ? (items[gratitude] ?? gratitude) : '';

  const showNostril = NOSTRIL_TECHS.includes(tech);
  const ytLink = YT_LINKS[tech];
  const ytLabel = YT_LABELS[tech];
  const recDur = REC_DURATION[tech];
  const isIdle = !running && !journalMode;
  const techLabel = TECH_LABELS[tech] || tech;

  return (
    <>
      {intentionFlash && (
        <div className="intention-flash">
          <div className="intention-flash-card">
            {gratText && (
              <div className="flash-gratitude-row">
                <span className="flash-gratitude-label">{t.session.gratefulFor}</span>
                <span className="flash-gratitude-text">{gratText}</span>
              </div>
            )}
            {intention && (
              <>
                <div className="intention-flash-label">{t.session.intentionLabel}</div>
                <div className="intention-flash-text">{intention}</div>
              </>
            )}
            {!intention && gratText && (
              <div className="flash-only-gratitude">
                <div className="intention-flash-label">{t.session.holdInHeart}</div>
                <div className="intention-flash-text">{gratText}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="page2-scroll">
        <div className="wrap">
          <h1>
            <button className="back-btn" onClick={onBack}>←</button>
            Breathwork
          </h1>

          <div className="tabs" ref={tabsRef}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`tab ${tech === tab.id ? 'on' : ''}`}
                data-t={tab.id}
                onClick={() => activateTech(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isIdle && (
            <div className="intention-block">
              <div className="intention-header">
                <span className="intention-title">
                  {t.session.intentionTitle}
                  <span className="intention-tech-link"> · {techLabel}</span>
                </span>
                <button className="inspire-btn" onClick={handleInspireMe}>{t.session.inspireMe}</button>
              </div>
              <textarea
                className="intention-input"
                placeholder={t.session.intentionPlaceholder}
                value={intention}
                onChange={e => setIntention(e.target.value)}
                rows={2}
              />
            </div>
          )}

          <BreathRing
            fill={fill}
            phaseClass={phaseClass}
            phaseName={phaseName}
            countdown={countdown}
            info={ringInfo}
            running={running && !whWaiting}
            onBegin={beginSession}
            onStop={stopSession}
            showWimHofPrompt={whWaiting}
            wimHofPromptText={whPromptText}
            wimHofLiveTimer={whLiveTimer}
            onWimHofStop={handleWimHofStop}
            showJournal={journalMode}
            journalText={journalText}
            onJournalChange={setJournalText}
            journalMood={journalMood}
            onJournalMoodChange={setJournalMood}
            onSaveInsight={handleSaveInsight}
            onSkipInsight={handleSkipInsight}
            idleIntention={isIdle ? intention : ''}
            idleTechLabel={isIdle ? techLabel : ''}
            idleGratitude={isIdle ? gratText : ''}
          />

          {showNostril && (
            <NostrilIndicator show={running} left={nostrilL} right={nostrilR} />
          )}

          <div className="options">
            {tech !== 'wimhof' && (
              <div className="opt-row">
                <span className="opt-label">{t.session.duration}</span>
                <div className="dur-btns">
                  {[1, 2, 3, 5, 10, 20].map(m => (
                    <button key={m} className={`dur-btn ${durMin === m ? 'on' : ''}`} onClick={() => setDurMin(m)}>{m}</button>
                  ))}
                </div>
                <div className="dur-custom">
                  <input
                    type="number" min={1} max={60} value={durMin}
                    onChange={e => setDurMin(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
                  />
                  <span>{t.session.min}</span>
                </div>
              </div>
            )}

            {tech === 'wimhof' && (
              <div className="opt-row">
                <span className="opt-label">{t.session.rounds}</span>
                <div className="dur-btns">
                  {[2, 3, 4, 5].map(r => (
                    <button key={r} className={`dur-btn ${whRounds === r ? 'on' : ''}`} onClick={() => setWhRounds(r)}>{r}</button>
                  ))}
                </div>
              </div>
            )}

            {tech === 'custom' && (
              <div className="custom-grid-wrap">
                <div className="custom-grid-label">{t.session.pattern}</div>
                <div className="custom-grid">
                  <div className="cg-item">
                    <label>{t.session.inhale}</label>
                    <input type="number" min={1} max={30} value={customIn} onChange={e => setCustomIn(+e.target.value)} />
                    <span className="cg-unit">{t.session.seconds}</span>
                  </div>
                  <div className="cg-item">
                    <label>{t.session.holdIn}</label>
                    <input type="number" min={0} max={30} value={customH1} onChange={e => setCustomH1(+e.target.value)} />
                    <span className="cg-unit">{t.session.skipPhase}</span>
                  </div>
                  <div className="cg-item">
                    <label>{t.session.exhale}</label>
                    <input type="number" min={1} max={30} value={customOut} onChange={e => setCustomOut(+e.target.value)} />
                    <span className="cg-unit">{t.session.seconds}</span>
                  </div>
                  <div className="cg-item">
                    <label>{t.session.holdOut}</label>
                    <input type="number" min={0} max={30} value={customH2} onChange={e => setCustomH2(+e.target.value)} />
                    <span className="cg-unit">{t.session.skipPhase}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="opt-row opt-vol-row">
              <span className="opt-label">{t.session.volume}</span>
              <input type="range" min={0} max={100} value={volume} className="vol-slider" onChange={e => setVolume(+e.target.value)} />
              <span className="vol-val">{volume}%</span>
            </div>

            <div className="opt-bg-audio-block">
              <div className="opt-row opt-bg-audio-row">
                <span className="opt-label opt-bg-audio-label">{'\u2728'} {t.session.bgAudio}</span>
                <button
                  className={`music-toggle ${bgAudio.enabled ? 'music-on' : 'music-off'}${music.enabled ? ' audio-source-locked' : ''}`}
                  onClick={toggleBackgroundAudio}
                  disabled={music.enabled}
                  title={music.enabled ? 'Turn off music before enabling background audio' : bgAudio.enabled ? 'Mute background audio' : 'Unmute background audio'}
                >
                  {bgAudio.enabled ? '🔊' : '🔇'}
                </button>
              </div>
              <div className="audio-choice-hint">{t.session.bgAudioChoiceHint}</div>
              <div className={`opt-bg-audio-body${bgAudio.enabled ? '' : ' bg-audio-dim'}${music.enabled ? ' audio-source-locked' : ''}`}>
                <div className="opt-row bg-cat-row">
                  <button
                    className={`bg-cat-btn ${bgAudio.category === 'nature' ? 'bg-cat-on' : ''}`}
                    onClick={() => bgAudio.setCategory('nature')}
                    disabled={music.enabled}
                  >
                    {t.session.nature}
                  </button>
                  <button
                    className={`bg-cat-btn ${bgAudio.category === 'frequencies' ? 'bg-cat-on' : ''}`}
                    onClick={() => bgAudio.setCategory('frequencies')}
                    disabled={music.enabled}
                  >
                    {t.session.frequencies}
                  </button>
                </div>
                <div className="opt-row bg-sound-row">
                  {bgAudio.category === 'nature' && NATURE_SOUNDS.map(s => {
                    const label = (t as Translations).session.natureSounds?.[s.id] ?? s.label;
                    return (
                      <button
                        key={s.id}
                        className={`bg-sound-btn ${bgAudio.sound === s.id ? 'bg-sound-on' : ''}`}
                        onClick={() => bgAudio.setSound(s.id)}
                        disabled={music.enabled}
                        title={label}
                      >
                        {s.emoji}
                      </button>
                    );
                  })}
                  {bgAudio.category === 'frequencies' && FREQUENCY_SOUNDS.map(s => {
                    const label = (t as Translations).session.freqSounds?.[s.id] ?? s.label;
                    return (
                      <button
                        key={s.id}
                        className={`bg-sound-btn ${bgAudio.sound === s.id ? 'bg-sound-on' : ''}`}
                        onClick={() => bgAudio.setSound(s.id)}
                        disabled={music.enabled}
                        title={label}
                      >
                        <span className="bg-sound-emoji">{s.emoji}</span>
                        <span className="bg-sound-hz">{s.hz}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="opt-row bg-vol-row">
                  <span className="opt-label opt-bg-vol-label">{t.session.bgAudioVol}</span>
                  <input
                    type="range" min={0} max={100}
                    value={bgAudio.volume}
                    className="vol-slider bg-vol-slider"
                    onChange={e => bgAudio.setVolume(+e.target.value)}
                    disabled={music.enabled}
                  />
                  <span className="vol-val">{bgAudio.volume}%</span>
                </div>
              </div>
            </div>

            <div className="opt-voice-block">
              <div className="opt-row opt-voice-row">
                <span className="opt-label opt-voice-label">🗣 {t.session.voiceCues}</span>
                <button
                  className={`music-toggle ${voiceCues.enabled ? 'music-on' : 'music-off'}`}
                  onClick={() => voiceCues.setEnabled(!voiceCues.enabled)}
                  title={voiceCues.enabled ? 'Mute voice cues' : 'Unmute voice cues'}
                >
                  {voiceCues.enabled ? '🔊' : '🔇'}
                </button>
              </div>
              <div className={`opt-voice-body${voiceCues.enabled ? '' : ' voice-dim'}`}>
                <div className="opt-row voice-gender-row">
                  <button
                    className={`voice-gender-btn ${voiceCues.gender === 'male' ? 'voice-gender-on' : ''}`}
                    onClick={() => voiceCues.setGender('male')}
                  >
                    {t.session.voiceMale}
                  </button>
                  <button
                    className={`voice-gender-btn ${voiceCues.gender === 'female' ? 'voice-gender-on' : ''}`}
                    onClick={() => voiceCues.setGender('female')}
                  >
                    {t.session.voiceFemale}
                  </button>
                </div>
                <div className="opt-row voice-vol-row">
                  <span className="opt-label opt-voice-vol-label">{t.session.voiceCuesVol}</span>
                  <input
                    type="range" min={0} max={100}
                    value={voiceCues.volume}
                    className="vol-slider voice-vol-slider"
                    onChange={e => voiceCues.setVolume(+e.target.value)}
                  />
                  <span className="vol-val">{voiceCues.volume}%</span>
                </div>
              </div>
            </div>

            {goalKey && (
              <div className="opt-music-block">
                <div className="opt-row opt-music-row">
                  <span className="opt-label opt-music-label">♪ {t.session.music}</span>
                  <button
                    className={`music-toggle ${music.enabled ? 'music-on' : 'music-off'}${bgAudio.enabled ? ' audio-source-locked' : ''}`}
                    onClick={toggleMusic}
                    disabled={bgAudio.enabled}
                    title={bgAudio.enabled ? 'Turn off background audio before enabling music' : music.enabled ? 'Mute music' : 'Unmute music'}
                  >
                    {music.enabled ? '🔊' : '🔇'}
                  </button>
                </div>
                <div className={`opt-row opt-music-vol-row${music.enabled ? '' : ' music-vol-dim'}${bgAudio.enabled ? ' audio-source-locked' : ''}`}>
                  <span className="opt-label opt-music-vol-label">{t.session.musicVol}</span>
                  <input
                    type="range" min={0} max={100}
                    value={music.musicVolume}
                    className="vol-slider music-vol-slider"
                    onChange={e => music.setMusicVolume(+e.target.value)}
                    disabled={bgAudio.enabled}
                  />
                  <span className="vol-val">{music.musicVolume}%</span>
                </div>
              </div>
            )}

            {ytLink && (
              <div className="opt-yt-row">
                <a className="opt-yt-link" href={ytLink} target="_blank" rel="noopener">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff4444">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
                  </svg>
                  <span>{ytLabel || t.session.watchTutorial}</span>
                </a>
              </div>
            )}

            {recDur && <div className="rec-label">{t.session.recommended} {recDur}</div>}

            <button className="info-link" onClick={() => setInfoOpen(o => !o)}>
              {infoOpen ? t.session.hideInfo : t.session.howWorks}
            </button>
          </div>

          <InfoDrawer tech={tech} open={infoOpen} onClose={() => setInfoOpen(false)} />
          <Tracker refreshKey={refreshKey} onManualLog={handleManualLog} onReset={handleReset} />
          <Heatmap refreshKey={refreshKey} />
          <HistoryPanel refreshKey={refreshKey} onRefresh={() => setRefreshKey(k => k + 1)} />
          <ReferenceTable onActivateTech={activateTech} />
        </div>
      </div>
    </>
  );
}
