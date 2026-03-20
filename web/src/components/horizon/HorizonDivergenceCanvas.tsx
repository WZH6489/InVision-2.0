"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#d4c4a8";
const GOLD_DIM = "#8a7a62";

type Props = {
  progressRef: React.MutableRefObject<number>;
};

function DivergenceScene({ progressRef }: Props) {
  const mainLine = useRef<THREE.Line>(null);
  const branchesGroup = useRef<THREE.Group>(null);

  const { main, branches } = useMemo(() => {
    const mainGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -1.35, 0),
      new THREE.Vector3(0, 0.85, 0),
    ]);
    const mainMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.95,
    });
    const mainObj = new THREE.Line(mainGeom, mainMat);

    const branchObjs: THREE.Line[] = [];
    const n = 14;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const spread = (t - 0.5) * 1.65;
      const midY = 0.15 + Math.abs(spread) * 0.35;
      const pts = [
        new THREE.Vector3(0, -0.2, 0),
        new THREE.Vector3(spread * 0.35, midY, 0),
        new THREE.Vector3(spread * 1.05, 0.95 + Math.abs(spread) * 0.25, 0),
      ];
      const curve = new THREE.CatmullRomCurve3(pts);
      const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const m = new THREE.LineBasicMaterial({
        color: GOLD_DIM,
        transparent: true,
        opacity: 0,
      });
      branchObjs.push(new THREE.Line(g, m));
    }
    return { main: mainObj, branches: branchObjs };
  }, []);

  useFrame(() => {
    const t = progressRef.current;
    const stemStrength = Math.max(0, 1 - t * 1.05);
    if (mainLine.current) {
      const mat = mainLine.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + stemStrength * 0.88;
    }
    const grp = branchesGroup.current;
    if (!grp) return;
    grp.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const stagger = (i / 14) * 0.22;
      const on = Math.max(0, Math.min(1, (t - 0.06 - stagger) / 0.52));
      const complexity = 0.2 + t * 0.85;
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = on * complexity * 0.55;
    });
  });

  return (
    <>
      <primitive ref={mainLine} object={main} />
      <group ref={branchesGroup}>
        {branches.map((br, i) => (
          <primitive key={i} object={br} />
        ))}
      </group>
    </>
  );
}

export function HorizonDivergenceCanvas({ progressRef }: Props) {
  return (
    <div className="horizon-webgl" data-cursor-glass>
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 38, near: 0.1, far: 20 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <DivergenceScene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
