"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, useTexture, Center, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function RealisticFood() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture("/images/hero-food.png");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time / 2) * 0.1;
      meshRef.current.position.y = Math.sin(time) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[400px] w-full md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Center>
            <RealisticFood />
          </Center>
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
