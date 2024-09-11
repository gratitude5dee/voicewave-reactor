import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Download, Mic, Settings, Plus } from 'lucide-react';
import SpeedEmotionPopup from './SpeedEmotionPopup';
import MixVoicesPopup from './MixVoicesPopup';
import CloneVoicePopup from './CloneVoicePopup';
import AudioReactiveSphere from './AudioReactiveSphere';
import ModelSelector from './ModelSelector';

const VoiceCloner = ({ onNewAudio }) => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Aiden');
  const [model, setModel] = useState('sonic-english');
  const [audioData, setAudioData] = useState(new Uint8Array(128));
  const [latency, setLatency] = useState(99);
  const [isConnected, setIsConnected] = useState(true);
  const [isSpeedEmotionOpen, setIsSpeedEmotionOpen] = useState(false);
  const [isMixVoicesOpen, setIsMixVoicesOpen] = useState(false);
  const [isCloneVoiceOpen, setIsCloneVoiceOpen] = useState(false);

  const handleSpeak = () => {
    // Implement speak functionality
    onNewAudio(voice, text);
  };

  const handleDownload = () => {
    // Implement download functionality
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-1/2 bg-black rounded-t-xl overflow-hidden relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AudioReactiveSphere audioData={audioData} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="p-6 space-y-6 flex-grow bg-gray-900">
        <div className="flex justify-between items-center">
          <ModelSelector model={model} setModel={setModel} />
          <Button
            onClick={() => setIsCloneVoiceOpen(true)}
            variant="outline"
            className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white rounded-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Clone Voice
          </Button>
        </div>
        <div className="flex space-x-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak"
            className="flex-grow bg-gray-800 border-gray-700 text-white"
          />
          <Button onClick={handleSpeak} className="bg-purple-600 hover:bg-purple-700">
            <Mic className="mr-2 h-4 w-4" /> Speak
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-grow bg-amber-600 hover:bg-amber-700 text-white border-amber-600" 
            onClick={() => setIsMixVoicesOpen(true)}
          >
            Mix Voices
          </Button>
          <Button 
            variant="outline" 
            className="flex-grow bg-teal-600 hover:bg-teal-700 text-white border-teal-600" 
            onClick={() => setIsSpeedEmotionOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" /> Speed/Emotion
          </Button>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <RefreshCw size={12} />
              <span>{latency}ms</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          <Button variant="ghost" onClick={handleDownload} className="text-gray-400 hover:text-white">
            <Download size={16} className="mr-2" />
            <span>Download</span>
          </Button>
        </div>
      </div>
      <SpeedEmotionPopup isOpen={isSpeedEmotionOpen} onClose={() => setIsSpeedEmotionOpen(false)} />
      <MixVoicesPopup isOpen={isMixVoicesOpen} onClose={() => setIsMixVoicesOpen(false)} />
      <CloneVoicePopup isOpen={isCloneVoiceOpen} onClose={() => setIsCloneVoiceOpen(false)} />
    </div>
  );
};

export default VoiceCloner;