"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const trailSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothTrailX = useSpring(trailX, trailSpringConfig);
  const smoothTrailY = useSpring(trailY, trailSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hide on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, select, [data-magnetic], [role='button']");
      if (interactive) {
        setIsHovering(true);
        if (interactive.hasAttribute("data-magnetic")) {
          setIsMagnetic(true);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, select, [data-magnetic], [role='button']");
      if (interactive) {
        setIsHovering(false);
        setIsMagnetic(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, trailX, trailY, isVisible]);

  // Don't render on touch devices or SSR
  if (!mounted) return null;
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Trail / Glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothTrailX,
          y: smoothTrailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-full border-emerald-400/60 bg-emerald-400/5"
          style={{ borderStyle: "solid" }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 6 : isHovering ? 4 : 8,
            height: isClicking ? 6 : isHovering ? 4 : 8,
            opacity: isVisible ? 1 : 0,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="rounded-full bg-white"
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: smoothTrailX,
          y: smoothTrailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 120 : 80,
            height: isHovering ? 120 : 80,
            opacity: isVisible ? (isHovering ? 0.15 : 0.08) : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-full bg-emerald-500 blur-xl"
        />
      </motion.div>
    </>
  );
}
