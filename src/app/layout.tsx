import type { Metadata } from "next";
import { Big_Shoulders, Big_Shoulders_Stencil, Karantina } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bigShouldersStencil = Big_Shoulders_Stencil({
  variable: "--font-big-shoulders-stencil",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const karantina = Karantina({
  variable: "--font-karantina",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Pablo Gallardo — Full Stack Developer",
  description:
    "Portafolio de Juan Pablo Gallardo, desarrollador Full Stack colombiano apasionado por construir productos digitales con impacto.",
  icons: {
    icon: [
      { url: "/assets/hero/logo.png", sizes: "any" },
      { url: "/assets/hero/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/assets/hero/logo.png",
    apple: { url: "/assets/hero/logo.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bigShoulders.variable} ${bigShouldersStencil.variable} ${karantina.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          SVG filter global — usado por <BrushCard> para el efecto "Stretch Brush Hardboiled".
          feTurbulence genera ruido orgánico, feDisplacementMap lo aplica al borde SVG.
          El resultado: borde limpio con border-radius + leve distorsión escarchada.
        */}
        <svg style={{ display: "none" }} aria-hidden="true">
          <defs>
            {/*
              Con strokeWidth=3, un scale=2.5 produce el efecto "bristle":
              el borde exterior del trazo de 3px se desplaza ±2.5px = textura escarchada
              visible en el outer edge, mientras el inner edge queda relativamente limpio.
            */}
            <filter id="brush-hardboiled" x="-15%" y="-15%" width="130%" height="130%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.025"
                numOctaves="2"
                seed="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
