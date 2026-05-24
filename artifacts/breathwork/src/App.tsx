import { useState } from 'react';
import GoalScreen from './components/GoalScreen';
import SessionScreen from './components/SessionScreen';
import SacredGeometry from './components/SacredGeometry';
import WelcomeScreen from './components/WelcomeScreen';
import { loadProfile } from './hooks/useProfile';
import { loadLastTech } from './hooks/useSessionStorage';
import { LangProvider, useLang } from './i18n/LangContext';
import { LANGS } from './i18n/lang';
import './App.css';
import './components/SacredGeometry.css';

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

type Page = 'welcome' | 'goal' | 'session';

function AppInner() {
  const [page, setPage] = useState<Page>(() => {
    const p = loadProfile();
    return p.name ? 'goal' : 'welcome';
  });
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [profile,      setProfile]      = useState(() => loadProfile());
  const [lastTech,     setLastTech]     = useState<string | null>(() => loadLastTech());

  const handleWelcomeDone = () => {
    setProfile(loadProfile());
    setPage('goal');
  };

  const handleSelectTech = (tech: string | null, goalKey?: string) => {
    setSelectedTech(tech);
    setSelectedGoal(goalKey ?? null);
    setPage('session');
  };

  const handleSessionBack = () => {
    setProfile(loadProfile());
    setLastTech(loadLastTech());
    setPage('goal');
    setSelectedTech(null);
  };

  const handleGoalBack = () => {
    setPage('welcome');
  };

  return (
    <div className="app">
      <div className="grain" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
      <SacredGeometry />

      <LangToggle />

      {page === 'welcome' ? (
        <WelcomeScreen onContinue={handleWelcomeDone} />
      ) : page === 'goal' ? (
        <GoalScreen
          onSelectTech={handleSelectTech}
          name={profile.name}
          intention={profile.intention}
          onBack={handleGoalBack}
          lastTech={lastTech}
        />
      ) : (
        <SessionScreen
          initialTech={selectedTech}
          onBack={handleSessionBack}
          gratitude=""
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
