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

  const handleNewAudio = (voice, text) => {
    setAudioHistory(prev => [...prev, { voice, text }]);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 text-gray-900">
      <HeaderBar />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={30} minSize={20}>
          <AudioHistory history={audioHistory} />
        </ResizablePanel>
        <ResizableHandle className="w-px bg-gray-200" />
        <ResizablePanel defaultSize={70} minSize={50}>
          <VoiceCloner onNewAudio={handleNewAudio} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default VoiceClonerCard;