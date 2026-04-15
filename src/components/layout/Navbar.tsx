"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang, t } from "@/context/LanguageContext";

const NAV_HREFS = ["#inicio", "#habilidades", "#acerca", "#proyectos", "#testimonios", "#experiencia", "#contacto"];

// All 7 nav indices for mobile
const MOBILE_NAV_INDICES = [0, 1, 2, 3, 4, 5, 6];

export function Navbar() {
  const { lang, setLang } = useLang();
  const labels = t.nav.links[lang];
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center lg:pt-[10px]">
      {/* ── Desktop Navbar ─────────────────────────────────────── */}
      <div
        className="relative mx-auto w-full hidden lg:block"
        style={{ maxWidth: 1375, height: 100 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero/nav-bg.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        />

        <div className="relative z-10 flex items-center h-full" style={{ marginTop: "-3px", paddingLeft: "clamp(20px, 5.5vw, 80px)", paddingRight: "clamp(20px, 5vw, 70px)" }}>

          {/* ── Izquierda: Logo ── */}
          <Link href="#inicio" className="shrink-0 animate-bubble-in" style={{ animationDelay: "80ms" }}>
            <Image
              src="/assets/hero/logo.png"
              alt="JPG Logo"
              width={155}
              height={60}
              priority
              className="w-[clamp(90px,11vw,155px)] h-auto"
            />
          </Link>

          {/* ── Centro: Nav links ── */}
          <div className="flex-1 flex items-center justify-center overflow-hidden pl-[8%] pr-4">
            <div className="flex items-center" style={{ gap: "clamp(2px, 0.9vw, 14px)" }}>
              {labels.map((label, i) => (
                <Link
                  key={NAV_HREFS[i]}
                  href={NAV_HREFS[i]}
                  className="font-bold text-black whitespace-nowrap px-[6px] py-[4px] hover:-translate-y-[3px] transition-transform duration-200 leading-none animate-bubble-in"
                  style={{ fontFamily: "var(--font-big-shoulders)", fontSize: "clamp(11px, 1.05vw, 16px)", animationDelay: `${180 + i * 55}ms` }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Derecha: Toggle + CV ── */}
          <div className="shrink-0 flex items-center" style={{ gap: "clamp(8px, 1vw, 16px)" }}>

            {/* Language Toggle */}
            <div
              className="relative flex items-center px-[8px] py-[6px] animate-bubble-in"
              style={{ backgroundImage: "url('/assets/hero/toggle-container.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", animationDelay: "620ms" }}
            >
              <div
                className="absolute inset-y-[6px] rounded-[18px] bg-black pointer-events-none transition-all duration-300 ease-in-out"
                style={{ left: lang === "es" ? "8px" : "50%", right: lang === "en" ? "8px" : "50%" }}
              />
              {/* ES button — lifts only when EN is active */}
              <button
                onClick={() => setLang("es")}
                className={`relative z-10 flex gap-[7px] items-center justify-center px-[10px] py-[6px] rounded-[18px] transition-transform duration-200 ${lang !== "es" ? "hover:-translate-y-[3px]" : ""}`}
              >
                <span className="overflow-hidden rounded-full w-[22px] h-[22px] flex flex-col shrink-0">
                  <span className="bg-[#fdcf16] w-full" style={{ height: "50%" }} />
                  <span className="bg-[#033f94] w-full" style={{ height: "25%" }} />
                  <span className="bg-[#c8191e] w-full" style={{ height: "25%" }} />
                </span>
                <span
                  className={`font-bold text-[14px] leading-none transition-colors duration-300 ${lang === "es" ? "text-[#c8ff00]" : "text-[#737373]"}`}
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  ES
                </span>
              </button>
              {/* EN button — lifts only when ES is active */}
              <button
                onClick={() => setLang("en")}
                className={`relative z-10 flex gap-[7px] items-center justify-center px-[10px] py-[6px] rounded-[18px] transition-transform duration-200 ${lang !== "en" ? "hover:-translate-y-[3px]" : ""}`}
              >
                <span className="relative overflow-hidden rounded-full w-[22px] h-[22px] bg-[#012169] shrink-0">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="absolute bg-white w-full h-[8px]" />
                    <span className="absolute bg-white h-full w-[8px]" />
                    <span className="absolute bg-[#C8102E] w-full h-[4px]" />
                    <span className="absolute bg-[#C8102E] h-full w-[4px]" />
                  </span>
                </span>
                <span
                  className={`font-bold text-[14px] leading-none transition-colors duration-300 ${lang === "en" ? "text-[#c8ff00]" : "text-[#737373]"}`}
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  EN
                </span>
              </button>
            </div>

            {/* CV Button */}
            <a
              href="/assets/cv-juan-gallardo.pdf"
              download="CV-Juan-Gallardo.pdf"
              className="flex items-center justify-center gap-[8px] px-[22px] py-[12px] font-bold text-[17px] text-[#1a1a1a] whitespace-nowrap leading-none hover:scale-[1.05] active:scale-[0.98] transition-transform duration-200 animate-bubble-in"
              style={{
                backgroundImage: "url('/assets/hero/download-cv.svg')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                fontFamily: "var(--font-big-shoulders)",
                animationDelay: "690ms",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {t.nav.cv[lang]}
            </a>

          </div>
        </div>
      </div>

      {/* ── Mobile Navbar ──────────────────────────────────────── */}
      <div className="lg:hidden w-full">
        {/* Top bar */}
        <div className="relative flex items-center justify-between px-5 h-[64px] bg-[#c8ff00] border-b-2 border-black/20">
          <Link href="#inicio" onClick={() => setOpen(false)}>
            <Image
              src="/assets/hero/logo.png"
              alt="JPG Logo"
              width={110}
              height={42}
              priority
            />
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`flex flex-col justify-center gap-[5px] w-[40px] h-[40px] rounded-lg bg-transparent hover:bg-black/10 transition-colors ${
              open ? "items-center" : "items-end"
            }`}
          >
            {/* Top line — full width */}
            <span
              className={`block h-[3px] bg-black rounded-full transition-all duration-300 ${
                open ? "w-[22px] rotate-45 translate-y-[8px]" : "w-[22px]"
              }`}
            />
            {/* Middle line — short, right-aligned when closed */}
            <span
              className={`block h-[3px] bg-black rounded-full transition-all duration-200 ${
                open ? "w-0 opacity-0" : "w-[14px]"
              }`}
            />
            {/* Bottom line — full width */}
            <span
              className={`block h-[3px] bg-black rounded-full transition-all duration-300 ${
                open ? "w-[22px] -rotate-45 -translate-y-[8px]" : "w-[22px]"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#c8ff00] border-b-2 border-black/20 ${
            open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-5 py-4 gap-1">
            {MOBILE_NAV_INDICES.map((i) => (
              <Link
                key={NAV_HREFS[i]}
                href={NAV_HREFS[i]}
                onClick={() => setOpen(false)}
                className="font-bold text-[22px] text-black py-3 px-2 border-b border-black/10 last:border-0 hover:-translate-y-[2px] transition-transform duration-200 leading-none"
                style={{ fontFamily: "var(--font-big-shoulders)" }}
              >
                {labels[i]}
              </Link>
            ))}
          </nav>

          {/* Language + CV in mobile menu */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-black/10">
            {/* Language Toggle */}
            <div
              className="relative flex items-center px-[8px] py-[6px]"
              style={{ backgroundImage: "url('/assets/hero/toggle-container.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
            >
              {/* Sliding pill */}
              <div
                className="absolute inset-y-[6px] rounded-[18px] bg-black pointer-events-none transition-all duration-300 ease-in-out"
                style={{ left: lang === "es" ? "8px" : "50%", right: lang === "en" ? "8px" : "50%" }}
              />
              <button
                onClick={() => setLang("es")}
                className={`relative z-10 flex gap-[6px] items-center justify-center px-[10px] py-[6px] rounded-[18px] transition-transform duration-200 ${lang !== "es" ? "hover:-translate-y-[3px]" : ""}`}
              >
                <span className="overflow-hidden rounded-full w-[20px] h-[20px] flex flex-col shrink-0">
                  <span className="bg-[#fdcf16] w-full" style={{ height: "50%" }} />
                  <span className="bg-[#033f94] w-full" style={{ height: "25%" }} />
                  <span className="bg-[#c8191e] w-full" style={{ height: "25%" }} />
                </span>
                <span
                  className={`font-bold text-[14px] leading-none transition-colors duration-300 ${lang === "es" ? "text-[#c8ff00]" : "text-[#737373]"}`}
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  ES
                </span>
              </button>

              <button
                onClick={() => setLang("en")}
                className={`relative z-10 flex gap-[6px] items-center justify-center px-[10px] py-[6px] rounded-[18px] transition-transform duration-200 ${lang !== "en" ? "hover:-translate-y-[3px]" : ""}`}
              >
                <span className="relative overflow-hidden rounded-full w-[20px] h-[20px] bg-[#012169] shrink-0">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="absolute bg-white w-full h-[7px]" />
                    <span className="absolute bg-white h-full w-[7px]" />
                    <span className="absolute bg-[#C8102E] w-full h-[3.5px]" />
                    <span className="absolute bg-[#C8102E] h-full w-[3.5px]" />
                  </span>
                </span>
                <span
                  className={`font-bold text-[14px] leading-none transition-colors duration-300 ${lang === "en" ? "text-[#c8ff00]" : "text-[#737373]"}`}
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  EN
                </span>
              </button>
            </div>

            {/* CV Button */}
            <a
              href="/assets/cv-juan-gallardo.pdf"
              download="CV-Juan-Gallardo.pdf"
              className="flex items-center gap-[8px] px-[20px] py-[10px] font-bold text-[17px] text-[#1a1a1a] whitespace-nowrap leading-none hover:scale-[1.05] active:scale-[0.98] transition-transform duration-200"
              style={{
                backgroundImage: "url('/assets/hero/download-cv.svg')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                fontFamily: "var(--font-big-shoulders)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {t.nav.cv[lang]}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}