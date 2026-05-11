import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Navigation } from "@/components/Navigation";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Download } from "lucide-react";
import studioImg from "@/assets/studio.png";
import portraitImg from "../assets/portrait.jpeg";
import radioImg from "@/assets/radio.jpeg";
import tvImg from "@/assets/tv.jpeg";
import filmImg from "@/assets/film.jpeg";
import musicImg from "@/assets/music.jpeg";
import odImg from "@/assets/artists/od.jpg";
import rotationImg from "@/assets/artists/rotation.jpg";
import freekImg from "@/assets/artists/freek.jpg";
import flippterImg from "@/assets/artists/flippter.jpg";
import mvndilaImg from "@/assets/artists/mvndila.jpg";
import toodopeImg from "@/assets/artists/toodope.jpg";
import safariImg from "@/assets/film/safari.jpg";
import sirbunirImg from "@/assets/film/sirbunir.jpg";
import falajImg from "@/assets/film/falaj.jpg";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

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
          <motion.div style={{ opacity, scale }} className="z-10 mt-auto w-full">

            {/* Two-column grid: text left, portrait right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end w-full">

              {/* LEFT — text content */}
              <div className="lg:col-span-8">
                <Reveal hero>
                  <h1 className="text-[20vw] leading-[0.75] md:text-[18vw] lg:text-[13vw] font-display font-bold tracking-tighter ml-[-0.5vw]">
                    {portfolioData.header.name}
                  </h1>
                </Reveal>

                {/* Awards & membership — single clean line */}
                <Reveal hero delay={0.1}>
                  <p className="mt-6 md:mt-8 text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/35 font-sans font-normal">
                    {portfolioData.header.awards}
                  </p>
                </Reveal>

                <div className="mt-10 md:mt-16 max-w-3xl">
                  <Reveal hero delay={0.2}>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-display uppercase tracking-widest text-foreground/90 leading-tight">
                      {portfolioData.header.title}
                    </h2>
                  </Reveal>

                  <Reveal hero delay={0.25}>
                    <p className="mt-4 md:mt-5 text-base md:text-xl text-white/55 font-light leading-snug tracking-wide">
                      {portfolioData.header.tagline}
                    </p>
                  </Reveal>

                  <Reveal hero delay={0.3}>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 mt-8">
                      {portfolioData.header.tags.map((tag, i) => (
                        <span key={i} className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground border border-white/15 px-5 py-2 rounded-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Reveal>

                  <Reveal hero delay={0.4}>
                    <p className="mt-10 text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl hidden md:block text-justify">
                      {portfolioData.header.description}
                    </p>
                    <p className="mt-10 text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl block md:hidden text-left">
                      {portfolioData.header.description}
                    </p>
                  </Reveal>

                  <Reveal hero delay={0.55}>
                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                      <a href="#work" className="group flex items-center space-x-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium border border-white/30 px-10 py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300">
                        <span>View Work</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </a>
                      <a href="#contact" className="group flex items-center space-x-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-white transition-all duration-300 px-6 py-5">
                        <span>Contact</span>
                      </a>
                      <a 
                        href="/Ali_Saji_Broadcast_Audio_Engineer.pdf"
                        download="Ali_Saji_CV.pdf"
                        onClick={(e) => {
                          // fallback for browsers that ignore "download"
                          const link = document.createElement('a');
                          link.href = '/Ali_Saji_Broadcast_Audio_Engineer.pdf';
                          link.download = 'Saji_Ali_RESUME.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="group flex items-center space-x-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-white transition-all duration-300 px-6 py-5"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download Resume</span>
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* RIGHT — portrait photo (desktop only, stacks below on mobile) */}
              <div className="lg:col-span-4 order-first lg:order-last flex items-end justify-center lg:justify-end">
                <Reveal hero delay={0.35} className="w-full">
                  <div className="relative w-full max-w-xs mx-auto lg:max-w-none lg:mx-0">
                    <img
                      src={portraitImg}
                      alt="Ali — Sound Engineer"
                      className="w-full object-cover object-top grayscale contrast-110"
                      style={{ aspectRatio: "3/4", maxHeight: "72vh" }}
                    />
                    {/* Subtle bottom fade to blend into black background */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  </div>
                </Reveal>
              </div>

            </div>
          </motion.div>

          <Reveal hero delay={0.75} className="mt-auto pt-24 pb-8 flex justify-between items-end w-full border-b border-white/10">
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
                <img
                  src={studioImg}
                  alt="Studio"
                  className="w-full h-80 md:h-[50vh] lg:h-[60vh] object-cover"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. ABOUT */}
        <section id="about" className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 w-full items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal>
                <img
                  src={portraitImg}
                  alt="Ali portrait"
                  className="w-full max-w-xl mx-auto lg:max-w-none h-[60vh] lg:h-[80vh] object-cover"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
              <Reveal>
                <h2 className="text-section-title mb-12 lg:mb-20">
                  {portfolioData.about.headline}
                </h2>

                  <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-2xl">
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
            <img
              src={
                exp.id === "exp-1" ? tvImg :
                exp.id === "exp-2" ? radioImg :
                exp.id === "exp-3" ? filmImg :
                exp.id === "exp-4" ? musicImg :
                tvImg
              }
              alt={exp.title}
              className={`w-full h-[50vh] lg:h-[70vh] object-cover ${
                exp.id === "exp-1" ? "object-center" :
                exp.id === "exp-2" ? "object-center" :
                exp.id === "exp-3" ? "object-[center_30%]" :
                exp.id === "exp-4" ? "object-[center_03%]" :
                "object-center"
              }`}
            />
          </Reveal>
        </div>
        </div>
        </section>
        );
        })}
        </div>

        {/* 6. SELECTED WORK */}
        <section id="work" className="flex flex-col px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <Reveal>
            <h2 className="text-section-title mb-32 lg:mb-48">Selected Work</h2>
          </Reveal>

          {/* Documentary projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
            {portfolioData.work
              .filter((project) => !('soundcloudSrc' in project && project.soundcloudSrc))
              .map((project, i) => {
                const projectImage =
                  project.title === "Sharjah Safari" ? safariImg :
                  project.title === "Sir Bu Nu'ayr Island" ? sirbunirImg :
                  project.title === "Falaj Aldhaid" ? falajImg :
                  safariImg;

                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="group cursor-pointer flex flex-col h-full">
                      <div className="overflow-hidden mb-12 flex-grow">
                        <img
                          src={projectImage}
                          alt={project.title}
                          className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground border-b border-transparent group-hover:border-white/30 pb-1 transition-colors">
                          {project.category}
                        </span>
                        <span className="text-xl font-display text-white/30">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight mb-6 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl mb-8">
                        {project.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
          </div>

          {/* Radio project */}
          {portfolioData.work
            .filter((project) => 'soundcloudSrc' in project && project.soundcloudSrc)
            .map((project, i) => (
              <div key={i} className="mt-32 pt-20 border-t border-white/10">
                <Reveal delay={0.2}>
                  <div className="group cursor-pointer flex flex-col max-w-3xl">
                    <div className="overflow-hidden mb-12">
                      <PlaceholderImage
                        label={project.title.toUpperCase()}
                        aspectRatio="portrait"
                        className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    </div>

                    <div className="flex justify-between items-start mb-6">
                      <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground border-b border-transparent group-hover:border-white/30 pb-1 transition-colors">
                        {project.category}
                      </span>
                      <span className="text-xl font-display text-white/30">04</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight mb-6 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl mb-8">
                      {project.description}
                    </p>

                    <div className="mt-4 border-t border-white/10 pt-10">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">
                        Listen
                      </p>

                      <iframe
                        width="100%"
                        className="w-full h-[300px] md:h-[450px]"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A1456964344%3Fsecret_token%3Ds-yMnZrSbSM1b&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                      />

                      <div className="mt-3 text-[10px] text-[#cccccc] overflow-hidden whitespace-nowrap text-ellipsis">
                        <a
                          href="https://soundcloud.com/ali_bilal"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#cccccc] no-underline"
                        >
                          Saji
                        </a>
                        {" · "}
                        <a
                          href="https://soundcloud.com/ali_bilal/sets/portfolio/s-yMnZrSbSM1b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#cccccc] no-underline"
                        >
                          Portfolio
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}

          {/* ── Music Production ─────────────────────────────── */}
          <div className="mt-40 lg:mt-56 pt-24 border-t border-white/10">
            <Reveal>
              <div className="flex flex-col gap-6 mb-20 lg:mb-28 max-w-3xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Category
                </p>

                <h3 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight leading-none">
                  {portfolioData.musicProduction.headline}
                </h3>

                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                  {portfolioData.musicProduction.description}
                </p>
              </div>
            </Reveal>

            {/* Artist photo grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {portfolioData.musicProduction.artists.map((artist, i) => {
                const artistImage =
                  artist.name === "O'D" ? odImg :
                  artist.name === "roTation" ? rotationImg :
                  artist.name === "Freek" ? freekImg :
                  artist.name === "Flippter" ? flippterImg :
                  artist.name === "Mvndila" ? mvndilaImg :
                  artist.name === "TooDope" ? toodopeImg :
                  odImg;

                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="group relative overflow-hidden cursor-pointer aspect-square bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-colors duration-500">
                      <img
                        src={artistImage}
                        alt={artist.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Base overlay */}
                      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-500" />

                      {/* Bottom gradient for role text */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />

                      {/* Artist name */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 transition-all duration-500 md:group-hover:-translate-y-8">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3 group-hover:text-white/70 transition-colors duration-500">
                          Artist
                        </span>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white/80 group-hover:text-white transition-all duration-500 text-center leading-tight">
                          {artist.name}
                        </span>
                      </div>

                      {/* Role caption: visible on mobile, reveal on desktop hover */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-5">
                        <div className="translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
                            My Role
                          </p>
                          <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-[95%]">
                            {artist.work}
                          </p>
                        </div>
                      </div>

                      {/* Subtle hover sheen */}
                      <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                      {/* Corner index */}
                      <span className="absolute top-4 right-5 text-xs font-display text-white/30 group-hover:text-white/50 transition-colors duration-500 z-30">
                        0{i + 1}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
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
