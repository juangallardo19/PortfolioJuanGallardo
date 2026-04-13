"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useLang, t } from "@/context/LanguageContext";

const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/gallardo_.r",           icon: "/assets/about/instagram.svg" },
  { name: "GitHub",    href: "https://github.com/juangallardo19",                icon: "/assets/about/GitHub.svg"    },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/juan-gallardo-5b94831b2/", icon: "/assets/about/Linkdin.svg"   },
];

// ─────────────────────────────────────────────────────────────────
//  CARD LAYOUT — tune these to reposition text inside the SVG card
//  without needing Claude.
//
//  size        → % of total card height this zone occupies (all 5 must sum to 100)
//  paddingTop  → % of THAT zone's height before the text starts (0 = flush to top)
// ─────────────────────────────────────────────────────────────────
const CARD = {
  header:    { size: 12, paddingTop: 10 }, // "sobre Juan Pablo"  — increase paddingTop to push further down
  games:     { size: 35, paddingTop:  6 }, // "Videojuegos"       — PERFECT, avoid changing
  connector: { size:  2              },    //s yellow bridge (no text)
  music:     { size: 28, paddingTop:  1 }, // "Música"            — decrease paddingTop to move up
  footer:    { size: 14              },    // "Algo más que developer"
} as const;

type AnimState = "idle" | "entering" | "exiting";

export function AboutSection() {
  const { lang } = useLang();
  const about = t.about;

  const leftRef   = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);
  const [leftAnim,   setLeftAnim]   = useState<AnimState>("idle");
  const [socialAnim, setSocialAnim] = useState<AnimState>("idle");
  const [rightAnim,  setRightAnim]  = useState<AnimState>("idle");

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
      [leftRef,   setLeftAnim],
      [socialRef, setSocialAnim],
      [rightRef,  setRightAnim],
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
      id="acerca"
      className="relative flex items-center justify-center w-full overflow-hidden scroll-mt-[90px] lg:scroll-mt-[-45px]"
      style={{ minHeight: "max(920px, 110svh)" }}
    >
      <Image src="/assets/about/about-section-bg.png" alt="" fill className="object-cover pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[120px] w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[60px] py-[60px]">

        {/* ── LEFT: Title + Description + Social ─────────────────── */}
        <div
          ref={leftRef}
          className={`flex flex-col w-full lg:w-auto lg:max-w-[480px] shrink-0 ${
            leftAnim === "entering" ? "animate-fade-in-left" :
            leftAnim === "exiting"  ? "animate-fade-out-left" : "opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            <h2 className="m-0 leading-[1.0]">
              <span className="text-[clamp(34px,3.8vw,51px)] font-normal text-[#4d4c4c]" style={{ WebkitTextStroke: "1px #000" }}>
                {about.titlePre[lang]}{" "}
              </span>
              <span className="text-[clamp(34px,3.8vw,51px)] font-normal text-[#fcd116]" style={{ WebkitTextStroke: "1px #000" }}>
                {about.titleHighlight[lang]}
              </span>
            </h2>

            <p className="text-[clamp(17px,2.1vw,25px)] text-[#717171] leading-[1.5] font-extralight text-justify m-0">
              {about.descPre[lang]}
              <strong className="text-[#fcd116] font-bold font-big-shoulders-stencil">{about.descName[lang]}</strong>
              {about.descPost[lang]}
            </p>
          </div>

          {/* Social media card — mt-[30px] gap from description, w-fit fixes SVG alignment */}
          <div
            ref={socialRef}
            className={`relative mt-[30px] w-fit ${
              socialAnim === "entering" ? "animate-fade-in-up" :
              socialAnim === "exiting"  ? "animate-fade-out-down" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/about/card-social-media.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />
            <div className="relative z-10 flex items-center gap-[40px] p-[20px]">
              {SOCIAL.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={`relative shrink-0 w-[76px] h-[76px] hover:brightness-75 active:scale-95 transition-all ${
                    socialAnim === "entering" ? "animate-fade-in-up" :
                    socialAnim === "exiting"  ? "animate-fade-out-down" : "opacity-0"
                  }`}
                  style={socialAnim !== "idle" ? { animationDelay: `${i * 100}ms` } : undefined}
                >
                  <div className="relative w-full h-full">
                    <Image src={s.icon} alt={s.name} fill className="object-contain" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: About card ────────────────────────────────────── */}
        <div
          ref={rightRef}
          className={`relative shrink-0 w-[min(420px,calc(100vw-48px))] ${
            rightAnim === "entering" ? "animate-fade-in-right" :
            rightAnim === "exiting"  ? "animate-fade-out-right" : "opacity-0"
          }`}
          style={rightAnim !== "idle" ? { animationDelay: "150ms" } : undefined}
        >
          {/* CardAboutMe.svg — visual only */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/about/CardAboutMe.svg"
            alt=""
            aria-hidden="true"
            className="w-full h-auto pointer-events-none select-none block"
          />

          {/* Text overlay — driven by CARD constants above */}
          <div className="absolute inset-0 flex flex-col">

            {/* ── "sobre Juan Pablo" ── */}
            <div
              className="flex items-start px-[7%]"
              style={{ flex: `0 0 ${CARD.header.size}%`, paddingTop: `${CARD.header.paddingTop}%` }}
            >
              <span className="font-semibold text-[clamp(15px,3.4vw,22px)] text-[#1a1a1a] leading-none">
                {about.card.header[lang]}
              </span>
            </div>

            {/* ── Videojuegos ── */}
            <div
              className="flex flex-col gap-[3%] px-[7%] pr-[28%] items-start"
              style={{ flex: `0 0 ${CARD.games.size}%`, paddingTop: `${CARD.games.paddingTop}%` }}
            >
              <p className="text-[#fcd116] font-bold text-[clamp(15px,3.4vw,20px)] m-0 leading-none">
                {about.card.gamesTitle[lang]}
              </p>
              <p className="text-[#1a1a1a] font-normal text-[clamp(15px,3.4vw,20px)] leading-[1.4] m-0">
                {about.card.gamesText[lang]}
              </p>
            </div>

            {/* ── Connector (no text) ── */}
            <div style={{ flex: `0 0 ${CARD.connector.size}%` }} />

            {/* ── Música ── */}
            <div
              className="flex flex-col gap-[3%] px-[7%] pl-[26%] items-end"
              style={{ flex: `0 0 ${CARD.music.size}%`, paddingTop: `${CARD.music.paddingTop}%` }}
            >
              <p className="text-[#fcd116] font-bold text-[clamp(15px,3.4vw,20px)] m-0 leading-none text-right">
                {about.card.musicTitle[lang]}
              </p>
              <p className="text-[#1a1a1a] font-normal text-[clamp(15px,3.4vw,20px)] leading-[1.4] m-0 text-right">
                {about.card.musicText[lang]}
              </p>
            </div>

            {/* ── "Algo más que developer" ── */}
            <div
              className="flex items-center px-[7%]"
              style={{ flex: `0 0 ${CARD.footer.size}%` }}
            >
              <p className="font-semibold text-[clamp(15px,3.4vw,22px)] text-[#1a1a1a] m-0 leading-none">
                {about.card.footerPre[lang]}
                <strong className="text-[#fcd116] font-bold font-big-shoulders-stencil">
                  {about.card.footerHighlight[lang]}
                </strong>
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
