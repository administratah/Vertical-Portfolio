import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Navigation } from "@/components/Navigation";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Download } from "lucide-react";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  return (
    <div className="relative bg-background min-h-screen text-foreground selection:bg-white selection:text-black">
      <Navigation />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[0.5px] bg-white/30 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <main>
        {/* 1. HERO SECTION */}
        <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-12 overflow-hidden max-w-[1800px] mx-auto">
          <motion.div style={{ opacity, scale }} className="z-10 mt-auto">
            <Reveal hero>
              <h1 className="text-[20vw] leading-[0.75] md:text-[18vw] lg:text-[15vw] font-display font-bold tracking-tighter ml-[-0.5vw]">
                {portfolioData.header.name}
              </h1>
            </Reveal>
            
            <div className="mt-12 md:mt-24 max-w-3xl">
              <Reveal hero delay={0.15}>
                <h2 className="text-2xl md:text-5xl font-display uppercase tracking-widest text-foreground/90 leading-tight">
                  {portfolioData.header.title}
                </h2>
              </Reveal>
              
              <Reveal hero delay={0.25}>
                <div className="flex flex-wrap gap-x-4 gap-y-4 mt-10">
                  {portfolioData.header.tags.map((tag, i) => (
                    <span key={i} className="text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground border border-white/20 px-6 py-2 rounded-none">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal hero delay={0.35}>
                <p className="mt-12 text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                  {portfolioData.header.description}
                </p>
              </Reveal>

              <Reveal hero delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-8 mt-16">
                  <a href="#work" className="group flex items-center space-x-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium border border-white/30 px-10 py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300">
                    <span>View Work</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <a href="#contact" className="group flex items-center space-x-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-white transition-all duration-300 px-6 py-5">
                    <span>Contact</span>
                  </a>
                  <a href="#" className="group flex items-center space-x-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-white transition-all duration-300 px-6 py-5">
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </motion.div>

          <Reveal hero delay={0.7} className="mt-auto pt-32 pb-8 flex justify-between items-end w-full border-b border-white/10">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Portfolio {portfolioData.header.year}</span>
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scroll</span>
          </Reveal>
        </section>

        {/* 2. TABLE OF CONTENTS */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <div className="w-full">
            <Reveal>
              <h2 className="text-sm md:text-lg uppercase tracking-[0.4em] text-muted-foreground mb-24 lg:mb-32">Table of Contents</h2>
            </Reveal>
            <ul className="flex flex-col w-full">
              {portfolioData.toc.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <li className="border-b border-white/10">
                    <a href={`#${item.id}`} className="group flex flex-col md:flex-row md:items-baseline md:justify-between py-10 md:py-16 w-full">
                      <div className="flex items-baseline space-x-8 md:space-x-16">
                        <span className="text-xl md:text-3xl font-display text-muted-foreground group-hover:text-white transition-colors">{item.num}</span>
                        <span className="text-5xl md:text-7xl lg:text-[7vw] font-display uppercase tracking-tight text-white/40 group-hover:text-white transition-all duration-500 origin-left group-hover:translate-x-4">
                          {item.title}
                        </span>
                      </div>
                      <span className="hidden md:block opacity-0 group-hover:opacity-100 text-lg uppercase tracking-widest text-muted-foreground transition-opacity duration-500">
                        Jump to section
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. INTRODUCTION */}
        <section id="intro" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <div className="w-full">
            <Reveal>
              <h2 className="text-sm md:text-lg uppercase tracking-[0.4em] text-muted-foreground mb-16 lg:mb-24">Introduction</h2>
            </Reveal>
            <div className="w-full">
              <Reveal delay={0.1}>
                <p className="text-4xl md:text-6xl lg:text-[5vw] font-display uppercase tracking-tight leading-[1.1] text-balance max-w-[95%]">
                  {portfolioData.intro.text}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-24 md:mt-32 w-full">
                <PlaceholderImage label="STUDIO / WORK ENVIRONMENT" aspectRatio="wide" className="w-full h-80 md:h-[50vh] lg:h-[60vh]" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. ABOUT */}
        <section id="about" className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 w-full items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal>
                <PlaceholderImage label="PORTRAIT / LIFESTYLE" aspectRatio="portrait" className="w-full max-w-xl mx-auto lg:max-w-none h-[60vh] lg:h-[80vh]" />
              </Reveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
              <Reveal>
                <h2 className="text-section-title mb-12 lg:mb-20">
                  {portfolioData.about.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                  {portfolioData.about.text}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE SLIDES */}
        <div id="experience">
          {portfolioData.experience.map((exp, i) => {
            const isEven = i % 2 !== 0;
            return (
              <section key={exp.id} className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5 overflow-hidden">
                {/* Massive Background Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[25vw] font-display font-bold text-white/[0.02] pointer-events-none select-none z-0">
                  0{i + 1}
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 w-full items-center z-10 relative`}>
                  {/* Text Content */}
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <Reveal>
                      <span className="text-2xl md:text-4xl font-display text-muted-foreground block mb-8 lg:mb-12">
                        0{i + 1}
                      </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <h3 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight mb-10 text-balance leading-[0.9]">
                        {exp.title}
                      </h3>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </Reveal>
                  </div>

                  {/* Image Block */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Reveal delay={0.3}>
                      <PlaceholderImage label={`${exp.title} CONTEXT`} aspectRatio="video" className="w-full h-[50vh] lg:h-[70vh]" />
                    </Reveal>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* 6. SELECTED WORK */}
        <section id="work" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <Reveal>
            <h2 className="text-section-title mb-32 lg:mb-48">Selected Work</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
            {portfolioData.work.map((project, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer flex flex-col h-full">
                  <div className="overflow-hidden mb-12 flex-grow">
                    <PlaceholderImage 
                      label={project.title.toUpperCase()} 
                      aspectRatio="portrait" 
                      className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] aspect-[4/3] transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground border-b border-transparent group-hover:border-white/30 pb-1 transition-colors">
                      {project.category}
                    </span>
                    <span className="text-xl font-display text-white/30">0{i+1}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight mb-6 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7. SKILLS */}
        <section id="skills" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <Reveal>
            <h2 className="text-section-title mb-32 lg:mb-40">Skills & Tools</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-24">
            {portfolioData.skills.map((skillGroup, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <h4 className="text-sm lg:text-base uppercase tracking-[0.4em] text-muted-foreground mb-12 pb-6 border-b border-white/20">
                    {skillGroup.category}
                  </h4>
                  <ul className="space-y-6">
                    {skillGroup.items.split(', ').map((item, j) => (
                      <li key={j} className="text-2xl md:text-3xl lg:text-4xl font-display uppercase tracking-tight text-white/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 8. RECOGNITION */}
        <section id="recognition" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-5xl md:text-7xl lg:text-[7vw] leading-none font-display uppercase tracking-tighter mb-12">Selected Highlights</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-xl">
                  {portfolioData.recognition.text}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center mt-16 lg:mt-0">
              {portfolioData.recognition.items.map((item, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.1)}>
                  <div className="py-12 border-t border-white/20 group">
                    <h4 className="text-3xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white/50 group-hover:text-white transition-colors duration-500 group-hover:translate-x-4 transform">
                      {item}
                    </h4>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-white/20"></div>
            </div>
          </div>
        </section>

        {/* 9. CONTACT */}
        <section id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto">
          <Reveal>
            <h2 className="text-[15vw] md:text-[14vw] lg:text-[13vw] leading-[0.8] font-display uppercase tracking-tighter mb-24 md:mb-32 text-center md:text-left">
              Let's Connect
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mt-12 items-start">
            <Reveal delay={0.1}>
              <p className="text-3xl md:text-5xl lg:text-5xl text-muted-foreground font-light leading-tight text-balance">
                {portfolioData.contact.text}
              </p>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 lg:gap-24">
              {portfolioData.contact.links.map((link, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.05)}>
                  <a href={link.href} className="group block">
                    <span className="text-sm uppercase tracking-[0.4em] text-muted-foreground block mb-6">
                      {link.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-display uppercase tracking-wide border-b border-transparent group-hover:border-white transition-colors pb-2">
                      {link.value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.4} className="mt-40 lg:mt-56 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground">
            <span>© {portfolioData.header.year} {portfolioData.header.name}</span>
            <span className="mt-6 md:mt-0">All Rights Reserved</span>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
