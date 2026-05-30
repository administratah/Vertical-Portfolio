import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 60);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-base font-bold tracking-widest text-foreground hover:text-accent transition-colors duration-300 italic"
        >
          Saji Ali.
        </a>

        <div className="hidden md:flex items-center gap-10">
          {[
            { href: "#intro", label: "The Craft" },
            { href: "#experience", label: "Experience" },
            { href: "#work", label: "Work" },
            { href: "#skills", label: "Skills" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-[11px] uppercase tracking-[0.25em] text-accent hover:text-foreground transition-colors duration-300 font-sans font-medium border-b border-accent/40 pb-px"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
