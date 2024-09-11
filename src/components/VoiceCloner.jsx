import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AudioReactiveSphere = ({ audioData }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (audioData && meshRef.current) {
      const average = audioData.reduce((a, b) => a + b) / audioData.length;
      meshRef.current.scale.setScalar(1 + average / 128);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color="hotpink" />
    </mesh>
  );
};

const VoiceCloner = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Aiden');
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioData, setAudioData] = useState(new Uint8Array(128));

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 256;
    setAudioContext(context);
    setAnalyser(analyserNode);

    return () => {
      context.close();
    };
  }, []);

  const handleSpeak = async () => {
    if (!audioContext) return;

    try {
      const response = await fetch(`https://api.example.com/tts?text=${encodeURIComponent(text)}&voice=${voice}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      source.start();

      const updateAudioData = () => {
        analyser.getByteFrequencyData(audioData);
        setAudioData(new Uint8Array(audioData));
        requestAnimationFrame(updateAudioData);
      };
      updateAudioData();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Creative Voice Cloner</h1>
        <div className="flex space-x-4 mb-6">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak"
            className="flex-grow"
          />
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aiden">Aiden</SelectItem>
              <SelectItem value="Bella">Bella</SelectItem>
              <SelectItem value="Charlie">Charlie</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSpeak}>Speak</Button>
        </div>
        <div className="w-full h-[400px] bg-black rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AudioReactiveSphere audioData={audioData} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default VoiceCloner;