"use client"

import * as React from "react"
import { useContainerScrollContext } from "@/components/ui/animated-video-on-scroll"

const BASE_CW = 360
const BASE_CH = 560
const BASE_RADIUS = 155
const CAP_H = 28
const TEX_URL = "/matcha/textures/composited_baseColor_opacity_0.jpeg"

export function MatchaCanScene() {
  const { scrollYProgress } = useContainerScrollContext()
  const canvasRef = React.useRef(null)
  const texRef = React.useRef(null)
  const rotRef = React.useRef(0)
  const rafRef = React.useRef(null)
  const loadedRef = React.useRef(false)
  const wrapperRef = React.useRef(null)
  const [dims, setDims] = React.useState({ cw: BASE_CW, ch: BASE_CH, radius: BASE_RADIUS })

  React.useEffect(() => {
    if (!wrapperRef.current) return
    const update = () => {
      const parentW = wrapperRef.current.parentElement?.offsetWidth || BASE_CW
      const scale = Math.min(1, parentW / (BASE_CW + 40))
      if (scale < 0.85) {
        const s = parentW / (BASE_CW + 40)
        setDims({
          cw: Math.round(BASE_CW * s),
          ch: Math.round(BASE_CH * s),
          radius: Math.round(BASE_RADIUS * s),
        })
      } else {
        setDims({ cw: BASE_CW, ch: BASE_CH, radius: BASE_RADIUS })
      }
    }
    const observer = new ResizeObserver(update)
    observer.observe(wrapperRef.current)
    update()
    return () => observer.disconnect()
  }, [])

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current
    const tex = texRef.current
    if (!canvas || !tex || !loadedRef.current) return

    const ctx = canvas.getContext("2d")
    const W = canvas.width
    const H = canvas.height
    const R = dims.radius
    const cx = W / 2
    const capH = Math.round(CAP_H * (dims.cw / BASE_CW))
    const bodyTop = capH + 8
    const bodyBot = H - capH - 4
    const bodyH = bodyBot - bodyTop
    const rot = rotRef.current

    ctx.clearRect(0, 0, W, H)

    for (let x = cx - R; x <= cx + R; x++) {
      const nx = (x - cx) / R
      if (Math.abs(nx) > 0.999) continue

      const theta = Math.asin(nx)
      const cosT = Math.cos(theta)

      const a = ((theta + rot) / (2 * Math.PI) + 10) % 1
      const srcX = Math.floor(a * tex.width) % tex.width

      const squeeze = cosT * 0.96 + 0.04
      const stripH = bodyH * squeeze
      const stripTop = bodyTop + (bodyH - stripH) / 2

      ctx.drawImage(
        tex,
        srcX, 0, 2, tex.height,
        x, stripTop, 1.5, stripH
      )

      const shade = 1 - Math.pow(cosT, 0.55)
      ctx.fillStyle = `rgba(5,13,8,${shade * 0.55})`
      ctx.fillRect(x, stripTop, 1.5, stripH)
    }

    const specX = cx - R * 0.28
    const specW = R * 0.07
    const grad = ctx.createLinearGradient(specX, 0, specX + specW, 0)
    grad.addColorStop(0, "rgba(255,255,255,0)")
    grad.addColorStop(0.3, "rgba(255,255,255,0.07)")
    grad.addColorStop(0.5, "rgba(255,255,255,0.12)")
    grad.addColorStop(0.7, "rgba(255,255,255,0.07)")
    grad.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = grad
    ctx.fillRect(specX, bodyTop + 20, specW, bodyH - 40)

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(cx, bodyTop, R + 2, capH, 0, 0, Math.PI * 2)
    const tg = ctx.createRadialGradient(
      cx - R * 0.25, bodyTop - capH * 0.3, 2,
      cx, bodyTop, R + 2
    )
    tg.addColorStop(0, "#e8e0c4")
    tg.addColorStop(0.3, "#d4ccae")
    tg.addColorStop(0.6, "#bab298")
    tg.addColorStop(0.85, "#a09878")
    tg.addColorStop(1, "#807860")
    ctx.fillStyle = tg
    ctx.fill()
    ctx.strokeStyle = "rgba(0,0,0,0.12)"
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.ellipse(cx + R * 0.18, bodyTop - 3, R * 0.14, capH * 0.32, -0.15, 0, Math.PI * 2)
    const pg = ctx.createRadialGradient(
      cx + R * 0.15, bodyTop - 5, 0,
      cx + R * 0.18, bodyTop - 3, R * 0.14
    )
    pg.addColorStop(0, "#ddd6be")
    pg.addColorStop(0.6, "#b8b094")
    pg.addColorStop(1, "#908870")
    ctx.fillStyle = pg
    ctx.fill()
    ctx.strokeStyle = "rgba(0,0,0,0.18)"
    ctx.lineWidth = 0.8
    ctx.stroke()

    ctx.beginPath()
    ctx.ellipse(cx + R * 0.18, bodyTop - 3, R * 0.06, capH * 0.14, -0.15, 0, Math.PI * 2)
    ctx.fillStyle = "#706850"
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(cx, bodyBot, R + 1, capH * 0.65, 0, 0, Math.PI * 2)
    const bg = ctx.createRadialGradient(
      cx - R * 0.2, bodyBot + 2, 1,
      cx, bodyBot, R + 1
    )
    bg.addColorStop(0, "#b0a888")
    bg.addColorStop(0.4, "#908060")
    bg.addColorStop(0.75, "#706040")
    bg.addColorStop(1, "#504030")
    ctx.fillStyle = bg
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(cx, bodyTop, R + 2, capH * 0.9, 0, Math.PI, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,0.18)"
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(cx, bodyBot + capH + 16, R * 1.1, 12, 0, 0, Math.PI * 2)
    const sg = ctx.createRadialGradient(cx, bodyBot + capH + 16, 0, cx, bodyBot + capH + 16, R * 1.1)
    sg.addColorStop(0, "rgba(0,0,0,0.30)")
    sg.addColorStop(0.6, "rgba(0,0,0,0.10)")
    sg.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = sg
    ctx.fill()
    ctx.restore()
  }, [dims])

  React.useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      texRef.current = img
      loadedRef.current = true
      draw()
    }
    img.src = TEX_URL
  }, [draw])

  React.useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      rotRef.current = v * Math.PI * 12
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(draw)
    })
    return unsub
  }, [scrollYProgress, draw])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        width={dims.cw}
        height={dims.ch}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  )
}
