import './organic-motion.css';

const content = {
  title: 'The foundation',
  sub: 'Everything in breathwork starts here.',
  inhale: 'INHALE',
  exhale: 'EXHALE',
  legend: 'The center widens on inhale — then softly returns',
  step1: 'Place one hand on your chest, one on your belly.',
  step2: 'When you breathe correctly, only the belly hand moves. The chest stays still.',
  step3: 'Breathe in through the nose, out through the mouth. Slow and gentle.',
  callout:
    'This is belly breathing — diaphragmatic breath. It activates your rest system, lowers cortisol, and is the foundation of every technique in this app.',
  videosTitle: 'Watch a demonstration',
  video1Title: 'How to belly breathe',
  video1Sub: 'Step-by-step diaphragmatic breathing',
  video2Title: 'Belly vs chest breathing',
  video2Sub: 'See the difference clearly explained',
  cta: 'I understand — continue',
};

export function OrganicMotion() {
  return (
    <main className="organic-root">
      <div className="organic-shell">
        <header className="organic-header">
          <span className="organic-kicker">A quiet beginning</span>
          <h1>{content.title}</h1>
          <p>{content.sub}</p>
        </header>

        <section className="tide-visual" aria-label="Animated breathing guide">
          <div className="tide-glow tide-glow-one" />
          <div className="tide-glow tide-glow-two" />
          <div className="tide-ripple ripple-one" />
          <div className="tide-ripple ripple-two" />
          <div className="tide-ripple ripple-three" />
          <div className="tide-core">
            <span className="tide-core-light" />
            <span className="tide-core-word tide-inhale">{content.inhale}</span>
            <span className="tide-core-word tide-exhale">{content.exhale}</span>
          </div>
          <span className="tide-orbit tide-orbit-a" />
          <span className="tide-orbit tide-orbit-b" />
          <span className="tide-spark spark-a" />
          <span className="tide-spark spark-b" />
          <div className="tide-caption">
            <span className="tide-caption-dot" />
            <span>{content.legend}</span>
          </div>
        </section>

        <section className="organic-steps" aria-label="How to practice">
          {[content.step1, content.step2, content.step3].map((step, index) => (
            <div className="organic-step" key={step}>
              <span className="organic-step-number">0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
          <aside className="organic-callout">
            <span className="callout-mark">✦</span>
            <p>{content.callout}</p>
          </aside>
        </section>

        <section className="organic-videos">
          <p className="organic-section-label">{content.videosTitle}</p>
          <div className="organic-video-list">
            <a
              className="organic-video"
              href="https://www.youtube.com/results?search_query=diaphragmatic+belly+breathing+tutorial+how+to"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="video-icon">↗</span>
              <span className="video-copy">
                <strong>{content.video1Title}</strong>
                <span>{content.video1Sub}</span>
              </span>
              <span className="video-arrow">→</span>
            </a>
            <a
              className="organic-video"
              href="https://www.youtube.com/results?search_query=belly+vs+chest+breathing+difference+demonstration"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="video-icon">↗</span>
              <span className="video-copy">
                <strong>{content.video2Title}</strong>
                <span>{content.video2Sub}</span>
              </span>
              <span className="video-arrow">→</span>
            </a>
          </div>
        </section>

        <button className="organic-button" type="button" onClick={() => undefined}>
          <span>{content.cta}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </main>
  );
}