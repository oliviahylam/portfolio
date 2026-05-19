"use client";

// ============================================================
//  WorkGrid
//  The scrollable project section below the hero cover.
//  Includes a filter bar and a responsive grid of ProjectCards.
//
//  Props:
//    projects       — PROJECTS array from data/projects.js
//    activeCategory — currently selected filter (string)
//    onFilter(cat)  — called when user clicks a filter button
// ============================================================

import { PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import styles from "./WorkGrid.module.css";

const FILTERS = [
  { label: "All",         value: "all"          },
  { label: "UI/UX",       value: "ui-ux"        },
  { label: "Coding",      value: "coding"        },
  { label: "Branding",    value: "branding"      },
  { label: "Typography",  value: "typography"    },
  { label: "Experimental",value: "experimental"  },
];

export default function WorkGrid({ projects, activeCategory = "all", onFilter }) {
  const visible =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className={styles.section} aria-label="Selected work">

      {/* Section header */}
      <div className={styles.header}>
        <span className={styles.sectionTitle}>Selected Work — 2023–2025</span>

        {/* Filter buttons */}
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${activeCategory === f.value ? styles.active : ""}`}
              onClick={() => onFilter(f.value)}
              aria-pressed={activeCategory === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div className={styles.grid}>
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={project.featured && activeCategory === "all"}
          />
        ))}

        {visible.length === 0 && (
          <p className={styles.empty}>No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
