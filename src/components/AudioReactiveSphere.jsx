import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AudioReactiveSphere = ({ audioData }) => {
  const meshRef = useRef();
  const particlesRef = useRef();
  const particlesGeometryRef = useRef(new THREE.BufferGeometry());

  const particlesCount = 3000;
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

  useEffect(() => {
    if (particlesGeometryRef.current) {
      particlesGeometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame((state) => {
    if (audioData && meshRef.current && particlesGeometryRef.current) {
      const time = state.clock.getElapsedTime();
      const average = audioData.reduce((a, b) => a + b, 0) / audioData.length;
      const scale = 1 + average / 256;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;

      const positionAttribute = particlesGeometryRef.current.getAttribute('position');
      const positions = positionAttribute.array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        const distance = Math.sqrt(x * x + y * y + z * z);
        const factor = 1 + (Math.sin(distance * 3 + time * 2 + average / 50) * 0.2);
        positions[i3] *= factor;
        positions[i3 + 1] *= factor;
        positions[i3 + 2] *= factor;
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial color="#4a9ff5" emissive="#4a9ff5" emissiveIntensity={0.5} shininess={50} />
      </mesh>
      <points ref={particlesRef}>
        <primitive object={particlesGeometryRef.current} />
        <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.6} />
      </points>
    </group>
  );
};

export default AudioReactiveSphere;