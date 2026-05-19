"use client";
import { useRef } from "react";
import { useMouse } from "@/hooks/useMouse";
import { SITE, DISCIPLINES } from "@/data/projects";
import KineticBackground from "./KineticBackground";
import Portrait from "./Portrait";
import styles from "./HeroCover.module.css";

export default function HeroCover() {
  const coverRef = useRef(null);
  const mouse = useMouse(coverRef);

  const [firstName, ...rest] = SITE.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section ref={coverRef} className={styles.cover} aria-label="Homepage hero">

      {/* 0 — kinetic text background */}
      <KineticBackground mouseX={mouse.x} mouseY={mouse.y} />

      {/* 1 — first name: sits BEHIND the portrait */}
      <div className={styles.nameBack} aria-hidden="true">
        <span className={styles.nameFirst}>{firstName}</span>
      </div>

      {/* 2 — portrait in the middle layer */}
      <Portrait mouseX={mouse.x} mouseY={mouse.y} />

      {/* 3 — last name: sits IN FRONT of the portrait */}
      {lastName && (
        <div className={styles.nameFront} aria-hidden="true">
          <span className={styles.nameLast}>{lastName}</span>
        </div>
      )}

      {/* Accessible h1 (visually hidden) */}
      <h1 className={styles.srOnly}>{SITE.name}</h1>

      {/* 4 — UI chrome */}
      <div className={styles.chrome}>

        {/* Left vertical strip */}
        <aside className={styles.leftStrip}>
          <div className={styles.stripLine} />
          <span className={styles.stripText}>{SITE.school} — {SITE.year}</span>
          <div className={styles.stripLine} />
        </aside>

        {/* Right: issue number + meta */}
        <aside className={styles.rightStrip}>
          <span className={styles.issueNum}>01</span>
          <div className={styles.issueMeta}>
            {SITE.volume}<br />
            {SITE.role}<br />
            {SITE.location}
          </div>
        </aside>

        {/* Bottom center: tagline + CTA */}
        <div className={styles.bottomCenter}>
          <p className={styles.tagline}>{SITE.tagline}</p>
          <a href="#work" className={styles.cta}>
            <span className={styles.ctaLine} />
            View Work
            <span className={styles.ctaArrow}>↓</span>
          </a>
        </div>

        {/* Discipline tags row — top */}
        <div className={styles.disciplines}>
          {DISCIPLINES.map((d) => (
            <span key={d} className={styles.discTag}>{d}</span>
          ))}
        </div>

        {/* Availability dot */}
        {SITE.availability && (
          <div className={styles.availBadge}>
            <span className={styles.availDot} />
            {SITE.availability}
          </div>
        )}

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.scrollHint}>
            <div className={styles.scrollTick} />
            Scroll
          </div>
          <span className={styles.coords}>
            {Math.round(mouse.raw.x * 100)}, {Math.round(mouse.raw.y * 100)}
          </span>
        </div>

      </div>
    </section>
  );
}
