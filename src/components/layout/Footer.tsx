"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useLang, t } from "@/context/LanguageContext";

const NAV_HREFS = [
  "#inicio", "#habilidades", "#acerca", "#proyectos",
  "#testimonios", "#experiencia", "#contacto",
];

const TECH_CARDS = [
  { card: "/assets/shared/React-Card.svg", icon: "/assets/shared/ReactIcon.svg", label: "React"        },
  { card: "/assets/shared/TS-Card.svg",    icon: "/assets/shared/TsLogo.svg",    label: "TypeScript"   },
  { card: "/assets/shared/Tail-Card.svg",  icon: "/assets/shared/TailIcon.svg",  label: "TailWind CSS" },
];

// ── Single tech card ──────────────────────────────────────────────────────────
// Height is fixed so all three cards are the same height regardless of SVG width.
function TechCard({ card, icon, label }: { card: string; icon: string; label: string }) {
  return (
    <div className="relative" style={{ height: 95, display: "inline-flex" }}>
      {/* SVG border background — width scales proportionally with fixed height */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card} alt="" style={{ height: "100%", width: "auto", display: "block" }} />
      {/* Icon + label overlay */}
      <div className="absolute inset-0 flex items-center justify-start gap-[14px] px-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={label} style={{ width: 52, height: 52, flexShrink: 0 }} />
        <span
          className="font-bold text-[#141414] text-left leading-tight"
          style={{
            fontFamily: "var(--font-big-shoulders)",
            fontSize: 18,
            WebkitTextStroke: "0.5px #141414",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  const { lang } = useLang();
  const labels = t.nav.links[lang];
  const ft = t.footer;

  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="dot-pattern-lime relative w-full overflow-hidden"
    >
      {/* Bg-Footer.svg — provides the arch shape + decorative elements.
          object-top pins the top so the arch is always visible;
          dot-pattern-lime provides the lime fallback below the SVG bounds. */}
      <Image
        src="/assets/shared/Bg-Footer.svg"
        alt=""
        fill
        className="pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "top center" }}
      />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto
                      px-6 sm:px-10 lg:px-[60px] pt-[60px] lg:pt-[80px] pb-[40px]">

        {/* ── 3-column layout ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-0 justify-between items-start">

          {/* ── Left: Logo + phrase ──────────────────────────────────── */}
          <div
            className={`flex flex-col gap-[22px] lg:max-w-[300px] ${visible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            <Link href="#inicio">
              <Image
                src="/assets/hero/logo.png"
                alt="JPG Logo"
                width={220}
                height={85}
                className="h-auto w-[clamp(160px,14vw,220px)]"
              />
            </Link>
            <p
              className="m-0 font-bold text-[#4d4c4c] leading-snug"
              style={{
                fontFamily: "var(--font-big-shoulders)",
                fontSize: "clamp(15px, 1.4vw, 20px)",
              }}
            >
              {ft.phrase[lang]}
            </p>
          </div>

          {/* ── Center: Tech cards ───────────────────────────────────── */}
          <div
            className={`flex flex-col items-center gap-[14px] lg:pt-[40px] ${visible ? "animate-fade-in-up" : "opacity-0"}`}
            style={visible ? { animationDelay: "150ms" } : {}}
          >
            {/* "Tecnologías usadas:" as a prominent heading */}
            <h4
              className="m-0 font-bold text-[#141414] leading-none"
              style={{
                fontFamily: "var(--font-big-shoulders)",
                fontSize: "clamp(20px, 2.2vw, 30px)",
                WebkitTextStroke: "1px #141414",
              }}
            >
              {ft.techTitle[lang]}
            </h4>
            {/* Row 1: React + TypeScript */}
            <div className="flex gap-[12px]">
              <TechCard {...TECH_CARDS[0]} />
              <TechCard {...TECH_CARDS[1]} />
            </div>
            {/* Row 2: Tailwind centered */}
            <TechCard {...TECH_CARDS[2]} />
          </div>

          {/* ── Right: Navigation — content centered within column ───── */}
          <div
            className={`flex flex-col items-center gap-[12px] ${visible ? "animate-fade-in-right" : "opacity-0"}`}
            style={visible ? { animationDelay: "300ms" } : {}}
          >
            <h3
              className="m-0 font-bold text-[#141414] leading-none text-center"
              style={{
                fontFamily: "var(--font-big-shoulders)",
                fontSize: "clamp(36px, 3.5vw, 52px)",
                WebkitTextStroke: "1px #141414",
              }}
            >
              {ft.navTitle[lang]}
            </h3>
            <nav className="flex flex-col items-center gap-[6px]">
              {labels.map((label, i) => (
                <Link
                  key={NAV_HREFS[i]}
                  href={NAV_HREFS[i]}
                  className="font-bold text-[#141414] hover:-translate-y-[2px] transition-transform duration-200 w-fit text-center"
                  style={{
                    fontFamily: "var(--font-big-shoulders)",
                    fontSize: "clamp(16px, 1.5vw, 20px)",
                    WebkitTextStroke: "0.5px #141414",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="w-full h-[1px] bg-[#4d4c4c] mt-[40px] lg:mt-[60px]" />
        <div
          className="flex justify-between items-center mt-[16px] transition-opacity duration-700"
          style={{ opacity: visible ? 0.5 : 0, transitionDelay: visible ? "450ms" : "0ms" }}
        >
          <p
            className="m-0 font-bold text-[#141414]"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
          >
            © {ft.copyright[lang]}
          </p>
          <p
            className="m-0 font-bold text-[#141414]"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
          >
            {ft.madeWith[lang]}
          </p>
        </div>

      </div>
    </footer>
  );
}
