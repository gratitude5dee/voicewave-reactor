import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import VoiceCloner from './VoiceCloner';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const VoiceClonerCard = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={50} minSize={30}>
        <Card className="w-full h-full bg-gray-900 text-white shadow-xl rounded-none border-0">
          <CardContent className="p-0">
            <VoiceCloner />
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle className="w-1 bg-gray-800" />
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="h-full bg-gray-900 flex items-center justify-center text-gray-400">
          Additional content area
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default VoiceClonerCard;