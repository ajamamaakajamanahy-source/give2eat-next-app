"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = "h1",
  once = true,
}: TextRevealProps) {
  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -40,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={`flex flex-wrap ${className}`}
      style={{ perspective: "600px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block mr-[0.3em]"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
