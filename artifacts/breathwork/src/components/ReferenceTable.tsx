import { REFERENCE_TABLE } from '../data/techniques';
import { useLang } from '../i18n/LangContext';
import './ReferenceTable.css';

interface Props {
  onActivateTech: (tech: string) => void;
}

export default function ReferenceTable({ onActivateTech }: Props) {
  const { t } = useLang();
  const sit = t.reference.situations as Record<string, string>;

  return (
    <div className="ref-section">
      <div className="ref-title">{t.reference.title}</div>
      <table className="ref-table">
        <thead>
          <tr>
            <th>{t.reference.situation}</th>
            <th>{t.reference.bestChoice}</th>
            <th>{t.reference.alsoTry}</th>
          </tr>
        </thead>
        <tbody>
          {REFERENCE_TABLE.map((row, i) => (
            <tr key={i}>
              <td>{sit[row.situation] ?? row.situation}</td>
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
      <p className="ref-note">{t.reference.tapNote}</p>
    </div>
  );
}
