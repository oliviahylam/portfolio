"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE } from "@/data/projects";
import styles from "./EditorialNav.module.css";

const NAV_LINKS = [
  { label: "Work",    href: "/#work"              },
  { label: "About",   href: "/about"              },
  { label: "Contact", href: `mailto:${SITE.email}` },
];

export default function EditorialNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      aria-label="Main navigation"
    >
      <Link href="/" className={styles.logo}>{SITE.initials}</Link>

      <span className={styles.tagline}>{SITE.role}</span>

      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.link}>{label}</a>
          </li>
        ))}
        <li>
          <a href={SITE.cvUrl} className={styles.cvBtn} download>CV ↓</a>
        </li>
      </ul>
    </nav>
  );
}
