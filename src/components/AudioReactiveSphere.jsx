import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const AudioReactiveSphere = ({ audioData }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (audioData && meshRef.current) {
      const average = audioData.reduce((a, b) => a + b) / audioData.length;
      meshRef.current.scale.setScalar(1 + average / 128);
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial color="#4a9ff5" emissive="#4a9ff5" emissiveIntensity={0.5} shininess={50} />
    </mesh>
  );
};

export default AudioReactiveSphere;