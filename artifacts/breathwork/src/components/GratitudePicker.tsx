import { useState } from 'react';
import './GratitudePicker.css';

export const GRATITUDE_ITEMS = [
  { id: 'g01', cat: 'Body',    text: 'My body breathing without my asking' },
  { id: 'g02', cat: 'Body',    text: 'The gift of sleep and rest I received' },
  { id: 'g03', cat: 'Body',    text: 'My heart beating steadily right now' },
  { id: 'g04', cat: 'Body',    text: 'The sensation of air filling my lungs' },
  { id: 'g05', cat: 'Body',    text: 'My body\'s remarkable capacity to heal' },
  { id: 'g06', cat: 'Body',    text: 'My senses — touch, sight, sound, taste' },
  { id: 'g07', cat: 'Body',    text: 'The warmth of breath moving through me' },
  { id: 'g08', cat: 'Body',    text: 'The resilience stored inside this body' },

  { id: 'g09', cat: 'People',  text: 'The people who have shown me kindness' },
  { id: 'g10', cat: 'People',  text: 'Someone who believed in me when I didn\'t' },
  { id: 'g11', cat: 'People',  text: 'A moment of love I carry in my memory' },
  { id: 'g12', cat: 'People',  text: 'Anyone who has held space for my pain' },
  { id: 'g13', cat: 'People',  text: 'The strangers who once offered me grace' },
  { id: 'g14', cat: 'People',  text: 'A friendship that has stood through storms' },
  { id: 'g15', cat: 'People',  text: 'The love I have given — and received' },

  { id: 'g16', cat: 'Growth',  text: 'Every hard day that made me stronger' },
  { id: 'g17', cat: 'Growth',  text: 'Each time I chose to begin again' },
  { id: 'g18', cat: 'Growth',  text: 'The courage I didn\'t know I had' },
  { id: 'g19', cat: 'Growth',  text: 'My ability to feel things so deeply' },
  { id: 'g20', cat: 'Growth',  text: 'Every lesson wrapped inside difficulty' },
  { id: 'g21', cat: 'Growth',  text: 'The progress I cannot yet fully see' },
  { id: 'g22', cat: 'Growth',  text: 'My willingness to keep going' },
  { id: 'g23', cat: 'Growth',  text: 'That I am still here. Still trying.' },

  { id: 'g24', cat: 'Now',     text: 'This breath, right now' },
  { id: 'g25', cat: 'Now',     text: 'The quiet this practice is giving me' },
  { id: 'g26', cat: 'Now',     text: 'This stillness in the middle of a full world' },
  { id: 'g27', cat: 'Now',     text: 'That I chose to show up today' },
  { id: 'g28', cat: 'Now',     text: 'This moment, which is always enough' },
  { id: 'g29', cat: 'Now',     text: 'The peace that lives beneath my thoughts' },

  { id: 'g30', cat: 'Simple',  text: 'Clean water and nourishment' },
  { id: 'g31', cat: 'Simple',  text: 'A safe and quiet place to practice' },
  { id: 'g32', cat: 'Simple',  text: 'The light surrounding me right now' },
  { id: 'g33', cat: 'Simple',  text: 'Warmth and shelter I take for granted' },
  { id: 'g34', cat: 'Simple',  text: 'Small beauty I often walk past' },
  { id: 'g35', cat: 'Simple',  text: 'The technology that connects me to others' },
  { id: 'g36', cat: 'Simple',  text: 'Anything that made me smile today' },

  { id: 'g37', cat: 'Journey', text: 'How far I have already come' },
  { id: 'g38', cat: 'Journey', text: 'The version of me still fighting' },
  { id: 'g39', cat: 'Journey', text: 'Every day I have not given up' },
  { id: 'g40', cat: 'Journey', text: 'My capacity and desire for change' },
  { id: 'g41', cat: 'Journey', text: 'The patience I am slowly learning' },
  { id: 'g42', cat: 'Journey', text: 'That recovery is not linear — and that is okay' },
  { id: 'g43', cat: 'Journey', text: 'Every single moment I chose myself' },
  { id: 'g44', cat: 'Journey', text: 'The next breath — always a new beginning' },
];

const CATEGORIES = ['All', 'Body', 'People', 'Growth', 'Now', 'Simple', 'Journey'];

interface Props {
  selected: string;
  onSelect: (text: string) => void;
}

export default function GratitudePicker({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? GRATITUDE_ITEMS : GRATITUDE_ITEMS.filter(g => g.cat === cat);

  return (
    <div className="gratitude-block">
      <button className="gratitude-header" onClick={() => setOpen(o => !o)}>
        <span className="gratitude-title">Gratitude</span>
        <span className="gratitude-preview">
          {selected ? `"${selected}"` : '+ choose one'}
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
                {c}
              </button>
            ))}
          </div>
          <div className="gratitude-list">
            {filtered.map(g => (
              <button
                key={g.id}
                className={`gratitude-item ${selected === g.text ? 'on' : ''}`}
                onClick={() => {
                  onSelect(selected === g.text ? '' : g.text);
                  if (selected !== g.text) setOpen(false);
                }}
              >
                <span className="gi-cat">{g.cat}</span>
                <span className="gi-text">{g.text}</span>
                {selected === g.text && <span className="gi-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
