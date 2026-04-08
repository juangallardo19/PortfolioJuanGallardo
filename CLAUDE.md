# Portfolio Juan Pablo Gallardo — Implementación Web

## Figma URL
https://www.figma.com/design/38NyfCp9Jj3Rhh6WtEHJbs/Portafolio-v1?node-id=39-721

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4
- roughjs (para bordes brush hardboiled)

---

## ⚠️ REGLA CRÍTICA: Bordes Brush Hardboiled

**TODOS los bordes de 5px (y similares) usan el efecto "Stretch Brush > Hardboiled" de Figma.**

En código esto se implementa con el componente `<BrushCard>` que usa `roughjs`:

```tsx
import { BrushCard } from "@/components/ui/BrushCard";

<BrushCard fill="#c8ff00" stroke="#000000" strokeWidth={5} roughness={3.5}>
  contenido
</BrushCard>
```

**Parámetros por defecto calibrados para hardboiled:**
- `strokeWidth`: 5 (igual que en Figma)
- `roughness`: 3.5 (muy irregular, efecto pincel)
- `bowing`: 2 (las líneas se curvan)
- `disableMultiStroke: false` (múltiples pasadas = más efecto pincel)

**Regla:** Si ves un borde en el diseño → usa `BrushCard`, NUNCA `border-xxx` de Tailwind/CSS.

Excepciones (ya vienen con el brush baked in desde Figma):
- `nav-bg.svg` — el shape del navbar
- `hero-photo.png` — la card de la foto ya tiene el frame lime
- Cualquier PNG/SVG exportado directamente de Figma con el efecto aplicado

## ⚠️ REGLA: Text Stroke en Títulos

**Todos los títulos (h1, h2, h3) tienen `-webkit-text-stroke: 1px` del mismo color del texto.**

```tsx
<h1 style={{ WebkitTextStroke: "1px #4d4c4c" }}>Hola, soy...</h1>
<span style={{ WebkitTextStroke: "1px #fcd116" }}>Juan Pablo</span>
```

## Comandos
```bash
npm run dev    # desarrollo
npm run build  # producción
npm run start  # producción local
```

## Ruta del proyecto
`C:\Users\juang\OneDrive\Documentos\Universidad\DisenoDeInterfaces\Portfolio\ImplementacionWeb`

---

## Sistema de Diseño

### Colores
| Token          | Hex       | Uso                                      |
|----------------|-----------|------------------------------------------|
| `lime`         | `#c8ff00` | Botones, language toggle, acentos        |
| `yellow`       | `#fcd116` | Nombre en hero, highlights de texto      |
| `dark`         | `#1a1a1a` | Fondo oscuro, texto principal oscuro     |
| `gray-text`    | `#717171` | Texto secundario                         |
| `charcoal`     | `#4d4c4c` | Texto de skills                          |
| `skills-green` | `#00FFB2` | Fondo patrón sección Mis habilidades     |
| `testimonials-lime` | `#C8FF00` | Fondo patrón sección Testimonios   |

### Fondo con patrón de puntos (DOT PATTERN)
Cuadro de 40x40px color base, con un punto de 2x2px en el centro.
- **Secciones normales**: `#EBEBEB` + dot `rgba(0,0,0,0.2)`
- **Mis habilidades**: `#00FFB2` + dot más oscuro
- **Testimonios**: `#C8FF00` + dot más oscuro
- **Implementación CSS**: `radial-gradient` en un `background-image`

### Tipografía
- `Big Shoulders Text` — fuente principal (Regular, Bold, ExtraLight, SemiBold)
- `Big Shoulders Stencil Text` — variante de énfasis en hero
- `Big Shoulders Stencil Display` — variante display en hero
- `Karantina` — decorativa (opcional)
- Cargadas desde Google Fonts en `layout.tsx`

### Bordes "Brush Hardboiled"
- **Grosor**: 5px
- **Color**: negro (`#000` / `#1a1a1a`)
- **Estilo**: tipo brush/pincel (efecto hardboiled de Figma)
- **Implementación**: componente `<BrushCard>` usando `roughjs` para dibujar el rectángulo con SVG rough
- **Uso**: en cards de skills, cards de proyectos, secciones con borde visual

### Cards con Subtract (Clip Path)
Las cards con forma irregular se logran con los SVG exportados de Figma usados como `mask-image` o como `background-image`.
- Assets en `/public/assets/skill-card-1.svg`, `skill-card-2.svg`, `skill-card-3.svg`
- Cada skill card tiene su SVG de forma como overlay absoluto

### Box Shadow estándar
```css
box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.25)
```

### Border Radius
- Botones: `rounded-[20px]`
- Cards skills: `rounded-[45px]`
- Skill items: `rounded-[8px]`
- Language toggle: `rounded-[24px]`

---

## Estructura del Proyecto

```
src/
  app/
    globals.css       ← design tokens y dot pattern
    layout.tsx        ← Google Fonts + metadata
    page.tsx          ← página principal (compone todas las secciones)
  components/
    layout/
      Navbar.tsx      ← navegación con logo, menu, toggle idioma, botón CV
    sections/
      HeroSection.tsx
      SkillsSection.tsx
      AboutSection.tsx
      ProjectsSection.tsx
      TestimonialsSection.tsx
      ExperienceSection.tsx
      ContactSection.tsx
    ui/
      BrushCard.tsx   ← card con borde rough usando roughjs
      DotPattern.tsx  ← wrapper con patrón de puntos
public/
  assets/             ← todos los assets exportados de Figma
```

---

## Workflow: Cómo agregar secciones

1. Usar `figma-desktop` MCP para obtener el diseño de la sección:
   - `get_design_context(nodeId: "ID_DE_SECCION")`
   - `get_screenshot(nodeId: "ID_DE_SECCION")`
2. Crear el componente en `src/components/sections/`
3. Importarlo en `src/app/page.tsx`
4. Verificar visualmente contra el screenshot de Figma

## Secciones del homepage (node IDs)
- Homepage frame: `39:725`
- Navigation: `39:726`
- Hero section: `41:179`
- Skills section: `63:693` (aprox)
- About section: buscar "Acerca de mi"
- Projects section: buscar "Mis proyectos"
- Testimonials section: buscar "Testimonios"
- Experience section: buscar "Mi Experiencia"
- Contact section: buscar "Contacto"

## Assets disponibles en `/public/assets/`
| Archivo | Descripción |
|---------|-------------|
| `logo.png` | Logo JPG del portfolio |
| `hero-section-bg.png` | Background imagen hero |
| `hero-photo.png` | Foto de Juan Pablo |
| `skills-section-bg.png` | Background sección skills |
| `skill-card-1/2/3.svg` | Formas SVG de las skill cards |
| `icon-react/typescript/html5/java/tailwind/python/cpp/git/figma.svg` | Iconos de tecnologías |
| `about-section-bg.png` | Background sección about |
| `icon-instagram/github/linkedin.svg` | Iconos redes sociales |
| `projects-section-bg.png` | Background sección proyectos |
| `project-card-1/2.png` | Imágenes de proyectos |
| `testimonials-section-bg.png` | Background testimonios |
| `experience-section-bg.png` | Background experiencia |
| `contact-section-bg.png` | Background contacto |
| `nav-bg.svg` | Background de la navegación |

## Notas importantes
- **NO usar bordes CSS sólidos normales** — usar `BrushCard` con roughjs para el efecto brush
- **SIEMPRE** aplicar el dot pattern en las secciones correspondientes
- **Implementar primero estático**, luego agregar interactividad (language toggle, scroll)
- El toggle de idioma (ES/EN) se implementa con React state en fases posteriores
- Las imágenes de fondo de sección tienen `opacity-80` según el Figma
- La fuente se especifica como `font-['Big_Shoulders_Text:Bold',sans-serif]` en Tailwind v4
