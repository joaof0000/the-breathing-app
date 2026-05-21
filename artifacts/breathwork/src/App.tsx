import { useState } from 'react';
import GoalScreen from './components/GoalScreen';
import SessionScreen from './components/SessionScreen';
import './App.css';

export default function App() {
  const [page, setPage] = useState<'goal' | 'session'>('goal');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

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

      {page === 'goal' ? (
        <GoalScreen onSelectTech={handleSelectTech} />
      ) : (
        <SessionScreen initialTech={selectedTech} onBack={handleBack} />
      )}
    </div>
  );
}
