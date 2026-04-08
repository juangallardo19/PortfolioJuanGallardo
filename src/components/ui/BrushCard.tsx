"use client";

import { useEffect, useRef, useState } from "react";

interface BrushCardProps {
  children: React.ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  /** Border radius en px. Default 20 para botones */
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BrushCard — borde estilo "Stretch Brush > Hardboiled" de Figma.
 *
 * - El FILL lo maneja CSS (backgroundColor) alineado con el inner edge del stroke
 * - El STROKE SVG (fill="none") recibe el filtro brush-hardboiled
 * - El contenido tiene overflow:hidden con el mismo borderRadius para no salirse
 */
export function BrushCard({
  children,
  fill = "transparent",
  stroke = "#000000",
  strokeWidth = 3,
  borderRadius = 20,
  className = "",
  style,
}: BrushCardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const draw = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.innerHTML = "";

      // pad = la mitad del strokeWidth → el stroke se dibuja exactamente en el borde
      // del background CSS, así el fondo no sobresale
      const pad = strokeWidth / 2;
      const w = width - pad * 2;
      const h = height - pad * 2;
      const r = Math.max(0, borderRadius - pad);

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", String(pad));
      rect.setAttribute("y", String(pad));
      rect.setAttribute("width", String(w));
      rect.setAttribute("height", String(h));
      rect.setAttribute("rx", String(r));
      rect.setAttribute("ry", String(r));
      rect.setAttribute("fill", "none");   // Fill = CSS
      rect.setAttribute("stroke", stroke);
      rect.setAttribute("stroke-width", String(strokeWidth));
      svg.appendChild(rect);
      setReady(true);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(container);
    return () => observer.disconnect();
  }, [stroke, strokeWidth, borderRadius]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        backgroundColor: fill !== "transparent" ? fill : undefined,
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
    >
      {/* SVG stroke con filtro brush — overflow visible para que el efecto se vea */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          overflow: "visible",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.1s",
          filter: "url(#brush-hardboiled)",
        }}
      />
      {/* Contenido con overflow hidden para que nada se salga del borde redondeado */}
      <div
        className="relative z-10 overflow-hidden"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        {children}
      </div>
    </div>
  );
}
