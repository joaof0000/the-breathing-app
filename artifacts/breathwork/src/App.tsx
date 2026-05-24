import { useState } from 'react';
import GoalScreen from './components/GoalScreen';
import SessionScreen from './components/SessionScreen';
import SacredGeometry from './components/SacredGeometry';
import WelcomeScreen from './components/WelcomeScreen';
import { loadProfile } from './hooks/useProfile';
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
  const [page, setPage]               = useState<Page>(() => {
    const p = loadProfile();
    return p.name ? 'goal' : 'welcome';
  });
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [gratitude,    setGratitude]    = useState('');
  const [profile,      setProfile]      = useState(() => loadProfile());
  const [welcomeStep,  setWelcomeStep]  = useState<'teach' | undefined>(undefined);

  const handleWelcomeDone = (grat: string) => {
    setGratitude(grat);
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
    setPage('goal');
    setSelectedTech(null);
  };

  const handleGoalBack = () => {
    setWelcomeStep('teach');
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
        <WelcomeScreen onContinue={handleWelcomeDone} initialStep={welcomeStep} />
      ) : page === 'goal' ? (
        <GoalScreen
          onSelectTech={handleSelectTech}
          name={profile.name}
          intention={profile.intention}
          onBack={handleGoalBack}
        />
      ) : (
        <SessionScreen
          initialTech={selectedTech}
          onBack={handleSessionBack}
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
