"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useLang, t } from "@/context/LanguageContext";

// card: matches Figma design (1=skill-card-1.svg, 2=skill-card-2.svg, 3=skill-card-3.svg)
const SKILLS = [
  { name: "React",        label: "React",         icon: "/assets/skills/icon-react.svg",      card: 1 },
  { name: "TypeScript",   label: "Type\nScript",  icon: "/assets/skills/icon-typescript.svg", card: 2 },
  { name: "HTML",         label: "HTML",          icon: "/assets/skills/icon-html5.svg",      card: 3 },
  { name: "Java",         label: "Java",          icon: "/assets/skills/icon-java.svg",       card: 3 },
  { name: "Tailwind CSS", label: "Tailwind\nCSS", icon: "/assets/skills/icon-tailwind.svg",   card: 1 },
  { name: "Python",       label: "Python",        icon: "/assets/skills/icon-python.svg",     card: 2 },
  { name: "C++",          label: "C++",           icon: "/assets/skills/icon-cpp.svg",        card: 1 },
  { name: "Git",          label: "Git",           icon: "/assets/skills/icon-git.svg",        card: 3 },
  { name: "Figma",        label: "Figma",         icon: "/assets/skills/icon-figma.svg",      card: 2 },
];

// Diagonal stagger: delay = (row + col) × 100ms for top-left → bottom-right wave
// Grid positions: [0,0]=0 [0,1]=1 [0,2]=2 [1,0]=1 [1,1]=2 [1,2]=3 [2,0]=2 [2,1]=3 [2,2]=4
const CARD_DELAYS = [0, 100, 200, 100, 200, 300, 200, 300, 400];

type AnimState = "idle" | "entering" | "exiting";

export function SkillsSection() {
  const { lang } = useLang();
  const skills = t.skills;
  const [descPre, descHighlight, descPost] = skills.description[lang];

  const leftRef       = useRef<HTMLDivElement>(null);
  const photoRef      = useRef<HTMLDivElement>(null);
  const skillsCardRef = useRef<HTMLDivElement>(null);
  const [leftAnim,       setLeftAnim]       = useState<AnimState>("idle");
  const [photoAnim,      setPhotoAnim]      = useState<AnimState>("idle");
  const [skillsCardAnim, setSkillsCardAnim] = useState<AnimState>("idle");

  useEffect(() => {
    const makeObs = (setter: React.Dispatch<React.SetStateAction<AnimState>>) =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter("entering");
          else setter(prev => (prev === "idle" ? "idle" : "exiting"));
        },
        { threshold: 0.2 }
      );
    const pairs: [React.RefObject<HTMLDivElement | null>, React.Dispatch<React.SetStateAction<AnimState>>][] = [
      [leftRef,       setLeftAnim],
      [photoRef,      setPhotoAnim],
      [skillsCardRef, setSkillsCardAnim],
    ];
    const observers = pairs.map(([ref, setter]) => {
      const obs = makeObs(setter);
      if (ref.current) obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section
      id="habilidades"
      className="dot-pattern-green relative flex items-center justify-center w-full overflow-hidden scroll-mt-[50%] lg:scroll-mt-[-50px]"
      style={{ minHeight: "max(920px, 110svh)" }}
    >
      {/* Background image — 75% opacity per design */}
      <Image
        src="/assets/skills/skills-section-bg.png"
        alt=""
        fill
        className="object-cover pointer-events-none opacity-75"
      />

      {/* Section organic frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/skills/skills-section-border.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none object-fill"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[60px] w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[60px] py-[40px] lg:py-[60px]">

        {/* ── LEFT: Skills grid — on mobile appears BELOW the right column ── */}
        <div
          ref={leftRef}
          className={`relative shrink-0 overflow-visible w-[min(540px,calc(100vw-48px))] aspect-square order-2 lg:order-1 ${
            leftAnim === "entering" ? "animate-fade-in-left" :
            leftAnim === "exiting"  ? "animate-fade-out-left" : "opacity-0"
          }`}
        >
          {/* Organic brush border + white fill baked into SVG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/skills/skills-card-container.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* 3×3 grid — extra padding so card drop-shadows aren't clipped */}
          <div className="relative z-10 w-full h-full grid grid-cols-3 p-[9%] gap-[3%]">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                className={`relative aspect-[148/127] ${
                  leftAnim === "entering" ? "animate-fade-in-up" :
                  leftAnim === "exiting"  ? "animate-fade-out-down" : "opacity-0"
                }`}
                style={leftAnim !== "idle" ? { animationDelay: `${CARD_DELAYS[i]}ms` } : undefined}
              >
                {/* Card shape SVG */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/skills/skill-card-${skill.card}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full overflow-visible"
                />

                {/* Content: icon LEFT + label RIGHT */}
                <div className="relative z-10 flex flex-row items-center justify-center w-full h-full gap-[5%] px-[8%] pb-[6%]">
                  {/* Icon: ~34% of cell width */}
                  <div className="relative shrink-0 aspect-square" style={{ width: "34%" }}>
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-[clamp(9px,2.6vw,16px)] text-[#4d4c4c] leading-[1.2] whitespace-pre-line">
                    {skill.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Photo + Habilidades card — on mobile appears FIRST ── */}
        <div className="flex flex-col items-center lg:items-end gap-4 shrink-0 order-1 lg:order-2">

          {/* Photo blob */}
          <div
            ref={photoRef}
            className={`${photoAnim === "entering" ? "animate-fade-in-right" : photoAnim === "exiting" ? "animate-fade-out-right" : "opacity-0"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/skills/skillsPhoto.svg"
              alt="Juan Pablo Gallardo"
              className="w-[min(360px,calc(100vw-48px))] h-auto pb-[6px]"
            />
          </div>

          {/* "Mis Habilidades" card — height adapts to content */}
          <div
            ref={skillsCardRef}
            className={`relative w-[min(520px,calc(100vw-48px))] ${
              skillsCardAnim === "entering" ? "animate-fade-in-right" :
              skillsCardAnim === "exiting"  ? "animate-fade-out-right" : "opacity-0"
            }`}
          >
            {/* SVG background stretches to match content height */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/skills/skills-habilidades-card.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />

            {/* Content determines card height — py-5 top/bottom, px-8 sides */}
            <div className="relative z-10 flex flex-col px-8 py-5 gap-3">

              {/* Title — Big Shoulders Text Bold (no stencil), 48px, 20px top+bottom padding */}
              <h2 className="m-0 py-4 leading-[1.0] font-normal text-right w-full">
                <span
                  className="text-[clamp(34px,3.5vw,48px)] font-normal text-[#4d4c4c]"
                  style={{ WebkitTextStroke: "1px #000000" }}
                >
                  {skills.titlePre[lang]}{" "}
                </span>
                <span
                  className="text-[clamp(34px,3.5vw,48px)] font-normal text-skills-green"
                  style={{ WebkitTextStroke: "1px #000000" }}
                >
                  {skills.titleHighlight[lang]}
                </span>
              </h2>

              {/* Description — extralight, justified, "kit completo" bold stencil */}
              <p className="text-[clamp(14px,1.8vw,22px)] text-[#4d4c4c] leading-[1.5] m-0 font-extralight text-justify w-full pb-4">
                {descPre}
                <strong className="text-skills-green font-bold font-big-shoulders-stencil">
                  {descHighlight}
                </strong>
                {descPost}
              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
