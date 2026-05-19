// components/home/HeroCover.jsx
// The full-viewport hero "cover" section.
// Combines: KineticBackground + Portrait + editorial UI chrome.
// Mouse tracking is owned here and passed to children.

'use client';

import { useRef, useState } from 'react';
import { useMouse } from '../../hooks/useMouse';
import { SITE_META, DISCIPLINES } from '../../data/content';
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
      <div className={styles.chrome} aria-hidden="true">

        {/* Left vertical strip */}
        <aside className={styles.leftStrip}>
          <div className={styles.stripLine} />
          <span className={styles.stripText}>Parsons — {SITE_META.year}</span>
          <div className={styles.stripLine} />
        </aside>

        {/* Right side: issue number + metadata */}
        <aside className={styles.rightStrip}>
          <span className={styles.issueNum}>01</span>
          <div className={styles.issueMeta}>
            Vol. I — {SITE_META.year}<br />
            {SITE_META.program}<br />
            {SITE_META.location}
          </div>
        </aside>

        {/* Bottom centre: name + discipline tags */}
        <div className={styles.bottomCentre}>
          <p className={styles.nameTag}>
            {SITE_META.name} — {SITE_META.program}
          </p>
          <div className={styles.disciplines}>
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
          <span className={styles.coords}>
            {Math.round(mouse.raw.x * 100)}, {Math.round(mouse.raw.y * 100)}
          </span>
        </div>

        {/* Availability badge — top-right under nav */}
        {SITE_META.available && (
          <div className={styles.availBadge}>
            <span className={styles.availDot} />
            Available for {SITE_META.availableFor}
          </div>
        )}
      </div>
    </section>
  );
}
