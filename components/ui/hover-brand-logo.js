"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiFacebook, SiInstagram, SiTiktok, SiUber } from "react-icons/si";

function DeliverooIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
    >
      <path d="M16.861 0l-1.127 10.584L13.81 1.66 7.777 2.926l1.924 8.922-8.695 1.822 1.535 7.127L17.832 24l3.498-7.744L22.994.636 16.861 0zM11.39 13.61a.755.755 0 01.322.066c.208.093.56.29.63.592.103.434.004.799-.312 1.084v.002c-.315.284-.732.258-1.174.113-.441-.145-.637-.672-.47-1.309.124-.473.71-.544 1.004-.549zm4.142.548c.447-.012.832.186 1.05.543.217.357.107.75-.122 1.143h-.002c-.229.392-.83.445-1.422.16-.399-.193-.397-.684-.353-.983a.922.922 0 01.193-.447c.142-.177.381-.408.656-.416Z"/>
    </svg>
  );
}

const brands = [
  { id: "ubereats", name: "Uber Eats", Icon: SiUber },
  { id: "deliveroo", name: "Deliveroo", Icon: DeliverooIcon },
  { id: "instagram", name: "Instagram", Icon: SiInstagram },
  { id: "tiktok", name: "TikTok", Icon: SiTiktok },
  { id: "facebook", name: "Facebook", Icon: SiFacebook },
];

export default function HoverBrandLogo() {
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const activeBrand = brands.find((b) => b.id === hoveredId);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(1rem, 4vw, 3rem)",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 1rem",
      }}
    >
      {/* Left: text */}
      <div style={{ flexShrink: 0, textAlign: isMobile ? "center" : "left" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6b7a3a",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          Retrouvez-nous
        </p>
        <div style={{ position: "relative" }}>
          <p
            aria-hidden
            style={{
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              whiteSpace: isMobile ? "normal" : "nowrap",
              opacity: 0,
              pointerEvents: "none",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            vos plateformes
          </p>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={hoveredId ?? "default"}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{
                  duration: 0.16,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 500,
                  color: "#2a2a1e",
                  letterSpacing: "-0.02em",
                  whiteSpace: isMobile ? "normal" : "nowrap",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {activeBrand?.name ?? "vos plateformes"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: icon grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {brands.map(({ id, name, Icon }) => {
          const isActive = hoveredId === id;
          const isDimmed = hoveredId !== null && !isActive;
          return (
            <button
              key={id}
              aria-label={name}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setHoveredId(isActive ? null : id)}
              onTouchStart={() => setHoveredId(isActive ? null : id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isMobile ? "0.5rem" : "0.75rem",
                borderRadius: "0.75rem",
                border: isActive
                  ? "1px solid rgba(107,122,58,0.3)"
                  : "1px solid transparent",
                background: isActive ? "rgba(107,122,58,0.08)" : "transparent",
                color: isActive ? "#6b7a3a" : "#9a9588",
                opacity: isDimmed ? 0.4 : 1,
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            >
              <Icon style={{ width: isMobile ? 22 : 28, height: isMobile ? 22 : 28 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
