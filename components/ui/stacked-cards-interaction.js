"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Card = ({
  className,
  image,
  children,
  cardWidth,
  cardHeight,
  imgHeight,
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer overflow-hidden rounded-2xl border",
        className
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
        borderColor: "rgba(107,122,58,0.12)",
      }}
    >
      {image && (
        <div
          className="relative overflow-hidden mx-2 mt-2"
          style={{
            height: imgHeight,
            borderRadius: "0.75rem",
          }}
        >
          <img
            src={image}
            alt="card"
            className="object-cover w-full h-full"
          />
        </div>
      )}
      {children && (
        <div className="px-4 py-3 flex flex-col gap-y-1">{children}</div>
      )}
    </div>
  );
};

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 5,
  animationDelay = 0.1,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [dims, setDims] = useState({ w: 300, h: 360, imgH: 240 });
  const containerRef = useRef(null);
  const limitedCards = cards.slice(0, 3);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const parentW = containerRef.current.parentElement?.offsetWidth || 300;
      if (parentW < 400) {
        const scale = parentW / 360;
        setDims({
          w: Math.min(260, parentW * 0.7),
          h: Math.round(360 * scale * 0.85),
          imgH: Math.round(240 * scale * 0.85),
        });
      } else {
        setDims({ w: 300, h: 360, imgH: 240 });
      }
    };
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    updateSize();
    return () => observer.disconnect();
  }, []);

  const mobileSpread = dims.w < 280 ? spreadDistance * 0.5 : spreadDistance;
  const mobileRotation = dims.w < 280 ? rotationAngle * 0.6 : rotationAngle;

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <div className="relative" style={{ width: dims.w, height: dims.h }}>
        {limitedCards.map((card, index) => {
          const isFirst = index === 0;
          let xOffset = 0;
          let rotation = 0;

          if (limitedCards.length > 1) {
            if (index === 1) {
              xOffset = -mobileSpread;
              rotation = -mobileRotation;
            } else if (index === 2) {
              xOffset = mobileSpread;
              rotation = mobileRotation;
            }
          }

          return (
            <motion.div
              key={index}
              className={cn("absolute", isFirst ? "z-10" : "z-0")}
              initial={{ x: 0, rotate: 0 }}
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                zIndex: isFirst ? 10 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: index * animationDelay,
                type: "spring",
              }}
              {...(isFirst && {
                onHoverStart: () => setIsHovering(true),
                onHoverEnd: () => setIsHovering(false),
              })}
            >
              <Card
                className={isFirst ? "z-10 cursor-pointer" : "z-0"}
                image={card.image}
                cardWidth={dims.w}
                cardHeight={dims.h}
                imgHeight={dims.imgH}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    fontWeight: 500,
                    color: "#2a2a1e",
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: "#6b5e4e",
                    fontSize: "clamp(0.7rem, 1.5vw, 0.78rem)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { StackedCardsInteraction, Card };
