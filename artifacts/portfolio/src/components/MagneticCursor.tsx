import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MagneticCursor() {
  const [variant, setVariant] = useState<"default" | "hover" | "click">("default")
  const [mounted, setMounted] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.25 })
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.25 })

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    setMounted(true)

    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        "a, button, input, textarea, select, [role='button']"
      )
      setVariant(t ? "hover" : "default")
    }
    const onDown = () => setVariant("click")
    const onUp = () => setVariant("default")

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
    }
  }, [x, y])

  if (!mounted) return null

  const ringSize = variant === "hover" ? 58 : variant === "click" ? 16 : 32

  return (
    <>
      {/* Outer ring — slow follow, mix-blend-difference for inversion effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: variant === "hover" ? 0.9 : 0.55,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Inner dot — follows precisely */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 6, height: 6 }}
        animate={{ opacity: variant === "hover" ? 0 : 1, scale: variant === "click" ? 0.4 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
