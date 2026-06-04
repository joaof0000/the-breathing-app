import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/lang';
import './BellyBreathingScreen.css';

interface BellyContent {
  title: string;
  sub: string;
  svgChest: string;
  svgBelly: string;
  svgInhale: string;
  svgExhale: string;
  legend: string;
  step1: string;
  step2: string;
  step3: string;
  callout: string;
  videosTitle: string;
  video1Title: string;
  video1Sub: string;
  video2Title: string;
  video2Sub: string;
  cta: string;
}

const CONTENT: Record<Lang, BellyContent> = {
  en: {
    title: 'The foundation',
    sub: 'Everything in breathwork starts here.',
    svgChest: 'CHEST',
    svgBelly: 'BELLY',
    svgInhale: 'INHALE',
    svgExhale: 'EXHALE',
    legend: 'Belly rises on inhale — chest stays still',
    step1: 'Place one hand on your chest, one on your belly.',
    step2: 'When you breathe correctly, only the belly hand moves. The chest stays still.',
    step3: 'Breathe in through the nose, out through the mouth. Slow and gentle.',
    callout: 'This is belly breathing — diaphragmatic breath. It activates your rest system, lowers cortisol, and is the foundation of every technique in this app.',
    videosTitle: 'Watch a demonstration',
    video1Title: 'How to belly breathe',
    video1Sub: 'Step-by-step diaphragmatic breathing',
    video2Title: 'Belly vs chest breathing',
    video2Sub: 'See the difference clearly explained',
    cta: 'I understand — continue',
  },
  pt: {
    title: 'A base',
    sub: 'Tudo no breathwork começa aqui.',
    svgChest: 'PEITO',
    svgBelly: 'BARRIGA',
    svgInhale: 'INSPIRAR',
    svgExhale: 'EXPIRAR',
    legend: 'A barriga sobe ao inspirar — o peito fica parado',
    step1: 'Coloque uma mão no peito e outra na barriga.',
    step2: 'Quando você respira corretamente, apenas a mão da barriga se move. O peito fica parado.',
    step3: 'Inspire pelo nariz, expire pela boca. Devagar e suave.',
    callout: 'Isso é a respiração abdominal — respiração diafragmática. Ela ativa seu sistema de descanso, reduz o cortisol e é a base de todas as técnicas neste aplicativo.',
    videosTitle: 'Assista a uma demonstração',
    video1Title: 'Como respirar pelo abdômen',
    video1Sub: 'Respiração diafragmática passo a passo',
    video2Title: 'Respiração abdominal vs torácica',
    video2Sub: 'Veja a diferença explicada claramente',
    cta: 'Entendi — continuar',
  },
  es: {
    title: 'La base',
    sub: 'Todo en el breathwork comienza aquí.',
    svgChest: 'PECHO',
    svgBelly: 'VIENTRE',
    svgInhale: 'INHALAR',
    svgExhale: 'EXHALAR',
    legend: 'El vientre sube al inhalar — el pecho queda quieto',
    step1: 'Coloca una mano en el pecho y otra en el vientre.',
    step2: 'Cuando respiras correctamente, solo la mano del vientre se mueve. El pecho queda quieto.',
    step3: 'Inhala por la nariz, exhala por la boca. Lento y suave.',
    callout: 'Esto es la respiración abdominal — respiración diafragmática. Activa tu sistema de descanso, reduce el cortisol y es la base de todas las técnicas en esta aplicación.',
    videosTitle: 'Mira una demostración',
    video1Title: 'Cómo respirar desde el abdomen',
    video1Sub: 'Respiración diafragmática paso a paso',
    video2Title: 'Respiración abdominal vs torácica',
    video2Sub: 'Ve la diferencia claramente explicada',
    cta: 'Entendido — continuar',
  },
};

interface Props {
  onContinue: () => void;
}

export default function BellyBreathingScreen({ onContinue }: Props) {
  const { lang } = useLang();
  const c = CONTENT[lang];

  return (
    <div className="belly">
      <div className="belly-inner">

        <h2 className="belly-title">{c.title}</h2>
        <p className="belly-sub">{c.sub}</p>

        {/* Animated breathing diagram */}
        <div className="belly-diagram" aria-hidden="true">
          <div className="belly-diag-phase-wrap">
            <span className="belly-diag-phase belly-diag-inhale">{c.svgInhale}</span>
            <span className="belly-diag-phase belly-diag-exhale">{c.svgExhale}</span>
          </div>
          <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="belly-diag-svg">
            {/* Body silhouette */}
            <ellipse cx="100" cy="100" rx="64" ry="88" className="bd-body" />
            {/* Ribcage lines */}
            <path d="M 54 72 Q 44 90 46 112" className="bd-rib" />
            <path d="M 146 72 Q 156 90 154 112" className="bd-rib" />
            <path d="M 58 80 Q 50 96 52 114" className="bd-rib bd-rib2" />
            <path d="M 142 80 Q 150 96 148 114" className="bd-rib bd-rib2" />
            {/* Left lung */}
            <ellipse cx="72" cy="84" rx="22" ry="36" className="bd-lung" />
            {/* Right lung */}
            <ellipse cx="128" cy="84" rx="22" ry="36" className="bd-lung" />
            {/* Sternum */}
            <line x1="100" y1="52" x2="100" y2="118" className="bd-sternum" />
            {/* Diaphragm */}
            <path d="M 42 122 Q 100 148 158 122" className="bd-diaphragm" strokeWidth="2.5" strokeLinecap="round" />
            {/* Belly area */}
            <ellipse cx="100" cy="167" rx="52" ry="26" className="bd-belly" />
            {/* Belly hand indicator */}
            <ellipse cx="100" cy="155" rx="30" ry="8" className="bd-hand" />
            {/* Labels */}
            <text x="100" y="86" className="bd-label">{c.svgChest}</text>
            <text x="100" y="166" className="bd-label bd-label-belly">{c.svgBelly}</text>
            {/* Down arrow for diaphragm on inhale */}
            <path d="M 100 150 L 100 162 M 95 157 L 100 163 L 105 157" className="bd-arrow bd-arrow-down" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="belly-diag-legend">
            <span className="belly-diag-dot bd-gold" />
            <span className="belly-diag-legend-text">{c.legend}</span>
          </div>
        </div>

        <div className="belly-steps">
          <div className="belly-step">
            <span className="belly-step-num">1</span>
            <p className="belly-step-text">{c.step1}</p>
          </div>

          <div className="belly-step">
            <span className="belly-step-num">2</span>
            <p className="belly-step-text">{c.step2}</p>
          </div>

          <div className="belly-step">
            <span className="belly-step-num">3</span>
            <p className="belly-step-text">{c.step3}</p>
          </div>

          <div className="belly-callout">
            <p>{c.callout}</p>
          </div>
        </div>

        {/* Video resources */}
        <div className="belly-videos">
          <p className="belly-videos-title">{c.videosTitle}</p>
          <div className="belly-video-links">
            <a
              className="belly-video-link"
              href="https://www.youtube.com/results?search_query=diaphragmatic+belly+breathing+tutorial+how+to"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="belly-video-play">▶</span>
              <span className="belly-video-text">
                <strong>{c.video1Title}</strong>
                <span>{c.video1Sub}</span>
              </span>
            </a>
            <a
              className="belly-video-link"
              href="https://www.youtube.com/results?search_query=belly+vs+chest+breathing+difference+demonstration"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="belly-video-play">▶</span>
              <span className="belly-video-text">
                <strong>{c.video2Title}</strong>
                <span>{c.video2Sub}</span>
              </span>
            </a>
          </div>
        </div>

        <button className="belly-btn" onClick={onContinue}>
          {c.cta}
        </button>
      </div>
    </div>
  );
}
