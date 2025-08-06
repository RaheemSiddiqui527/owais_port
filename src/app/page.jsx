// app/page.jsx or pages/index.jsx
"use client";

import PerformanceLayout from "@/components/layout/PerformanceLayout";
import CursorTrail from "@/components/layout/CursorTrail/cursorTrail";
import Navbar from "@/components/layout/navbar/navbar";
import HeroBanner from "@/components/home/hero/hero";
import Skills from "@/components/home/skills/skills";
import Projects from "@/components/home/projects/projects";

export default function Home() {
  return (
    <PerformanceLayout>
      <CursorTrail />
      <Navbar />

      <main>
        {/* Hero Section - Shows "Shams Ali" when hovered */}
        <section data-cursor-text="Shams Ali">
          <HeroBanner />
        </section>

        {/* Skills Section - Shows "My Skills" when hovered */}
        <section data-cursor-text="My Skills">
          <Skills />
        </section>

        {/* Projects Section - Shows "My Projects" when hovered */}
        <section data-cursor-text="My Projects">
          <Projects />
        </section>
      </main>
    </PerformanceLayout>
  );
}
