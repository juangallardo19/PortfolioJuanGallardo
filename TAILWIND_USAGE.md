# Uso de Tailwind CSS en el Portfolio

## Resumen rápido

Tailwind maneja **estructura, espaciado, layout y tipografía**. Los **diseños de las cards** (bordes brush, formas irregulares, imágenes de proyecto) se hacen con SVGs exportados de Figma, NO con Tailwind.

---

## Dónde SÍ usa Tailwind

### 1. Layout y estructura de secciones
Cada sección usa clases Tailwind para su contenedor principal:

```tsx
// Ejemplo: sección con max-width, padding y centrado
<div className="relative z-10 w-full max-w-[1300px] mx-auto
                px-6 sm:px-10 lg:px-[60px] py-[80px] lg:py-[120px]">
```

Clases usadas:
- `w-full`, `max-w-[...]` — ancho del contenedor
- `mx-auto` — centrado horizontal
- `px-6 sm:px-10 lg:px-[60px]` — padding horizontal responsivo
- `py-[80px] lg:py-[120px]` — padding vertical responsivo
- `relative z-10` — posicionamiento para superponer sobre imágenes de fondo

### 2. Flexbox y Grid
El layout de columnas y filas usa Tailwind:

```tsx
// Dos columnas en desktop, una en móvil
<div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-center justify-center">

// Proyectos: card grande + dos cards apiladas
<div className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:items-center">
  <div className="w-full lg:w-[58%] lg:shrink-0">   {/* grande */}
  <div className="w-full lg:flex-1 flex flex-row lg:flex-col gap-5">  {/* dos pequeñas */}
```

### 3. Tipografía de títulos y subtítulos
Los h1/h2/h3 usan Tailwind para peso, color y tamaño base:

```tsx
<h2 className="m-0 leading-[1.0] font-bold">
<p  className="m-0 font-extralight text-[#4d4c4c]">
<span className="font-normal text-[#4d4c4c]">
```

Los tamaños de fuente responsivos se pasan en `style={{ fontSize: "clamp(...)" }}` (no Tailwind) porque `clamp()` con unidades viewport no tiene equivalente directo en Tailwind v4.

### 4. Animaciones de entrada/salida
Las clases de animación están definidas en `globals.css` como `@keyframes` y se aplican vía Tailwind:

```tsx
// Entrar: animate-fade-in-up / animate-fade-in-left / animate-fade-in-right
// Salir:  animate-fade-out-down / animate-fade-out-left / animate-fade-out-right
<div className={visible ? "animate-fade-in-up" : "opacity-0"}>
```

### 5. Patrón de puntos (dot pattern)
Las clases `.dot-pattern`, `.dot-pattern-green`, `.dot-pattern-lime` están en `globals.css` y se aplican como si fueran clases Tailwind:

```tsx
<section className="dot-pattern relative w-full overflow-hidden">
```

### 6. Responsive: orden en móvil vs desktop
Tailwind controla el orden visual en móvil:

```tsx
// En móvil: formulario arriba (order-1), foto abajo (order-2)
// En desktop: se invierte
<div className="order-2 lg:order-1 ...">   {/* columna de foto */}
<div className="order-1 lg:order-2 ...">   {/* columna de formulario */}
```

### 7. Hover, transiciones y estados
Botones y links usan Tailwind para interactividad:

```tsx
<a className="hover:scale-[1.05] active:scale-100 transition-transform duration-200">
<button className="hover:scale-[1.05] active:scale-[0.98] transition-transform duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed">
```

---

## Dónde NO usa Tailwind (y por qué)

### 1. Cards de proyectos — SVG + `transform: scale()`
Las cards de proyectos (`Card 1.svg` … `Card 6.svg`) son archivos SVG exportados de Figma con:
- La imagen del proyecto embebida en base64 dentro del SVG
- El borde brush hardboiled dibujado como paths SVG

El escalado responsivo se hace con JavaScript (`ResizeObserver`) + CSS `transform: scale()`:

```tsx
// El SVG ocupa su tamaño de diseño (487px o 321px de ancho)
// Un wrapper con aspect-ratio lo contiene al tamaño visual correcto
<div style={{ aspectRatio: "604 / 616", overflow: "hidden" }}>
  <div style={{ width: 487, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
    <img src="Card 1.svg" className="w-full h-auto" />
    {/* texto y botones posicionados absolutos con % */}
  </div>
</div>
```

**Por qué no Tailwind:** Los SVGs tienen dimensiones fijas de diseño. Tailwind no tiene utilidades para `transform-origin` dinámico ni para calcular el zoom en JS.

### 2. Cards de Experiencia — mismo patrón de SVG + scale
Las tres cards de experiencia (`Card-1.svg`, `Card-2.svg`, `Card-3.svg`) siguen el mismo patrón: SVGs con la forma + color, escalados con `transform: scale()` vía ResizeObserver.

### 3. Cards sociales de Contacto — SVG + scale
Las cards de GitHub, LinkedIn y Gmail (`card-github.svg`, `card-linkdn.svg`, `card-gmail.svg`) son SVGs de Figma con el borde y color, escalados igual.

### 4. Formulario de contacto — SVG de fondo + escala
El formulario tiene un SVG de fondo (`cardContact.svg`) y el contenido se posiciona absolutamente encima. La escala responsiva también usa `transform: scale()`.

### 5. BrushCard — roughjs (no Tailwind)
El componente `<BrushCard>` dibuja bordes tipo pincel usando `roughjs` para generar un `<svg>` inline con ruido fractal. El borde de 5px con efecto "Stretch Brush Hardboiled" de Figma no puede replicarse con CSS puro.

### 6. Tamaños de fuente con `clamp()` — style inline
Los títulos principales usan `clamp()` para escalar suavemente:

```tsx
// No se puede hacer esto exactamente en Tailwind v4
style={{ fontSize: "clamp(34px, 4.2vw, 54px)" }}
```

### 7. `WebkitTextStroke` — style inline o @utility
El trazo de texto de 1px en títulos:

```tsx
style={{ WebkitTextStroke: "1px #4d4c4c" }}
// O la clase custom:
className="text-stroke-dark"   // definida en globals.css con @utility
```

---

## globals.css — lo que complementa a Tailwind

```css
@import "tailwindcss";   /* Tailwind v4 */

@theme inline {
  /* Design tokens accesibles como clases: bg-lime, text-yellow, etc. */
  --color-lime: #c8ff00;
  --color-yellow: #fcd116;
  ...
}

/* Clases propias usadas como si fueran Tailwind */
.dot-pattern { ... }         /* fondo con puntos */
.dot-pattern-green { ... }
.dot-pattern-lime { ... }

/* Animaciones usadas con className */
.animate-fade-in-up { ... }
.animate-fade-in-left { ... }
...

/* @utility — extiende Tailwind con clases personalizadas */
@utility text-stroke-dark { -webkit-text-stroke: 1px #4d4c4c; }
@utility font-big-shoulders-stencil { font-family: var(--font-big-shoulders-stencil); }
```

---

## Tabla resumen

| Elemento | Tailwind | SVG/JS/inline |
|---|---|---|
| Layout de sección (columnas, gaps, padding) | ✅ | — |
| Fondo con puntos (dot pattern) | clases custom en globals.css | — |
| Animaciones fade-in/fade-out | clases custom en globals.css | — |
| Hover / transiciones de escala | ✅ | — |
| Order responsivo (móvil vs desktop) | ✅ | — |
| Tamaños de fuente fluidos con clamp() | — | ✅ inline style |
| WebkitTextStroke en títulos | @utility custom | — |
| Cards de proyectos (imagen + borde) | — | ✅ SVG + transform JS |
| Cards de experiencia | — | ✅ SVG + transform JS |
| Cards sociales de contacto | — | ✅ SVG + transform JS |
| Formulario de contacto (fondo) | — | ✅ SVG + transform JS |
| Bordes brush hardboiled (BrushCard) | — | ✅ roughjs SVG inline |
| Foto y foto de contacto | — | ✅ SVG exportado de Figma |
