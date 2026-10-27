import { Link } from "react-router-dom";

// Recreated mark and wordmark inspired by the supplied logo.
// Replace with the official transparent logo file when available.
export default function Logo({ light = false }) {
  const dark = light ? "#ffffff" : "#14305a";
  const teal = light ? "#7fd0dc" : "#2596a8";

  return (
    <Link to="/" className="logo" aria-label="YOJAK NEXUS home">
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <g stroke={teal} strokeWidth="2" fill="none">
          <line x1="20" y1="8" x2="7" y2="18" />
          <line x1="20" y1="8" x2="33" y2="18" />
          <line x1="7" y1="18" x2="20" y2="31" />
          <line x1="33" y1="18" x2="20" y2="31" />
        </g>
        <circle cx="20" cy="8" r="5" fill={teal} />
        <circle cx="7" cy="18" r="3.5" fill={teal} />
        <circle cx="33" cy="18" r="3.5" fill={dark} />
        <circle cx="20" cy="31" r="3" fill={dark} />
      </svg>
      <span className="logo-text">
        <span style={{ color: dark }}>YOJAK</span>
        <span style={{ color: teal }}>NEXUS</span>
      </span>
    </Link>
  );
}