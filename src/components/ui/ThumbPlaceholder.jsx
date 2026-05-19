"use client";

const PATTERNS = {
  grid: ({ w, h }) => (
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.25">
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`v${i}`} x1={(w / 10) * i} y1="0" x2={(w / 10) * i} y2={h} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={(h / 7) * i} x2={w} y2={(h / 7) * i} />
      ))}
    </g>
  ),
  circles: ({ w, h }) => (
    <g stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25">
      {[40, 70, 100, 130, 160].map((r) => (
        <circle key={r} cx={w / 2} cy={h / 2} r={r} />
      ))}
    </g>
  ),
  lines: ({ w, h }) => (
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.25">
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1="0" y1={(h / 18) * i} x2={w} y2={(h / 18) * i} />
      ))}
    </g>
  ),
  dots: ({ w, h }) => (
    <g fill="currentColor" opacity="0.2">
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <circle key={`${row}-${col}`} cx={(w / 12) * col + w / 24} cy={(h / 8) * row + h / 16} r="2" />
        ))
      )}
    </g>
  ),
  text: ({ w, h }) => (
    <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="middle" fontSize="60" fontWeight="700" fill="currentColor" opacity="0.07" letterSpacing="-2">
      TYPE
    </text>
  ),
  wave: ({ w, h }) => {
    const pts = Array.from({ length: 60 }, (_, i) => {
      const x = (w / 59) * i;
      const y = h / 2 + Math.sin((i / 59) * Math.PI * 4) * (h * 0.15);
      return `${x},${y}`;
    }).join(" ");
    return <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />;
  },
};

export default function ThumbPlaceholder({ pattern = "grid" }) {
  const w = 600;
  const h = 400;
  const Pattern = PATTERNS[pattern] ?? PATTERNS.grid;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", height: "100%", color: "#1a1410", background: "#e8e4dc" }}
      aria-hidden="true"
    >
      <Pattern w={w} h={h} />
    </svg>
  );
}
