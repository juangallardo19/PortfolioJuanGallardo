import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
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
          {/*
            About + Projects share one dot-pattern section.
            A centered separator line (max 640px) divides them.
          */}
          <section className="dot-pattern relative w-full">
            {/* Spacer inside dot-pattern so the dots cover this gap too */}
            <div className="h-[60px] lg:h-[80px]" />
            <AboutSection />
            {/* Separator — 640px centered, not full-width */}
            <div className="relative z-10 mx-auto my-[60px] lg:my-[80px] h-[1px] bg-[#4d4c4c]"
              style={{ width: "min(640px, calc(100% - 48px))" }}
            />
            <ProjectsSection />
            {/* Separator after Projects — mirrors the one above */}
            <div
              className="relative z-10 mx-auto mt-[60px] lg:mt-[80px] h-[1px] bg-[#4d4c4c]"
              style={{ width: "min(640px, calc(100% - 48px))" }}
            />
            <div className="h-[80px] lg:h-[120px]" />
          </section>
          <TestimonialsSection />
          <ExperienceSection />
          {/* Separator — dot-pattern keeps the background continuous between the two sections */}
          <div className="dot-pattern relative py-[40px] lg:py-[60px]">
            <div
              className="relative z-10 mx-auto h-[1px] bg-[#4d4c4c]"
              style={{ width: "min(640px, calc(100% - 48px))" }}
            />
          </div>
          <ContactSection />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
