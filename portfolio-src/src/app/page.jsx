"use client";

// ============================================================
//  Homepage (/)
//  Composes the full page:
//    1. HeroCover   — full-viewport editorial cover
//    2. WorkGrid    — filterable project grid
//    3. Footer
//
//  activeCategory state is shared between the nav inside
//  HeroCover and the filter bar inside WorkGrid, so clicking
//  a nav category instantly filters + scrolls to work.
// ============================================================

import { useState, useCallback } from "react";
import HeroCover  from "@/components/home/HeroCover";
import WorkGrid   from "@/components/work/WorkGrid";
import Footer     from "@/components/layout/Footer";
import { SITE, BG_WORDS, PROJECTS, FEATURED_PROJECT } from "@/data/projects";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Called by both HeroCover nav links and WorkGrid filter bar
  const handleFilter = useCallback((cat) => {
    // "about" is a page link, not a filter
    if (cat === "about") {
      window.location.href = "/about";
      return;
    }
    setActiveCategory(cat);
    // Scroll to work section after a short delay so React re-renders first
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  }, []);

  return (
    <main>
      {/* ── 1. Full-viewport editorial cover ── */}
      <HeroCover
        site={site}
        words={BG_WORDS}
        featured={FEATURED_PROJECT}
        onNavClick={handleFilter}
      />

      {/* ── 2. Filterable project grid ── */}
      <WorkGrid
        projects={PROJECTS}
        activeCategory={activeCategory}
        onFilter={setActiveCategory}
      />

      {/* ── 3. Footer ── */}
      <Footer />
    </main>
  );
}

// Alias so the component reads cleanly above
const site = SITE;
