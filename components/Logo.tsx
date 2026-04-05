export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Steam lines */}
      <path
        d="M11 8 Q11 5, 13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
        className="animate-steam-1"
      />
      <path
        d="M16 7 Q16 4, 18 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
        className="animate-steam-2"
      />
      {/* Teapot body */}
      <ellipse cx="14" cy="19" rx="9" ry="7" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="2" />
      {/* Spout */}
      <path
        d="M23 17 Q27 15, 28 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Handle */}
      <path
        d="M5 15 Q1 17, 2 21 Q3 24, 5 23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lid */}
      <ellipse cx="14" cy="12.5" rx="6" ry="1.5" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      {/* Lid knob */}
      <circle cx="14" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}
