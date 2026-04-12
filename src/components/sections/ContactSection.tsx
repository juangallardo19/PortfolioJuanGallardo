"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useLang, t } from "@/context/LanguageContext";

const TITLE_SIZE    = "clamp(34px, 4.2vw, 54px)";
const SUBTITLE_SIZE = "clamp(15px, 1.5vw, 20px)";

type AnimState = "idle" | "entering" | "exiting";

function ea(anim: AnimState, enter: string, exit: string, delayMs = 0) {
  const style: React.CSSProperties = delayMs ? { animationDelay: `${delayMs}ms` } : {};
  if (anim === "entering") return { cls: enter, style };
  if (anim === "exiting")  return { cls: exit,  style };
  return { cls: "opacity-0", style: {} as React.CSSProperties };
}

// ─── Social contact card ──────────────────────────────────────────────────────
function SocialCard({
  href, svgSrc, iconSrc, text, w, h,
}: {
  href: string; svgSrc: string; iconSrc: string;
  text: string; w: number; h: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block hover:scale-[1.05] active:scale-100 transition-transform duration-200"
      style={{ textDecoration: "none", flexShrink: 0 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={svgSrc} alt="" width={w} height={h} style={{ display: "block" }} />
      <div className="absolute inset-0 flex items-center justify-center gap-[10px] px-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" style={{ width: 38, height: 38, flexShrink: 0 }} />
        <span
          className="text-[#4d4c4c] font-bold whitespace-nowrap"
          style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
        >
          {text}
        </span>
      </div>
    </a>
  );
}

export function ContactSection() {
  const { lang } = useLang();
  const ct = t.contact;

  const sectionRef = useRef<HTMLElement>(null);
  const [anim, setAnim] = useState<AnimState>("idle");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnim("entering");
        else setAnim(prev => (prev === "idle" ? "idle" : "exiting"));
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const leftA  = ea(anim, "animate-fade-in-left",  "animate-fade-out-left",  0);
  const rightA = ea(anim, "animate-fade-in-right", "animate-fade-out-right", 150);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="dot-pattern relative w-full overflow-hidden scroll-mt-[90px] lg:scroll-mt-[130px]"
    >
      <Image
        src="/assets/contact/contact-section-bg.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto
                      px-6 sm:px-10 lg:px-[60px] py-[80px] lg:py-[120px]">

        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-center justify-center">

          {/* ── Left column: photo + social cards ──────────────────────── */}
          <div
            className={`flex flex-col items-center gap-[16px] w-full lg:max-w-[500px] ${leftA.cls}`}
            style={leftA.style}
          >
            {/* Photo with blob */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/contact/photoContact.svg"
              alt="Juan Pablo Gallardo"
              className="w-full max-w-[486px]"
              style={{ display: "block" }}
            />

            {/* GitHub card — centered */}
            <SocialCard
              href="https://github.com/juangallardo19"
              svgSrc="/assets/contact/card-github.svg"
              iconSrc="/assets/contact/github.svg"
              text="juangallardo19"
              w={210} h={107}
            />

            {/* LinkedIn + Gmail side by side */}
            <div className="flex flex-wrap gap-[10px] justify-center">
              <SocialCard
                href="https://linkedin.com/in/juanpablogallardo"
                svgSrc="/assets/contact/card-linkdn.svg"
                iconSrc="/assets/contact/linkdn.svg"
                text="Juan Gallardo"
                w={213} h={114}
              />
              <SocialCard
                href="mailto:Juangallardocsfn@gmail.com"
                svgSrc="/assets/contact/card-gmail.svg"
                iconSrc="/assets/contact/gmail.svg"
                text="Juangallardocsfn@gmail.com"
                w={275} h={108}
              />
            </div>
          </div>

          {/* ── Right column: contact form ──────────────────────────────── */}
          <div
            className={`relative w-full lg:max-w-[558px] ${rightA.cls}`}
            style={rightA.style}
          >
            {/* SVG card background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/contact/cardContact.svg"
              alt=""
              className="w-full pointer-events-none"
              style={{ display: "block" }}
            />

            {/* Form content overlaid */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{ padding: "clamp(20px, 7.5%, 42px) clamp(20px, 8%, 46px)" }}
            >
              {/* Title + subtitle */}
              <div style={{ marginBottom: "clamp(12px, 3%, 20px)" }}>
                <h2
                  className="m-0 leading-[1.0] font-bold"
                  style={{
                    fontFamily: "var(--font-big-shoulders)",
                    fontSize: TITLE_SIZE,
                    color: "#00ffb2",
                    WebkitTextStroke: "1px #000",
                  }}
                >
                  {ct.titleHighlight[lang]}
                </h2>
                <p
                  className="m-0 font-extralight text-[#4d4c4c]"
                  style={{ fontFamily: "var(--font-big-shoulders)", fontSize: SUBTITLE_SIZE, marginTop: 6 }}
                >
                  {ct.subtitle[lang]}
                </p>
              </div>

              {/* Email + Name inputs */}
              <div className="flex gap-[12px]" style={{ marginBottom: "clamp(8px, 2.5%, 14px)" }}>
                {/* Email */}
                <div className="flex-1 flex flex-col gap-[5px]">
                  <label
                    className="font-bold text-[#4d4c4c]"
                    style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
                  >
                    {ct.labels.email[lang]}
                  </label>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/contact/inputEmail-Name.svg" alt="" className="w-full" style={{ display: "block" }} />
                    <input
                      type="email"
                      placeholder={ct.placeholders.email[lang]}
                      className="absolute inset-0 w-full h-full bg-transparent border-none outline-none"
                      style={{
                        fontFamily: "var(--font-big-shoulders)",
                        fontWeight: 200,
                        fontSize: 13,
                        color: "#4d4c4c",
                        padding: "0 14px",
                      }}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="flex-1 flex flex-col gap-[5px]">
                  <label
                    className="font-bold text-[#4d4c4c]"
                    style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
                  >
                    {ct.labels.name[lang]}
                  </label>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/contact/inputEmail-Name.svg" alt="" className="w-full" style={{ display: "block" }} />
                    <input
                      type="text"
                      placeholder={ct.placeholders.name[lang]}
                      className="absolute inset-0 w-full h-full bg-transparent border-none outline-none"
                      style={{
                        fontFamily: "var(--font-big-shoulders)",
                        fontWeight: 200,
                        fontSize: 13,
                        color: "#4d4c4c",
                        padding: "0 14px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Message textarea */}
              <div className="flex flex-col gap-[5px]" style={{ marginBottom: "clamp(8px, 2.5%, 14px)" }}>
                <label
                  className="font-bold text-[#4d4c4c]"
                  style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}
                >
                  {ct.labels.message[lang]}
                </label>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/contact/inputTalkAbout.svg" alt="" className="w-full" style={{ display: "block" }} />
                  <textarea
                    placeholder={ct.placeholders.message[lang]}
                    className="absolute inset-0 w-full h-full bg-transparent border-none outline-none resize-none"
                    style={{
                      fontFamily: "var(--font-big-shoulders)",
                      fontWeight: 200,
                      fontSize: 13,
                      color: "#4d4c4c",
                      padding: "12px 14px",
                    }}
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="button"
                className="relative w-full bg-transparent border-none p-0 cursor-pointer
                           hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/contact/Button.svg" alt="" className="w-full" style={{ display: "block" }} />
                <span
                  className="absolute inset-0 flex items-center justify-center font-bold text-[#141414]"
                  style={{ fontFamily: "var(--font-big-shoulders)", fontSize: "clamp(14px, 2.5%, 16px)" }}
                >
                  {ct.labels.send[lang]}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
