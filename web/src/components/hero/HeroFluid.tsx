"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroFluid() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const on = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (reduceMotion) {
    return (
      <div className="hero-webgl" aria-hidden>
        <div
          style={{
            position: "absolute",
            inset: "15%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(110,231,255,0.15), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="hero-webgl" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 48 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
