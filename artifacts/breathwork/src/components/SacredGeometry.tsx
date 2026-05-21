export default function SacredGeometry() {
  const r = 100;
  const cx = 400;
  const cy = 400;

  const circles = [
    // Center
    { x: cx, y: cy },
    // Ring 1 — 6 circles at distance r (every 60°)
    { x: cx + r,           y: cy },
    { x: cx + r * 0.5,     y: cy + r * 0.866 },
    { x: cx - r * 0.5,     y: cy + r * 0.866 },
    { x: cx - r,           y: cy },
    { x: cx - r * 0.5,     y: cy - r * 0.866 },
    { x: cx + r * 0.5,     y: cy - r * 0.866 },
    // Ring 2 — 6 circles at distance r√3 (every 60°, offset 30°)
    { x: cx + r * 1.5,     y: cy + r * 0.866 },
    { x: cx,               y: cy + r * 1.732 },
    { x: cx - r * 1.5,     y: cy + r * 0.866 },
    { x: cx - r * 1.5,     y: cy - r * 0.866 },
    { x: cx,               y: cy - r * 1.732 },
    { x: cx + r * 1.5,     y: cy - r * 0.866 },
    // Ring 3 — 6 circles at distance 2r (every 60°)
    { x: cx + r * 2,       y: cy },
    { x: cx + r,           y: cy + r * 1.732 },
    { x: cx - r,           y: cy + r * 1.732 },
    { x: cx - r * 2,       y: cy },
    { x: cx - r,           y: cy - r * 1.732 },
    { x: cx + r,           y: cy - r * 1.732 },
  ];

  return (
    <div className="sacred-geometry-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="sacred-geometry-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="fol-clip">
            <circle cx={cx} cy={cy} r={r * 2.12} />
          </clipPath>
        </defs>

        {/* Outer bounding circles */}
        <circle cx={cx} cy={cy} r={r * 3} fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.35" />
        <circle cx={cx} cy={cy} r={r * 2.12} fill="none" stroke="#c9a84c" strokeWidth="0.4" opacity="0.5" />

        {/* Flower of Life petals — clipped to inner boundary */}
        <g clipPath="url(#fol-clip)">
          {circles.map((c, i) => (
            <circle
              key={i}
              cx={c.x}
              cy={c.y}
              r={r}
              fill="none"
              stroke="#c9a84c"
              strokeWidth="0.65"
            />
          ))}
        </g>

        {/* Central dot */}
        <circle cx={cx} cy={cy} r="2.5" fill="#c9a84c" opacity="0.6" />

        {/* Six-pointed star (Star of David) connecting the inner ring */}
        <polygon
          points={`
            ${cx},${cy - r * 1.155}
            ${cx + r},${cy + r * 0.577}
            ${cx - r},${cy + r * 0.577}
          `}
          fill="none" stroke="#c9a84c" strokeWidth="0.35" opacity="0.5"
        />
        <polygon
          points={`
            ${cx},${cy + r * 1.155}
            ${cx + r},${cy - r * 0.577}
            ${cx - r},${cy - r * 0.577}
          `}
          fill="none" stroke="#c9a84c" strokeWidth="0.35" opacity="0.5"
        />
      </svg>
    </div>
  );
}
