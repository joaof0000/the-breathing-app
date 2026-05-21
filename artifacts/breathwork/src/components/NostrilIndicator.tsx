import './NostrilIndicator.css';

interface Props {
  show: boolean;
  left: string;
  right: string;
}

export default function NostrilIndicator({ show, left, right }: Props) {
  if (!show) return null;

  return (
    <div className="nostril-ind">
      <div className={`nos left nos-${left}`}>
        <span className="nos-label">L</span>
      </div>
      <div className="nos-center">
        <svg viewBox="0 0 30 50" width="30" height="50">
          <path d="M15 5 C 6 5 3 18 3 28 C 3 38 8 44 15 44 C 22 44 27 38 27 28 C 27 18 24 5 15 5 Z" fill="none" stroke="var(--faint)" strokeWidth="1.2" />
          <line x1="15" y1="5" x2="15" y2="44" stroke="var(--faint)" strokeWidth="0.8" />
        </svg>
      </div>
      <div className={`nos right nos-${right}`}>
        <span className="nos-label">R</span>
      </div>
    </div>
  );
}
