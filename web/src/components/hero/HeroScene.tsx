"use client";

import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x = state.clock.elapsedTime * 0.07;
    m.rotation.y = state.clock.elapsedTime * 0.11;
  });
  return (
    <Sphere ref={ref} args={[1, 48, 48]} scale={1.4}>
      <MeshDistortMaterial
        color="#1a3555"
        emissive="#061018"
        emissiveIntensity={0.55}
        roughness={0.42}
        metalness={0.25}
        distort={0.42}
        speed={1.15}
      />
    </Sphere>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <pointLight position={[5, 3, 6]} intensity={1.15} color="#6ee7ff" />
      <pointLight position={[-4, -2, 4]} intensity={0.35} color="#a78bfa" />
      <Blob />
    </>
  );
}
