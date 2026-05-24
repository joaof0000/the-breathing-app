import type { Lang } from '../i18n/lang';
import { useLang } from '../i18n/LangContext';
import './BreathScienceScreen.css';

interface Reason {
  icon: string;
  title: string;
  body: string;
  stat?: string;
}

interface DiaphStep {
  num: string;
  text: string;
}

interface Content {
  back: string;
  badge: string;
  headline: string;
  sub: string;
  whyTitle: string;
  reasons: Reason[];
  diaphTitle: string;
  diaphIntro: string;
  diaphWhatTitle: string;
  diaphWhat: string;
  diaphStepsTitle: string;
  diaphSteps: DiaphStep[];
  diaphCheckTitle: string;
  diaphChecks: string[];
  diaphMistakeTitle: string;
  diaphMistake: string;
  diaphPracticeTitle: string;
  diaphPractice: string;
  scienceNote: string;
  cta: string;
}

const CONTENT: Record<Lang, Content> = {
  en: {
    back: '← Back',
    badge: 'The Science',
    headline: 'Why Your Breath Changes Everything',
    sub: 'Most people breathe 20,000 times a day — on autopilot. Here is what happens when you take conscious control.',
    whyTitle: '10 Reasons to Breathe Consciously',
    reasons: [
      {
        icon: '⚡',
        title: 'You Can Control Your Nervous System',
        body: 'Breathing is the only autonomic function — heart rate, digestion, immune response — that you can voluntarily override. A single slow exhale activates the vagus nerve and shifts you from fight-or-flight to rest-and-digest within seconds.',
        stat: 'Effect felt in under 90 seconds',
      },
      {
        icon: '🧠',
        title: 'Sharper Focus & Cognition',
        body: 'Nasal breathing produces nitric oxide, a vasodilator that widens blood vessels. Studies show this increases oxygenation to the prefrontal cortex — your seat of rational thought, planning, and focus — by up to 18%.',
        stat: 'Up to 18% more O₂ to the brain',
      },
      {
        icon: '💆',
        title: 'Stress & Anxiety Relief',
        body: 'The exhale is your body\'s built-in off-switch for stress. Extending the exhale longer than the inhale activates the parasympathetic nervous system, suppresses the amygdala (threat center), and measurably lowers cortisol — the primary stress hormone.',
        stat: 'Cortisol drops within one session',
      },
      {
        icon: '❤️',
        title: 'Lower Blood Pressure',
        body: 'Coherent breathing at 5.5 breaths per minute synchronises heart, lungs, and brain in a state called resonance. Clinical trials show this lowers systolic blood pressure by 5–10 mmHg within a single session and produces lasting reductions with daily practice.',
        stat: '5–10 mmHg reduction per session',
      },
      {
        icon: '📈',
        title: 'Better Heart Rate Variability',
        body: 'HRV — the variation in time between heartbeats — is one of the strongest predictors of lifespan and resilience. Slow diaphragmatic breathing is the most potent non-pharmaceutical way to increase HRV, training your heart to respond flexibly to any demand.',
        stat: 'The best predictor of longevity',
      },
      {
        icon: '😴',
        title: 'Deeper Sleep',
        body: 'Mouth-breathing during sleep reduces sleep quality by disrupting oxygen and CO₂ balance, causing micro-arousals and snoring. Nasal breathing + slow diaphragmatic practice before bed activates the parasympathetic state that is required for slow-wave sleep.',
        stat: 'Nasal breathing = 25% more REM',
      },
      {
        icon: '🛡️',
        title: 'Stronger Immune Function',
        body: 'Nitric oxide produced in the nasal passages has potent antiviral and antibacterial properties. Wim Hof studies (Radboud University, 2014) demonstrated that conscious breathing directly activates the immune system — subjects produced significantly fewer inflammatory markers when injected with endotoxin.',
        stat: 'Peer-reviewed: immune modulation confirmed',
      },
      {
        icon: '🔥',
        title: 'More Energy',
        body: 'Power breathing techniques (Bhastrika, Kapalabhati, Wim Hof) stimulate the sympathetic nervous system, increase cellular oxygen delivery, and generate internal heat through thermogenesis. Practitioners report a natural energy surge equivalent to two cups of coffee — without the crash.',
        stat: 'Mitochondrial output increases measurably',
      },
      {
        icon: '😌',
        title: 'Emotional Regulation & Mood',
        body: 'The amygdala — the brain\'s alarm centre — is directly calmed by slow, extended exhales. Bhramari humming has been shown in EEG studies to reduce amygdala activation and lower salivary cortisol. Regular practice literally rewires emotional reactivity over weeks.',
        stat: 'Amygdala activity reduced in minutes',
      },
      {
        icon: '🌬️',
        title: 'Higher CO₂ Tolerance',
        body: 'Contrary to popular belief, the urge to breathe is triggered by rising CO₂ — not falling O₂. Most people have poor CO₂ tolerance and over-breathe chronically, keeping them anxious and reactive. Training tolerance through breath holds and slow breathing builds a calmer, more resilient baseline.',
        stat: 'The hidden key to calm',
      },
    ],
    diaphTitle: 'How to Breathe from Your Diaphragm',
    diaphIntro: 'Diaphragmatic breathing is the foundation of every technique in this app. It is how you were designed to breathe — and how almost nobody breathes by adulthood.',
    diaphWhatTitle: 'What is the diaphragm?',
    diaphWhat: 'The diaphragm is a large, dome-shaped muscle that sits at the base of your lungs, separating the chest from the abdomen. When it contracts and flattens downward, it creates a vacuum that draws air deep into the lower lobes of the lungs — the most oxygen-rich regions. Chest breathing uses roughly ⅓ of lung capacity. Diaphragmatic breathing uses the full lung — plus stimulates the vagus nerve fibres that run through the diaphragm itself.',
    diaphStepsTitle: 'Step-by-step: learn it in 5 minutes',
    diaphSteps: [
      { num: '1', text: 'Lie flat on your back. Place your right hand on your belly (just above the navel) and your left hand on your chest.' },
      { num: '2', text: 'Close your mouth. Breathe in slowly through your nose for 4 counts. Your right hand (belly) should rise. Your left hand (chest) should barely move.' },
      { num: '3', text: 'Pause briefly at the top — just a natural, relaxed pause, no straining.' },
      { num: '4', text: 'Exhale slowly through your nose or pursed lips for 6–8 counts. Feel the belly fall completely back toward the spine.' },
      { num: '5', text: 'Repeat for 10 breaths. With each cycle, try to send the breath deeper — feel the ribcage expand sideways as well as the belly forward.' },
    ],
    diaphCheckTitle: 'How to know it is working',
    diaphChecks: [
      'Your belly rises and falls more than your chest',
      'Your shoulders stay relaxed and low',
      'You feel a calming effect within 2–3 minutes',
      'Your exhale is longer and more complete than your inhale',
    ],
    diaphMistakeTitle: 'The most common mistake',
    diaphMistake: 'Pulling the stomach in on the inhale. This is the opposite of what you want. On the inhale the belly softens and expands outward as the diaphragm descends. On the exhale, the belly draws back in as the diaphragm rises.',
    diaphPracticeTitle: 'Building the habit',
    diaphPractice: 'Practise 5 minutes lying down every day for one week. Within 7 days your resting breathing pattern will begin to shift automatically — even during stress. This is the single highest-leverage habit in the entire app.',
    scienceNote: 'References: Zelano et al. (2016), Russo et al. (2017), Kox et al. (2014), Lehrer & Gevirtz (2014), McKeown (2015), Nestor (2020)',
    cta: 'Start breathing →',
  },

  pt: {
    back: '← Voltar',
    badge: 'A Ciência',
    headline: 'Por Que Sua Respiração Muda Tudo',
    sub: 'A maioria das pessoas respira 20.000 vezes por dia — no piloto automático. Veja o que acontece quando você assume o controle consciente.',
    whyTitle: '10 Razões Para Respirar Conscientemente',
    reasons: [
      {
        icon: '⚡',
        title: 'Você Pode Controlar Seu Sistema Nervoso',
        body: 'A respiração é a única função autônoma — frequência cardíaca, digestão, resposta imune — que você pode anular voluntariamente. Uma única expiração lenta ativa o nervo vago e muda você do estado de luta-ou-fuga para o descanso-e-digestão em segundos.',
        stat: 'Efeito sentido em menos de 90 segundos',
      },
      {
        icon: '🧠',
        title: 'Foco e Cognição Aprimorados',
        body: 'A respiração nasal produz óxido nítrico, um vasodilatador que alarga os vasos sanguíneos. Estudos mostram que isso aumenta a oxigenação do córtex pré-frontal — sua sede de pensamento racional, planejamento e foco — em até 18%.',
        stat: 'Até 18% mais O₂ para o cérebro',
      },
      {
        icon: '💆',
        title: 'Alívio do Estresse e Ansiedade',
        body: 'A expiração é o interruptor natural do seu corpo para o estresse. Prolongar a expiração mais do que a inspiração ativa o sistema nervoso parassimpático, suprime a amígdala (centro de ameaças) e reduz o cortisol — o principal hormônio do estresse — de forma mensurável.',
        stat: 'Cortisol cai em uma única sessão',
      },
      {
        icon: '❤️',
        title: 'Pressão Arterial Mais Baixa',
        body: 'A respiração coerente a 5,5 respirações por minuto sincroniza coração, pulmões e cérebro em um estado chamado ressonância. Ensaios clínicos mostram que isso reduz a pressão sistólica em 5–10 mmHg em uma única sessão, com reduções duradouras com prática diária.',
        stat: 'Redução de 5–10 mmHg por sessão',
      },
      {
        icon: '📈',
        title: 'Melhor Variabilidade da Frequência Cardíaca',
        body: 'A VFC — variação no tempo entre batimentos cardíacos — é um dos preditores mais fortes de longevidade e resiliência. A respiração diafragmática lenta é a forma não farmacêutica mais potente de aumentá-la, treinando seu coração para responder com flexibilidade a qualquer demanda.',
        stat: 'O melhor preditor de longevidade',
      },
      {
        icon: '😴',
        title: 'Sono Mais Profundo',
        body: 'A respiração pela boca durante o sono reduz a qualidade do sono ao perturbar o equilíbrio de O₂ e CO₂, causando micro-despertares e ronco. A respiração nasal e a prática diafragmática antes de dormir ativam o estado parassimpático necessário para o sono de ondas lentas.',
        stat: 'Respiração nasal = 25% mais sono REM',
      },
      {
        icon: '🛡️',
        title: 'Função Imune Mais Forte',
        body: 'O óxido nítrico produzido nas passagens nasais tem propriedades antivirais e antibacterianas potentes. Estudos de Wim Hof (Universidade Radboud, 2014) demonstraram que a respiração consciente ativa diretamente o sistema imune — os sujeitos produziram significativamente menos marcadores inflamatórios ao receber endotoxina.',
        stat: 'Revisado por pares: modulação imune confirmada',
      },
      {
        icon: '🔥',
        title: 'Mais Energia',
        body: 'As técnicas de respiração energética (Bhastrika, Kapalabhati, Wim Hof) estimulam o sistema nervoso simpático, aumentam a entrega celular de oxigênio e geram calor interno por termogênese. Os praticantes relatam um aumento de energia natural equivalente a dois cafés — sem o colapso.',
        stat: 'Produção mitocondrial aumenta mensuralmente',
      },
      {
        icon: '😌',
        title: 'Regulação Emocional e Humor',
        body: 'A amígdala — o centro de alarme do cérebro — é diretamente acalmada por expirações lentas e prolongadas. O zumbido do Bhramari demonstrou em estudos de EEG reduzir a ativação da amígdala e diminuir o cortisol salivar. A prática regular literalmente reconfigura a reatividade emocional ao longo de semanas.',
        stat: 'Atividade da amígdala reduzida em minutos',
      },
      {
        icon: '🌬️',
        title: 'Maior Tolerância ao CO₂',
        body: 'Ao contrário do que se acredita, a vontade de respirar é desencadeada pelo aumento do CO₂ — não pela queda do O₂. A maioria das pessoas tem baixa tolerância ao CO₂ e respira demais cronicamente, mantendo-se ansiosa e reativa. Treinar a tolerância através de retenções e respirações lentas constrói uma base mais calma e resiliente.',
        stat: 'A chave oculta para a calma',
      },
    ],
    diaphTitle: 'Como Respirar Pelo Diafragma',
    diaphIntro: 'A respiração diafragmática é a base de todas as técnicas neste aplicativo. É como você foi projetado para respirar — e como quase ninguém respira na idade adulta.',
    diaphWhatTitle: 'O que é o diafragma?',
    diaphWhat: 'O diafragma é um músculo grande em forma de cúpula que fica na base dos pulmões, separando o tórax do abdômen. Quando se contrai e achata para baixo, cria um vácuo que atrai ar profundamente para os lobos inferiores dos pulmões — as regiões mais ricas em oxigênio. A respiração torácica usa cerca de ⅓ da capacidade pulmonar. A respiração diafragmática usa o pulmão inteiro — além de estimular as fibras do nervo vago que percorrem o próprio diafragma.',
    diaphStepsTitle: 'Passo a passo: aprenda em 5 minutos',
    diaphSteps: [
      { num: '1', text: 'Deite de costas. Coloque a mão direita na barriga (logo acima do umbigo) e a mão esquerda no peito.' },
      { num: '2', text: 'Feche a boca. Inspire lentamente pelo nariz por 4 tempos. Sua mão direita (barriga) deve subir. Sua mão esquerda (peito) deve mal se mover.' },
      { num: '3', text: 'Pause brevemente no topo — apenas uma pausa natural e relaxada, sem forçar.' },
      { num: '4', text: 'Expire lentamente pelo nariz ou pelos lábios franzidos por 6–8 tempos. Sinta a barriga descer completamente em direção à coluna.' },
      { num: '5', text: 'Repita por 10 respirações. A cada ciclo, tente enviar a respiração mais fundo — sinta a caixa torácica expandir lateralmente, assim como a barriga avança.' },
    ],
    diaphCheckTitle: 'Como saber se está funcionando',
    diaphChecks: [
      'Sua barriga sobe e desce mais do que seu peito',
      'Seus ombros ficam relaxados e baixos',
      'Você sente um efeito calmante em 2–3 minutos',
      'Sua expiração é mais longa e completa do que sua inspiração',
    ],
    diaphMistakeTitle: 'O erro mais comum',
    diaphMistake: 'Puxar o estômago para dentro ao inspirar. Isso é o oposto do que você quer. Na inspiração, a barriga amolece e se expande para fora enquanto o diafragma desce. Na expiração, a barriga se retrai enquanto o diafragma sobe.',
    diaphPracticeTitle: 'Construindo o hábito',
    diaphPractice: 'Pratique 5 minutos deitado todos os dias durante uma semana. Em 7 dias, seu padrão de respiração em repouso começará a mudar automaticamente — mesmo durante o estresse. Este é o hábito de maior alavancagem em todo o aplicativo.',
    scienceNote: 'Referências: Zelano et al. (2016), Russo et al. (2017), Kox et al. (2014), Lehrer & Gevirtz (2014), McKeown (2015), Nestor (2020)',
    cta: 'Começar a respirar →',
  },

  es: {
    back: '← Volver',
    badge: 'La Ciencia',
    headline: 'Por Qué Tu Respiración lo Cambia Todo',
    sub: 'La mayoría de las personas respira 20.000 veces al día — en piloto automático. Esto es lo que ocurre cuando tomas el control consciente.',
    whyTitle: '10 Razones Para Respirar Conscientemente',
    reasons: [
      {
        icon: '⚡',
        title: 'Puedes Controlar Tu Sistema Nervioso',
        body: 'La respiración es la única función autónoma — frecuencia cardíaca, digestión, respuesta inmune — que puedes anular voluntariamente. Una sola exhalación lenta activa el nervio vago y te cambia de lucha-o-huida a descanso-y-digestión en segundos.',
        stat: 'Efecto en menos de 90 segundos',
      },
      {
        icon: '🧠',
        title: 'Enfoque y Cognición Mejorados',
        body: 'La respiración nasal produce óxido nítrico, un vasodilatador que ensancha los vasos sanguíneos. Los estudios muestran que esto aumenta la oxigenación de la corteza prefrontal — tu sede de pensamiento racional, planificación y enfoque — hasta un 18%.',
        stat: 'Hasta 18% más O₂ al cerebro',
      },
      {
        icon: '💆',
        title: 'Alivio del Estrés y la Ansiedad',
        body: 'La exhalación es el interruptor natural de tu cuerpo para el estrés. Prolongar la exhalación más que la inhalación activa el sistema nervioso parasimpático, suprime la amígdala (centro de amenazas) y reduce el cortisol — la principal hormona del estrés — de manera medible.',
        stat: 'El cortisol baja en una sola sesión',
      },
      {
        icon: '❤️',
        title: 'Presión Arterial Más Baja',
        body: 'La respiración coherente a 5,5 respiraciones por minuto sincroniza corazón, pulmones y cerebro en un estado llamado resonancia. Los ensayos clínicos muestran que esto reduce la presión sistólica en 5–10 mmHg en una sola sesión, con reducciones duraderas con práctica diaria.',
        stat: 'Reducción de 5–10 mmHg por sesión',
      },
      {
        icon: '📈',
        title: 'Mayor Variabilidad de la Frecuencia Cardíaca',
        body: 'La VFC — la variación en el tiempo entre latidos — es uno de los predictores más fuertes de longevidad y resiliencia. La respiración diafragmática lenta es la forma no farmacéutica más potente de aumentarla, entrenando tu corazón para responder con flexibilidad a cualquier demanda.',
        stat: 'El mejor predictor de longevidad',
      },
      {
        icon: '😴',
        title: 'Sueño Más Profundo',
        body: 'Respirar por la boca durante el sueño reduce la calidad del mismo al alterar el equilibrio de O₂ y CO₂, causando microdespertares y ronquidos. La respiración nasal y la práctica diafragmática antes de dormir activan el estado parasimpático necesario para el sueño de ondas lentas.',
        stat: 'Respiración nasal = 25% más sueño REM',
      },
      {
        icon: '🛡️',
        title: 'Función Inmune Más Fuerte',
        body: 'El óxido nítrico producido en las fosas nasales tiene potentes propiedades antivirales y antibacterianas. Los estudios de Wim Hof (Universidad Radboud, 2014) demostraron que la respiración consciente activa directamente el sistema inmune — los sujetos produjeron significativamente menos marcadores inflamatorios al recibir endotoxina.',
        stat: 'Revisado por pares: modulación inmune confirmada',
      },
      {
        icon: '🔥',
        title: 'Más Energía',
        body: 'Las técnicas de respiración energética (Bhastrika, Kapalabhati, Wim Hof) estimulan el sistema nervioso simpático, aumentan el suministro celular de oxígeno y generan calor interno mediante la termogénesis. Los practicantes reportan un aumento de energía natural equivalente a dos tazas de café — sin el bajón posterior.',
        stat: 'La producción mitocondrial aumenta de manera medible',
      },
      {
        icon: '😌',
        title: 'Regulación Emocional y Estado de Ánimo',
        body: 'La amígdala — el centro de alarma del cerebro — se calma directamente con exhalaciones lentas y prolongadas. Se ha demostrado en estudios de EEG que el zumbido Bhramari reduce la activación de la amígdala y disminuye el cortisol salival. La práctica regular literalmente reconfigura la reactividad emocional en semanas.',
        stat: 'Actividad de la amígdala reducida en minutos',
      },
      {
        icon: '🌬️',
        title: 'Mayor Tolerancia al CO₂',
        body: 'Contrariamente a la creencia popular, las ganas de respirar son desencadenadas por el aumento de CO₂ — no por la caída de O₂. La mayoría de las personas tienen baja tolerancia al CO₂ y respiran en exceso crónicamente, manteniéndose ansiosas y reactivas. Entrenar la tolerancia a través de retenciones y respiraciones lentas construye una base más calmada y resiliente.',
        stat: 'La clave oculta de la calma',
      },
    ],
    diaphTitle: 'Cómo Respirar Desde el Diafragma',
    diaphIntro: 'La respiración diafragmática es la base de todas las técnicas en esta aplicación. Es como estás diseñado para respirar — y como casi nadie respira en la edad adulta.',
    diaphWhatTitle: '¿Qué es el diafragma?',
    diaphWhat: 'El diafragma es un músculo grande en forma de cúpula que se asienta en la base de los pulmones, separando el tórax del abdomen. Cuando se contrae y se aplana hacia abajo, crea un vacío que atrae aire profundamente hacia los lóbulos inferiores de los pulmones — las regiones más ricas en oxígeno. La respiración torácica usa aproximadamente ⅓ de la capacidad pulmonar. La respiración diafragmática usa el pulmón completo — además de estimular las fibras del nervio vago que recorren el propio diafragma.',
    diaphStepsTitle: 'Paso a paso: apréndelo en 5 minutos',
    diaphSteps: [
      { num: '1', text: 'Acuéstate boca arriba. Coloca tu mano derecha en el vientre (justo encima del ombligo) y tu mano izquierda en el pecho.' },
      { num: '2', text: 'Cierra la boca. Inhala lentamente por la nariz durante 4 tiempos. Tu mano derecha (vientre) debe subir. Tu mano izquierda (pecho) apenas debe moverse.' },
      { num: '3', text: 'Haz una breve pausa en la cima — solo una pausa natural y relajada, sin forzar.' },
      { num: '4', text: 'Exhala lentamente por la nariz o labios fruncidos durante 6–8 tiempos. Siente cómo el vientre cae completamente hacia la columna.' },
      { num: '5', text: 'Repite durante 10 respiraciones. Con cada ciclo, intenta enviar la respiración más profundo — siente la caja torácica expandirse lateralmente además de que el vientre avanza.' },
    ],
    diaphCheckTitle: 'Cómo saber si está funcionando',
    diaphChecks: [
      'Tu vientre sube y baja más que tu pecho',
      'Tus hombros permanecen relajados y bajos',
      'Sientes un efecto calmante en 2–3 minutos',
      'Tu exhalación es más larga y completa que tu inhalación',
    ],
    diaphMistakeTitle: 'El error más común',
    diaphMistake: 'Meter el estómago hacia adentro al inhalar. Esto es lo contrario de lo que quieres. En la inhalación, el vientre se ablanda y se expande hacia afuera mientras el diafragma desciende. En la exhalación, el vientre se retrae mientras el diafragma asciende.',
    diaphPracticeTitle: 'Construyendo el hábito',
    diaphPractice: 'Practica 5 minutos acostado todos los días durante una semana. En 7 días tu patrón de respiración en reposo comenzará a cambiar automáticamente — incluso durante el estrés. Este es el hábito de mayor apalancamiento en toda la aplicación.',
    scienceNote: 'Referencias: Zelano et al. (2016), Russo et al. (2017), Kox et al. (2014), Lehrer & Gevirtz (2014), McKeown (2015), Nestor (2020)',
    cta: 'Empezar a respirar →',
  },
};

interface Props {
  onBack: () => void;
  onContinue?: () => void;
}

export default function BreathScienceScreen({ onBack, onContinue }: Props) {
  const { lang } = useLang();
  const c = CONTENT[lang];

  return (
    <div className="bsci-page">
      <div className="bsci-wrap">

        <button className="bsci-back" onClick={onBack}>{c.back}</button>

        <div className="bsci-hero">
          <span className="bsci-badge">{c.badge}</span>
          <h1 className="bsci-headline">{c.headline}</h1>
          <p className="bsci-sub">{c.sub}</p>
        </div>

        <section className="bsci-section">
          <h2 className="bsci-section-title">{c.whyTitle}</h2>
          <div className="bsci-reasons">
            {c.reasons.map((r, i) => (
              <div className="bsci-reason" key={i}>
                <div className="bsci-reason-header">
                  <span className="bsci-reason-icon">{r.icon}</span>
                  <div>
                    <div className="bsci-reason-num">0{i + 1}</div>
                    <div className="bsci-reason-title">{r.title}</div>
                  </div>
                </div>
                <p className="bsci-reason-body">{r.body}</p>
                {r.stat && (
                  <div className="bsci-stat">{r.stat}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bsci-section bsci-diaphr">
          <h2 className="bsci-section-title">{c.diaphTitle}</h2>
          <p className="bsci-diaphr-intro">{c.diaphIntro}</p>

          <div className="bsci-card">
            <h3 className="bsci-card-title">{c.diaphWhatTitle}</h3>
            <p className="bsci-card-body">{c.diaphWhat}</p>
          </div>

          <div className="bsci-card">
            <h3 className="bsci-card-title">{c.diaphStepsTitle}</h3>
            <ol className="bsci-steps">
              {c.diaphSteps.map((s, i) => (
                <li key={i} className="bsci-step">
                  <span className="bsci-step-num">{s.num}</span>
                  <span className="bsci-step-text">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bsci-card bsci-card--green">
            <h3 className="bsci-card-title">{c.diaphCheckTitle}</h3>
            <ul className="bsci-checks">
              {c.diaphChecks.map((ch, i) => (
                <li key={i} className="bsci-check">
                  <span className="bsci-check-mark">✓</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bsci-card bsci-card--amber">
            <h3 className="bsci-card-title">⚠ {c.diaphMistakeTitle}</h3>
            <p className="bsci-card-body">{c.diaphMistake}</p>
          </div>

          <div className="bsci-card">
            <h3 className="bsci-card-title">🗓 {c.diaphPracticeTitle}</h3>
            <p className="bsci-card-body">{c.diaphPractice}</p>
          </div>
        </section>

        <div className="bsci-science-note">{c.scienceNote}</div>

        <button className="bsci-cta" onClick={onContinue ?? onBack}>{c.cta}</button>

      </div>
    </div>
  );
}
