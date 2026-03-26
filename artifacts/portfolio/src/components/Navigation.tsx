import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        
        <div className="hidden md:flex items-center space-x-8">
          {portfolioData.toc.slice(1, 4).map((item) => (
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
            className="text-xs uppercase tracking-[0.2em] text-background bg-foreground px-4 py-2 rounded-full hover:bg-muted-foreground transition-colors font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
