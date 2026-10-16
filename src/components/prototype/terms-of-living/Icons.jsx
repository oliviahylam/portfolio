// ============================================================
//  Icons — vector pieces from the Terms of Living wireframes.
//  Drawn in code to match the Figma layers (glow rings,
//  checkmark, tab icons). Swap for exported SVGs if needed.
// ============================================================

import { useId } from "react";

// Teal ring with a soft glow — used for the onboarding orb,
// the logo mark and the Home tab icon.
export function GlowRing({ size, stroke = size * 0.09, blur = size * 0.06 }) {
  const id = useId();
  const r = (size - stroke) / 2;
  const pad = blur * 3;
  const box = size + pad * 2;
  const c = box / 2;

  return (
    <svg
      width={box}
      height={box}
      viewBox={`0 0 ${box} ${box}`}
      style={{ margin: -pad, display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0"   stopColor="#c9fff9" />
          <stop offset="0.45" stopColor="#75cdeb" stopOpacity="0.7" />
          <stop offset="1"   stopColor="#75cdeb" stopOpacity="0.08" />
        </linearGradient>
        <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <circle cx={c} cy={c} r={r} fill="none" stroke={`url(#${id}g)`} strokeWidth={stroke * 1.6} filter={`url(#${id}b)`} />
      <circle cx={c} cy={c} r={r} fill="none" stroke={`url(#${id}g)`} strokeWidth={stroke * 0.6} />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" aria-hidden="true">
      <path d="M1 5.6 4.4 9 11 1.4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Tab bar: two linked nodes
export function ChoicesIcon() {
  return (
    <svg width="40" height="19" viewBox="0 0 40 19" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="8" stroke="#75cdeb" strokeWidth="3" />
      <path d="M17.5 9.5h12" stroke="#75cdeb" strokeWidth="3" />
      <circle cx="32.5" cy="9.5" r="7.5" fill="#75cdeb" />
    </svg>
  );
}

// Tab bar: outlined square
export function InventoryIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="20" height="20" stroke="#75cdeb" strokeWidth="3" />
    </svg>
  );
}

// Tab bar: outlined triangle
export function PermitIcon() {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" aria-hidden="true">
      <path d="M13.5 2.6 25 22H2L13.5 2.6Z" stroke="#75cdeb" strokeWidth="3" strokeLinejoin="miter" />
    </svg>
  );
}
