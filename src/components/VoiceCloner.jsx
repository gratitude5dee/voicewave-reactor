import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Download, Play, Users, Settings } from 'lucide-react';
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
    onNewAudio(voice, text);
  };

  const handleDownload = () => {
    // Implement download functionality
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-6 bg-white">
      <div className="w-full">
        <ModelSelector model={model} setModel={setModel} />
      </div>
      <div className="flex-grow">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak"
          className="w-full h-full p-4 text-lg border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button onClick={handleSpeak} className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
          <Play className="mr-2 h-4 w-4" /> Speak
        </Button>
        <Select value={voice} onValueChange={setVoice}>
          <SelectTrigger className="w-[200px] bg-white border border-gray-300 text-black">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aiden">Aiden</SelectItem>
            <SelectItem value="Emma">Emma</SelectItem>
            <SelectItem value="Liam">Liam</SelectItem>
            <SelectItem value="Olivia">Olivia</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          className="border border-gray-300 text-black hover:bg-gray-100" 
          onClick={() => setIsMixVoicesOpen(true)}
        >
          <Users className="mr-2 h-4 w-4" /> Mix
        </Button>
        <Button 
          variant="outline" 
          className="border border-gray-300 text-black hover:bg-gray-100" 
          onClick={() => setIsSpeedEmotionOpen(true)}
        >
          <Settings className="mr-2 h-4 w-4" /> Speed/Emotion
        </Button>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
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
        <Button variant="ghost" onClick={handleDownload} className="text-gray-500 hover:text-black">
          <Download size={16} className="mr-2" />
          <span>Download</span>
        </Button>
      </div>
      <SpeedEmotionPopup isOpen={isSpeedEmotionOpen} onClose={() => setIsSpeedEmotionOpen(false)} />
      <MixVoicesPopup isOpen={isMixVoicesOpen} onClose={() => setIsMixVoicesOpen(false)} />
      <CloneVoicePopup isOpen={isCloneVoiceOpen} onClose={() => setIsCloneVoiceOpen(false)} />
    </div>
  );
};

export default VoiceCloner;