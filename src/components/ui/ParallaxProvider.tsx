"use client";

import { useEffect } from "react";

/**
 * Actualiza la CSS variable --scroll-y en <html> al hacer scroll.
 * El dot pattern usa esta variable para el efecto parallax:
 *   background-position: 20px calc(20px + var(--scroll-y) * 0.3)
 */
export function ParallaxProvider() {
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
