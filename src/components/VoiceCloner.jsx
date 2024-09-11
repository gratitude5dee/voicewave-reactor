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

const VoiceCloner = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Aiden');
  const [model, setModel] = useState('sonic-english');
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioData, setAudioData] = useState(new Uint8Array(128));
  const [latency, setLatency] = useState(99);
  const [isConnected, setIsConnected] = useState(true);
  const [isSpeedEmotionOpen, setIsSpeedEmotionOpen] = useState(false);
  const [isMixVoicesOpen, setIsMixVoicesOpen] = useState(false);
  const [isCloneVoiceOpen, setIsCloneVoiceOpen] = useState(false);

  const handleSpeak = async () => {
    if (!audioContext) return;

    try {
      const response = await fetch(`https://api.example.com/tts?text=${encodeURIComponent(text)}&voice=${voice}&model=${model}`);
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

  const handleDownload = () => {
    console.log('Downloading audio...');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="h-96 bg-black rounded-t-xl overflow-hidden relative">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AudioReactiveSphere audioData={audioData} />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="p-8 bg-gray-900">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <ModelSelector model={model} setModel={setModel} />
              <Button
                onClick={() => setIsCloneVoiceOpen(true)}
                className="bg-white text-purple-900 hover:bg-purple-100 transition-all duration-300 font-bold py-2 px-4 rounded-full shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" /> Clone Voice
              </Button>
            </div>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 rounded-md p-2"
            >
              <option value="Aiden">Aiden</option>
              <option value="Bella">Bella</option>
              <option value="Charlie">Charlie</option>
            </select>
          </div>
          <div className="flex space-x-4 mb-6">
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak"
              className="flex-grow text-lg p-4 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-l-full"
            />
            <Button onClick={handleSpeak} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-r-full transition-all duration-300">
              <Mic className="mr-2 h-5 w-5" /> Speak
            </Button>
          </div>
          <div className="flex space-x-4 mb-6">
            <Button variant="outline" className="flex-grow bg-gray-800 text-white border-gray-700 hover:bg-gray-700 transition-all duration-300 rounded-full" onClick={() => setIsMixVoicesOpen(true)}>
              Mix Voices
            </Button>
            <Button variant="outline" className="flex-grow bg-gray-800 text-white border-gray-700 hover:bg-gray-700 transition-all duration-300 rounded-full" onClick={() => setIsSpeedEmotionOpen(true)}>
              <Settings className="mr-2 h-5 w-5" /> Speed/Emotion
            </Button>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <RefreshCw size={16} />
                <span>{latency}ms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
            <Button variant="ghost" onClick={handleDownload} className="text-gray-400 hover:text-white transition-all duration-300">
              <Download size={16} className="mr-2" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>
      <SpeedEmotionPopup isOpen={isSpeedEmotionOpen} onClose={() => setIsSpeedEmotionOpen(false)} />
      <MixVoicesPopup isOpen={isMixVoicesOpen} onClose={() => setIsMixVoicesOpen(false)} />
      <CloneVoicePopup isOpen={isCloneVoiceOpen} onClose={() => setIsCloneVoiceOpen(false)} />
    </div>
  );
};

export default VoiceCloner;