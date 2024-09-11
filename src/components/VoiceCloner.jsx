import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import SpeedEmotionPopup from './SpeedEmotionPopup';
import MixVoicesPopup from './MixVoicesPopup';
import AudioReactiveSphere from './AudioReactiveSphere';
import ModelSelector from './ModelSelector';
import VoiceControls from './VoiceControls';
import StatusBar from './StatusBar';

const VoiceCloner = ({ onNewAudio, voices = [], onCloneVoice, model, setModel }) => {
  const [audioData, setAudioData] = useState(new Float32Array(128).fill(0));
  const [isSpeedEmotionOpen, setIsSpeedEmotionOpen] = useState(false);
  const [isMixVoicesOpen, setIsMixVoicesOpen] = useState(false);
  const [speedEmotion, setSpeedEmotion] = useState(null);
  const [mixedVoices, setMixedVoices] = useState(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    return () => {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleSpeak = async (voice, text) => {
    if (voice && text) {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }

      const oscillator = audioContextRef.current.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // A4 note
      
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 2000); // Stop after 2 seconds

      sourceRef.current = oscillator;
      sourceRef.current.connect(analyserRef.current);

      onNewAudio(voice, text, speedEmotion, mixedVoices);
      startVisualization();
    }
  };

  const startVisualization = () => {
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    const updateVisualization = () => {
      analyserRef.current.getFloatFrequencyData(dataArray);
      setAudioData(dataArray);
      requestAnimationFrame(updateVisualization);
    };

    updateVisualization();
  };

  const handleMixVoices = (mixedVoicesData) => {
    setMixedVoices(mixedVoicesData);
    setIsMixVoicesOpen(false);
  };

  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel defaultSize={50} minSize={30}>
        <div ref={canvasRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AudioReactiveSphere audioData={audioData} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="p-6 space-y-6 h-full flex flex-col bg-white rounded-lg shadow-lg">
          <ModelSelector model={model} setModel={setModel} />
          <VoiceControls
            voices={voices}
            onSpeak={handleSpeak}
            onMixVoices={() => setIsMixVoicesOpen(true)}
            onSpeedEmotion={() => setIsSpeedEmotionOpen(true)}
          />
          <StatusBar />
        </div>
      </ResizablePanel>
      <SpeedEmotionPopup 
        isOpen={isSpeedEmotionOpen} 
        onClose={() => setIsSpeedEmotionOpen(false)} 
        onSave={setSpeedEmotion}
      />
      <MixVoicesPopup 
        isOpen={isMixVoicesOpen} 
        onClose={() => setIsMixVoicesOpen(false)} 
        voices={voices.map(v => v.name)}
        onSave={handleMixVoices}
        initialMixedVoices={mixedVoices}
      />
    </ResizablePanelGroup>
  );
};

export default VoiceCloner;