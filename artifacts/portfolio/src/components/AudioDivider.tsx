import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface AudioDividerProps {
  src: string
  alt: string
  label: string
  objectPosition?: string
}

export function AudioDivider({ src, alt, label, objectPosition = "center" }: AudioDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative h-[38vh] md:h-[56vh] overflow-hidden select-none"
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, objectPosition }}
        className="absolute inset-0 w-full h-[128%] -top-[14%] object-cover grayscale brightness-[0.45] contrast-125"
      />
      {/* Top/bottom fade to blend with surrounding pure black sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-transparent to-black/95 pointer-events-none" />
      {/* Subtle side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
      {/* Label bar */}
      <div className="absolute bottom-5 inset-x-0 px-8 md:px-16 flex items-center gap-6">
        <div className="h-px flex-1 bg-white/8" />
        <span className="text-[9px] uppercase tracking-[0.65em] text-white/18 font-sans whitespace-nowrap">
          {label}
        </span>
        <div className="h-px flex-1 bg-white/8" />
      </div>
    </motion.div>
  )
}
