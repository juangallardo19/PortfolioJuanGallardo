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
    cv: { es: "Ver CV...", en: "View CV..." },
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
} as const;
