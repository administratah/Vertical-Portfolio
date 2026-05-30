import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion"

interface Card3DProps {
  children: React.ReactNode
  /** Applied to the outermost perspective wrapper */
  className?: string
  style?: React.CSSProperties
  /** Rotation strength in degrees */
  strength?: number
  /** Subtle y-axis bob animation */
  float?: boolean
  floatDelay?: number
  /** Shifting radial gloss that follows cursor */
  gloss?: boolean
  /** CSS perspective depth in px */
  perspective?: number
}

export function Card3D({
  children,
  className,
  style,
  strength = 10,
  float = false,
  floatDelay = 0,
  gloss = false,
  perspective = 900,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(rawY, [-1, 1], [strength, -strength]),
    { stiffness: 400, damping: 40 }
  )
  const rotateY = useSpring(
    useTransform(rawX, [-1, 1], [-strength, strength]),
    { stiffness: 400, damping: 40 }
  )

  /* Gloss position tracks the cursor */
  const gx = useTransform(rawX, [-1, 1], [10, 90])
  const gy = useTransform(rawY, [-1, 1], [10, 90])
  const glossBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 58%)`

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    rawX.set(((e.clientX - left) / width) * 2 - 1)
    rawY.set(((e.clientY - top) / height) * 2 - 1)
  }
  const onMouseLeave = () => { rawX.set(0); rawY.set(0) }

  /* Inner tilt layer */
  const tilt = (
    <motion.div
      ref={ref}
      className="relative w-full h-full"
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {gloss && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glossBg }}
        />
      )}
    </motion.div>
  )

  return (
    <div
      className={className}
      style={{ perspective, ...style }}
    >
      {float ? (
        <motion.div
          className="w-full h-full"
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: {
              duration: 3.2 + floatDelay * 0.55,
              repeat: Infinity,
              ease: "easeInOut",
              delay: floatDelay,
            },
          }}
        >
          {tilt}
        </motion.div>
      ) : tilt}
    </div>
  )
}
