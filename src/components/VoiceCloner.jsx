import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Download, Mic, Settings } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import SpeedEmotionPopup from './SpeedEmotionPopup';
import MixVoicesPopup from './MixVoicesPopup';
import AudioReactiveSphere from './AudioReactiveSphere';
import ModelSelector from './ModelSelector';

const VoiceCloner = ({ onNewAudio, voices = [], onCloneVoice }) => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [model, setModel] = useState('sonic-english');
  const [audioData, setAudioData] = useState(new Float32Array(128).fill(0));
  const [latency, setLatency] = useState(99);
  const [isConnected, setIsConnected] = useState(true);
  const [isSpeedEmotionOpen, setIsSpeedEmotionOpen] = useState(false);
  const [isMixVoicesOpen, setIsMixVoicesOpen] = useState(false);
  const [speedEmotion, setSpeedEmotion] = useState(null);
  const [mixedVoices, setMixedVoices] = useState(null);
  const bottomPanelRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (voices.length > 0 && !voice) {
      setVoice(voices[0].name);
    }
  }, [voices, voice]);

  const handleSpeak = () => {
    if (voice && text) {
      onNewAudio(voice, text, speedEmotion, mixedVoices);
      // Simulate audio reactivity
      const interval = setInterval(() => {
        setAudioData(new Float32Array(128).map(() => Math.random() * 0.5));
      }, 50);
      setTimeout(() => clearInterval(interval), 3000);
    }
  };

  const handleDownload = () => {
    console.log('Download functionality not implemented yet');
  };

  const handleMixVoices = (mixedVoicesData) => {
    setMixedVoices(mixedVoicesData);
    setIsMixVoicesOpen(false);
  };

  const resizeObserverCallback = useCallback((entries) => {
    if (!bottomPanelRef.current) return;

    for (let entry of entries) {
      if (entry.target === bottomPanelRef.current) {
        const height = entry.contentRect.height;
        const downloadButton = entry.target.querySelector('#download-button');
        if (downloadButton) {
          const buttonBottom = downloadButton.offsetTop + downloadButton.offsetHeight;
          const minHeight = buttonBottom + 10;
          if (height < minHeight) {
            bottomPanelRef.current.style.height = `${minHeight}px`;
          }
        }
        break;
      }
    }
  }, []);

  useEffect(() => {
    let resizeObserver;
    const currentBottomPanel = bottomPanelRef.current;

    if (currentBottomPanel) {
      resizeObserver = new ResizeObserver((entries) => {
        window.requestAnimationFrame(() => {
          resizeObserverCallback(entries);
        });
      });
      resizeObserver.observe(currentBottomPanel);
    }

    return () => {
      if (resizeObserver && currentBottomPanel) {
        resizeObserver.unobserve(currentBottomPanel);
        resizeObserver.disconnect();
      }
    };
  }, [resizeObserverCallback]);

  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel defaultSize={50} minSize={30}>
        <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AudioReactiveSphere audioData={audioData} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </ResizablePanel>
      <ResizableHandle className="h-px bg-gray-200" />
      <ResizablePanel defaultSize={50} minSize={30}>
        <div ref={bottomPanelRef} className="p-6 space-y-6 h-full flex flex-col bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <ModelSelector model={model} setModel={setModel} />
            <Button
              onClick={onCloneVoice}
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              + Clone Voice
            </Button>
          </div>
          <div className="flex space-x-2">
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="w-[200px] bg-gray-50 border-gray-200 text-gray-900 transition-all duration-300 hover:border-purple-300 focus:ring-2 focus:ring-purple-300">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.length > 0 ? (
                  voices.map((v) => (
                    <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-voices" disabled>No voices available</SelectItem>
                )}
              </SelectContent>
            </Select>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak"
              className="flex-grow bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:border-purple-300 focus:ring-2 focus:ring-purple-300"
            />
            <Button 
              onClick={handleSpeak} 
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:shadow-lg hover:scale-105" 
              disabled={!voice || !text}
            >
              <Mic className="mr-2 h-4 w-4" /> Speak
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-grow bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200 transition-all duration-300 hover:shadow-md" 
              onClick={() => setIsMixVoicesOpen(true)}
            >
              Mix Voices
            </Button>
            <Button 
              variant="outline" 
              className="flex-grow bg-teal-50 hover:bg-teal-100 text-teal-600 border-teal-200 transition-all duration-300 hover:shadow-md" 
              onClick={() => setIsSpeedEmotionOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" /> Speed/Emotion
            </Button>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <RefreshCw size={12} className="animate-spin" />
                <span>{latency}ms</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
            <Button 
              id="download-button" 
              variant="ghost" 
              onClick={handleDownload} 
              className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:bg-gray-100"
            >
              <Download size={16} className="mr-2" />
              <span>Download</span>
            </Button>
          </div>
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