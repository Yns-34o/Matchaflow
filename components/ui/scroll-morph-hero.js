"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion"

function FlipCard({ src, index, phase, target, imgW, imgH }) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 22,
        mass: 0.8,
      }}
      style={{
        position: "absolute",
        width: imgW,
        height: imgH,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`matcha-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #6b7a3a 0%, #4a5a2a 100%)",
            borderColor: "rgba(107,122,58,0.3)",
          }}
        >
          <div className="text-center">
            <p
              style={{
                fontSize: "8px",
                fontWeight: 700,
                color: "#d1c9b4",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Matcha
            </p>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "#f5f0e1" }}>
              Détails
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const TOTAL_IMAGES = 20
const MAX_SCROLL_DESKTOP = 1800
const MAX_SCROLL_MOBILE = 400

const IMAGES = [
  "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=85",
  "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=85",
  "https://images.unsplash.com/photo-1631308491952-040f80133535?w=400&q=85",
  "https://images.unsplash.com/photo-1717603545758-88cc454db69b?w=400&q=85",
  "https://images.unsplash.com/photo-1704079698754-5e621edb610b?w=400&q=85",
  "https://images.unsplash.com/photo-1717398804885-a6c22b3e5c2f?w=400&q=85",
  "https://images.unsplash.com/photo-1624893578106-a98840591afc?w=400&q=85",
  "https://images.unsplash.com/photo-1566373049939-704ea187ef98?w=400&q=85",
  "https://images.unsplash.com/photo-1565117661210-fd54898de423?w=400&q=85",
  "https://images.unsplash.com/photo-1624893464449-22a7e40de7c9?w=400&q=85",
  "https://images.unsplash.com/photo-1717398804998-ad2d48822518?w=400&q=85",
  "https://images.unsplash.com/photo-1582785513054-8d1bf9d69c1a?w=400&q=85",
  "https://images.unsplash.com/photo-1605729988263-7752475299e5?w=400&q=85",
  "https://images.unsplash.com/photo-1708573106073-e27e43ec7fda?w=400&q=85",
  "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=85",
  "/matcha/matcha-16.jpg",
  "https://images.unsplash.com/photo-1517256064527-8f67e42c22b7?w=400&q=85",
  "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&q=85",
  "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&q=85",
  "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=400&q=85",
]

const lerp = (start, end, t) => start * (1 - t) + end * t

export default function IntroAnimation() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)
  const lockRef = useRef(true)

  const isMobile = (containerSize.width || 800) < 768
  const IMG_WIDTH = isMobile ? 40 : 60
  const IMG_HEIGHT = isMobile ? 57 : 85
  const MAX_SCROLL = isMobile ? MAX_SCROLL_MOBILE : MAX_SCROLL_DESKTOP

  useEffect(() => {
    if (!containerRef.current) return
    const handleResize = (entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    }
    const observer = new ResizeObserver(handleResize)
    observer.observe(containerRef.current)
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    })
    return () => observer.disconnect()
  }, [])

  const virtualScroll = useMotionValue(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = (containerSize.width || 800) < 768
    const currentMaxScroll = isMobile ? MAX_SCROLL_MOBILE : MAX_SCROLL_DESKTOP

    // Animation completes at morph range end (150px mobile, 600px desktop)
    // Unlock after animation is fully complete
    const currentEarlyUnlock = isMobile ? 380 : 1750

    const handleWindowScroll = () => {
      if (!lockRef.current && scrollRef.current > 0) {
        const rect = container.getBoundingClientRect()
        if (rect.top >= -10 && rect.top <= 10) {
          lockRef.current = true
        }
      }
    }

    const handleWheel = (e) => {
      if (!lockRef.current) return

      e.preventDefault()
      const delta = Math.abs(e.deltaY) < 50 ? e.deltaY * 2.5 : e.deltaY
      const newScroll = Math.min(Math.max(scrollRef.current + delta * 0.8, 0), currentMaxScroll)
      scrollRef.current = newScroll
      virtualScroll.set(newScroll)

      if (newScroll >= currentEarlyUnlock) {
        lockRef.current = false
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => {
      if (!lockRef.current) return
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (!lockRef.current) return
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      touchStartY = touchY
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), currentMaxScroll)
      scrollRef.current = newScroll
      virtualScroll.set(newScroll)
      if (newScroll >= currentEarlyUnlock) {
        lockRef.current = false
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("scroll", handleWindowScroll, { passive: true })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("scroll", handleWindowScroll)
    }
  }, [virtualScroll, containerSize.width])

  const morphRange = isMobile ? [0, 150] : [0, 600]
  const morphProgress = useTransform(virtualScroll, morphRange, [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 80, damping: 26, mass: 0.6 })

  const rotateRange = isMobile ? [150, MAX_SCROLL_MOBILE] : [600, MAX_SCROLL_DESKTOP]
  const scrollRotate = useTransform(virtualScroll, rotateRange, [0, 360])
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 80, damping: 26, mass: 0.6 })

  // Early unlock threshold for mobile
  const earlyUnlockThreshold = isMobile ? 380 : 1750

  const [introPhase, setIntroPhase] = useState("scatter")

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500)
    const t2 = setTimeout(() => setIntroPhase("circle"), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 25 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const normalizedX = (relativeX / rect.width) * 2 - 1
      mouseX.set(normalizedX * 80)
    }
    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX])

  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }))
  }, [])

  const [morphValue, setMorphValue] = useState(0)
  const [rotateValue, setRotateValue] = useState(0)
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const u3 = smoothMorph.on("change", setMorphValue)
    const u4 = smoothScrollRotate.on("change", setRotateValue)
    const u5 = smoothMouseX.on("change", setParallaxValue)
    return () => { u3(); u4(); u5() }
  }, [smoothMorph, smoothScrollRotate, smoothMouseX])

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1])
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0])

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#f5f0e1",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Intro Text */}
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            top: "50%",
            transform: "translateY(-50%)",
            background: "radial-gradient(ellipse, rgba(245,240,225,0.92) 0%, rgba(245,240,225,0.7) 50%, transparent 75%)",
            padding: "clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem)",
            borderRadius: "50%",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#3a3a2a",
              margin: 0,
            }}
          >
            L'art du matcha, réinventé.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              marginTop: "1rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#6b7a3a",
            }}
          >
            SCROLL POUR EXPLORER
          </motion.p>
        </div>

        {/* Arc Active Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 500,
              color: "#3a3a2a",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Notre Univers Matcha
          </h2>
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              color: "#6b5e4e",
              maxWidth: "32ch",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Découvrez un monde où tradition japonaise rencontre créativité
            artisanale. Chaque boisson est une célébration du matcha ceremonial.
          </p>
        </motion.div>

        {/* Main Container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
            let target

            const scatter = scatterPositions[i]

            const lineSpacing = isMobile ? 45 : 70
            const lineTotalWidth = TOTAL_IMAGES * lineSpacing
            const lineX = i * lineSpacing - lineTotalWidth / 2
            const lineTarget = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 }

            const minDim = Math.min(containerSize.width || 800, containerSize.height || 600)
            const circleRadius = Math.min(minDim * 0.42, 420)
            const circleAngle = (i / TOTAL_IMAGES) * 360
            const circleRad = (circleAngle * Math.PI) / 180
            const circleTarget = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: circleAngle + 90,
              scale: 1,
              opacity: 1,
            }

            const baseRadius = Math.min(containerSize.width || 800, (containerSize.height || 600) * 1.5)
            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1)
            const arcApexY = (containerSize.height || 600) * (isMobile ? 0.35 : 0.25)
            const arcCenterY = arcApexY + arcRadius
            const spreadAngle = isMobile ? 100 : 130
            const startAngle = -90 - spreadAngle / 2
            const step = spreadAngle / (TOTAL_IMAGES - 1)
            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1)
            const maxRotation = spreadAngle * 0.8
            const boundedRotation = -scrollProgress * maxRotation
            const currentArcAngle = startAngle + i * step + boundedRotation
            const arcRad = (currentArcAngle * Math.PI) / 180

            const arcTarget = {
              x: Math.cos(arcRad) * arcRadius + parallaxValue,
              y: Math.sin(arcRad) * arcRadius + arcCenterY,
              rotation: currentArcAngle + 90,
              scale: isMobile ? 1.4 : 1.8,
              opacity: 1,
            }

            if (introPhase === "scatter") {
              target = scatter
            } else if (introPhase === "line") {
              target = lineTarget
            } else {
              target = {
                x: lerp(circleTarget.x, arcTarget.x, morphValue),
                y: lerp(circleTarget.y, arcTarget.y, morphValue),
                rotation: lerp(circleTarget.rotation, arcTarget.rotation, morphValue),
                scale: lerp(1, arcTarget.scale, morphValue),
                opacity: 1,
              }
            }

            return (
              <FlipCard
                key={i}
                src={src}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
                imgW={IMG_WIDTH}
                imgH={IMG_HEIGHT}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
