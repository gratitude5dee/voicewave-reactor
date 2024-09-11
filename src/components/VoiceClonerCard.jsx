import React, { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import VoiceCloner from './VoiceCloner';
import AudioHistory from './AudioHistory';
import HeaderBar from './HeaderBar';
import CloneVoicePopup from './CloneVoicePopup';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Trash2 } from 'lucide-react';

const VoiceClonerCard = () => {
  const [audioHistory, setAudioHistory] = useState([
    { voice: 'Aiden', text: 'Welcome to the voice cloner!' },
    { voice: 'Emma', text: 'This is a sample audio history.' },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [voices, setVoices] = useState([
    { name: 'Aiden', category: 'Male' },
    { name: 'Emma', category: 'Female' },
    { name: 'Liam', category: 'Male' },
    { name: 'Olivia', category: 'Female' },
  ]);
  const [isCloneVoiceOpen, setIsCloneVoiceOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [model, setModel] = useState('sonic-english');

  const handleNewAudio = (voice, text, speedEmotion, mixedVoices) => {
    setAudioHistory(prev => [...prev, { voice, text, speedEmotion, mixedVoices }]);
  };

  const handleDeleteAudio = (index) => {
    setAudioHistory(prev => prev.filter((_, i) => i !== index));
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleAddVoice = (newVoice) => {
    setVoices(prev => [...prev, { name: newVoice, category: 'Custom' }]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFavorite = (voiceName) => {
    setFavorites(prev =>
      prev.includes(voiceName)
        ? prev.filter(name => name !== voiceName)
        : [...prev, voiceName]
    );
  };

  const clearHistory = () => {
    setAudioHistory([]);
  };

  const filteredHistory = audioHistory.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.voice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden ${isMinimized ? 'h-12' : 'h-screen'} transition-all duration-300 ease-in-out`}>
      <HeaderBar onMinimize={handleMinimize} isMinimized={isMinimized} />
      {!isMinimized && (
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <Input
                  type="text"
                  placeholder="Search voices and history..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mb-2"
                  startAdornment={<Search className="text-gray-400" />}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" /> Clear History
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your audio history.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearHistory}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <AudioHistory
                history={filteredHistory}
                onDelete={handleDeleteAudio}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle className="w-px bg-gray-200" />
          <ResizablePanel defaultSize={70} minSize={50}>
            <VoiceCloner 
              onNewAudio={handleNewAudio} 
              voices={voices}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onCloneVoice={() => setIsCloneVoiceOpen(true)}
              model={model}
              setModel={setModel}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
      <CloneVoicePopup 
        isOpen={isCloneVoiceOpen} 
        onClose={() => setIsCloneVoiceOpen(false)} 
        onSave={handleAddVoice}
      />
    </div>
  );
};

export default VoiceClonerCard;