// ============================================================
//  Case Study page — /work/[slug]
//  Renders a full project case study from the PROJECTS array.
//  Add content to the project object in data/projects.js —
//  this file never needs to be edited per-project.
// ============================================================

import Image from "next/image";
import Link  from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import styles from "./CaseStudy.module.css";

// Generate static paths at build time for all projects
export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  // Find next project for bottom navigation
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject  = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <article className={styles.article}>

      {/* ── Back link ─────────────────────────────────── */}
      <nav className={styles.backNav}>
        <Link href="/" className={styles.backLink}>← All Work</Link>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <header className={styles.hero}>
        <span className={styles.cat}>{project.categoryLabel}</span>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.subtitle}>{project.subtitle}</p>

        {/* Metadata strip */}
        <dl className={styles.meta}>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.tools.join(", ")}</dd>
          </div>
        </dl>
      </header>

      {/* ── Hero image ────────────────────────────────── */}
      <div className={styles.heroImage}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <div className={styles.heroImagePlaceholder}>
            <span className={styles.placeholderLabel}>
              Add a hero image: set project.thumbnail in data/projects.js
            </span>
          </div>
        )}
      </div>

      {/* ── Body sections ─────────────────────────────── */}
      <div className={styles.body}>

        {project.context && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Context</h2>
            <p className={styles.prose}>{project.context}</p>
          </section>
        )}

        {project.problem && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Problem</h2>
            <blockquote className={styles.pullQuote}>{project.problem}</blockquote>
          </section>
        )}

        {/* Process phases */}
        {project.process?.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Process</h2>
            <div className={styles.processList}>
              {project.process.map((phase, i) => (
                <div key={phase.phase} className={styles.phase}>
                  <div className={styles.phaseNum}>{String(i + 1).padStart(2, "0")}</div>
                  <div className={styles.phaseContent}>
                    <h3 className={styles.phaseTitle}>{phase.phase}</h3>
                    <p className={styles.prose}>{phase.description}</p>

                    {/* Process images */}
                    {phase.images?.length > 0 && (
                      <div className={styles.imageGrid}>
                        {phase.images.map((src, j) => (
                          <div key={j} className={styles.processImage}>
                            <Image src={src} alt={`${phase.phase} image ${j + 1}`} fill style={{ objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.outcome && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Outcome</h2>
            <p className={styles.prose}>{project.outcome}</p>
          </section>
        )}

        {project.reflection && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Reflection</h2>
            <p className={styles.prose}>{project.reflection}</p>
          </section>
        )}

        {/* Links */}
        <div className={styles.links}>
          {project.prototypeUrl && (
            <a href={project.prototypeUrl} className={styles.ctaLink} target="_blank" rel="noreferrer">
              View Prototype →
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={styles.ctaLink} target="_blank" rel="noreferrer">
              Live Site →
            </a>
          )}
        </div>
      </div>

      {/* ── Next project ──────────────────────────────── */}
      <div className={styles.nextProject}>
        <span className={styles.nextLabel}>Next Project</span>
        <Link href={`/work/${nextProject.slug}`} className={styles.nextLink}>
          {nextProject.title} →
        </Link>
      </div>

    </article>
  );
}
