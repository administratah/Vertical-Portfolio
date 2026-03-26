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
        className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <main>
        {/* 1. HERO SECTION */}
        <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-12 overflow-hidden max-w-[1600px] mx-auto">
          <motion.div style={{ opacity, scale }} className="z-10 mt-auto">
            <Reveal hero>
              <h1 className="text-[18vw] leading-[0.8] md:text-[14vw] lg:text-[12vw] font-display font-bold tracking-tighter ml-[-0.5vw]">
                {portfolioData.header.name}
              </h1>
            </Reveal>
            
            <div className="mt-8 md:mt-12 max-w-2xl">
              <Reveal hero delay={0.15}>
                <h2 className="text-xl md:text-3xl font-display uppercase tracking-widest text-foreground/90">
                  {portfolioData.header.title}
                </h2>
              </Reveal>
              
              <Reveal hero delay={0.25}>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
                  {portfolioData.header.tags.map((tag, i) => (
                    <span key={i} className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground border border-white/10 px-4 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal hero delay={0.35}>
                <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                  {portfolioData.header.description}
                </p>
              </Reveal>

              <Reveal hero delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-6 mt-12">
                  <a href="#work" className="group flex items-center space-x-3 text-sm uppercase tracking-[0.2em] font-medium border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                    <span>View Work</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#contact" className="group flex items-center space-x-3 text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-white transition-all duration-300 px-4 py-4">
                    <span>Contact</span>
                  </a>
                  <a href="#" className="group flex items-center space-x-3 text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-white transition-all duration-300 px-4 py-4">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </motion.div>

          <Reveal hero delay={0.7} className="mt-auto pt-24 pb-8 flex justify-between items-end w-full border-b border-white/10">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Portfolio {portfolioData.header.year}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scroll</span>
          </Reveal>
        </section>

        {/* 2. TABLE OF CONTENTS */}
        <section className="min-h-[80vh] flex items-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
          <div className="w-full">
            <Reveal>
              <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-16">Table of Contents</h2>
            </Reveal>
            <ul className="flex flex-col space-y-4 md:space-y-8">
              {portfolioData.toc.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <li>
                    <a href={`#${item.id}`} className="group flex items-baseline space-x-6 w-fit">
                      <span className="text-sm md:text-lg font-display text-muted-foreground group-hover:text-white transition-colors">{item.num}</span>
                      <span className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight text-white/40 group-hover:text-white transition-all duration-500 origin-left group-hover:scale-105">
                        {item.title}
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. INTRODUCTION */}
        <section id="intro" className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 w-full items-center">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground">Introduction</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <p className="text-3xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.1] text-balance">
                  {portfolioData.intro.text}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-16 w-full">
                <PlaceholderImage label="STUDIO / WORK ENVIRONMENT" aspectRatio="wide" className="w-full h-64 md:h-96" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. ABOUT */}
        <section id="about" className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full items-center">
            <Reveal className="order-2 lg:order-1">
              <PlaceholderImage label="PORTRAIT / LIFESTYLE" aspectRatio="portrait" className="w-full max-w-md mx-auto lg:max-w-none" />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8">
                  {portfolioData.about.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed">
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
              <section key={exp.id} className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full items-center`}>
                  
                  {/* Text Content */}
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <Reveal>
                      <span className="text-6xl md:text-8xl font-display text-white/10 block mb-6">
                        0{i + 1}
                      </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight mb-8 text-balance">
                        {exp.title}
                      </h3>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </Reveal>
                  </div>

                  {/* Image Block */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Reveal delay={0.3}>
                      <PlaceholderImage label={`${exp.title} CONTEXT`} aspectRatio="video" className="w-full" />
                    </Reveal>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* 6. SELECTED WORK */}
        <section id="work" className="min-h-screen px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-24">Selected Work</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {portfolioData.work.map((project, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-8">
                    <PlaceholderImage 
                      label={project.title.toUpperCase()} 
                      aspectRatio="video" 
                      className="w-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground border border-white/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs font-display text-white/30">0{i+1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tight mb-4 group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7. SKILLS */}
        <section id="skills" className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-24">Skills & Tools</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12">
            {portfolioData.skills.map((skillGroup, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 pb-4 border-b border-white/10">
                    {skillGroup.category}
                  </h4>
                  <ul className="space-y-4">
                    {skillGroup.items.split(', ').map((item, j) => (
                      <li key={j} className="text-xl md:text-2xl font-display uppercase tracking-tight text-white/90">
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
        <section id="recognition" className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8">Selected Highlights</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                  {portfolioData.recognition.text}
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col justify-center">
              {portfolioData.recognition.items.map((item, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.1)}>
                  <div className="py-8 border-t border-white/10 group">
                    <h4 className="text-2xl md:text-4xl font-display uppercase tracking-tight text-white/60 group-hover:text-white transition-colors duration-300">
                      {item}
                    </h4>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-white/10"></div>
            </div>
          </div>
        </section>

        {/* 9. CONTACT */}
        <section id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-[12vw] md:text-[10vw] leading-none font-display uppercase tracking-tighter mb-12 text-center md:text-left">
              Let's Connect
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-12 items-start">
            <Reveal delay={0.1}>
              <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed text-balance">
                {portfolioData.contact.text}
              </p>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {portfolioData.contact.links.map((link, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.05)}>
                  <a href={link.href} className="group block">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                      {link.label}
                    </span>
                    <span className="text-lg md:text-xl font-medium border-b border-transparent group-hover:border-white transition-colors pb-1">
                      {link.value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.4} className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>© {portfolioData.header.year} {portfolioData.header.name}</span>
            <span className="mt-4 md:mt-0">All Rights Reserved</span>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
