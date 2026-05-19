// components/home/KineticBackground.jsx
// Renders large editorial words that slowly drift and parallax with mouse.
// Word positions and content are configured in data/content.js → BG_WORDS.

'use client';

import { useEffect, useRef } from 'react';
import { BG_WORDS } from '../../data/content';
import styles from './KineticBackground.module.css';

export default function KineticBackground({ mouseX = 0.5, mouseY = 0.5 }) {
  const wordRefs = useRef([]);
  const stateRef = useRef(
    BG_WORDS.map(() => ({
      tx: 0,
      ty: 0,
      vx: (Math.random() - 0.5) * 0.07,
      vy: (Math.random() - 0.5) * 0.05,
    }))
  );
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Keep mouseRef in sync without triggering re-renders
  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const animate = () => {
      stateRef.current.forEach((s, i) => {
        const word = BG_WORDS[i];
        const el = wordRefs.current[i];
        if (!el) return;

        // Slow autonomous drift
        s.tx += s.vx;
        s.ty += s.vy;
        if (Math.abs(s.tx) > 10) s.vx *= -1;
        if (Math.abs(s.ty) > 7)  s.vy *= -1;

        // Parallax offset based on mouse (words move opposite to cursor)
        const px = (0.5 - mouseRef.current.x) * 14;
        const py = (0.5 - mouseRef.current.y) * 9;

        el.style.transform = `
          rotate(${word.r + s.tx * 0.05}deg)
          translate(${s.tx + px}px, ${s.ty + py}px)
        `;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className={styles.layer} aria-hidden="true">
      {BG_WORDS.map((word, i) => (
        <span
          key={word.t + i}
          ref={(el) => (wordRefs.current[i] = el)}
          className={styles.word}
          style={{
            fontSize:  `${word.s}px`,
            left:      `${word.x}%`,
            top:       `${word.y}%`,
            opacity:   word.o,
            transform: `rotate(${word.r}deg)`,
          }}
        >
          {word.t}
        </span>
      ))}
    </div>
  );
}
