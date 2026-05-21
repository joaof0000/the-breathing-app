import { useState } from 'react';
import { GOAL_BUTTONS, GOALS } from '../data/goals';
import './GoalScreen.css';

interface Props {
  onSelectTech: (tech: string | null) => void;
}

export default function GoalScreen({ onSelectTech }: Props) {
  const [activePicker, setActivePicker] = useState<string | null>(null);

  const goal = activePicker ? GOALS[activePicker] : null;

  return (
    <div className="page1">
      <div className="p1-wrap">
        <div className="p1-title">Breathwork</div>
        <p className="p1-sub">What do you need today?</p>

        <div className="goal-grid">
          {GOAL_BUTTONS.map(btn => (
            <button key={btn.key} className="goal-btn" onClick={() => setActivePicker(btn.key)}>
              <span className="goal-icon">{btn.icon}</span>
              <span className="goal-label">{btn.label}</span>
              <span className="goal-sub">{btn.sub}</span>
            </button>
          ))}
        </div>

        <button className="p1-browse" onClick={() => onSelectTech(null)}>
          Browse all techniques →
        </button>
      </div>

      {activePicker && goal && (
        <div className="picker-overlay open" onClick={e => { if (e.target === e.currentTarget) setActivePicker(null); }}>
          <div className="picker-sheet">
            <div className="picker-goal">{goal.label}</div>
            <div className="picker-prompt">Choose your technique</div>
            <div className="picker-choices">
              {goal.choices.map((c, i) => (
                <button key={c.tech} className="picker-choice" onClick={() => { setActivePicker(null); onSelectTech(c.tech); }}>
                  <span className="pc-num">{i + 1}</span>
                  <div>
                    <div className="pc-name">{c.name}</div>
                    <div className="pc-desc">{c.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button className="picker-cancel" onClick={() => setActivePicker(null)}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
