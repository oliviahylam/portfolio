"use client";
import { useState, useCallback } from "react";
import EditorialNav from "@/components/layout/EditorialNav";
import HeroCover    from "@/components/home/HeroCover";
import WorkGrid     from "@/components/work/WorkGrid";
import Footer       from "@/components/layout/Footer";
import { PROJECTS } from "@/data/projects";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleFilter = useCallback((cat) => {
    setActiveCategory(cat);
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  }, []);

  return (
    <>
      <EditorialNav />
      <main>
        <HeroCover />
        <WorkGrid
          projects={PROJECTS}
          activeCategory={activeCategory}
          onFilter={handleFilter}
        />
        <Footer />
      </main>
    </>
  );
}
