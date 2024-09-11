import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Settings } from 'lucide-react';

const VoiceControls = ({ voices, onSpeak, onMixVoices, onSpeedEmotion }) => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');

  const handleSpeak = () => {
    onSpeak(voice, text);
  };

  return (
    <div className="space-y-4">
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
          onClick={onMixVoices}
        >
          Mix Voices
        </Button>
        <Button 
          variant="outline" 
          className="flex-grow bg-teal-50 hover:bg-teal-100 text-teal-600 border-teal-200 transition-all duration-300 hover:shadow-md" 
          onClick={onSpeedEmotion}
        >
          <Settings className="mr-2 h-4 w-4" /> Speed/Emotion
        </Button>
      </div>
    </div>
  );
};

export default VoiceControls;