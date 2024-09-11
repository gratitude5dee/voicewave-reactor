import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AudioReactiveSphere = ({ audioData }) => {
  const meshRef = useRef();
  const particlesRef = useRef();

  const particlesCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1 + Math.random() * 0.5;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (audioData && meshRef.current && particlesRef.current) {
      const average = audioData.reduce((a, b) => a + b) / audioData.length;
      const scale = 1 + average / 128;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        const distance = Math.sqrt(x * x + y * y + z * z);
        const factor = 1 + (Math.sin(distance * 3 + average / 50) * 0.2);
        positions[i3] *= factor;
        positions[i3 + 1] *= factor;
        positions[i3 + 2] *= factor;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial color="#4a9ff5" emissive="#4a9ff5" emissiveIntensity={0.5} shininess={50} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            count={particlesCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" />
      </points>
    </group>
  );
};

export default AudioReactiveSphere;