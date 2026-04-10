"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang, t } from "@/context/LanguageContext";
import { BrushBorder } from "@/components/ui/BrushBorder";

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

        <div className="relative z-10 flex items-center h-full pl-[80px] pr-[70px]">
          {/* Logo */}
          <Link href="#inicio" className="shrink-0">
            <Image
              src="/assets/hero/logo.png"
              alt="JPG Logo"
              width={155}
              height={60}
              priority
            />
          </Link>

          <div className="flex-1" />

          {/* Nav links + buttons */}
          <div className="flex items-center shrink-0" style={{ marginTop: "-3px" }}>
            <div className="flex items-center gap-[30px]">
              {labels.map((label, i) => (
                <Link
                  key={NAV_HREFS[i]}
                  href={NAV_HREFS[i]}
                  className="font-bold text-[16px] text-black whitespace-nowrap hover:text-black/50 transition-colors leading-none"
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="w-[60px]" />

            {/* Language Toggle */}
            <BrushBorder fill="#c8ff00">
              <div className="flex items-center px-[6px] py-[5px] gap-[4px]">
                <button
                  onClick={() => setLang("es")}
                  className={`flex gap-[7px] items-center justify-center px-[10px] py-[6px] rounded-[18px] transition-all ${
                    lang === "es" ? "bg-black" : "hover:bg-black/10"
                  }`}
                >
                  <span className="overflow-hidden rounded-full w-[22px] h-[22px] flex flex-col shrink-0">
                    <span className="bg-[#fdcf16] w-full" style={{ height: "50%" }} />
                    <span className="bg-[#033f94] w-full" style={{ height: "25%" }} />
                    <span className="bg-[#c8191e] w-full" style={{ height: "25%" }} />
                  </span>
                  <span
                    className={`font-bold text-[14px] leading-none ${
                      lang === "es" ? "text-[#c8ff00]" : "text-[#737373]"
                    }`}
                    style={{ fontFamily: "var(--font-big-shoulders)" }}
                  >
                    ES
                  </span>
                </button>

                <button
                  onClick={() => setLang("en")}
                  className={`flex gap-[7px] items-center justify-center px-[10px] py-[6px] rounded-[18px] transition-all ${
                    lang === "en" ? "bg-black" : "hover:bg-black/10"
                  }`}
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
                    className={`font-bold text-[14px] leading-none ${
                      lang === "en" ? "text-[#c8ff00]" : "text-[#737373]"
                    }`}
                    style={{ fontFamily: "var(--font-big-shoulders)" }}
                  >
                    EN
                  </span>
                </button>
              </div>
            </BrushBorder>

            <div className="w-[30px]" />

            {/* CV Button */}
            <BrushBorder
              fill="#c8ff00"
              className="hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <a
                href="/assets/cv.pdf"
                download
                className="flex items-center justify-center px-[22px] py-[12px] font-bold text-[17px] text-[#1a1a1a] whitespace-nowrap leading-none"
                style={{ fontFamily: "var(--font-big-shoulders)" }}
              >
                {t.nav.cv[lang]}
              </a>
            </BrushBorder>
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
                className="font-bold text-[22px] text-black py-3 border-b border-black/10 last:border-0 hover:text-black/50 transition-colors leading-none"
                style={{ fontFamily: "var(--font-big-shoulders)" }}
              >
                {labels[i]}
              </Link>
            ))}
          </nav>

          {/* Language + CV in mobile menu */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-black/10">
            {/* Language Toggle - pill style */}
            <div className="flex items-center gap-1 bg-black/10 rounded-full px-1 py-1">
              <button
                onClick={() => setLang("es")}
                className={`flex gap-[6px] items-center justify-center px-3 py-2 rounded-full transition-all ${
                  lang === "es" ? "bg-black" : "hover:bg-black/10"
                }`}
              >
                <span className="overflow-hidden rounded-full w-[20px] h-[20px] flex flex-col shrink-0">
                  <span className="bg-[#fdcf16] w-full" style={{ height: "50%" }} />
                  <span className="bg-[#033f94] w-full" style={{ height: "25%" }} />
                  <span className="bg-[#c8191e] w-full" style={{ height: "25%" }} />
                </span>
                <span
                  className={`font-bold text-[14px] leading-none ${
                    lang === "es" ? "text-[#c8ff00]" : "text-[#737373]"
                  }`}
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  ES
                </span>
              </button>

              <button
                onClick={() => setLang("en")}
                className={`flex gap-[6px] items-center justify-center px-3 py-2 rounded-full transition-all ${
                  lang === "en" ? "bg-black" : "hover:bg-black/10"
                }`}
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
                  className={`font-bold text-[14px] leading-none ${
                    lang === "en" ? "text-[#c8ff00]" : "text-[#737373]"
                  }`}
                  style={{ fontFamily: "var(--font-big-shoulders)" }}
                >
                  EN
                </span>
              </button>
            </div>

            {/* CV Button — black on lime bg so it's visible */}
            <a
              href="/assets/cv.pdf"
              download
              className="bg-black font-bold text-[16px] text-[#c8ff00] px-5 py-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all leading-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-big-shoulders)" }}
            >
              {t.nav.cv[lang]}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
