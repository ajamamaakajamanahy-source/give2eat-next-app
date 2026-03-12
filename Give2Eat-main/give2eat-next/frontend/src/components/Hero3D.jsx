import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Stars, ContactShadows } from '@react-three/drei';

function FloatingShape({ position, color, geometry, scale, speed }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.005 * speed;
    mesh.current.rotation.y += 0.006 * speed;
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry === 'torus' ? (
          <torusGeometry args={[1, 0.3, 16, 32]} />
        ) : geometry === 'icosahedron' ? (
          <icosahedronGeometry args={[1, 0]} />
        ) : (
          <sphereGeometry args={[1, 32, 32]} />
        )}
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0.1}
          transmission={0.95}
          chromaticAberration={0.5}
          anisotropy={0.5}
          color={color}
          resolution={512}
        />
      </mesh>
    </Float>
  );
}

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <group position={[0, -1, 0]}>
          {/* Main Hero Elements */}
          <FloatingShape position={[2, 1, 0]} color="#4ade80" geometry="torus" scale={1.5} speed={1} />
          <FloatingShape position={[-2.5, -0.5, 1]} color="#f97316" geometry="icosahedron" scale={1.2} speed={0.8} />
          <FloatingShape position={[0, 2.5, -2]} color="#60a5fa" geometry="sphere" scale={0.8} speed={1.2} />
          
          {/* Distant Elements for Depth */}
          <FloatingShape position={[-4, 3, -5]} color="#a78bfa" geometry="torus" scale={0.5} speed={0.5} />
          <FloatingShape position={[4, -3, -4]} color="#fbbf24" geometry="sphere" scale={0.6} speed={0.6} />
        </group>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Soft floor shadow */}
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
