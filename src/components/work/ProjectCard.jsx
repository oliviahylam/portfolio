// ============================================================
//  ProjectCard
//  Renders a single project in the work grid.
//  Hover inverts the card (paper → ink).
//
//  Props:
//    project  — one item from PROJECTS array in data/projects.js
//    featured — boolean, if true the card spans 2 grid columns
// ============================================================

import Image from "next/image";
import Link from "next/link";
import ThumbPlaceholder from "@/components/ui/ThumbPlaceholder";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, featured = false }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      aria-label={`View case study: ${project.title}`}
    >
      {/* Thumbnail */}
      <div className={styles.thumb}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <ThumbPlaceholder pattern={project.thumbPattern} />
        )}
      </div>

      {/* Meta */}
      <div className={styles.cat}>{project.categoryLabel}</div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.shortDescription}</p>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.year}>{project.year}</span>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
