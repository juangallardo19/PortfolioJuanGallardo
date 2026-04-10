"use client";

import Image from "next/image";
import { BrushBorder } from "@/components/ui/BrushBorder";
import { useLang, t } from "@/context/LanguageContext";

export function HeroSection() {
  const { lang } = useLang();
  const hero = t.hero;
  const [pre, mid1, mid2, end] = hero.description[lang];
  const [w1, w2, w3] = hero.highlightWords[lang];

  return (
    <section
      id="inicio"
      className="dot-pattern relative flex items-center justify-center w-full overflow-hidden"
      style={{ minHeight: "min(860px, 100svh)" }}
    >
      {/* Background */}
      <Image
        src="/assets/hero/hero-section-bg.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
        priority
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[100px] w-full max-w-[1360px] px-5 sm:px-10 lg:px-[60px] pt-[24px] pb-[40px] lg:py-[40px]">

        {/* ── Left: Text ─────────────────────────────── */}
        <div className="flex flex-col gap-[28px] lg:gap-[36px] items-start w-full lg:w-auto" style={{ maxWidth: 600 }}>

          {/* Title */}
          <h1
            className="leading-[1.0] m-0 font-normal animate-fade-in-left delay-100 w-full"
            style={{ fontFamily: "var(--font-big-shoulders)" }}
          >
            <span
              className="block text-[44px] sm:text-[56px] lg:text-[64px] text-[#4d4c4c]"
              style={{ WebkitTextStroke: "1px #000" }}
            >
              {hero.greeting[lang]}{" "}
              <span
                className="text-[#fcd116]"
                style={{ WebkitTextStroke: "1px #000" }}
              >
                Juan Pablo
              </span>
            </span>
            <span
              className="block text-[44px] sm:text-[56px] lg:text-[64px] text-[#fcd116]"
              style={{ WebkitTextStroke: "1px #000" }}
            >
              Gallardo
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-[18px] sm:text-[22px] lg:text-[26px] text-[#717171] text-justify leading-[36px] lg:leading-[44px] tracking-[2px] m-0 font-normal animate-fade-in-up delay-200"
            style={{ fontFamily: "var(--font-big-shoulders)" }}
          >
            {pre}
            <strong
              className="text-[#fcd116]"
              style={{ fontFamily: "var(--font-big-shoulders-stencil)", fontWeight: 700 }}
            >
              {w1}
            </strong>
            {mid1}
            <strong
              className="text-[#fcd116]"
              style={{ fontFamily: "var(--font-big-shoulders-stencil)", fontWeight: 700 }}
            >
              {w2}
            </strong>
            {mid2}
            <strong
              className="text-[#fcd116]"
              style={{ fontFamily: "var(--font-big-shoulders-stencil)", fontWeight: 700 }}
            >
              {w3}
            </strong>
            {end}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-[16px] sm:gap-[24px] animate-fade-in-up delay-400">
            <BrushBorder
              fill="#c8ff00"
              className="hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <a
                href="/assets/cv.pdf"
                download
                className="block px-[28px] sm:px-[40px] py-[14px] sm:py-[18px] font-bold text-[18px] sm:text-[22px] text-[#1a1a1a] whitespace-nowrap"
                style={{ fontFamily: "var(--font-big-shoulders)" }}
              >
                {hero.btnCV[lang]}
              </a>
            </BrushBorder>

            <BrushBorder
              fill="rgba(0,0,0,0.06)"
              className="active:scale-95 transition-all cursor-pointer"
            >
              <a
                href="https://github.com/juangallardo19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[10px] sm:gap-[12px] px-[22px] sm:px-[32px] py-[14px] sm:py-[18px] font-bold text-[18px] sm:text-[22px] text-[#1a1a1a] whitespace-nowrap"
                style={{ fontFamily: "var(--font-big-shoulders-stencil)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
                {hero.btnMore[lang]}
              </a>
            </BrushBorder>
          </div>
        </div>

        {/* ── Right: Photo ──────────────────────────── */}
        <div className="relative shrink-0 animate-fade-in-right delay-300">
          <Image
            src="/assets/hero/hero-photo.png"
            alt="Juan Pablo Gallardo — Full Stack Developer"
            width={520}
            height={620}
            className="object-contain w-[330px] sm:w-[380px] lg:w-[520px] h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
