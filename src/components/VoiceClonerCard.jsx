import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import VoiceCloner from './VoiceCloner';
import AudioHistory from './AudioHistory';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const VoiceClonerCard = () => {
  const [audioHistory, setAudioHistory] = useState([
    { voice: 'Aiden', text: 'Welcome to the voice cloner!' },
    { voice: 'Emma', text: 'This is a sample audio history.' },
  ]);

  const handleNewAudio = (voice, text) => {
    setAudioHistory(prev => [...prev, { voice, text }]);
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={30} minSize={20}>
        <Card className="w-full h-full bg-gray-900 text-white shadow-xl rounded-none border-0">
          <CardContent className="p-0">
            <AudioHistory history={audioHistory} />
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle className="w-1 bg-gray-800" />
      <ResizablePanel defaultSize={70} minSize={50}>
        <Card className="w-full h-full bg-gray-900 text-white shadow-xl rounded-none border-0">
          <CardContent className="p-0">
            <VoiceCloner onNewAudio={handleNewAudio} />
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default VoiceClonerCard;