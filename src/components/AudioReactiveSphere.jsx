import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

class AudioReactiveShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uAudioData: { value: new Float32Array(128) },
        uColor: { value: new THREE.Color(0x4a9ff5) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAudioData[128];

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          float audioInfluence = 0.0;
          for (int i = 0; i < 128; i++) {
            audioInfluence += uAudioData[i] * 0.01;
          }
          newPosition += normal * audioInfluence;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uAudioData[128];
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          float audioInfluence = 0.0;
          for (int i = 0; i < 128; i++) {
            audioInfluence += uAudioData[i] * 0.01;
          }

          vec3 color = uColor + vec3(sin(uTime * 0.5) * 0.2, cos(uTime * 0.3) * 0.2, sin(uTime * 0.7) * 0.2);
          float glow = sin(uTime * 2.0 + vUv.x * 10.0 + vUv.y * 10.0) * 0.5 + 0.5;
          color += vec3(glow * 0.3 * (1.0 + audioInfluence));

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }
}

extend({ AudioReactiveShaderMaterial });

const AudioReactiveSphere = ({ audioData }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const [positions, normals] = useMemo(() => {
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    return [
      sphereGeometry.attributes.position.array,
      sphereGeometry.attributes.normal.array,
    ];
  }, []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uAudioData.value = audioData;

      const scale = 1 + (audioData.reduce((a, b) => a + b, 0) / audioData.length) * 0.01;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'normal']}
          count={normals.length / 3}
          array={normals}
          itemSize={3}
        />
      </bufferGeometry>
      <audioReactiveShaderMaterial ref={materialRef} />
    </mesh>
  );
};

export default AudioReactiveSphere;