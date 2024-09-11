import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Download, Mic, Settings } from 'lucide-react';
import SpeedEmotionPopup from './SpeedEmotionPopup';
import MixVoicesPopup from './MixVoicesPopup';
import AudioReactiveSphere from './AudioReactiveSphere';

const VoiceCloner = () => {
  const [text, setText] = useState('sup');
  const [voice, setVoice] = useState('Aiden');
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioData, setAudioData] = useState(new Uint8Array(128));
  const [latency, setLatency] = useState(99);
  const [isConnected, setIsConnected] = useState(true);
  const [isSpeedEmotionOpen, setIsSpeedEmotionOpen] = useState(false);
  const [isMixVoicesOpen, setIsMixVoicesOpen] = useState(false);

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

  const handleDownload = () => {
    console.log('Downloading audio...');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="w-full max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="h-80 bg-black rounded-t-xl overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AudioReactiveSphere audioData={audioData} />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Sonic English</h1>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="Aiden">Aiden</SelectItem>
                <SelectItem value="Bella">Bella</SelectItem>
                <SelectItem value="Charlie">Charlie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4 mb-6">
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak"
              className="flex-grow text-lg p-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button onClick={handleSpeak} className="bg-blue-500 hover:bg-blue-600 text-white px-8">
              <Mic className="mr-2 h-5 w-5" /> Speak
            </Button>
          </div>
          <div className="flex space-x-4 mb-6">
            <Button variant="outline" className="flex-grow bg-gray-700 text-white border-gray-600 hover:bg-gray-600" onClick={() => setIsMixVoicesOpen(true)}>
              Mix Voices
            </Button>
            <Button variant="outline" className="flex-grow bg-gray-700 text-white border-gray-600 hover:bg-gray-600" onClick={() => setIsSpeedEmotionOpen(true)}>
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
            <Button variant="ghost" onClick={handleDownload} className="text-gray-400 hover:text-white">
              <Download size={16} className="mr-2" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>
      <SpeedEmotionPopup isOpen={isSpeedEmotionOpen} onClose={() => setIsSpeedEmotionOpen(false)} />
      <MixVoicesPopup isOpen={isMixVoicesOpen} onClose={() => setIsMixVoicesOpen(false)} />
    </div>
  );
};

export default VoiceCloner;