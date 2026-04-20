import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { portfolioDataAr } from "@/data/portfolio.ar";
import { useLang } from "@/contexts/LanguageContext";

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, toggle } = useLang();

  const data = lang === "ar" ? portfolioDataAr : portfolioData;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#top" className="text-xl font-display font-bold tracking-widest text-foreground hover:text-muted-foreground transition-colors">
          {portfolioData.header.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {data.toc.slice(1, 4).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors font-medium"
          >
            {lang === "ar" ? "تواصل" : "Contact"}
          </a>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-none"
          >
            {lang === "ar" ? "English" : "عربي"}
          </button>
        </div>

        {/* Mobile: just the toggle */}
        <button
          onClick={toggle}
          className="md:hidden text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors border border-white/20 hover:border-white/50 px-3 py-1.5"
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>
      </div>
    </motion.nav>
  );
}
