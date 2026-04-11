import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ParallaxProvider } from "@/components/ui/ParallaxProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="flex flex-col min-h-screen">
        {/* Parallax: updates --scroll-y CSS variable on scroll */}
        <ParallaxProvider />
        <Navbar />
        {/* pt compensates fixed navbar: mobile=64px, desktop≈110px */}
        <div className="pt-[64px] lg:pt-[30px]">
          <HeroSection />
          <SkillsSection />
          <div className="h-[60px] lg:h-[80px]" />
          {/*
            About + Projects share one dot-pattern section.
            A centered separator line (max 640px) divides them.
          */}
          <section className="dot-pattern relative w-full">
            <AboutSection />
            {/* Separator — 640px centered, not full-width */}
            <div className="relative z-10 mx-auto my-[60px] lg:my-[80px] h-[1px] bg-[#4d4c4c]"
              style={{ width: "min(640px, calc(100% - 48px))" }}
            />
            <ProjectsSection />
          </section>
        </div>
      </main>
    </LanguageProvider>
  );
}
