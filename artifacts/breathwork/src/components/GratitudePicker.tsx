import { useState } from 'react';
import { useLang } from '../i18n/LangContext';
import './GratitudePicker.css';

export const GRATITUDE_ITEMS = [
  { id: 'g01', cat: 'Body' },
  { id: 'g02', cat: 'Body' },
  { id: 'g03', cat: 'Body' },
  { id: 'g04', cat: 'Body' },
  { id: 'g05', cat: 'Body' },
  { id: 'g06', cat: 'Body' },
  { id: 'g07', cat: 'Body' },
  { id: 'g08', cat: 'Body' },
  { id: 'g09', cat: 'People' },
  { id: 'g10', cat: 'People' },
  { id: 'g11', cat: 'People' },
  { id: 'g12', cat: 'People' },
  { id: 'g13', cat: 'People' },
  { id: 'g14', cat: 'People' },
  { id: 'g15', cat: 'People' },
  { id: 'g16', cat: 'Growth' },
  { id: 'g17', cat: 'Growth' },
  { id: 'g18', cat: 'Growth' },
  { id: 'g19', cat: 'Growth' },
  { id: 'g20', cat: 'Growth' },
  { id: 'g21', cat: 'Growth' },
  { id: 'g22', cat: 'Growth' },
  { id: 'g23', cat: 'Growth' },
  { id: 'g24', cat: 'Now' },
  { id: 'g25', cat: 'Now' },
  { id: 'g26', cat: 'Now' },
  { id: 'g27', cat: 'Now' },
  { id: 'g28', cat: 'Now' },
  { id: 'g29', cat: 'Now' },
  { id: 'g30', cat: 'Simple' },
  { id: 'g31', cat: 'Simple' },
  { id: 'g32', cat: 'Simple' },
  { id: 'g33', cat: 'Simple' },
  { id: 'g34', cat: 'Simple' },
  { id: 'g35', cat: 'Simple' },
  { id: 'g36', cat: 'Simple' },
  { id: 'g37', cat: 'Journey' },
  { id: 'g38', cat: 'Journey' },
  { id: 'g39', cat: 'Journey' },
  { id: 'g40', cat: 'Journey' },
  { id: 'g41', cat: 'Journey' },
  { id: 'g42', cat: 'Journey' },
  { id: 'g43', cat: 'Journey' },
  { id: 'g44', cat: 'Journey' },
];

const CATEGORIES = ['All', 'Body', 'People', 'Growth', 'Now', 'Simple', 'Journey'] as const;

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function GratitudePicker({ selected, onSelect }: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState('All');

  const items = t.gratitude.items as Record<string, string>;
  const cats = t.gratitude.cats as Record<string, string>;

  const filtered = cat === 'All'
    ? GRATITUDE_ITEMS
    : GRATITUDE_ITEMS.filter(g => g.cat === cat);

  const selectedText = selected ? (items[selected] ?? selected) : '';

  return (
    <div className="gratitude-block">
      <button className="gratitude-header" onClick={() => setOpen(o => !o)}>
        <span className="gratitude-title">{t.gratitude.title}</span>
        <span className="gratitude-preview">
          {selected ? `"${selectedText}"` : t.gratitude.addCue}
        </span>
        <span className="gratitude-caret">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="gratitude-body">
          <div className="gratitude-cats">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`gcat-btn ${cat === c ? 'on' : ''}`}
                onClick={() => setCat(c)}
              >
                {cats[c] ?? c}
              </button>
            ))}
          </div>
          <div className="gratitude-list">
            {filtered.map(g => {
              const text = items[g.id] ?? g.id;
              const catLabel = cats[g.cat] ?? g.cat;
              return (
                <button
                  key={g.id}
                  className={`gratitude-item ${selected === g.id ? 'on' : ''}`}
                  onClick={() => {
                    onSelect(selected === g.id ? '' : g.id);
                    if (selected !== g.id) setOpen(false);
                  }}
                >
                  <span className="gi-cat">{catLabel}</span>
                  <span className="gi-text">{text}</span>
                  {selected === g.id && <span className="gi-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
