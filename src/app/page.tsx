import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutSection } from "@/components/sections/AboutSection";
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
          <AboutSection />
        </div>
      </main>
    </LanguageProvider>
  );
}
