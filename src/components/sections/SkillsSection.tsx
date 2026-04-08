"use client";

import Image from "next/image";

const SKILLS = [
  { name: "React",        icon: "/assets/icon-react.svg",      card: 1 },
  { name: "TypeScript",   icon: "/assets/icon-typescript.svg", card: 2 },
  { name: "HTML",         icon: "/assets/icon-html5.svg",      card: 3 },
  { name: "Java",         icon: "/assets/icon-java.svg",       card: 1 },
  { name: "Tailwind CSS", icon: "/assets/icon-tailwind.svg",   card: 2 },
  { name: "Python",       icon: "/assets/icon-python.svg",     card: 3 },
  { name: "C++",          icon: "/assets/icon-cpp.svg",        card: 1 },
  { name: "Git",          icon: "/assets/icon-git.svg",        card: 2 },
  { name: "Figma",        icon: "/assets/icon-figma.svg",      card: 3 },
];

export function SkillsSection() {
  return (
    <section
      id="habilidades"
      className="dot-pattern-green relative w-full overflow-hidden"
      style={{ minHeight: 680 }}
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[80px] w-full max-w-[1338px] mx-auto px-5 sm:px-10 lg:px-[50px] py-[50px]">

        {/* ── Left: Skills grid ──────────────────────────────── */}
        <div
          className="bg-white rounded-[28px] p-6 lg:p-8 shrink-0"
          style={{ boxShadow: "0px 8px 32px rgba(0,0,0,0.14)", border: "3px solid rgba(0,0,0,0.06)" }}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="relative"
                style={{ width: 120, height: 120 }}
              >
                {/* Organic card border (contains white bg + brush border + dots) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/skill-card-${skill.card}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-[5px] pb-[10px]">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={46}
                    height={46}
                    className="object-contain"
                  />
                  <span
                    className="font-bold text-[11px] text-[#1a1a1a] text-center leading-[1.2] px-1"
                    style={{ fontFamily: "var(--font-big-shoulders)" }}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Photo ───────────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative" style={{ width: 380, height: 420 }}>
            {/* Teal decorative blob behind the photo */}
            <Image
              src="/assets/skills-section-bg.png"
              alt=""
              fill
              className="object-contain object-center"
              aria-hidden="true"
            />

            {/* Photo + white organic blob frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative overflow-hidden"
                style={{ width: 260, height: 300 }}
              >
                <Image
                  src="/assets/hero-photo.png"
                  alt="Juan Pablo Gallardo"
                  fill
                  className="object-cover object-top"
                />
                {/* White organic frame overlay */}
                <Image
                  src="/assets/subtract-card.png"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
