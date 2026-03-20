"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";

type Props = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  children: string;
};

export function StaggerRevealHeading({ as: Tag = "h2", className, id, children }: Props) {
  const locale = useLocale();
  const parts = locale === "en" ? children.split(/\s+/).filter(Boolean) : Array.from(children);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: locale === "en" ? 0.035 : 0.028, delayChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const MotionTag = Tag === "h1" ? motion.h1 : Tag === "h3" ? motion.h3 : motion.h2;

  return (
    <MotionTag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {parts.map((chunk, i) => (
        <motion.span
          key={`${i}-${chunk}`}
          variants={item}
          style={{
            display: "inline-block",
            marginRight: locale === "en" && i < parts.length - 1 ? "0.28em" : undefined,
          }}
        >
          {chunk}
        </motion.span>
      ))}
    </MotionTag>
  );
}
