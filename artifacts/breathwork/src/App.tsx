import { useState } from 'react';
import GoalScreen from './components/GoalScreen';
import SessionScreen from './components/SessionScreen';
import SacredGeometry from './components/SacredGeometry';
import WelcomeScreen from './components/WelcomeScreen';
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

function AppInner() {
  const [page, setPage] = useState<'welcome' | 'goal' | 'session'>(
    hasSeenWelcome() ? 'goal' : 'welcome'
  );
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [gratitude, setGratitude] = useState('');

  const handleBegin = () => { markWelcomeSeen(); setPage('goal'); };

  const handleSelectTech = (tech: string | null) => {
    setSelectedTech(tech);
    setPage('session');
  };

  const handleBack = () => {
    setPage('goal');
    setSelectedTech(null);
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
        <WelcomeScreen onBegin={handleBegin} />
      ) : page === 'goal' ? (
        <GoalScreen
          onSelectTech={handleSelectTech}
          gratitude={gratitude}
          onGratitudeChange={setGratitude}
        />
      ) : (
        <SessionScreen
          initialTech={selectedTech}
          onBack={handleBack}
          gratitude={gratitude}
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
