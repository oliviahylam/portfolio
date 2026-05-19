"use client";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThumbPlaceholder from "@/components/ui/ThumbPlaceholder";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, featured = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["3.5deg", "-3.5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-3.5deg", "3.5deg"]);

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      className={`${styles.wrapper} ${featured ? styles.featured : ""}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={`/work/${project.slug}`}
        className={styles.card}
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
          <div className={styles.thumbOverlay} />
        </div>

        {/* Content */}
        <div className={styles.body}>
          <div className={styles.metaRow}>
            <span className={styles.cat}>{project.categoryLabel}</span>
            <span className={styles.year}>{project.year}</span>
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.desc}>{project.shortDescription}</p>

          {project.tags?.length > 0 && (
            <div className={styles.tags}>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className={styles.arrow} aria-hidden="true">→</div>
        </div>
      </Link>
    </motion.div>
  );
}
