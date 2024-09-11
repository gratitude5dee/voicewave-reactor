import React, { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import VoiceCloner from './VoiceCloner';
import AudioHistory from './AudioHistory';
import HeaderBar from './HeaderBar';

const VoiceClonerCard = () => {
  const [audioHistory, setAudioHistory] = useState([
    { voice: 'Aiden', text: 'Welcome to the voice cloner!' },
    { voice: 'Emma', text: 'This is a sample audio history.' },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleNewAudio = (voice, text) => {
    setAudioHistory(prev => [...prev, { voice, text }]);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden ${isMinimized ? 'h-12' : 'h-screen'} transition-all duration-300 ease-in-out`}>
      <HeaderBar onMinimize={handleMinimize} isMinimized={isMinimized} />
      {!isMinimized && (
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel defaultSize={30} minSize={20}>
            <AudioHistory history={audioHistory} />
          </ResizablePanel>
          <ResizableHandle className="w-px bg-gray-200" />
          <ResizablePanel defaultSize={70} minSize={50}>
            <VoiceCloner onNewAudio={handleNewAudio} />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

export default VoiceClonerCard;