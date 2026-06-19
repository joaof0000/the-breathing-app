import { useState } from 'react';
import { useTheme } from 'next-themes';
import GoalScreen from './components/GoalScreen';
import SessionScreen from './components/SessionScreen';
import SacredGeometry from './components/SacredGeometry';
import WelcomeScreen from './components/WelcomeScreen';
import BreathingChoiceScreen from './components/BreathingChoiceScreen';
import BellyBreathingScreen from './components/BellyBreathingScreen';
import BreathScienceScreen from './components/BreathScienceScreen';
import { loadProfile } from './hooks/useProfile';
import { loadLastTech } from './hooks/useSessionStorage';
import { LangProvider, useLang } from './i18n/LangContext';
import { LANGS } from './i18n/lang';
import './App.css';
import './components/SacredGeometry.css';

function LangToggle() {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
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
      <button
        className="lang-btn theme-btn"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀' : '🌙'}
      </button>
    </div>
  );
}

type Page = 'welcome' | 'choice' | 'belly' | 'science' | 'goal' | 'session';

function AppInner() {
  const [page, setPage] = useState<Page>(() => {
    const p = loadProfile();
    return p.name ? 'goal' : 'welcome';
  });
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [profile,      setProfile]      = useState(() => loadProfile());
  const [lastTech,     setLastTech]     = useState<string | null>(() => loadLastTech());
  const [scienceFrom,  setScienceFrom]  = useState<'belly' | 'goal'>('goal');

  const handleWelcomeDone = () => {
    setProfile(loadProfile());
    setPage('choice');
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

  const handleReset = () => {
    setProfile({ name: '', intention: '', lastMatchedGoal: undefined });
    setLastTech(null);
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
      ) : page === 'choice' ? (
        <BreathingChoiceScreen
          onNew={() => setPage('belly')}
          onExperienced={() => setPage('goal')}
        />
      ) : page === 'belly' ? (
        <BellyBreathingScreen onContinue={() => { setScienceFrom('belly'); setPage('science'); }} />
      ) : page === 'science' ? (
        <BreathScienceScreen
          onBack={() => setPage(scienceFrom)}
          onContinue={() => setPage('goal')}
        />
      ) : page === 'goal' ? (
        <GoalScreen
          onSelectTech={handleSelectTech}
          name={profile.name}
          intention={profile.intention}
          lastMatchedGoal={profile.lastMatchedGoal}
          onBack={handleGoalBack}
          lastTech={lastTech}
          onProfileUpdate={() => setProfile(loadProfile())}
          onLearnMore={() => { setScienceFrom('goal'); setPage('science'); }}
          onReset={handleReset}
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
