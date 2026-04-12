"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "es" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// ── Traducciones centralizadas ────────────────────────────────
export const t = {
  nav: {
    links: {
      es: ["Inicio", "Habilidades", "Acerca de mi", "Proyectos", "Testimonios", "Experiencia", "Contacto"],
      en: ["Home", "Skills", "About me", "Projects", "Testimonials", "Experience", "Contact"],
    },
    cv: { es: "CV", en: "CV" },
  },
  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I'm" },
    description: {
      es: [
        "un Colombiano que encontró en el código una forma de crear cosas que importan. No me conformo con que algo funcione — quiero que ",
        " bien, se ",
        " bien y ",
        " bien. Siempre aprendiendo, siempre construyendo.",
      ],
      en: [
        "a Colombian who found in code a way to create things that matter. I don't settle for something just working — I want it to ",
        " right, look ",
        " right, and scale ",
        " right. Always learning, always building.",
      ],
    },
    highlightWords: {
      es: ["funcione", "vea", "escale"],
      en: ["work", "look", "scale"],
    },
    btnCV: { es: "Descargar CV", en: "Download CV" },
    btnMore: { es: "Ver mas...", en: "See more..." },
  },
  skills: {
    titlePre:       { es: "Mis",         en: "My"      },
    titleHighlight: { es: "Habilidades", en: "Skills"  },
    description: {
      es: [
        "Estas son las herramientas con las que trabajo día a día para construir cosas que funcionan bien y se ven mejor. Me gusta tener un ",
        "kit completo",
        " para resolver cualquier reto que se ponga en el camino. Siempre sumando nuevas habilidades al inventario.",
      ],
      en: [
        "These are the tools I work with day to day to build things that work well and look better. I like having a ",
        "complete toolkit",
        " to solve any challenge that comes my way. Always adding new skills to the inventory.",
      ],
    },
  },
  about: {
    titlePre:       { es: "Acerca de", en: "About"  },
    titleHighlight: { es: "mí",        en: "me"     },
    descPre: {
      es: "Soy ",
      en: "I'm ",
    },
    descName: { es: "Juan Pablo Gallardo", en: "Juan Pablo Gallardo" },
    descPost: {
      es: ", una que vive entre líneas de código, notas musicales y partidos de fútbol. Creo que la mejor forma de entender a una persona no es su CV sino lo que hace cuando no está trabajando. Programo no porque me toca sino porque me gusta.",
      en: ", someone who lives between lines of code, musical notes, and soccer matches. I believe the best way to understand a person isn't their CV but what they do when they're not working. I code not because I have to — but because I love it.",
    },
    card: {
      header:    { es: "sobre Juan Pablo",      en: "about Juan Pablo"    },
      gamesTitle:{ es: "Videojuegos",            en: "Gaming"              },
      gamesText: {
        es: "Geometry Dash, Fortnite, Minecraft, Valorant, LOL... estos y muchos más son algunos de mis juegos favoritos.",
        en: "Geometry Dash, Fortnite, Minecraft, Valorant, LOL... these and many more are some of my favorite games.",
      },
      musicTitle:{ es: "Música",                 en: "Music"               },
      musicText: {
        es: "No solo la escucho, la toco. Piano, guitarra, ukulele, zampoña y quena. Pop en inglés y rock en español.",
        en: "I don't just listen to it — I play it. Piano, guitar, ukulele, and more. Pop in English and rock in Spanish.",
      },
      footerPre: { es: "Algo más que ",          en: "More than a "        },
      footerHighlight: { es: "developer",        en: "developer"           },
    },
    social: {
      label: { es: "Encuéntrame en", en: "Find me on" },
    },
  },
  projects: {
    subtitle:       { es: "Algunas de las cosas que he construido",       en: "Some things I've built"                },
    titlePre:       { es: "Estos son",                                     en: "These are"                             },
    titleHighlight: { es: "Mis proyectos",                                 en: "My projects"                           },
    github:         { es: "Ver en GitHub",                                 en: "View on GitHub"                        },
    web:            { es: "Ver web",                                       en: "View website"                          },
  },
  testimonials: {
    titleHighlight: { es: "Testimonios",                                   en: "Testimonials"                          },
    titlePost:      { es: "de usuario",                                    en: "from users"                            },
    subtitle: {
      es: "Lo que dicen las personas con las que he trabajado. Al final del día, los resultados hablan por sí solos.",
      en: "What the people I've worked with have to say. At the end of the day, results speak for themselves.",
    },
  },
  experience: {
    titlePre:       { es: "Mi",          en: "My"         },
    titleHighlight: { es: "Experiencia", en: "Experience" },
    subtitle:       { es: "- Formación y crecimiento -",  en: "- Formation and growth -" },
  },
  contact: {
    titleHighlight: { es: "Contáctame",                        en: "Contact me"                         },
    subtitle:       { es: "Cuéntame sobre tu proyecto o idea.", en: "Tell me about your project or idea." },
    labels: {
      email:   { es: "Email",           en: "Email"          },
      name:    { es: "Nombre",          en: "Name"           },
      message: { es: "Razón / Mensaje", en: "Reason / Message" },
      send:    { es: "Enviar Mensaje",  en: "Send Message"   },
    },
    placeholders: {
      email:   { es: "tu@email.com",                     en: "your@email.com"              },
      name:    { es: "Tu nombre completo",               en: "Your full name"              },
      message: { es: "Cuéntame en qué puedo ayudarte...", en: "Tell me how I can help you..." },
    },
  },
} as const;
