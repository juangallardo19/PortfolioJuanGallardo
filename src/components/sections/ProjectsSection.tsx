"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useLang, t } from "@/context/LanguageContext";

// ─────────────────────────────────────────────────────────────────
//  CARD LAYOUT — separate constants for large and small cards.
//  All values are % of the card's rendered height/width.
//
//  TUNE CARD_LG for Card 1 and Card 6 (large, ~604×616 aspect).
//  TUNE CARD_SM for Cards 2–5          (small, ~404×367 aspect).
// ─────────────────────────────────────────────────────────────────

const CARD_LG = {
  // ── Text (title + description) ──────────────────────────────
  textTop:    50.5,  // % from card top  → push down to clear the image
  textLeft:    10.5,  // % from card left → used when textAlign="left"
  textRight:   10.5,  // % from card right → used when textAlign="right"
  textW:      80.0,  // % width of text column

  // ── Tech icons ───────────────────────────────────────────────
  iconsTop:   75.0,  // % from card top  → above footer (~71%). Increase to push lower
  iconsLeft:   10.5,  // % from card left  → used when textAlign="left"
  iconsRight:  10.5,  // % from card right → used when textAlign="right"
  iconsW:     83.0,  // % width of icons row
  iconSize:   "10%", // individual icon size (% of card width)

  // ── "Ver en GitHub" link ─────────────────────────────────────
  linkTop:    87.0,  // % from card top  → inside the colored footer zone
  linkLeft:   42.0,  // % from card left → align with the GitHub circle

  // ── Font sizes ───────────────────────────────────────────────
  titleSize: "clamp(25px, 1.8vw, 26px)",
  descSize:  "clamp(20px, 1.3vw, 19px)",
  linkSize:  "clamp(16px,  1.1vw, 17px)",
} as const;

const CARD_SM = {
  // ── Text (title + description) ──────────────────────────────
  textTop:    51.0,  // % from card top
  textLeft:    10.5,  // % from card left  → used when textAlign="left"
  textRight:   10.5,  // % from card right → used when textAlign="right"
  textW:      80.0,  // % width of text column

  // ── Tech icons ───────────────────────────────────────────────
  iconsTop:   75.5,  // % from card top  → near footer (~70%). Increase to push lower
  iconsLeft:   10.5,  // % from card left  → used when textAlign="left"
  iconsRight:  10.5,  // % from card right → used when textAlign="right"
  iconsW:     83.0,  // % width
  iconSize:   "9%",  // individual icon size

  // ── "Ver en GitHub" link ─────────────────────────────────────
  linkTop:    84.5,  // % from card top
  linkLeft:   40.0,  // % from card left

  // ── Font sizes ───────────────────────────────────────────────
  titleSize: "clamp(13px, 1.2vw, 18px)",
  descSize:  "clamp(15px,  0.9vw, 13px)",
  linkSize:  "clamp(8px,  0.9vw, 13px)",
} as const;

// ─────────────────────────────────────────────────────────────────
//  TECH ICONS — gray versions from /assets/projects/icons/
// ─────────────────────────────────────────────────────────────────
const PI = {
  react:      "/assets/projects/icons/react.svg",
  typescript: "/assets/projects/icons/typescript.svg",
  html5:      "/assets/projects/icons/html5.svg",
  java:       "/assets/projects/icons/java.svg",
  tailwind:   "/assets/projects/icons/tailwind.svg",
  python:     "/assets/projects/icons/python.svg",
  git:        "/assets/projects/icons/git.svg",
  css3:       "/assets/projects/icons/css3.svg",
} as const;

interface DescPart {
  pre:   { es: string; en: string };
  bold?: { text: { es: string; en: string }; color: string };
  post:  { es: string; en: string };
}

interface ProjectData {
  title:     string;
  desc:      DescPart;
  icons:     string[];
  github:    string;
  cardSvg:   string;
  large:     boolean;
  textAlign: "left" | "right";
}

const PROJECTS: ProjectData[] = [
  // 1 — UNO Game (large, top-left)
  {
    title: "Uno Game",
    desc: {
      pre:  { es: "El famoso juego ", en: "The famous game " },
      bold: { text: { es: "UNO", en: "UNO" }, color: "#c8191e" },
      post: {
        es: " recreado haciendo uso de patrones de software, bases de datos y jugabilidad en tiempo real.",
        en: " recreated using software patterns, databases, and real-time gameplay.",
      },
    },
    icons: [PI.java, PI.react, PI.typescript],
    github: "https://github.com/juangallardo19",
    cardSvg: "/assets/projects/Card 1.svg",
    large: true,
    textAlign: "left",
  },
  // 2 — Mercado Libre (small, top-right upper)
  {
    title: "Mercado Libre",
    desc: {
      pre:  { es: "Clon de la interfaz de ", en: "Clone of the " },
      bold: { text: { es: "Mercado Libre", en: "Mercado Libre" }, color: "#fcd116" },
      post: {
        es: " desarrollado en equipo aplicando GitFlow como metodología.",
        en: " interface built as a team applying GitFlow as methodology.",
      },
    },
    icons: [PI.git, PI.html5, PI.css3],
    github: "https://github.com/juangallardo19",
    cardSvg: "/assets/projects/Card 2.svg",
    large: false,
    textAlign: "right",
  },
  // 3 — Dakingo (small, top-right lower)
  {
    title: "Dakingo",
    desc: {
      pre:  { es: "Clon de la interfaz de ", en: "Clone of the " },
      bold: { text: { es: "Dakingo", en: "Dakingo" }, color: "#a83032" },
      post: {
        es: " desarrollado en React con Tailwind CSS.",
        en: " interface built in React with Tailwind CSS.",
      },
    },
    icons: [PI.react, PI.tailwind],
    github: "https://github.com/juangallardo19",
    cardSvg: "/assets/projects/Card 3.svg",
    large: false,
    textAlign: "left",
  },
  // 4 — Vinyl music (small, bottom-left upper)
  {
    title: "Vinyl music",
    desc: {
      pre:  { es: "Simulación de un ", en: "Simulation of a " },
      bold: { text: { es: "tocadiscos de vinilo", en: "vinyl record player" }, color: "#c8191e" },
      post: {
        es: " implementando patrones de software y estructuras de datos.",
        en: " implementing software patterns and data structures.",
      },
    },
    icons: [PI.react, PI.css3, PI.python],
    github: "https://github.com/juangallardo19",
    cardSvg: "/assets/projects/Card 4.svg",
    large: false,
    textAlign: "right",
  },
  // 5 — Mercado Libre (small, bottom-left lower)
  {
    title: "Mercado Libre",
    desc: {
      pre:  { es: "Clon de la interfaz de ", en: "Clone of the " },
      bold: { text: { es: "Mercado Libre", en: "Mercado Libre" }, color: "#fcd116" },
      post: {
        es: " desarrollado en equipo aplicando GitFlow como metodología.",
        en: " interface built as a team applying GitFlow as methodology.",
      },
    },
    icons: [PI.git, PI.html5, PI.css3],
    github: "https://github.com/juangallardo19",
    cardSvg: "/assets/projects/Card 5.svg",
    large: false,
    textAlign: "left",
  },
  // 6 — OralDentalGroup (large, bottom-right)
  {
    title: "OralDentalGroup",
    desc: {
      pre:  { es: "Desarrollo de sitio web para ", en: "Website development for a " },
      bold: { text: { es: "clínica odontológica", en: "dental clinic" }, color: "#a84bff" },
      post: {
        es: " en WordPress, con enfoque en diseño moderno y navegación intuitiva.",
        en: " in WordPress, focused on modern design and intuitive navigation.",
      },
    },
    icons: [PI.react, PI.css3, PI.python],
    github: "https://github.com/juangallardo19",
    cardSvg: "/assets/projects/Card 6.svg",
    large: true,
    textAlign: "right",
  },
];

// ─────────────────────────────────────────────────────────────────

type AnimState = "idle" | "entering";
const ROW_STAGGER = [0, 100, 200];

// ─────────────────────────────────────────────────────────────────
//  PROJECT CARD
// ─────────────────────────────────────────────────────────────────
function ProjectCard({
  p,
  rowIndex,
  anim,
}: {
  p: ProjectData;
  rowIndex: number;
  anim: AnimState;
}) {
  const { lang } = useLang();
  const c = p.large ? CARD_LG : CARD_SM;
  const delay = ROW_STAGGER[rowIndex] ?? 0;
  const delayStyle = anim === "entering" ? { animationDelay: `${delay}ms` } : undefined;
  const animClass = anim === "entering" ? "animate-fade-in-up" : "opacity-0";

  return (
    <div className={`relative w-full ${animClass}`} style={delayStyle}>

      {/* Card SVG — complete visual (image + footer + border all baked in) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.cardSvg}
        alt={p.title}
        className="w-full h-auto block select-none pointer-events-none"
      />

      {/* ── Title + Description ─────────────────────────────── */}
      {/* left-aligned  → anchored from card LEFT  using textLeft  */}
      {/* right-aligned → anchored from card RIGHT using textRight */}
      <div
        className={`absolute flex flex-col gap-[2%] ${
          p.textAlign === "right" ? "items-end text-right" : "items-start text-left"
        }`}
        style={{
          top:   `${c.textTop}%`,
          width: `${c.textW}%`,
          ...(p.textAlign === "right"
            ? { right: `${c.textRight}%` }
            : { left:  `${c.textLeft}%`  }),
        }}
      >
        <p className="m-0 font-bold text-black leading-tight" style={{ fontSize: c.titleSize }}>
          {p.title}
        </p>
        <p className="m-0 font-extralight text-black leading-[1.2]" style={{ fontSize: c.descSize }}>
          {p.desc.pre[lang]}
          {p.desc.bold && (
            <strong className="font-bold font-big-shoulders-stencil" style={{ color: p.desc.bold.color }}>
              {p.desc.bold.text[lang]}
            </strong>
          )}
          {p.desc.post[lang]}
        </p>
      </div>

      {/* ── Tech icons ────────────────────────────────────────── */}
      {/* same logic: left-aligned uses iconsLeft, right-aligned uses iconsRight */}
      <div
        className={`absolute flex items-center gap-[2%] ${
          p.textAlign === "right" ? "justify-end" : "justify-start"
        }`}
        style={{
          top:   `${c.iconsTop}%`,
          width: `${c.iconsW}%`,
          ...(p.textAlign === "right"
            ? { right: `${c.iconsRight}%` }
            : { left:  `${c.iconsLeft}%`  }),
        }}
      >
        {p.icons.map((icon) => (
          <div key={icon} className="relative shrink-0" style={{ width: c.iconSize, aspectRatio: "1" }}>
            <Image src={icon} alt="" fill className="object-contain" />
          </div>
        ))}
      </div>

      {/* ── "Ver en GitHub" — tune linkTop/linkLeft in CARD_LG or CARD_SM ── */}
      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute font-normal text-black underline decoration-black hover:opacity-70 transition-opacity whitespace-nowrap"
        style={{ top: `${c.linkTop}%`, left: `${c.linkLeft}%`, fontSize: c.linkSize }}
      >
        {t.projects.github[lang]}
      </a>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SECTION
//
//  Animation logic:
//  • Title + Row 1 share one observer → animate together on enter
//  • Row 2 has its own observer → animates when scrolled into view
//  • NO per-row exit animation. Instead, a section-level observer
//    resets everything to "idle" only when the section is fully
//    out of the viewport.
//  This prevents the title from flickering as you scroll within
//  the section, and makes Row 2 animate cleanly on scroll-down.
// ─────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { lang } = useLang();
  const proj = t.projects;

  const sectionRef = useRef<HTMLElement>(null); // section exit → reset all
  const row1Ref    = useRef<HTMLDivElement>(null); // title + row1 enter
  const row2Ref    = useRef<HTMLDivElement>(null); // row2 enter

  const [row1Anim, setRow1Anim] = useState<AnimState>("idle");
  const [row2Anim, setRow2Anim] = useState<AnimState>("idle");

  useEffect(() => {
    // ── Section exit: reset everything once section is fully out of view ──
    const sectionObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setRow1Anim("idle");
          setRow2Anim("idle");
        }
      },
      { threshold: 0 },
    );

    // ── Row 1 + header enter ─────────────────────────────────────────────
    const row1Obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRow1Anim("entering"); },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    // ── Row 2 enter ──────────────────────────────────────────────────────
    const row2Obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRow2Anim("entering"); },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    if (sectionRef.current) sectionObs.observe(sectionRef.current);
    if (row1Ref.current)    row1Obs.observe(row1Ref.current);
    if (row2Ref.current)    row2Obs.observe(row2Ref.current);

    return () => { sectionObs.disconnect(); row1Obs.disconnect(); row2Obs.disconnect(); };
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="relative w-full overflow-hidden">

      {/* Background — 100% opacity */}
      <Image
        src="/assets/projects/projects-section-bg.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[960px] mx-auto px-6 sm:px-10 lg:px-[60px] py-[60px] lg:py-[80px]">

        {/* ── Row 1 ref wraps header + row 1 cards so they share one animation ── */}
        <div ref={row1Ref}>

          {/* Section header */}
          <div
            className={`flex flex-col items-center gap-2 mb-16 lg:mb-24 text-center ${
              row1Anim === "entering" ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <p className="m-0 font-extralight text-[#4d4c4c] leading-none" style={{ fontSize: "clamp(13px, 1.5vw, 19px)" }}>
              - {proj.subtitle[lang]} -
            </p>
            <h2 className="m-0 leading-none">
              <span className="font-normal text-[#4d4c4c]" style={{ fontSize: "clamp(28px, 4vw, 54px)", WebkitTextStroke: "1px #000" }}>
                {proj.titlePre[lang]}{" "}
              </span>
              <span className="font-normal text-[#fcd116]" style={{ fontSize: "clamp(28px, 4vw, 54px)", WebkitTextStroke: "1px #000" }}>
                {proj.titleHighlight[lang]}
              </span>
            </h2>
          </div>

          {/* ── Row 1 cards ── */}
          {/*
           *  Desktop: [Card 1 large — 58%] | [Card 2 / Card 3 stacked — flex-1]
           *  lg:items-center → large card is vertically centered between the two smalls
           *  Mobile: Card 1 full width, then Card 2+3 side-by-side
           */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:items-center">
            <div className="w-full lg:w-[58%] lg:shrink-0">
              <ProjectCard p={PROJECTS[0]} rowIndex={0} anim={row1Anim} />
            </div>
            <div className="w-full lg:flex-1 flex flex-row lg:flex-col gap-5 lg:gap-8">
              <div className="w-1/2 lg:w-full">
                <ProjectCard p={PROJECTS[1]} rowIndex={1} anim={row1Anim} />
              </div>
              <div className="w-1/2 lg:w-full">
                <ProjectCard p={PROJECTS[2]} rowIndex={2} anim={row1Anim} />
              </div>
            </div>
          </div>

        </div>{/* end row1Ref */}

        {/* ── Row 2 ── */}
        {/*
         *  Desktop: [Card 4 / Card 5 stacked — 42%] | [Card 6 large — flex-1]
         *  lg:items-center → large card is vertically centered between the two smalls
         *  Mobile: Card 6 full width (order-1), then Card 4+5 side-by-side (order-2)
         */}
        <div ref={row2Ref} className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:items-center mt-5 lg:mt-8">

          <div className="w-full lg:flex-1 order-1 lg:order-2">
            <ProjectCard p={PROJECTS[5]} rowIndex={0} anim={row2Anim} />
          </div>

          <div className="w-full lg:w-[42%] lg:shrink-0 flex flex-row lg:flex-col gap-5 lg:gap-8 order-2 lg:order-1">
            <div className="w-1/2 lg:w-full">
              <ProjectCard p={PROJECTS[3]} rowIndex={1} anim={row2Anim} />
            </div>
            <div className="w-1/2 lg:w-full">
              <ProjectCard p={PROJECTS[4]} rowIndex={2} anim={row2Anim} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
