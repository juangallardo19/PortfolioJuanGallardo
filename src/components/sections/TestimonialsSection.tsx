"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { useLang, t } from "@/context/LanguageContext";

// ─── Section sizes — tweak here ───────────────────────────────────────────────
const TITLE_SIZE    = "clamp(36px, 4.5vw, 58px)";
const SUBTITLE_SIZE = "clamp(16px, 1.6vw, 22px)";

// ─── Card sizes — tweak here ──────────────────────────────────────────────────
const CARD = {
  designWidth:  380,  // reference width for zoom scaling (matches card SVG viewBox)
  nameSize:     18,   // px at design width — Big Shoulders Semibold
  textSize:     15,   // px at design width — Big Shoulders Extralight
  avatarSize:   65,   // px at design width — avatar circle diameter
  paddingTop:   "12%",// % of design width — vertical room for baked-in stars
  paddingLeft:  "18%",   // px at design width — left inner padding  ← tweak freely
  paddingRight: "10%",   // px at design width — right inner padding
  paddingBot:   "10%",// % of design width — bottom inner padding
  gap:          8,    // px at design width — gap between name and avatar+text row
  textMaxWidth: 180,  // px at design width — max width of description text  ← tweak freely
} as const;

// ─── Data ────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name:   "Maria Jose Salzar",
    avatar: "/assets/testimonials/avatar-1.svg",
    text: {
      es: "Su capacidad de escucha y adaptación fue clave. Siempre dispuesto a iterar sin perder el enfoque.",
      en: "His ability to listen and adapt was key. Always willing to iterate without losing focus.",
    },
    card: "/assets/testimonials/card-1.svg",
  },
  {
    name:   "Oskar Guerrero",
    avatar: "/assets/testimonials/avatar-2.svg",
    text: {
      es: "El resultado superó mis expectativas. Comunicación fluida y comprometido con cada detalle del proyecto.",
      en: "The result exceeded my expectations. Smooth communication and committed to every detail of the project.",
    },
    card: "/assets/testimonials/card-2.svg",
  },
  {
    name:   "James Mora",
    avatar: "/assets/testimonials/avatar-3.svg",
    text: {
      es: "Resuelve problemas complejos con calma. Su actitud positiva contagia a todo el equipo.",
      en: "Solves complex problems calmly. His positive attitude is contagious across the team.",
    },
    card: "/assets/testimonials/card-1.svg",
  },
  {
    name:   "Jerson Rojas",
    avatar: "/assets/testimonials/avatar-4.svg",
    text: {
      es: "Gran trabajo en equipo. Siempre aporta ideas frescas y aprende increíblemente rápido.",
      en: "Great team player. Always brings fresh ideas and learns at an incredible pace.",
    },
    card: "/assets/testimonials/card-2.svg",
  },
  {
    name:   "Sebastian Torres",
    avatar: "/assets/testimonials/avatar-6.svg",
    text: {
      es: "Comprometido con cada sprint. Su organización y puntualidad son un ejemplo a seguir.",
      en: "Committed to every sprint. His organization and punctuality set the standard.",
    },
    card: "/assets/testimonials/card-1.svg",
  },
];

// Infinite loop: 3 clones at each end
const N    = TESTIMONIALS.length; // 5
const PRE  = 3;
const POST = 3;
const EXTENDED = [
  ...TESTIMONIALS.slice(-PRE),
  ...TESTIMONIALS,
  ...TESTIMONIALS.slice(0, POST),
];

// Stagger delays for initially visible cards
const CARD_ENTRY_DELAYS = [300, 450, 600];

// ─── Single card ─────────────────────────────────────────────────────────────
function TestimonialCard({
  item,
  lang,
  animClass,
  animDelay,
}: {
  item: typeof TESTIMONIALS[0];
  lang: "es" | "en";
  animClass?: string;
  animDelay?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      // Allow zoom > 1 so cards always fill their slot
      setZoom(entry.contentRect.width / CARD.designWidth);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      className={`w-full ${animClass ?? ""}`}
      style={animDelay !== undefined ? { animationDelay: `${animDelay}ms` } : undefined}
    >
      <div
        style={{
          width:       CARD.designWidth,
          zoom,
          aspectRatio: "338/180",
          position:    "relative",
        }}
      >
        {/* Card SVG — stars already baked in */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.card}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Content — left-aligned, vertically centered below the baked-in stars */}
        <div
          className="absolute inset-0 flex flex-col items-start justify-center"
          style={{
            paddingTop:    CARD.paddingTop,
            paddingLeft:   CARD.paddingLeft,
            paddingRight:  CARD.paddingRight,
            paddingBottom: CARD.paddingBot,
            gap:           CARD.gap,
          }}
        >
          {/* Name — Big Shoulders Semibold */}
          <p
            className="m-0 font-semibold text-black leading-none"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: CARD.nameSize }}
          >
            {item.name}
          </p>

          {/* Avatar + description — Big Shoulders Extralight */}
          <div className="flex items-center gap-[10px]">
            <Image
              src={item.avatar}
              alt={item.name}
              width={CARD.avatarSize}
              height={CARD.avatarSize}
              className="rounded-full object-cover shrink-0 border border-black/10"
              style={{ width: CARD.avatarSize, height: CARD.avatarSize }}
            />
            <p
              className="m-0 font-extralight text-black leading-[1.3] text-justify"
              style={{ fontFamily: "var(--font-big-shoulders)", fontSize: CARD.textSize, maxWidth: CARD.textMaxWidth }}
            >
              {item.text[lang]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { lang } = useLang();

  // Scroll-triggered animation — header and carousel observed independently
  type AnimState = "idle" | "entering" | "exiting";
  const headerRef   = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [headerAnim,   setHeaderAnim]   = useState<AnimState>("idle");
  const [carouselAnim, setCarouselAnim] = useState<AnimState>("idle");

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
      [headerRef, setHeaderAnim],
      [carouselRef, setCarouselAnim],
    ];
    const observers = pairs.map(([ref, setter]) => {
      const obs = makeObs(setter);
      if (ref.current) obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Responsive: 1 card on mobile (<768px), 3 on desktop
  const [visibleCards, setVisibleCards] = useState(3);
  useEffect(() => {
    const update = () => setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Carousel state
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth]         = useState(0);
  const [extIdx, setExtIdx]               = useState(PRE);
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setCardWidth(containerRef.current.offsetWidth / visibleCards);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [visibleCards]);

  const goNext = useCallback(() => { setTransitioning(true); setExtIdx(i => i + 1); }, []);
  const goPrev = useCallback(() => { setTransitioning(true); setExtIdx(i => i - 1); }, []);

  const onTransitionEnd = useCallback(() => {
    setTransitioning(false);
    setExtIdx(prev => {
      if (prev >= PRE + N) return prev - N;
      if (prev < PRE)      return prev + N;
      return prev;
    });
    requestAnimationFrame(() => requestAnimationFrame(() => setTransitioning(true)));
  }, []);

  const translateX = cardWidth > 0 ? -(extIdx * cardWidth) : 0;

  return (
    <section
      id="testimonios"
      className="dot-pattern-lime relative flex items-center justify-center w-full overflow-hidden
                 scroll-mt-[90px] lg:scroll-mt-[-60px] min-h-[480px] lg:min-h-[920px]"
    >
      {/* Background image — 25% opacity */}
      <Image
        src="/assets/testimonials/testimonials-section-bg.png"
        alt=""
        fill
        className="object-cover pointer-events-none opacity-25"
      />

      {/* Section organic border */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/testimonials/testimonials-section-border.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none object-fill"
      />

      <div className="relative z-10 flex flex-col gap-[36px] lg:gap-[60px] w-full max-w-[1300px] mx-auto
                      px-6 sm:px-10 lg:px-[50px] py-[44px] lg:py-[80px]">

        {/* ── Title + subtitle — right-aligned ── */}
        <div
          ref={headerRef}
          className={`flex flex-col gap-[16px] lg:gap-[20px] items-end text-right ${
            headerAnim === "entering" ? "animate-fade-in-up" :
            headerAnim === "exiting"  ? "animate-fade-out-down" : "opacity-0"
          }`}
        >
          <h2 className="m-0 leading-[1.0] font-normal" style={{ fontFamily: "var(--font-big-shoulders)" }}>
            <span style={{ fontSize: TITLE_SIZE, WebkitTextStroke: "1px #000", color: "#fff" }}>
              {t.testimonials.titleHighlight[lang]}{" "}
            </span>
            <span style={{ fontSize: TITLE_SIZE, WebkitTextStroke: "1px #000", color: "#4d4c4c" }}>
              {t.testimonials.titlePost[lang]}
            </span>
          </h2>
          <p
            className="text-[#4d4c4c] font-extralight leading-[1.4] m-0 max-w-[420px]"
            style={{ fontFamily: "var(--font-big-shoulders)", fontSize: SUBTITLE_SIZE }}
          >
            {t.testimonials.subtitle[lang]}
          </p>
        </div>

        {/* ── Carousel — arrows protrude beyond container padding ── */}
        <div
          ref={carouselRef}
          className={`relative mx-10 md:mx-0 ${
            carouselAnim === "entering" ? "animate-fade-in" :
            carouselAnim === "exiting"  ? "animate-fade-out" : "opacity-0"
          }`}
          style={carouselAnim !== "idle" ? { animationDelay: "150ms" } : undefined}
        >
          {/* Left arrow — pushed to section edge */}
          <button
            onClick={goPrev}
            aria-label="Anterior"
            className="absolute left-[-56px] sm:left-[-64px] md:left-[-36px] lg:left-[-52px] top-1/2 -translate-y-1/2
                       z-10 hover:scale-125 active:scale-95 transition-transform duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/testimonials/arrow-left.svg"
              alt="Anterior"
              className="w-[32px] h-[32px] lg:w-[46px] lg:h-[46px]"
            />
          </button>

          {/* Carousel container — carrusel.svg as visual frame */}
          <div
            className="w-full relative"
            style={{ aspectRatio: visibleCards === 1 ? "338/200" : "1173/305" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visibleCards === 1
                ? "/assets/testimonials/carrusel-mobile.svg"
                : "/assets/testimonials/carrusel.svg"}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none select-none object-fill"
            />

            {/* Overflow clip — inset to stay inside brush border */}
            <div
              ref={containerRef}
              className="absolute overflow-hidden rounded-[22px]"
              style={{ inset: visibleCards === 1 ? "8px" : "3px" }}
            >
              {/* Sliding track */}
              <div
                className="flex h-full items-center"
                style={{
                  width: `${(EXTENDED.length / visibleCards) * 100}%`,
                  transform: `translateX(${translateX}px)`,
                  transition: transitioning
                    ? "transform 500ms cubic-bezier(0.4,0,0.2,1)"
                    : "none",
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {EXTENDED.map((item, i) => {
                  const visibleOffset = i - PRE;
                  const isInitial = visibleOffset >= 0 && visibleOffset < visibleCards;
                  const cardAnimClass =
                    carouselAnim === "entering" && isInitial ? "animate-fade-in-up" :
                    carouselAnim === "exiting"  && isInitial ? "animate-fade-out-down" : undefined;
                  const cardDelay = isInitial ? CARD_ENTRY_DELAYS[Math.min(visibleOffset, 2)] : undefined;

                  return (
                    <div
                      key={i}
                      className="flex-shrink-0 px-[16px] lg:px-[14px]"
                      style={{ width: `${100 / EXTENDED.length}%` }}
                    >
                      <TestimonialCard
                        item={item}
                        lang={lang}
                        animClass={cardAnimClass}
                        animDelay={cardDelay}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right arrow — pushed to section edge */}
          <button
            onClick={goNext}
            aria-label="Siguiente"
            className="absolute right-[-56px] sm:right-[-64px] md:right-[-36px] lg:right-[-52px] top-1/2 -translate-y-1/2
                       z-10 hover:scale-125 active:scale-95 transition-transform duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/testimonials/arrow-right.svg"
              alt="Siguiente"
              className="w-[32px] h-[32px] lg:w-[46px] lg:h-[46px]"
            />
          </button>
        </div>

      </div>
    </section>
  );
}
