import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { portfolioDataAr } from "@/data/portfolio.ar";
import { useLang } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ArrowLeft, Download } from "lucide-react";
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

const docImages = [safariImg, sirbunirImg, falajImg];

const artistImages: Record<string, string> = {
  "O'D": odImg,
  "roTation": rotationImg,
  "Freek": freekImg,
  "Flippter": flippterImg,
  "Mvndila": mvndilaImg,
  "Toodope": toodopeImg,
  "TooDope": toodopeImg,
};

const ui = {
  en: {
    viewWork: "View Work",
    contact: "Contact",
    downloadResume: "Download Resume",
    tableOfContents: "Table of Contents",
    introduction: "Introduction",
    scroll: "Scroll",
    portfolio: "Portfolio",
    jumpToSection: "Jump to section",
    selectedWork: "Selected Work",
    listen: "Listen",
    category: "Category",
    artist: "Artist",
    myRole: "My Role",
    skillsTools: "Skills & Tools",
    selectedHighlights: "Selected Highlights",
    letsConnect: "Let's Connect",
    allRightsReserved: "All Rights Reserved",
  },
  ar: {
    viewWork: "مشاهدة الأعمال",
    contact: "تواصل",
    downloadResume: "تحميل السيرة الذاتية",
    tableOfContents: "جدول المحتويات",
    introduction: "مقدمة",
    scroll: "تمرير",
    portfolio: "البورتفوليو",
    jumpToSection: "الانتقال إلى القسم",
    selectedWork: "أعمال مختارة",
    listen: "استمع",
    category: "الفئة",
    artist: "فنان",
    myRole: "دوري",
    skillsTools: "المهارات والأدوات",
    selectedHighlights: "أبرز الإنجازات",
    letsConnect: "لنتواصل",
    allRightsReserved: "جميع الحقوق محفوظة",
  }
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const { lang } = useLang();
  const data = lang === "ar" ? portfolioDataAr : portfolioData;
  const t = ui[lang];
  const isRtl = lang === "ar";

  const docProjects = data.work.filter(p => !('soundcloudSrc' in p && p.soundcloudSrc));
  const radioProject = data.work.find(p => 'soundcloudSrc' in p && p.soundcloudSrc);

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

            {/* Two-column grid: text left/right, portrait opposite */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end w-full">

              {/* Text content */}
              <div className="lg:col-span-8">
                <Reveal hero>
                  <h1 className="text-[20vw] leading-[0.75] md:text-[18vw] lg:text-[13vw] font-display font-bold tracking-tighter" style={{ marginInlineStart: '-0.5vw' }}>
                    {portfolioData.header.name}
                  </h1>
                </Reveal>

                {/* Awards & membership */}
                <Reveal hero delay={0.1}>
                  <p className="mt-6 md:mt-8 text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/35 font-sans font-normal">
                    {data.header.awards}
                  </p>
                </Reveal>

                <div className="mt-10 md:mt-16 max-w-3xl">
                  <Reveal hero delay={0.2}>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-display uppercase text-foreground/90 leading-tight" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                      {data.header.title}
                    </h2>
                  </Reveal>

                  <Reveal hero delay={0.25}>
                    <p className="mt-4 md:mt-5 text-base md:text-xl text-white/55 font-light leading-snug">
                      {data.header.tagline}
                    </p>
                  </Reveal>

                  <Reveal hero delay={0.3}>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 mt-8">
                      {data.header.tags.map((tag, i) => (
                        <span key={i} className="text-xs md:text-sm uppercase text-muted-foreground border border-white/15 px-5 py-2 rounded-none" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Reveal>

                  <Reveal hero delay={0.4}>
                    <p className="mt-10 text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl hidden md:block text-justify">
                      {data.header.description}
                    </p>
                    <p className="mt-10 text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl block md:hidden text-start">
                      {data.header.description}
                    </p>
                  </Reveal>

                  <Reveal hero delay={0.55}>
                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                      <a href="#work" className="group flex items-center gap-4 text-sm md:text-base uppercase font-medium border border-white/30 px-10 py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                        <span>{t.viewWork}</span>
                        {isRtl
                          ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                          : <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        }
                      </a>
                      <a href="#contact" className="group flex items-center gap-4 text-sm md:text-base uppercase font-medium text-muted-foreground hover:text-white transition-all duration-300 px-6 py-5" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                        <span>{t.contact}</span>
                      </a>
                      <a
                        href="/Ali_Saji_Broadcast_Audio_Engineer.pdf"
                        download="Ali_Saji_CV.pdf"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '/Ali_Saji_Broadcast_Audio_Engineer.pdf';
                          link.download = 'Saji_Ali_RESUME.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="group flex items-center gap-4 text-sm md:text-base uppercase font-medium text-muted-foreground hover:text-white transition-all duration-300 px-6 py-5"
                        style={{ letterSpacing: isRtl ? '0' : undefined }}
                      >
                        <Download className="w-5 h-5" />
                        <span>{t.downloadResume}</span>
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Portrait photo */}
              <div className="lg:col-span-4 order-first lg:order-last flex items-end justify-center lg:justify-end">
                <Reveal hero delay={0.35} className="w-full">
                  <div className="relative w-full max-w-xs mx-auto lg:max-w-none lg:mx-0">
                    <img
                      src={portraitImg}
                      alt="Ali — Sound Engineer"
                      className="w-full object-cover object-top grayscale contrast-110"
                      style={{ aspectRatio: "3/4", maxHeight: "72vh" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  </div>
                </Reveal>
              </div>

            </div>
          </motion.div>

          <Reveal hero delay={0.75} className="mt-auto pt-24 pb-8 flex justify-between items-end w-full border-b border-white/10">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground" style={{ letterSpacing: isRtl ? '0.1em' : undefined }}>
              {t.portfolio} {data.header.year}
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
              {t.scroll}
            </span>
          </Reveal>
        </section>

        {/* 2. TABLE OF CONTENTS */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5">
          <div className="w-full">
            <Reveal>
              <h2 className="text-sm md:text-lg uppercase text-muted-foreground mb-24 lg:mb-32" style={{ letterSpacing: isRtl ? '0.1em' : '0.4em' }}>
                {t.tableOfContents}
              </h2>
            </Reveal>
            <ul className="flex flex-col w-full">
              {data.toc.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <li className="border-b border-white/10">
                    <a href={`#${item.id}`} className="group flex flex-col md:flex-row md:items-baseline md:justify-between py-10 md:py-16 w-full">
                      <div className="flex items-baseline gap-8 md:gap-16">
                        <span className="text-xl md:text-3xl font-display text-muted-foreground group-hover:text-white transition-colors">{item.num}</span>
                        <span className="text-5xl md:text-7xl lg:text-[7vw] font-display uppercase text-white/40 group-hover:text-white transition-all duration-500 origin-left group-hover:translate-x-4">
                          {item.title}
                        </span>
                      </div>
                      <span className="hidden md:block opacity-0 group-hover:opacity-100 text-lg uppercase text-muted-foreground transition-opacity duration-500" style={{ letterSpacing: isRtl ? '0.1em' : '0.1em' }}>
                        {t.jumpToSection}
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
              <h2 className="text-sm md:text-lg uppercase text-muted-foreground mb-16 lg:mb-24" style={{ letterSpacing: isRtl ? '0.1em' : '0.4em' }}>
                {t.introduction}
              </h2>
            </Reveal>
            <div className="w-full">
              <Reveal delay={0.1}>
                <p className="text-4xl md:text-6xl lg:text-[5vw] font-display uppercase leading-[1.1] text-balance max-w-[95%]" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                  {data.intro.text}
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
                  {data.about.headline}
                </h2>
                <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                  {data.about.text}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE SLIDES */}
        <div id="experience">
          {data.experience.map((exp, i) => {
            const isEven = i % 2 !== 0;
            return (
              <section key={exp.id} className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto border-b border-white/5 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[25vw] font-display font-bold text-white/[0.02] pointer-events-none select-none z-0">
                  0{i + 1}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 w-full items-center z-10 relative">
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <Reveal>
                      <span className="text-2xl md:text-4xl font-display text-muted-foreground block mb-8 lg:mb-12">
                        0{i + 1}
                      </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <h3 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase mb-10 text-balance leading-[0.9]" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                        {exp.title}
                      </h3>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </Reveal>
                  </div>

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
            <h2 className="text-section-title mb-32 lg:mb-48">{t.selectedWork}</h2>
          </Reveal>

          {/* Documentary projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
            {docProjects.map((project, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer flex flex-col h-full">
                  <div className="overflow-hidden mb-12 flex-grow">
                    <img
                      src={docImages[i] ?? safariImg}
                      alt={project.title}
                      className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sm uppercase text-muted-foreground border-b border-transparent group-hover:border-white/30 pb-1 transition-colors" style={{ letterSpacing: isRtl ? '0.1em' : '0.3em' }}>
                      {project.category}
                    </span>
                    <span className="text-xl font-display text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase mb-6 group-hover:text-white transition-colors" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                    {project.title}
                  </h3>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl mb-8">
                    {project.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Radio project with SoundCloud */}
          {radioProject && (
            <div className="mt-32 pt-20 border-t border-white/10">
              <Reveal delay={0.2}>
                <div className="group cursor-pointer flex flex-col max-w-3xl">
                  <div className="overflow-hidden mb-12">
                    <img
                      src={radioImg}
                      alt={radioProject.title}
                      className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sm uppercase text-muted-foreground border-b border-transparent group-hover:border-white/30 pb-1 transition-colors" style={{ letterSpacing: isRtl ? '0.1em' : '0.3em' }}>
                      {radioProject.category}
                    </span>
                    <span className="text-xl font-display text-white/30">04</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase mb-6 group-hover:text-white transition-colors" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                    {radioProject.title}
                  </h3>

                  <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl mb-8">
                    {radioProject.description}
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-10">
                    <p className="text-xs uppercase text-white/30 mb-6" style={{ letterSpacing: '0.3em' }}>
                      {t.listen}
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
                      <a href="https://soundcloud.com/ali_bilal" target="_blank" rel="noopener noreferrer" className="text-[#cccccc] no-underline">Saji</a>
                      {" · "}
                      <a href="https://soundcloud.com/ali_bilal/sets/portfolio/s-yMnZrSbSM1b" target="_blank" rel="noopener noreferrer" className="text-[#cccccc] no-underline">Portfolio</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          )}

          {/* Music Production */}
          <div className="mt-40 lg:mt-56 pt-24 border-t border-white/10">
            <Reveal>
              <div className="flex flex-col gap-6 mb-20 lg:mb-28 max-w-3xl">
                <p className="text-xs uppercase text-white/30" style={{ letterSpacing: '0.3em' }}>{t.category}</p>
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                  {data.musicProduction.headline}
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                  {data.musicProduction.description}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {data.musicProduction.artists.map((artist, i) => {
                const img = artistImages[artist.name];
                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="group relative overflow-hidden cursor-pointer aspect-square bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-colors duration-500">
                      {img ? (
                        <img
                          src={img}
                          alt={artist.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-500" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 transition-all duration-500 md:group-hover:-translate-y-8">
                        <span className="text-xs uppercase text-white/50 mb-3 group-hover:text-white/70 transition-colors duration-500" style={{ letterSpacing: '0.3em' }}>
                          {t.artist}
                        </span>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-display uppercase text-white/80 group-hover:text-white transition-all duration-500 text-center leading-tight" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                          {artist.name}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <span className="absolute top-4 end-5 text-xs font-display text-white/30 group-hover:text-white/50 transition-colors duration-500 z-30">
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
            <h2 className="text-section-title mb-32 lg:mb-40">{t.skillsTools}</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-24">
            {data.skills.map((skillGroup, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <h4 className="text-sm lg:text-base uppercase text-muted-foreground mb-12 pb-6 border-b border-white/20" style={{ letterSpacing: isRtl ? '0.1em' : '0.4em' }}>
                    {skillGroup.category}
                  </h4>
                  <ul className="space-y-6">
                    {skillGroup.items.split(/[,،]/).map(s => s.trim()).filter(Boolean).map((item, j) => (
                      <li key={j} className="text-2xl md:text-3xl lg:text-4xl font-display uppercase text-white/90" style={{ letterSpacing: isRtl ? '0' : undefined }}>
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
                <h2 className="text-5xl md:text-7xl lg:text-[7vw] leading-none font-display uppercase mb-12" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                  {t.selectedHighlights}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-xl">
                  {data.recognition.text}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center mt-16 lg:mt-0">
              {data.recognition.items.map((item, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.1)}>
                  <div className="py-12 border-t border-white/20 group">
                    <h4 className="text-3xl md:text-5xl lg:text-6xl font-display uppercase text-white/50 group-hover:text-white transition-colors duration-500 group-hover:translate-x-4 transform" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                      {item}
                    </h4>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-white/20" />
            </div>
          </div>
        </section>

        {/* 9. CONTACT */}
        <section id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-56 max-w-[1800px] mx-auto">
          <Reveal>
            <h2 className="text-[15vw] md:text-[14vw] lg:text-[13vw] leading-[0.8] font-display uppercase mb-24 md:mb-32 text-center md:text-start" style={{ letterSpacing: isRtl ? '0' : undefined }}>
              {t.letsConnect}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mt-12 items-start">
            <Reveal delay={0.1}>
              <p className="text-3xl md:text-5xl lg:text-5xl text-muted-foreground font-light leading-tight text-balance">
                {data.contact.text}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 lg:gap-24">
              {data.contact.links.map((link, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.05)}>
                  <a href={link.href} className="group block">
                    <span className="text-sm uppercase text-muted-foreground block mb-6" style={{ letterSpacing: isRtl ? '0.1em' : '0.4em' }}>
                      {link.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-display uppercase border-b border-transparent group-hover:border-white transition-colors pb-2" style={{ letterSpacing: isRtl ? '0' : undefined }}>
                      {link.value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.4} className="mt-40 lg:mt-56 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm md:text-base uppercase text-muted-foreground" style={{ letterSpacing: isRtl ? '0.05em' : '0.3em' }}>
            <span>© {data.header.year} {portfolioData.header.name}</span>
            <span className="mt-6 md:mt-0">{t.allRightsReserved}</span>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
