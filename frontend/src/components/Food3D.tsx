"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, PresentationControls, Center, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function ProfessionalFoodImage() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture("/images/about-food.png");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(time / 4) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>
    </Float>
  );
}

export default function Food3D() {
  return (
    <div className="h-[300px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Center>
              <ProfessionalFoodImage />
            </Center>
          </PresentationControls>
          <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={8} blur={3} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
