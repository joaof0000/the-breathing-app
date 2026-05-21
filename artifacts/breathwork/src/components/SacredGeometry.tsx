import './SacredGeometry.css';

export default function SacredGeometry() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="sacred-geo"
      aria-hidden="true"
    >
      {/* Center */}
      <circle cx="50" cy="50" r="15" />
      {/* Inner ring */}
      <circle cx="50" cy="35"    r="15" />
      <circle cx="50" cy="65"    r="15" />
      <circle cx="37.01" cy="42.5" r="15" />
      <circle cx="62.99" cy="42.5" r="15" />
      <circle cx="37.01" cy="57.5" r="15" />
      <circle cx="62.99" cy="57.5" r="15" />
      {/* Outer ring */}
      <circle cx="50"    cy="20"   r="15" />
      <circle cx="50"    cy="80"   r="15" />
      <circle cx="24.02" cy="35"   r="15" />
      <circle cx="75.98" cy="35"   r="15" />
      <circle cx="24.02" cy="65"   r="15" />
      <circle cx="75.98" cy="65"   r="15" />
      <circle cx="37.01" cy="27.5" r="15" />
      <circle cx="62.99" cy="27.5" r="15" />
      <circle cx="37.01" cy="72.5" r="15" />
      <circle cx="62.99" cy="72.5" r="15" />
      {/* Outer boundary */}
      <circle cx="50" cy="50" r="30" strokeWidth="0.3" />
    </svg>
  );
}
