"use client";

import { usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="page-transition-root"
        initial={{ opacity: 0, filter: "brightness(0)" }}
        animate={{ opacity: 1, filter: "brightness(1)" }}
        exit={{ opacity: 0, filter: "brightness(0)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
