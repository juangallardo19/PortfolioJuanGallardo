"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useLang, t } from "@/context/LanguageContext";

// ─────────────────────────────────────────────────────────────────
//  CARD LAYOUT — all values are % of the card's design dimensions.
//
//  CARD_LG design width: 487px  (58% of 840px usable at desktop)
//  CARD_SM design width: 321px  (flex-1 remainder at desktop)
//
//  Font sizes are in px at the design width. Each card applies
//  CSS zoom = renderedWidth / designWidth, so every element
//  (fonts, icons, link, positions) scales proportionally — just
//  like zooming out in the browser — as the card gets smaller.
// ─────────────────────────────────────────────────────────────────

const CARD_LG = {
  designWidth: 487,

  textTop:    50.0,
  textLeft:   10.5,
  textRight:  10.5,
  textW:      81.0,

  iconsTop:   76.5,
  iconsLeft:  10.5,
  iconsRight: 10.5,
  iconsW:     83.0,
  iconSize:   "10%",

  linkTop:    87.0,
  linkLeft:   42.0,

  // px at design width — zoom handles scaling at all other sizes
  titleSize: "26px",
  descSize:  "21px",
  linkSize:  "17px",
} as const;

const CARD_SM = {
  designWidth: 321,

  textTop:    51.0,
  textLeft:   10.5,
  textRight:  10.5,
  textW:      80.0,

  iconsTop:   75.5,
  iconsLeft:  10.5,
  iconsRight: 10.5,
  iconsW:     83.0,
  iconSize:   "9%",

  linkTop:    85.0,
  linkLeft:   40.0,

  // px at design width — zoom handles scaling at all other sizes
  titleSize: "20px",
  descSize:  "15.5px",
  linkSize:  "13px",
} as const;

// ─────────────────────────────────────────────────────────────────
//  TECH ICONS
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
  postgres:   "/assets/projects/icons/postgres.svg",
  wordpress:  "/assets/projects/icons/wordpress.svg",
} as const;

interface DescPart {
  pre:   { es: string; en: string };
  bold?: { text: { es: string; en: string }; color: string };
  post:  { es: string; en: string };
}

interface ProjectData {
  title:      string;
  desc:       DescPart;
  icons:      string[];
  link:       string;
  linkType:   "github" | "web";  // "github" → "Ver en GitHub", "web" → "Ver web"
  cardSvg:    string;
  large:      boolean;
  textAlign:  "left" | "right";
}

const PROJECTS: ProjectData[] = [
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
    icons: [PI.java, PI.react, PI.typescript, PI.postgres],
    link: "https://github.com/juangallardo19",
    linkType: "github",
    cardSvg: "/assets/projects/Card 1.svg",
    large: true,
    textAlign: "left",
  },
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
    link: "https://github.com/juangallardo19",
    linkType: "github",
    cardSvg: "/assets/projects/Card 2.svg",
    large: false,
    textAlign: "right",
  },
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
    link: "https://github.com/juangallardo19",
    linkType: "github",
    cardSvg: "/assets/projects/Card 3.svg",
    large: false,
    textAlign: "left",
  },
  {
    title: "Vinyl music",
    desc: {
      pre:  { es: "Simulación ", en: "Simulation" },
      bold: { text: { es: "tocadiscos de vinilo", en: "vinyl record player" }, color: "#c8191e" },
      post: {
        es: " implementando patrones de software y estructuras de datos.",
        en: " implementing software patterns and data structures.",
      },
    },
    icons: [PI.react, PI.css3, PI.python],
    link: "https://github.com/juangallardo19",
    linkType: "github",
    cardSvg: "/assets/projects/Card 4.svg",
    large: false,
    textAlign: "right",
  },
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
    link: "https://github.com/juangallardo19",
    linkType: "github",
    cardSvg: "/assets/projects/Card 5.svg",
    large: false,
    textAlign: "left",
  },
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
    icons: [PI.css3, PI.wordpress],
    link: "https://oraldentalgroup.com",
    linkType: "web",
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
//
//  Each card watches its own rendered width via ResizeObserver.
//  It applies CSS zoom = renderedWidth / designWidth to its inner
//  content div. The outer wrapper stays w-full (responsive layout).
//  This means the card ALWAYS looks identical to desktop, just
//  smaller — fonts, icons, link position all scale together.
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

  // Outer div tracks rendered width; inner div gets zoomed accordingly
  const outerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setZoom(Math.min(1, entry.contentRect.width / c.designWidth));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [c.designWidth]);

  return (
    // Outer: responsive width, holds the zoom observer
    <div ref={outerRef} className={`w-full ${animClass}`} style={delayStyle}>
      {/*
        Inner: fixed at designWidth, zoomed to fit the outer div.
        Everything inside (SVG, text, icons, link) scales uniformly.
        CSS zoom affects layout box, so the card collapses correctly.
      */}
      <div className="relative mx-auto" style={{ width: c.designWidth, zoom }}>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.cardSvg}
          alt={p.title}
          className="w-full h-auto block select-none pointer-events-none"
        />

        {/* ── Title + Description ── */}
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

        {/* ── Tech icons ── */}
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

        {/* ── Link (GitHub o web) ── */}
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-normal text-black underline decoration-black hover:opacity-70 transition-opacity whitespace-nowrap"
          style={{ top: `${c.linkTop}%`, left: `${c.linkLeft}%`, fontSize: c.linkSize }}
        >
          {p.linkType === "web" ? t.projects.web[lang] : t.projects.github[lang]}
        </a>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SECTION
// ─────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { lang } = useLang();
  const proj = t.projects;

  const sectionRef  = useRef<HTMLElement>(null);
  const row1Ref     = useRef<HTMLDivElement>(null);
  const row2Ref     = useRef<HTMLDivElement>(null);
  const cards45Ref  = useRef<HTMLDivElement>(null);

  const [row1Anim,    setRow1Anim]    = useState<AnimState>("idle");
  const [row2Anim,    setRow2Anim]    = useState<AnimState>("idle");
  const [cards45Anim, setCards45Anim] = useState<AnimState>("idle");

  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setRow1Anim("idle");
          setRow2Anim("idle");
          setCards45Anim("idle");
        }
      },
      { threshold: 0 },
    );
    const row1Obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRow1Anim("entering"); },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    const row2Obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRow2Anim("entering"); },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    // Cards 4+5 get their own observer so they animate when THEY enter view
    const cards45Obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCards45Anim("entering"); },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );

    if (sectionRef.current)  sectionObs.observe(sectionRef.current);
    if (row1Ref.current)     row1Obs.observe(row1Ref.current);
    if (row2Ref.current)     row2Obs.observe(row2Ref.current);
    if (cards45Ref.current)  cards45Obs.observe(cards45Ref.current);

    return () => { sectionObs.disconnect(); row1Obs.disconnect(); row2Obs.disconnect(); cards45Obs.disconnect(); };
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="relative w-full overflow-hidden scroll-mt-[90px] lg:scroll-mt-[50px]">

      <Image
        src="/assets/projects/projects-section-bg.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[960px] mx-auto px-6 sm:px-10 lg:px-[60px] py-[60px] lg:py-[80px]">

        <div ref={row1Ref}>

          {/* Section header */}
          <div
            className={`flex flex-col items-center gap-3 mb-16 lg:mb-24 text-center ${
              row1Anim === "entering" ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <p className="m-0 font-extralight text-[#4d4c4c] leading-none" style={{ fontSize: "clamp(17px, 1.8vw, 22px)" }}>
              - {proj.subtitle[lang]} -
            </p>
            <h2 className="m-0 leading-none">
              <span className="font-normal text-[#4d4c4c]" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", WebkitTextStroke: "1px #000" }}>
                {proj.titlePre[lang]}{" "}
              </span>
              <span className="font-normal text-[#fcd116]" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", WebkitTextStroke: "1px #000" }}>
                {proj.titleHighlight[lang]}
              </span>
            </h2>
          </div>

          {/* ── Row 1 ──
           *  Desktop: [Card 1 large — 58%] | [Card 2 / Card 3 stacked]
           *  Mobile:  Card 1 full-width → Card 2 + Card 3 side-by-side below
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

        </div>

        {/* ── Row 2 ──
         *  Desktop: [Card 4 / Card 5 stacked — 42%] | [Card 6 large]
         *  Mobile:  Card 6 full-width (order-1) → Card 4 + Card 5 side-by-side (order-2)
         */}
        <div ref={row2Ref} className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:items-center mt-5 lg:mt-8">

          <div className="w-full lg:flex-1 order-1 lg:order-2">
            <ProjectCard p={PROJECTS[5]} rowIndex={0} anim={row2Anim} />
          </div>

          <div ref={cards45Ref} className="w-full lg:w-[42%] lg:shrink-0 flex flex-row lg:flex-col gap-5 lg:gap-8 order-2 lg:order-1">
            <div className="w-1/2 lg:w-full">
              <ProjectCard p={PROJECTS[3]} rowIndex={0} anim={cards45Anim} />
            </div>
            <div className="w-1/2 lg:w-full">
              <ProjectCard p={PROJECTS[4]} rowIndex={1} anim={cards45Anim} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
