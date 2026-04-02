"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";

type Props = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  children: string;
};

const wordItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const blockItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerRevealHeading({ as: Tag = "h2", className, id, children }: Props) {
  const locale = useLocale();
  const isEn = locale === "en";
  const words = isEn ? children.split(/\s+/).filter(Boolean) : [];

  const container = {
    hidden: {},
    visible: {
      transition: isEn
        ? { staggerChildren: 0.038, delayChildren: 0.05 }
        : { staggerChildren: 0, delayChildren: 0 },
    },
  };

  const MotionTag = Tag === "h1" ? motion.h1 : Tag === "h3" ? motion.h3 : motion.h2;

  return (
    <MotionTag
      id={id}
      className={`stagger-reveal-heading${className ? ` ${className}` : ""}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {isEn ? (
        words.map((word, i) => (
          <motion.span key={`${i}-${word}`} variants={wordItem} className="stagger-reveal-heading__word">
            {word}
          </motion.span>
        ))
      ) : (
        <motion.span variants={blockItem} className="stagger-reveal-heading__block">
          {children}
        </motion.span>
      )}
    </MotionTag>
  );
}
