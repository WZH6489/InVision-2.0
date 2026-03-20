"use client";

import { motion } from "framer-motion";

type Props = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  children: React.ReactNode;
};

export function FadeUpHeading({ as: Tag = "h2", className, id, children }: Props) {
  const MotionTag = Tag === "h1" ? motion.h1 : Tag === "h3" ? motion.h3 : motion.h2;

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
