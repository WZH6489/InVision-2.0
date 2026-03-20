"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Phase = 0 | 1 | 2;

export function ObservationRoomScene({ phase }: { phase: Phase }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const dossierRef = useRef<THREE.Group>(null);
  const roomRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current && phase === 1) {
      ringRef.current.rotation.z = t * 0.15;
      const m = ringRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.22 + Math.sin(t * 1.2) * 0.08;
    }
    if (dossierRef.current && phase === 2) {
      dossierRef.current.rotation.y = Math.sin(t * 0.4) * 0.06;
    }
  });

  const showRoom = phase < 2;
  const ambient = phase === 0 ? 0.04 : phase === 1 ? 0.09 : 0;

  return (
    <>
      <ambientLight intensity={ambient} color="#c4b59a" />
      <pointLight position={[1.8, 2.2, 1.6]} intensity={phase === 0 ? 0.15 : 0.55} color="#e8dcc8" />
      <pointLight position={[-2, 1, 2]} intensity={0.12} color="#6a8aaa" />

      {showRoom ? (
        <group ref={roomRef}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
            <planeGeometry args={[4, 4]} />
            <meshStandardMaterial color="#0a0b0e" roughness={0.95} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.15, -1.35]} rotation={[0, 0, 0]}>
            <planeGeometry args={[3.2, 2.2]} />
            <meshStandardMaterial color="#12141a" roughness={0.88} metalness={0.12} />
          </mesh>
          {[-1.1, 0, 1.1].map((x) => (
            <mesh key={x} position={[x, 0.4, -1.28]}>
              <boxGeometry args={[0.35, 0.9, 0.06]} />
              <meshStandardMaterial color="#1a1d26" roughness={0.75} metalness={0.2} />
            </mesh>
          ))}
          <mesh position={[0, -0.15, 0]} rotation={[0.12, 0, 0]}>
            <boxGeometry args={[0.55, 0.22, 0.62]} />
            <meshStandardMaterial color="#252830" roughness={0.45} metalness={0.35} />
          </mesh>
          <mesh position={[0, 0.05, 0.08]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.42, 0.5, 0.08]} />
            <meshStandardMaterial color="#2a3038" roughness={0.55} metalness={0.25} />
          </mesh>
        </group>
      ) : null}

      {phase === 1 ? (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0.05]}>
          <torusGeometry args={[0.62, 0.012, 12, 64]} />
          <meshBasicMaterial color="#7ec8e8" transparent opacity={0.28} />
        </mesh>
      ) : null}

      {phase === 2 ? (
        <group ref={dossierRef} position={[0, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.9, 1.15, 0.08]} />
            <meshStandardMaterial color="#1c1f28" roughness={0.35} metalness={0.65} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[0.78, 1.02]} />
            <meshStandardMaterial color="#0e1018" emissive="#1a2230" emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[0, 0.35, 0.052]}>
            <planeGeometry args={[0.55, 0.12]} />
            <meshBasicMaterial color="#3d5a4a" transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, -0.15, 0.052]}>
            <planeGeometry args={[0.62, 0.35]} />
            <meshBasicMaterial color="#2a3548" transparent opacity={0.35} />
          </mesh>
        </group>
      ) : null}
    </>
  );
}
