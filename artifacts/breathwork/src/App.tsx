import { useState } from 'react';
import GoalScreen from './components/GoalScreen';
import SessionScreen from './components/SessionScreen';
import SacredGeometry from './components/SacredGeometry';
import WelcomeScreen from './components/WelcomeScreen';
import BellyBreathingScreen from './components/BellyBreathingScreen';
import BreathScienceScreen from './components/BreathScienceScreen';
import { loadProfile } from './hooks/useProfile';
import { LangProvider, useLang } from './i18n/LangContext';
import { LANGS } from './i18n/lang';
import './App.css';
import './components/SacredGeometry.css';

const WELCOME_KEY = 'breathwork_welcomed';

function hasSeenWelcome(): boolean {
  try { return localStorage.getItem(WELCOME_KEY) === '1'; }
  catch { return false; }
}

function markWelcomeSeen() {
  try { localStorage.setItem(WELCOME_KEY, '1'); }
  catch { /* empty */ }
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle">
      {LANGS.map(l => (
        <button
          key={l}
          className={`lang-btn ${lang === l ? 'on' : ''}`}
          onClick={() => setLang(l)}
          aria-label={l.toUpperCase()}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

type Page = 'welcome' | 'belly-basics' | 'goal' | 'session' | 'breathscience';

function AppInner() {
  const [page, setPage] = useState<Page>(
    hasSeenWelcome() ? 'goal' : 'welcome'
  );
  const [selectedTech, setSelectedTech]   = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal]   = useState<string | null>(null);
  const [gratitude,    setGratitude]      = useState('');
  const [profile,      setProfile]        = useState(() => loadProfile());

  const handleNew = () => { setPage('belly-basics'); };

  const handleExperienced = () => {
    markWelcomeSeen();
    setProfile(loadProfile());
    setPage('goal');
  };

  const handleBellyDone = () => {
    markWelcomeSeen();
    setProfile(loadProfile());
    setPage('goal');
  };

  const handleSelectTech = (tech: string | null, goalKey?: string) => {
    setSelectedTech(tech);
    setSelectedGoal(goalKey ?? null);
    setPage('session');
  };

  const handleBack = () => {
    setProfile(loadProfile());
    setPage('goal');
    setSelectedTech(null);
  };

  const handleOpenScience  = () => setPage('breathscience');
  const handleCloseScience = () => setPage('goal');

  return (
    <div className="app">
      <div className="grain" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
      <SacredGeometry />

      <LangToggle />

      {page === 'welcome' ? (
        <WelcomeScreen onNew={handleNew} onExperienced={handleExperienced} />
      ) : page === 'belly-basics' ? (
        <BellyBreathingScreen onContinue={handleBellyDone} />
      ) : page === 'breathscience' ? (
        <BreathScienceScreen onBack={handleCloseScience} />
      ) : page === 'goal' ? (
        <GoalScreen
          onSelectTech={handleSelectTech}
          gratitude={gratitude}
          onGratitudeChange={setGratitude}
          name={profile.name}
          intention={profile.intention}
          onOpenScience={handleOpenScience}
        />
      ) : (
        <SessionScreen
          initialTech={selectedTech}
          onBack={handleBack}
          gratitude={gratitude}
          goalKey={selectedGoal ?? undefined}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
