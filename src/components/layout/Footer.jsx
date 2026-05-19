// ============================================================
//  Footer
//  Minimal editorial footer. Replace email and social links.
// ============================================================

import styles from "./Footer.module.css";
import { SITE } from "@/data/projects";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.logo}>{SITE.initials}</span>
        <span className={styles.meta}>
          {SITE.role} — {SITE.school}, {SITE.year}
        </span>
      </div>

      <div className={styles.center}>
        <p className={styles.availability}>{SITE.availability}</p>
        <a href={`mailto:${SITE.email}`} className={styles.email}>
          {SITE.email}
        </a>
      </div>

      <div className={styles.right}>
        {/* Add / remove social links here */}
        <a href="https://linkedin.com/in/yourname" className={styles.social} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://twitter.com/yourhandle"   className={styles.social} target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://github.com/yourhandle"    className={styles.social} target="_blank" rel="noreferrer">GitHub</a>
        <a href={SITE.cvUrl} className={styles.social} download>CV ↓</a>
      </div>
    </footer>
  );
}
