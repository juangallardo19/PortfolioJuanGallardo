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

// ── Animation helpers ─────────────────────────────────────────────────────────
type AnimState = "idle" | "entering" | "exiting";

function ea(anim: AnimState, enter: string, exit: string, delayMs = 0) {
  const style: React.CSSProperties = delayMs ? { animationDelay: `${delayMs}ms` } : {};
  if (anim === "entering") return { cls: enter, style };
  if (anim === "exiting")  return { cls: exit,  style };
  return { cls: "opacity-0", style: {} as React.CSSProperties };
}

// ── Tech card — fixed height so all cards align regardless of SVG width ───────
function TechCard({ card, icon, label }: { card: string; icon: string; label: string }) {
  return (
    <div className="relative" style={{ height: 90, display: "inline-flex" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card} alt="" style={{ height: "100%", width: "auto", display: "block" }} />
      <div className="absolute inset-0 flex items-center justify-start gap-[14px] px-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={label} style={{ width: 50, height: 50, flexShrink: 0 }} />
        <span
          className="font-semibold text-[#141414] text-left leading-tight"
          style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 16 }}
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
  const [anim, setAnim] = useState<AnimState>("idle");

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnim("entering");
        else setAnim(prev => (prev === "idle" ? "idle" : "exiting"));
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Individual element animations ────────────────────────────────────────────
  const logoA      = ea(anim, "animate-fade-in-left",  "animate-fade-out-left",     0);
  const phraseA    = ea(anim, "animate-fade-in-left",  "animate-fade-out-left",   100);
  const techTitleA = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",   150);
  const card1A     = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",   260);
  const card2A     = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",   360);
  const card3A     = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",   460);
  const navTitleA  = ea(anim, "animate-fade-in-right", "animate-fade-out-right",  150);

  return (
    <footer
      ref={footerRef}
      // dot-pattern = grey fallback so the transition into the footer is smooth.
      // The Bg-Footer.svg provides the lime-green once rendered.
      className="dot-pattern relative w-full overflow-hidden"
    >
      {/* object-cover scales the SVG to fill — vector so no quality loss.
          object-top pins the arch decoration to the top edge.
          overflow-hidden on the footer clips anything that extends past the sides. */}
      <Image
        src="/assets/shared/Bg-Footer.svg"
        alt=""
        fill
        className="pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "top center" }}
      />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto
                      px-6 sm:px-10 lg:px-[60px] pt-[60px] lg:pt-[80px] pb-[40px]">

        {/* ── 3-column grid — equal thirds guarantee the centre column sits
            at exactly 1/3 of the width.
            On mobile the grid collapses to 1 column, centred.               */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[48px] lg:gap-0 justify-items-center lg:justify-items-stretch">

          {/* ── Left: Logo + phrase ──────────────────────────────────── */}
          <div className="flex flex-col items-center lg:items-start gap-[20px]">
            <div className={logoA.cls} style={logoA.style}>
              <Link href="#inicio">
                <Image
                  src="/assets/shared/logo.png"
                  alt="JPG Logo"
                  width={220}
                  height={85}
                  className="h-auto w-[clamp(160px,14vw,220px)]"
                />
              </Link>
            </div>
            <p
              className={`m-0 font-bold text-[#141414] leading-snug text-center lg:text-left lg:max-w-[200px] ${phraseA.cls}`}
              style={{
                fontFamily: "var(--font-big-shoulders)",
                fontSize: "clamp(15px, 1.4vw, 20px)",
                ...phraseA.style,
              }}
            >
              {ft.phrase[lang]}
            </p>
          </div>

          {/* ── Center: Tech cards ───────────────────────────────────── */}
          {/* items-start on desktop: title left-aligns within the centre third,
              giving the visual impression it's shifted left of centre.
              Cards sub-container stays items-center so Tailwind card is
              centred under the React+TS row.                                */}
          <div className="flex flex-col items-center gap-[30px] lg:pt-[60px] lg:pl-[40px]">
            <h4
              className={`m-0 font-bold text-[#141414] leading-none text-center ${techTitleA.cls}`}
              style={{
                fontFamily: "var(--font-big-shoulders)",
                fontSize: 24,
                ...techTitleA.style,
              }}
            >
              {ft.techTitle[lang]}
            </h4>

            <div className="flex flex-col items-center gap-[12px]">
              <div className="flex gap-[12px]">
                <div className={card1A.cls} style={card1A.style}>
                  <TechCard {...TECH_CARDS[0]} />
                </div>
                <div className={card2A.cls} style={card2A.style}>
                  <TechCard {...TECH_CARDS[1]} />
                </div>
              </div>
              <div className={card3A.cls} style={card3A.style}>
                <TechCard {...TECH_CARDS[2]} />
              </div>
            </div>
          </div>

          {/* ── Right: Navigation — pushed to the right edge of its grid cell ── */}
          <div className="flex flex-col items-center gap-[20px] lg:justify-self-end">
            <h3
              className={`m-0 font-bold text-[#141414] leading-none text-center ${navTitleA.cls}`}
              style={{
                fontFamily: "var(--font-big-shoulders)",
                fontSize: 36,
                ...navTitleA.style,
              }}
            >
              {ft.navTitle[lang]}
            </h3>
            <nav className="flex flex-col items-center gap-[6px]">
              {labels.map((label, i) => {
                const linkA = ea(anim, "animate-fade-in-right", "animate-fade-out-right", 260 + i * 55);
                return (
                  <Link
                    key={NAV_HREFS[i]}
                    href={NAV_HREFS[i]}
                    className={`font-semibold text-[#141414] hover:-translate-y-[2px] transition-transform duration-200 w-fit text-center ${linkA.cls}`}
                    style={{
                      fontFamily: "var(--font-big-shoulders)",
                      fontSize: "clamp(16px, 1.4vw, 20px)",
                      ...linkA.style,
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="w-full h-[1px] bg-[#4d4c4c] mt-[40px] lg:mt-[60px]" />
        <div
          className="flex justify-between items-center mt-[16px] transition-opacity duration-700"
          style={{ opacity: anim === "entering" ? 0.5 : 0, transitionDelay: anim === "entering" ? "600ms" : "0ms" }}
        >
          <p
            className="m-0 font-semibold text-[#141414]"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
          >
            © {ft.copyright[lang]}
          </p>
          <p
            className="m-0 font-semibold text-[#141414]"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
          >
            {ft.madeWith[lang]}
          </p>
        </div>

      </div>
    </footer>
  );
}
