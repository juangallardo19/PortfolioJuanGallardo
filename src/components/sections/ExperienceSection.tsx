"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useLang, t, type Lang } from "@/context/LanguageContext";

// ─── Layout constants (match Figma layout) ────────────────────────────────────
const SECTION_H = 1400;
const CENTER    = { w: 143, h: 1100 };
const CARD1     = { w: 431, h: 412 };
const CARD2     = { w: 431, h: 412 };
const CARD3     = { w: 431, h: 412 };
const COL_GAP   = 40;

// Design reference width — ResizeObserver zooms to fill container
const DESIGN_W = CARD1.w + COL_GAP + CENTER.w + COL_GAP + CARD2.w; // 1083

// Max zoom: keeps cards from becoming too large on big screens
const MAX_ZOOM = 0.70;

// ─── Stagger: title first, then SVG, then cards ───────────────────────────────
const DELAY = { title: 0, center: 150, card1: 420, card2: 560, card3: 700 };

const TITLE_SIZE    = "clamp(34px, 4.2vw, 54px)";
const SUBTITLE_SIZE = "clamp(15px, 1.5vw, 20px)";

// ─── Bilingual card data (institution names stay in Spanish) ──────────────────
const CARDS = {
  card1: {
    title:       { es: "Título universitario",    en: "University degree"     },
    line1:       { es: "Ingeniería de software",  en: "Software engineering"  },
    line2:       { es: "2024 – 2027",             en: "2024 – 2027"           },
    institution: "Universidad Cooperativa de Colombia",
    href: "/assets/experience/titulo-ucc.pdf",
  },
  card2: {
    title:       { es: "Diplomado",                en: "Graduate diploma"      },
    line1:       { es: "Arquitectura de software", en: "Software architecture" },
    line2:       { es: "2025",                     en: "2025"                  },
    institution: "Universidad Javeriana",
    href: "/assets/experience/diplomado-javeriana.pdf",
  },
  card3: {
    title:       { es: "Curso",       en: "Course"     },
    line1:       { es: "UX Design",   en: "UX Design"  },
    line2:       { es: "2025 – 2026", en: "2025 – 2026" },
    institution: "Coursera",
    href: "/assets/experience/curso-ux-design.pdf",
  },
} as const;

// ─── Text overlay component ───────────────────────────────────────────────────
// Colored band: y≈209–340 → 51%–82% of 412px card
// White bottom strip: y≈340–402 → 82%–98%
function CardText({ title, line1, line2, institution }: {
  title: string; line1: string; line2: string; institution: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Title + details — inside colored band */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ top: "51%", bottom: "19%", left: 10, right: 10, gap: 5 }}
      >
        <p
          className="m-0 font-extrabold text-center text-[#4d4c4c] leading-tight"
          style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 30 }}
        >
          {title}
        </p>
        <p
          className="m-0 font-bold text-center text-[#4d4c4c] leading-tight"
          style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 22 }}
        >
          {line1}
        </p>
        <p
          className="m-0 font-bold text-center text-[#4d4c4c] leading-tight"
          style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 22 }}
        >
          {line2}
        </p>
      </div>
      {/* Institution — anchored near the bottom of the white strip */}
      <div
        className="absolute flex items-center justify-center"
        style={{ bottom: "4%", left: 10, right: 10 }}
      >
        <p
          className="m-0 font-semibold text-center text-[#4d4c4c] leading-tight"
          style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 21 }}
        >
          {institution}
        </p>
      </div>
    </div>
  );
}

type AnimState = "idle" | "entering" | "exiting";

function ea(anim: AnimState, enter: string, exit: string, delayMs: number) {
  const style = { animationDelay: `${delayMs}ms` };
  if (anim === "entering") return { cls: enter, style };
  if (anim === "exiting")  return { cls: exit,  style };
  return { cls: "opacity-0", style: {} };
}

// ─── Helper: card link wrapper ────────────────────────────────────────────────
function CardLink({
  href, w, h, animCls, animStyle, svgSrc,
  title, line1, line2, institution,
}: {
  href: string; w: number; h: number;
  animCls: string; animStyle: React.CSSProperties;
  svgSrc: string; title: string; line1: string; line2: string; institution: string;
}) {
  return (
    <a
      href={href}
      download
      className={`relative block cursor-pointer hover:scale-[1.05] hover:brightness-75 active:scale-100 transition-all duration-200 ${animCls}`}
      style={{ width: w, height: h, flexShrink: 0, textDecoration: "none", ...animStyle }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={svgSrc} alt="" width={w} height={h} style={{ display: "block" }} />
      <CardText title={title} line1={line1} line2={line2} institution={institution} />
    </a>
  );
}

export function ExperienceSection() {
  const { lang } = useLang() as { lang: Lang };

  const sectionRef = useRef<HTMLElement>(null);
  const outerRef   = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<AnimState>("idle");
  const [zoom, setZoom] = useState(MAX_ZOOM);

  // IntersectionObserver on the <section> element — reliable (observing the
  // overflow:hidden container itself, not something inside it).
  // Title gets a 200ms animationDelay so the user has scrolled enough to see it
  // before the fade-in starts. Exit resets to idle for clean re-entry.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnim("entering");
        else setAnim(prev => (prev === "idle" ? "idle" : "exiting"));
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ResizeObserver: zoom to fill container on all screen sizes
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setZoom(Math.min(MAX_ZOOM, entry.contentRect.width / DESIGN_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const titleA = ea(anim, "animate-fade-in-up", "animate-fade-out-down", DELAY.title);
  const cA     = ea(anim, "animate-fade-in-up", "animate-fade-out-down", DELAY.center);
  const a1     = ea(anim, "animate-fade-in-up", "animate-fade-out-down", DELAY.card1);
  const a2     = ea(anim, "animate-fade-in-up", "animate-fade-out-down", DELAY.card2);
  const a3     = ea(anim, "animate-fade-in-up", "animate-fade-out-down", DELAY.card3);

  const c1 = CARDS.card1;
  const c2 = CARDS.card2;
  const c3 = CARDS.card3;

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="dot-pattern relative w-full overflow-hidden scroll-mt-[90px] lg:scroll-mt-[-130px]"
    >
      <Image
        src="/assets/experience/background.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
      />

      <div className="relative z-10 flex flex-col gap-[44px] lg:gap-[70px] w-full max-w-[1300px] mx-auto
                      px-6 sm:px-10 lg:px-[60px] pt-[140px] pb-[60px] lg:pt-[260px] lg:pb-[80px]">

        {/* ── Title — centered ──────────────────────────────────────────── */}
        <div
          ref={titleRef}
          className={`flex flex-col items-center text-center gap-[10px] lg:gap-[14px] ${titleA.cls}`}
          style={titleA.style}
        >
          <h2
            className="m-0 leading-[1.0] font-normal"
            style={{ fontFamily: "var(--font-big-shoulders)" }}
          >
            <span style={{ fontSize: TITLE_SIZE, WebkitTextStroke: "1px #000", color: "#4d4c4c" }}>
              {t.experience.titlePre[lang]}{" "}
            </span>
            <span style={{ fontSize: TITLE_SIZE, WebkitTextStroke: "1px #000", color: "#00ffb2" }}>
              {t.experience.titleHighlight[lang]}
            </span>
          </h2>
          <p
            className="text-[#717171] font-extralight leading-[1.4] m-0 max-w-[440px]"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: SUBTITLE_SIZE }}
          >
            {t.experience.subtitle[lang]}
          </p>
        </div>

        {/* ── 3-column timeline — zoom scales to fit all screen sizes ───── */}
        <div ref={outerRef} className="flex justify-center">
          {/* Zoom wrapper */}
          <div style={{ width: DESIGN_W, zoom, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>

              {/* ── Left column: Card-1 top · Card-3 bottom ── */}
              <div
                style={{
                  width: CARD1.w, height: SECTION_H,
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between", flexShrink: 0,
                }}
              >
                <CardLink
                  href={c1.href} w={CARD1.w} h={CARD1.h}
                  animCls={a1.cls} animStyle={a1.style}
                  svgSrc="/assets/experience/Card-1.svg"
                  title={c1.title[lang]} line1={c1.line1[lang]} line2={c1.line2[lang]}
                  institution={c1.institution}
                />
                <CardLink
                  href={c3.href} w={CARD3.w} h={CARD3.h}
                  animCls={a3.cls} animStyle={a3.style}
                  svgSrc="/assets/experience/Card-3.svg"
                  title={c3.title[lang]} line1={c3.line1[lang]} line2={c3.line2[lang]}
                  institution={c3.institution}
                />
              </div>

              {/* Gap */}
              <div style={{ width: COL_GAP, flexShrink: 0 }} />

              {/* ── Center column: SVG vertically centered ── */}
              <div
                style={{
                  width: CENTER.w, height: SECTION_H,
                  display: "flex", flexDirection: "column",
                  justifyContent: "center", flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/experience/central-svg.svg"
                  alt=""
                  aria-hidden="true"
                  width={CENTER.w}
                  height={CENTER.h}
                  className={cA.cls}
                  style={{ display: "block", ...cA.style }}
                />
              </div>

              {/* Gap */}
              <div style={{ width: COL_GAP, flexShrink: 0 }} />

              {/* ── Right column: Card-2 vertically centered ── */}
              <div
                style={{
                  width: CARD2.w, height: SECTION_H,
                  display: "flex", alignItems: "center", flexShrink: 0,
                }}
              >
                <CardLink
                  href={c2.href} w={CARD2.w} h={CARD2.h}
                  animCls={a2.cls} animStyle={a2.style}
                  svgSrc="/assets/experience/Card-2.svg"
                  title={c2.title[lang]} line1={c2.line1[lang]} line2={c2.line2[lang]}
                  institution={c2.institution}
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
