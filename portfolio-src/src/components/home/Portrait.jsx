// components/home/Portrait.jsx
// Illustrated avatar that reacts to mouse position:
//   - Eyes follow cursor
//   - Head tilts subtly toward mouse
//   - Eyebrows raise when mouse is high
//   - Smile widens when cursor is centered
//   - Periodic blinking
//
// To restyle the portrait: edit the SVG shapes below.
// Skin, hair, and clothing colors are set as inline fills —
// search for hex values like #c8a882 to change them.

'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Portrait.module.css';

export default function Portrait({ mouseX = 0.5, mouseY = 0.5 }) {
  const svgRef       = useRef(null);
  const discRef      = useRef(null);
  const pupilLRef    = useRef(null);
  const pupilRRef    = useRef(null);
  const shineLRef    = useRef(null);
  const shineRRef    = useRef(null);
  const browLRef     = useRef(null);
  const browRRef     = useRef(null);
  const mouthRef     = useRef(null);
  const lidLRef      = useRef(null);
  const lidRRef      = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const mouseRef     = useRef({ x: 0.5, y: 0.5 });
  const rafRef       = useRef(null);

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  // Animation loop: update portrait elements based on mouse
  useEffect(() => {
    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;

      // Head tilt
      if (svgRef.current) {
        const tiltX = (mx - 0.5) * 7;
        const tiltY = (my - 0.5) * 4;
        svgRef.current.style.transform =
          `rotate(${tiltX * 0.38}deg) translateY(${tiltY * 0.5}px)`;
      }
      // Disc parallax
      if (discRef.current) {
        const tiltX = (mx - 0.5) * 7;
        const tiltY = (my - 0.5) * 4;
        discRef.current.style.transform =
          `translate(${tiltX * 0.9}px, ${tiltY * 0.6}px)`;
      }

      // Eye movement (clamped)
      const MAX = 3.5;
      const ex = Math.max(-MAX, Math.min(MAX, (mx - 0.5) * 8));
      const ey = Math.max(-MAX, Math.min(MAX, (my - 0.5) * 6));

      // Left pupil + shine
      if (pupilLRef.current) {
        pupilLRef.current.setAttribute('cx', 76 + ex);
        pupilLRef.current.setAttribute('cy', 92 + ey);
      }
      if (shineLRef.current) {
        shineLRef.current.setAttribute('cx', 78 + ex);
        shineLRef.current.setAttribute('cy', 90 + ey);
      }
      // Right pupil + shine
      if (pupilRRef.current) {
        pupilRRef.current.setAttribute('cx', 104 + ex);
        pupilRRef.current.setAttribute('cy', 92 + ey);
      }
      if (shineRRef.current) {
        shineRRef.current.setAttribute('cx', 106 + ex);
        shineRRef.current.setAttribute('cy', 90 + ey);
      }

      // Brow expression (raise when mouse is near top)
      const browRaise = (0.5 - my) * 6;
      if (browLRef.current)
        browLRef.current.setAttribute('d',
          `M66 ${81 - browRaise} Q76 ${77 - browRaise} 86 ${80 - browRaise}`);
      if (browRRef.current)
        browRRef.current.setAttribute('d',
          `M94 ${80 - browRaise} Q104 ${77 - browRaise} 114 ${81 - browRaise}`);

      // Smile (widens when cursor is centered horizontally)
      const smileFactor = 1 - Math.abs(mx - 0.5) * 2.2;
      const smileY = 114 + Math.max(0, smileFactor) * 6;
      if (mouthRef.current)
        mouthRef.current.setAttribute('d', `M80 112 Q90 ${smileY} 100 112`);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Blink loop
  useEffect(() => {
    let timeout;
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 120);
      }, 2200 + Math.random() * 2400);
    };
    timeout = setTimeout(scheduleBlink, 1400);
    return () => clearTimeout(timeout);
  }, []);

  const lidRY = isBlinking ? 7 : 0;

  return (
    <div className={styles.stage}>
      {/* Concentric rings around portrait */}
      <div className={styles.ringOuter} />
      <div className={styles.ringInner} />

      {/* Background disc that shifts with head tilt */}
      <div className={styles.disc} ref={discRef} />

      {/* The actual illustrated SVG */}
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Illustrated portrait of the designer"
      >
        {/* ── Body / torso ─────────────────────────────── */}
        {/* Change fill to adjust clothing color */}
        <ellipse cx="90" cy="148" rx="38" ry="28" fill="#2a2520" opacity="0.9" />

        {/* ── Shirt collar — change fill for shirt color ── */}
        <path d="M62 148 L78 128 L90 136 L102 128 L118 148" fill="#1a3a6b" />

        {/* ── Neck ── */}
        <rect x="80" y="108" width="20" height="20" rx="8" fill="#c8a882" />

        {/* ── Head ── change fill for skin tone */}
        <ellipse cx="90" cy="94" rx="32" ry="34" fill="#c8a882" />

        {/* ── Ears ── */}
        <ellipse cx="59"  cy="94" rx="6" ry="8" fill="#c09070" />
        <ellipse cx="121" cy="94" rx="6" ry="8" fill="#c09070" />

        {/* ── Hair base — change fill for hair color ── */}
        <ellipse cx="90" cy="72" rx="32" ry="18" fill="#1a1410" />
        <ellipse cx="90" cy="65" rx="28" ry="14" fill="#231b15" />

        {/* ── Eye whites ── */}
        <ellipse cx="76"  cy="92" rx="9" ry="7" fill="white" />
        <ellipse cx="104" cy="92" rx="9" ry="7" fill="white" />

        {/* ── Pupils (moved by JS) ── */}
        <circle ref={pupilLRef} cx="76"  cy="92" r="4.5" fill="#1a1410" />
        <circle ref={pupilRRef} cx="104" cy="92" r="4.5" fill="#1a1410" />

        {/* ── Shine dots (moved by JS) ── */}
        <circle ref={shineLRef} cx="78"  cy="90" r="1.5" fill="white" />
        <circle ref={shineRRef} cx="106" cy="90" r="1.5" fill="white" />

        {/* ── Eyelids (blink) ── */}
        <ellipse ref={lidLRef} cx="76"  cy="92" rx="9" ry={lidRY} fill="#c8a882" style={{ transition: 'ry 0.05s' }} />
        <ellipse ref={lidRRef} cx="104" cy="92" rx="9" ry={lidRY} fill="#c8a882" style={{ transition: 'ry 0.05s' }} />

        {/* ── Eyebrows (moved by JS) ── */}
        <path ref={browLRef} d="M66 81 Q76 77 86 80" fill="none" stroke="#1a1410" strokeWidth="2.5" strokeLinecap="round" />
        <path ref={browRRef} d="M94 80 Q104 77 114 81" fill="none" stroke="#1a1410" strokeWidth="2.5" strokeLinecap="round" />

        {/* ── Nose ── */}
        <path d="M87 100 Q90 108 93 100" fill="none" stroke="#a07858" strokeWidth="1.5" strokeLinecap="round" />

        {/* ── Mouth (moved by JS) ── */}
        <path ref={mouthRef} d="M80 112 Q90 118 100 112" fill="none" stroke="#8a5a3a" strokeWidth="2" strokeLinecap="round" />

        {/* ── Glasses — remove this group to remove glasses ── */}
        <rect x="64"  y="86" width="22" height="15" rx="4" fill="none" stroke="#2a2520" strokeWidth="1.5" opacity="0.7" />
        <rect x="94"  y="86" width="22" height="15" rx="4" fill="none" stroke="#2a2520" strokeWidth="1.5" opacity="0.7" />
        <line x1="86" y1="93" x2="94" y2="93" stroke="#2a2520" strokeWidth="1.5" opacity="0.7" />
        <line x1="64" y1="90" x2="56" y2="87" stroke="#2a2520" strokeWidth="1.5" opacity="0.7" />
        <line x1="116" y1="90" x2="124" y2="87" stroke="#2a2520" strokeWidth="1.5" opacity="0.7" />
      </svg>
    </div>
  );
}
