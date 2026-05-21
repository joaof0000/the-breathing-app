import { REFERENCE_TABLE } from '../data/techniques';
import './ReferenceTable.css';

interface Props {
  onActivateTech: (tech: string) => void;
}

export default function ReferenceTable({ onActivateTech }: Props) {
  return (
    <div className="ref-section">
      <div className="ref-title">Quick Reference</div>
      <table className="ref-table">
        <thead>
          <tr>
            <th>Situation</th>
            <th>#1 Choice</th>
            <th>Also try</th>
          </tr>
        </thead>
        <tbody>
          {REFERENCE_TABLE.map((row, i) => (
            <tr key={i}>
              <td>{row.situation}</td>
              <td>
                <span className="ref-link" onClick={() => onActivateTech(row.best.tech)}>
                  {row.best.name}
                </span>
              </td>
              <td>{row.also}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="ref-note">Tap the #1 choice to switch to that technique instantly.</p>
    </div>
  );
}
