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
// To adjust icon/text position INSIDE each card, edit the `contentStyle` prop
// where SocialCard is called below.
// Use paddingLeft / paddingTop / paddingBottom to shift the content within the SVG.
function SocialCard({
  href, svgSrc, iconSrc, text, w, h, contentStyle = {},
}: {
  href: string; svgSrc: string; iconSrc: string;
  text: string; w: number; h: number;
  contentStyle?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block hover:scale-[1.05] active:scale-100 transition-transform duration-200"
      style={{ textDecoration: "none" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={svgSrc} alt="" width={w} height={h}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
      {/*
        ↓↓ AJUSTE DE POSICIÓN INTERNA ↓↓
        Modifica `contentStyle` en la llamada a SocialCard para mover el contenido
        dentro del SVG. Ejemplo: contentStyle={{ paddingLeft: 30, paddingBottom: 14 }}
      */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-[10px] px-[16px]"
        style={contentStyle}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" style={{ width: 38, height: 38, flexShrink: 0 }} />
        <span
          className="font-bold text-[#4d4c4c] whitespace-nowrap"
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

  // Form state
  const [formData, setFormData] = useState({ email: "", name: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ email: "", name: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  // ── Individual animations — adjust delays (last argument, in ms) as needed ──
  const photoA    = ea(anim, "animate-fade-in-left",  "animate-fade-out-left",    0);
  const githubA   = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",  200);
  const linkedinA = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",  350);
  const gmailA    = ea(anim, "animate-fade-in-up",    "animate-fade-out-down",  500);
  const rightA    = ea(anim, "animate-fade-in-right", "animate-fade-out-right", 150);

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-big-shoulders)",
    fontWeight: 200,
    fontSize: 13,
    color: "#4d4c4c",
    padding: "0 14px",
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="dot-pattern relative w-full overflow-hidden scroll-mt-[90px] lg:scroll-mt-[-35px]"
    >
      <Image
        src="/assets/contact/contact-section-bg.png"
        alt=""
        fill
        className="object-contain pointer-events-none opacity-50"
        style={{ transform: "scale(0.75)", transformOrigin: "center center" }}
      />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto
                      px-6 sm:px-10 lg:px-[60px] py-[80px] lg:py-[120px]">

        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-center justify-center">

          {/* ── Left column: photo + social cards ──────────────────────────────
              Each child animates independently (photo, github, linkedin, gmail).
              To reposition a card within the column, adjust marginTop on its wrapper div.
              order-2: on mobile this column appears BELOW the form (order-1).
          */}
          <div className="order-2 lg:order-1 flex flex-col items-center gap-[16px] w-full lg:max-w-[520px]">

            {/* ── Photo ──
                To move up/down relative to the cards below: adjust marginBottom here.
            */}
            <div className={photoA.cls} style={photoA.style}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/contact/photoContact.svg"
                alt="Juan Pablo Gallardo"
                className="w-full max-w-[380px]"
                style={{ display: "block" }}
              />
            </div>

            {/* ── GitHub card ──
                To move this card vertically: adjust style={{ marginTop: X }} on the wrapper.
                To shift icon/text inside: edit contentStyle on SocialCard below.
            */}
            <div className={`w-fit ${githubA.cls}`} style={githubA.style}>
              <SocialCard
                href="https://github.com/juangallardo19"
                svgSrc="/assets/contact/card-github.svg"
                iconSrc="/assets/contact/github.svg"
                text="juangallardo19"
                w={210} h={107}
                contentStyle={{ paddingLeft: 0 }}
              />
            </div>

            {/* ── LinkedIn + Gmail — always side by side ──
                To move the whole row: add marginTop to the outer div.
                To move each card individually: add marginTop/marginLeft to its wrapper.
                To shift icon/text inside each card: edit contentStyle on SocialCard.
            */}
            <div className="flex gap-[10px] w-full justify-center">

              {/* LinkedIn wrapper — adjust marginTop/marginLeft here to reposition */}
              <div
                className={linkedinA.cls}
                style={{ flex: 213, minWidth: 0, ...linkedinA.style }}
              >
                <SocialCard
                  href="https://linkedin.com/in/juanpablogallardo"
                  svgSrc="/assets/contact/card-linkdn.svg"
                  iconSrc="/assets/contact/linkdn.svg"
                  text="Juan Gallardo"
                  w={213} h={114}
                  contentStyle={{ paddingBottom: 14, paddingLeft: 8 }}
                />
              </div>

              {/* Gmail wrapper — adjust marginTop/marginLeft here to reposition */}
              <div
                className={gmailA.cls}
                style={{ flex: 275, minWidth: 0, ...gmailA.style }}
              >
                <SocialCard
                  href="mailto:Juangallardocsfn@gmail.com"
                  svgSrc="/assets/contact/card-gmail.svg"
                  iconSrc="/assets/contact/gmail.svg"
                  text="Juangallardocsfn@gmail.com"
                  w={275} h={108}
                  contentStyle={{ paddingBottom: 14, paddingLeft: 8 }}
                />
              </div>

            </div>
          </div>

          {/* ── Right column: contact form ──────────────────────────────── */}
          {/* order-1: on mobile the form appears FIRST (above the photo column) */}
          <div
            className={`order-1 lg:order-2 relative w-full lg:max-w-[558px] ${rightA.cls}`}
            style={rightA.style}
          >
            <form onSubmit={handleSubmit}>
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
                <div style={{ marginBottom: "clamp(10px, 3%, 18px)" }}>
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
                <div className="flex gap-[12px]" style={{ marginBottom: "clamp(8px, 2.5%, 12px)" }}>
                  <div className="flex-1 flex flex-col gap-[5px]">
                    <label className="font-bold text-[#4d4c4c]" style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}>
                      {ct.labels.email[lang]}
                    </label>
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/contact/inputEmail-Name.svg" alt="" className="w-full" style={{ display: "block" }} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={ct.placeholders.email[lang]}
                        className="absolute inset-0 w-full h-full bg-transparent border-none outline-none"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[5px]">
                    <label className="font-bold text-[#4d4c4c]" style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}>
                      {ct.labels.name[lang]}
                    </label>
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/contact/inputEmail-Name.svg" alt="" className="w-full" style={{ display: "block" }} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={ct.placeholders.name[lang]}
                        className="absolute inset-0 w-full h-full bg-transparent border-none outline-none"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message textarea */}
                <div className="flex flex-col gap-[5px]" style={{ marginBottom: "clamp(8px, 2.5%, 12px)" }}>
                  <label className="font-bold text-[#4d4c4c]" style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 13 }}>
                    {ct.labels.message[lang]}
                  </label>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/contact/inputTalkAbout.svg" alt="" className="w-full" style={{ display: "block" }} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={ct.placeholders.message[lang]}
                      className="absolute inset-0 w-full h-full bg-transparent border-none outline-none resize-none"
                      style={{ ...inputStyle, padding: "12px 14px" }}
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative w-full bg-transparent border-none p-0 cursor-pointer
                             hover:scale-[1.05] active:scale-[0.98] transition-transform duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/contact/Button.svg" alt="" className="w-full" style={{ display: "block" }} />
                  <span
                    className="absolute inset-0 flex items-center justify-center font-bold text-[#141414]"
                    style={{ fontFamily: "var(--font-big-shoulders)", fontSize: "clamp(14px, 2.5%, 16px)" }}
                  >
                    {status === "loading"
                      ? (lang === "es" ? "Enviando..." : "Sending...")
                      : ct.labels.send[lang]}
                  </span>
                </button>

                {/* Feedback messages */}
                {status === "success" && (
                  <p className="text-center font-bold text-[#00ffb2] mt-2"
                     style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 14 }}>
                    {lang === "es" ? "¡Mensaje enviado!" : "Message sent!"}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center font-bold text-red-500 mt-2"
                     style={{ fontFamily: "var(--font-big-shoulders)", fontSize: 14 }}>
                    {lang === "es" ? "Error al enviar. Intenta de nuevo." : "Failed to send. Please try again."}
                  </p>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
