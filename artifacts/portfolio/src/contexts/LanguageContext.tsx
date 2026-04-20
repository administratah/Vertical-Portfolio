import { createContext, useContext, useState } from "react";

export type Lang = "en" | "ar";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
}

const LangContext = createContext<LangCtx>({ lang: "en", toggle: () => {} });

export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === "en" ? "ar" : "en") }}>
      {children}
    </LangContext.Provider>
  );
}
