import { motion, useScroll, useTransform } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Navigation } from "@/components/Navigation"
import { PlaceholderImage } from "@/components/PlaceholderImage"
import { ContactForm } from "@/components/ContactForm"
import { Download, ArrowUpRight } from "lucide-react"
import studioImg from "@/assets/studio.png"
import portraitImg from "../assets/portrait.jpeg"
import radioImg from "@/assets/radio.jpeg"
import tvImg from "@/assets/tv.jpeg"
import filmImg from "@/assets/film.jpeg"
import musicImg from "@/assets/music.jpeg"
import odImg from "@/assets/artists/od.jpg"
import rotationImg from "@/assets/artists/rotation.jpg"
import freekImg from "@/assets/artists/freek.jpg"
import flippterImg from "@/assets/artists/flippter.jpg"
import mvndilaImg from "@/assets/artists/mvndila.jpg"
import toodopeImg from "@/assets/artists/toodope.jpg"
import safariImg from "@/assets/film/safari.jpg"
import sirbunirImg from "@/assets/film/sirbunir.jpg"
import falajImg from "@/assets/film/falaj.jpg"

/* All scroll-driven 3D (useScroll + target refs) is replaced with whileInView.
   This eliminates ~12 concurrent scroll listeners — the primary perf bottleneck.
   Durations capped at 0.45s. No rotateX/rotateY/perspective/scale on scroll. */

const EXP_IMAGES    = [tvImg, radioImg, filmImg, musicImg]
const EXP_OBJ_POS   = ["center", "center", "center 30%", "center 3%"]
const EXP_DIV_IMGS  = [tvImg, radioImg, filmImg]

/* ─── Shared ease ─── */
const E = "easeOut" as const

/* ─── Chapter label ─── */
function ChapterLabel({ num, title, className = "" }: { num: string; title: string; className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.35, ease: E }}
    >
      <span className="text-accent text-xs font-sans tabular-nums">{num}</span>
      <span className="w-6 h-px bg-white/20" />
      <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-sans">{title}</span>
    </motion.div>
  )
}

/* ─── Fade + small y rise ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.45, delay, ease: E }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Word-split for contact heading ─── */
function SplitWords({ text, className = "", baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.15em] last:mr-0" style={{ verticalAlign: "bottom" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.45, delay: baseDelay + i * 0.09, ease: E }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ─── Image divider between scenes — whileInView fade only (no scroll listener) ─── */
function CinematicDivider({ src, alt, label, objectPosition = "center" }: {
  src: string; alt: string; label?: string; objectPosition?: string
}) {
  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ height: "50vh" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: E }}
    >
      <img
        src={src} alt={alt} loading="lazy"
        className="w-full h-full object-cover"
        style={{ objectPosition, filter: "grayscale(100%) sepia(10%) brightness(0.35) contrast(1.12)" }}
      />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.65em] text-foreground/28 font-sans">{label}</span>
        </div>
      )}
    </motion.div>
  )
}

/* ─── Experience scene — whileInView only, no per-section scroll listener ─── */
function ExperienceScene({ exp, image, objectPos, index }: {
  exp: (typeof portfolioData.experience)[0]
  image: string; objectPos: string; index: number
}) {
  const isEven = index % 2 !== 0
  const label  = exp.title.charAt(0).toUpperCase() + exp.title.slice(1).toLowerCase()

  return (
    <section
      id={index === 0 ? "experience" : exp.id}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-28 md:py-36 max-w-[1700px] mx-auto border-b border-white/[0.05]"
    >
      <span className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 text-[28vw] lg:text-[20vw] font-display font-bold text-white/[0.02] pointer-events-none select-none leading-none italic">
        0{index + 1}
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 w-full items-center z-10">
        <div className={`flex flex-col ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <ChapterLabel num={`0${index + 1}`} title="Chapter" className="mb-10" />
          <FadeUp delay={0.06}>
            <h2
              className="font-display font-bold italic normal-case leading-[0.88] mb-8 text-foreground/95"
              style={{ fontSize: "clamp(4rem, 10vw, 11rem)" }}
            >
              {label}.
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed max-w-md">
              {exp.description}
            </p>
          </FadeUp>
        </div>

        {/* Image — simple whileInView fade, no 3D transform */}
        <motion.div
          className={`overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.45, delay: 0.1, ease: E }}
        >
          <img
            src={image} alt={exp.title} loading="lazy"
            className="w-full h-[50vh] lg:h-[66vh] object-cover"
            style={{ objectPosition: objectPos, filter: "grayscale(30%) sepia(12%) brightness(0.88) contrast(1.06)" }}
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Work card — whileInView only, no per-card scroll listener ─── */
function WorkCard({ project, image, index }: {
  project: (typeof portfolioData.work)[0]; image: string; index: number
}) {
  return (
    <motion.div
      className="group flex flex-col"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: E }}
    >
      <div className="overflow-hidden mb-6 relative">
        <img
          src={image} alt={project.title} loading="lazy"
          className="w-full h-[42vh] md:h-[50vh] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          style={{ filter: "grayscale(20%) sepia(10%) brightness(0.9) contrast(1.04)", willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
      </div>
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] uppercase tracking-[0.45em] text-accent font-sans">{project.category}</span>
        <span className="text-xs font-display italic text-muted-foreground/40">0{index + 1}</span>
      </div>
      <h3 className="text-3xl md:text-4xl font-display font-bold normal-case italic mb-3 text-foreground/88 group-hover:text-foreground transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-base text-muted-foreground font-sans font-light leading-relaxed max-w-sm">
        {project.description}
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   PORTFOLIO
═══════════════════════════════════════ */
export default function Portfolio() {
  /* Single global scroll listener — shared by progress bar + hero fade */
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* Progress bar — shares the single global scroll listener */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          height: "1px",
          background: "hsl(var(--accent) / 0.55)",
          boxShadow: "0 0 10px hsl(var(--accent) / 0.2)",
          willChange: "transform",
        }}
      />

      <main>
        {/* ─── SCENE 1: HERO ─── */}
        <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Warm ambient glow — static, no animation */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 80% 8%, hsl(37 42% 58% / 0.06) 0%, transparent 70%)" }}
          />

          {/* Hero fades out as you scroll — opacity only, no scale/y */}
          <motion.div style={{ opacity: heroOpacity, willChange: "opacity" }} className="flex flex-col flex-1 relative z-10">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_38vw] flex-1">

              {/* LEFT */}
              <div className="flex flex-col px-6 md:px-12 lg:px-20 pt-28 pb-12 lg:py-0 lg:justify-center">
                <div className="lg:mt-0 mt-8">
                  <motion.h1
                    className="font-display font-bold italic normal-case leading-[0.83] text-foreground/95 select-none"
                    style={{ fontSize: "clamp(5rem, 17vw, 17rem)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: E }}
                  >
                    Saji
                  </motion.h1>
                  <motion.h1
                    className="font-display font-bold italic normal-case leading-[0.83] text-foreground/95 select-none"
                    style={{ fontSize: "clamp(5rem, 17vw, 17rem)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: E }}
                  >
                    Ali.
                  </motion.h1>
                </div>

                <motion.div
                  className="mt-10 max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.4 }}
                >
                  <p className="text-sm md:text-base font-sans font-light text-muted-foreground leading-snug tracking-wide">
                    {portfolioData.header.title}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground/50 font-sans tracking-wider">
                    UAE &nbsp;·&nbsp; 10+ Years
                  </p>
                </motion.div>

                <motion.p
                  className="mt-6 text-[10px] uppercase tracking-[0.38em] text-muted-foreground/45 font-sans"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  {portfolioData.header.awards}
                </motion.p>

                <motion.div
                  className="mt-12 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: E }}
                >
                  <a
                    href="#intro"
                    className="group flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] font-sans font-medium border border-foreground/22 px-7 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    View Work
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                  </a>
                  <a href="#contact" className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] font-sans font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-3.5">
                    Contact
                  </a>
                  <a
                    href="/Ali_Saji_Broadcast_Audio_Engineer.pdf"
                    download="Saji_Ali_CV.pdf"
                    className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] font-sans font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-3.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Resume
                  </a>
                </motion.div>

                <motion.div
                  className="mt-auto pt-16 lg:pt-24 flex items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                >
                  <span className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground/40 font-sans">
                    Portfolio {portfolioData.header.year}
                  </span>
                  <div className="h-px flex-1 max-w-[70px] bg-white/10" />
                  <motion.span
                    className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground/40 font-sans"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Scroll
                  </motion.span>
                </motion.div>
              </div>

              {/* RIGHT — Portrait, desktop */}
              <motion.div
                className="hidden lg:block relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: E }}
              >
                <img
                  src={portraitImg} alt="Saji Ali"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: "grayscale(100%) sepia(18%) brightness(0.75) contrast(1.12)" }}
                />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile portrait */}
          <motion.div
            className="lg:hidden relative h-[55vw] shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <img
              src={portraitImg} alt="Saji Ali"
              className="w-full h-full object-cover object-top"
              style={{ filter: "grayscale(100%) sepia(18%) brightness(0.75) contrast(1.12)" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        </section>

        {/* ─── SCENE 2: THE CRAFT ─── */}
        <section
          id="intro"
          className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 max-w-[1700px] mx-auto border-b border-white/[0.05]"
        >
          <ChapterLabel num="01" title="The Craft" className="mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <FadeUp>
                <p
                  className="font-display font-normal italic normal-case text-foreground/88 leading-[1.22]"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.8rem)" }}
                >
                  {portfolioData.intro.text}
                </p>
              </FadeUp>
            </div>
            <div className="lg:col-span-5">
              <FadeUp delay={0.1}>
                <div className="divide-y divide-white/[0.07]">
                  {portfolioData.header.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-5 py-5">
                      <span className="text-accent text-xs font-sans tabular-nums shrink-0">0{i + 1}</span>
                      <span className="text-lg md:text-xl font-display font-bold normal-case tracking-wide text-foreground/78">{tag}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <CinematicDivider src={studioImg} alt="Broadcast studio" label="The Studio" objectPosition="center 40%" />

        {/* ─── SCENE 3: ABOUT ─── */}
        <section
          id="about"
          className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-28 md:py-36 max-w-[1700px] mx-auto border-b border-white/[0.05]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 w-full items-center">
            <FadeUp className="order-2 lg:order-1 relative">
              <img
                src={portraitImg} alt="Saji Ali" loading="lazy"
                className="w-full max-w-sm lg:max-w-none mx-auto h-[58vh] lg:h-[72vh] object-cover object-top"
                style={{ filter: "grayscale(55%) sepia(20%) brightness(0.8) contrast(1.08)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </FadeUp>

            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <ChapterLabel num="02" title="About" className="mb-10" />
              <FadeUp delay={0.07}>
                <h2
                  className="font-display font-bold italic normal-case leading-[0.9] mb-10 text-foreground/95"
                  style={{ fontSize: "clamp(3rem, 7vw, 8rem)" }}
                >
                  {portfolioData.about.headline}
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed">
                  {portfolioData.about.text}
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {portfolioData.header.tags.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-[0.3em] border border-white/12 text-muted-foreground px-4 py-2 font-sans">
                      {t}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ─── SCENES 4–7: TV / RADIO / FILM / MUSIC ─── */}
        {portfolioData.experience.map((exp, i) => (
          <div key={exp.id}>
            {i > 0 && (
              <CinematicDivider
                src={EXP_DIV_IMGS[i - 1]}
                alt={portfolioData.experience[i - 1].title}
                label={portfolioData.experience[i - 1].title}
                objectPosition={EXP_OBJ_POS[i - 1]}
              />
            )}
            <ExperienceScene exp={exp} image={EXP_IMAGES[i]} objectPos={EXP_OBJ_POS[i]} index={i} />
          </div>
        ))}

        <CinematicDivider src={musicImg} alt="Music studio" label="Selected Work" objectPosition="center 15%" />

        {/* ─── SCENE 8: SELECTED WORK ─── */}
        <section
          id="work"
          className="px-6 md:px-12 lg:px-20 py-28 md:py-40 max-w-[1700px] mx-auto border-b border-white/[0.05]"
        >
          <ChapterLabel num="05" title="Selected Work" className="mb-12" />
          <FadeUp>
            <h2
              className="font-display font-bold italic normal-case text-foreground/90 leading-[0.88] mb-24 md:mb-32"
              style={{ fontSize: "clamp(2.8rem, 8vw, 10rem)" }}
            >
              Proof of the craft.
            </h2>
          </FadeUp>

          {/* Documentary films */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-16 mb-28">
            {portfolioData.work
              .filter((p) => !("soundcloudSrc" in p && p.soundcloudSrc))
              .map((project, i) => {
                const img = project.title === "Sharjah Safari" ? safariImg : project.title === "Sir Bu Nu'ayr Island" ? sirbunirImg : falajImg
                return <WorkCard key={i} project={project} image={img} index={i} />
              })}
          </div>

          {/* Radio project */}
          {portfolioData.work
            .filter((p) => "soundcloudSrc" in p && p.soundcloudSrc)
            .map((project, i) => (
              <div key={i} className="pt-16 border-t border-white/[0.07] mb-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.45em] text-accent font-sans block mb-5">{project.category}</span>
                    <FadeUp>
                      <h3 className="text-4xl md:text-5xl font-display font-bold normal-case italic mb-6 text-foreground/90 leading-tight">
                        {project.title}
                      </h3>
                    </FadeUp>
                    <FadeUp delay={0.08}>
                      <p className="text-base text-muted-foreground font-sans font-light leading-relaxed mb-10 max-w-md">
                        {project.description}
                      </p>
                    </FadeUp>
                    <FadeUp delay={0.14}>
                      <p className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground/45 mb-5 font-sans">Listen</p>
                      <iframe
                        width="100%" height="280" loading="lazy"
                        scrolling="no" frameBorder="no" allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A1456964344%3Fsecret_token%3Ds-yMnZrSbSM1b&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                        className="w-full"
                      />
                    </FadeUp>
                  </div>
                  <FadeUp delay={0.1} className="overflow-hidden">
                    <PlaceholderImage label={project.title.toUpperCase()} aspectRatio="portrait" className="w-full h-[45vh]" />
                  </FadeUp>
                </div>
              </div>
            ))}

          {/* Music Production */}
          <div className="pt-16 border-t border-white/[0.07]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <FadeUp>
                <h3
                  className="font-display font-bold italic normal-case text-foreground/90 leading-[0.88]"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 6rem)" }}
                >
                  {portfolioData.musicProduction.headline}
                </h3>
              </FadeUp>
              <FadeUp delay={0.08}>
                <p className="text-lg text-muted-foreground font-sans font-light leading-relaxed lg:pt-2">
                  {portfolioData.musicProduction.description}
                </p>
              </FadeUp>
            </div>

            {/* Artist grid — plain CSS hover, no Card3D mousemove listeners */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {portfolioData.musicProduction.artists.map((artist, i) => {
                const artistImg =
                  artist.name === "O'D" ? odImg :
                  artist.name === "roTation" ? rotationImg :
                  artist.name === "Freek" ? freekImg :
                  artist.name === "Flippter" ? flippterImg :
                  artist.name === "Mvndila" ? mvndilaImg :
                  toodopeImg

                return (
                  <motion.div
                    key={i}
                    className="group relative aspect-square overflow-hidden"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-4%" }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: E }}
                  >
                    <img
                      src={artistImg} alt={artist.name} loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      style={{ filter: "grayscale(30%) sepia(10%) brightness(0.82)", willChange: "transform" }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/22 transition-colors duration-300" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 transition-transform duration-300 md:group-hover:-translate-y-5">
                      <span className="text-[9px] uppercase tracking-[0.45em] text-white/45 mb-2 font-sans">Artist</span>
                      <span className="text-2xl md:text-3xl font-display font-bold italic normal-case text-white/85 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                        {artist.name}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-20 p-3 md:p-4">
                      <div className="translate-y-0 opacity-100 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                        <p className="text-[9px] uppercase tracking-[0.35em] text-white/38 mb-1 font-sans">Role</p>
                        <p className="text-[11px] md:text-xs text-white/78 leading-relaxed font-sans">{artist.work}</p>
                      </div>
                    </div>
                    <span className="absolute top-3 right-3.5 text-[10px] font-display italic text-white/22 group-hover:text-white/44 transition-colors duration-300 z-30">
                      0{i + 1}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── SCENE 9: SKILLS ─── */}
        <section
          id="skills"
          className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-28 md:py-40 max-w-[1700px] mx-auto border-b border-white/[0.05]"
        >
          <ChapterLabel num="06" title="Skills & Tools" className="mb-12" />
          <FadeUp>
            <h2
              className="font-display font-bold italic normal-case text-foreground/90 leading-[0.88] mb-20 md:mb-28"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 8rem)" }}
            >
              The tools of the trade.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            {portfolioData.skills.map((group, i) => (
              <motion.div
                key={i}
                className="md:px-10 first:md:pl-0 last:md:pr-0 py-10 md:py-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-5%" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04, delayChildren: i * 0.08 } },
                }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: E } } }}
                  className="mb-8"
                >
                  <span className="text-accent text-[10px] uppercase tracking-[0.55em] font-sans block mb-2.5">{`0${i + 1}`}</span>
                  <h4 className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground font-sans font-medium pb-5 border-b border-white/[0.08]">
                    {group.category}
                  </h4>
                </motion.div>
                <ul className="space-y-4">
                  {group.items.split(", ").map((item, j) => (
                    <motion.li
                      key={j}
                      variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: E } } }}
                      className="text-xl md:text-2xl font-display font-normal normal-case italic text-foreground/70 hover:text-foreground transition-colors duration-200 leading-snug"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── SCENE 10: RECOGNITION ─── */}
        <section
          id="recognition"
          className="min-h-[65vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-28 md:py-36 max-w-[1700px] mx-auto border-b border-white/[0.05]"
        >
          <ChapterLabel num="07" title="Recognition" className="mb-14" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <FadeUp>
              <h2
                className="font-display font-bold italic normal-case leading-[0.88] text-foreground/90"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 8rem)" }}
              >
                Selected highlights.
              </h2>
            </FadeUp>
            <div>
              {portfolioData.recognition.items.map((item, i) => (
                <FadeUp key={i} delay={0.06 + i * 0.07}>
                  <div className="py-7 border-b border-white/[0.07] flex items-center gap-6 group">
                    <span className="text-accent text-xs font-sans tabular-nums shrink-0">0{i + 1}</span>
                    <p className="text-2xl md:text-3xl font-display font-bold normal-case text-foreground/48 group-hover:text-foreground transition-all duration-300 group-hover:translate-x-2 transform leading-tight">
                      {item}
                    </p>
                  </div>
                </FadeUp>
              ))}
              <div className="border-b border-white/[0.07]" />
            </div>
          </div>
        </section>

        {/* ─── SCENE 11: CONTACT ─── */}
        <section
          id="contact"
          className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-28 md:py-40 max-w-[1700px] mx-auto"
        >
          <ChapterLabel num="08" title="Contact" className="mb-12" />

          <h2
            className="font-display font-bold italic normal-case leading-[0.82] text-foreground/90 mb-16 md:mb-24"
            style={{ fontSize: "clamp(2.8rem, 10vw, 12rem)" }}
          >
            <SplitWords text="Let's make something." />
          </h2>

          <motion.div
            className="w-full h-px bg-white/[0.08] mb-14 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: E }}
            style={{ willChange: "transform" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 items-start">
            <FadeUp delay={0.08}>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-sans font-light leading-relaxed text-balance">
                {portfolioData.contact.text}
              </p>
            </FadeUp>
            
          </div>

          <ContactForm />

          <FadeUp
            delay={0.2}
            className="mt-24 pt-10 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/35 font-sans"
          >
            <span>© {portfolioData.header.year} Saji Ali</span>
            <span>Senior Broadcast Engineer &amp; Audio Specialist</span>
          </FadeUp>
        </section>
      </main>
    </div>
  )
}
