'use client';

import { useEffect, useRef } from 'react';
import { BG_WORDS } from '@/data/projects';
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

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const animate = () => {
      stateRef.current.forEach((s, i) => {
        const word = BG_WORDS[i];
        const el = wordRefs.current[i];
        if (!el) return;

        s.tx += s.vx;
        s.ty += s.vy;
        if (Math.abs(s.tx) > 10) s.vx *= -1;
        if (Math.abs(s.ty) > 7)  s.vy *= -1;

        const px = (0.5 - mouseRef.current.x) * 14;
        const py = (0.5 - mouseRef.current.y) * 9;

        el.style.transform = `
          rotate(${word.rotate + s.tx * 0.05}deg)
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
          key={word.text + i}
          ref={(el) => (wordRefs.current[i] = el)}
          className={styles.word}
          style={{
            fontSize:  `${word.size}px`,
            left:      `${word.x}%`,
            top:       `${word.y}%`,
            opacity:   word.opacity,
            transform: `rotate(${word.rotate}deg)`,
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}
