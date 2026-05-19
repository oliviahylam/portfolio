"use client";
import ProjectCard from "./ProjectCard";
import styles from "./WorkGrid.module.css";

const FILTERS = [
  { label: "All Work",     value: "all"         },
  { label: "UI/UX",        value: "ui-ux"       },
  { label: "Coding",       value: "coding"      },
  { label: "Branding",     value: "branding"    },
  { label: "Typography",   value: "typography"  },
  { label: "Experimental", value: "experimental"},
];

const SECTIONS = [
  { num: "01", label: "UI/UX",        value: "ui-ux"       },
  { num: "02", label: "Interaction",  value: "coding"      },
  { num: "03", label: "Branding",     value: "branding"    },
  { num: "04", label: "Typography",   value: "typography"  },
  { num: "05", label: "Experimental", value: "experimental"},
];

export default function WorkGrid({ projects, activeCategory = "all", onFilter }) {
  const isAll = activeCategory === "all";
  const filtered = isAll ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className={styles.section} aria-label="Selected work">

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.sectionLabel}>Selected Work</span>
          <span className={styles.sectionYears}>2023–2025</span>
        </div>
        <div className={styles.filters} role="group" aria-label="Filter by category">
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

      {/* All work: grouped by category with section headings */}
      {isAll ? (
        SECTIONS.map(({ num, label, value }) => {
          const items = projects.filter((p) => p.category === value);
          if (!items.length) return null;
          return (
            <div key={value} className={styles.categoryBlock}>
              <div className={styles.catDivider}>
                <span className={styles.catNum}>{num}</span>
                <span className={styles.catName}>{label}</span>
                <div className={styles.catLine} />
              </div>
              <div className={styles.grid}>
                {items.map((p) => (
                  <ProjectCard key={p.id} project={p} featured={p.featured} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.categoryBlock}>
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} featured={p.featured && filtered.length > 1} />
            ))}
            {filtered.length === 0 && (
              <p className={styles.empty}>No projects in this category yet.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
