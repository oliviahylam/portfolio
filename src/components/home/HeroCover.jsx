'use client';

import { useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';
import { SITE, DISCIPLINES } from '@/data/projects';
import KineticBackground from './KineticBackground';
import Portrait from './Portrait';
import styles from './HeroCover.module.css';

export default function HeroCover() {
  const coverRef = useRef(null);
  const mouse = useMouse(coverRef);

  return (
    <section
      ref={coverRef}
      className={styles.cover}
      aria-label="Homepage hero"
    >
      {/* Layer 1 — kinetic editorial type background */}
      <KineticBackground mouseX={mouse.x} mouseY={mouse.y} />

      {/* Layer 2 — portrait, centered */}
      <Portrait mouseX={mouse.x} mouseY={mouse.y} />

      {/* Layer 3 — editorial UI chrome */}
      <div className={styles.ui} aria-hidden="true">

        {/* Left vertical strip */}
        <aside className={styles.leftStrip}>
          <div className={styles.stripLine} />
          <span className={styles.stripText}>{SITE.school} — {SITE.year}</span>
          <div className={styles.stripLine} />
        </aside>

        {/* Right side: issue number + metadata */}
        <aside className={styles.rightStrip}>
          <span className={styles.issueNum}>01</span>
          <div className={styles.issueMeta}>
            {SITE.volume} — {SITE.year}<br />
            {SITE.role}<br />
            {SITE.location}
          </div>
        </aside>

        {/* Bottom centre: name + discipline tags */}
        <div className={styles.bottomCenter}>
          <p className={styles.namePlate}>
            {SITE.name} — {SITE.role}
          </p>
          <div className={styles.disciplineRow}>
            {DISCIPLINES.map((d, i) => (
              <span key={d} className={styles.discItem}>
                <span className={styles.discTag}>{d}</span>
                {i < DISCIPLINES.length - 1 && (
                  <span className={styles.discDot} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar: scroll + cursor coords */}
        <div className={styles.bottomBar}>
          <div className={styles.scrollHint}>
            <div className={styles.scrollTick} />
            Scroll
          </div>
          <span className={styles.cursorXY}>
            {Math.round(mouse.raw.x * 100)}, {Math.round(mouse.raw.y * 100)}
          </span>
        </div>

        {/* Availability badge */}
        {SITE.availability && (
          <div className={styles.availBadge}>
            <span className={styles.availDot} />
            {SITE.availability}
          </div>
        )}
      </div>
    </section>
  );
}
