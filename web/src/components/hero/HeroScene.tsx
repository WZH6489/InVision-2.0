"use client";

import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function FluidCore() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x = state.clock.elapsedTime * 0.05;
    m.rotation.y = state.clock.elapsedTime * 0.09;
  });
  return (
    <Sphere ref={ref} args={[1, 56, 56]} scale={1.35}>
      <MeshDistortMaterial
        color="#141a1f"
        emissive="#2a2218"
        emissiveIntensity={0.35}
        roughness={0.38}
        metalness={0.42}
        distort={0.38}
        speed={0.85}
      />
    </Sphere>
  );
}

function GlassMonolith() {
  const g = useRef<Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y = state.clock.elapsedTime * 0.11;
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={g} position={[0.55, 0.1, 0.35]}>
        <mesh>
          <boxGeometry args={[0.22, 1.15, 0.38]} />
          <meshPhysicalMaterial
            color="#8a7d6b"
            metalness={0.92}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.15}
            transparent
            opacity={0.88}
            emissive="#3d3428"
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.18} color="#b8a090" />
      <pointLight position={[6, 4, 5]} intensity={0.85} color="#d4c4a8" />
      <pointLight position={[-5, -2, 4]} intensity={0.35} color="#6a7a8c" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.5}
        penumbra={0.9}
        intensity={0.4}
        color="#f0e6d4"
      />
      <FluidCore />
      <GlassMonolith />
    </>
  );
}
