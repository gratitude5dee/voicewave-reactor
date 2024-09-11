import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic } from 'lucide-react';

const CloneVoicePopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('record');
  const [isRecording, setIsRecording] = useState(false);
  const [enhanceAudio, setEnhanceAudio] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Implement recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Implement stop recording logic here
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving voice clone:', { name, description, language, agreed });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Clone a voice</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500">Create a voice that sounds like a sound clip.</p>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="record" className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Record a voice clip</h3>
              <Button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                <Mic className="mr-2 h-5 w-5" />
                {isRecording ? 'Stop' : 'Start'}
              </Button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Need something to read? Try this:</h3>
              <p className="text-sm text-gray-600">
                Hi there! I'm cloning my voice on Cartesia. Cartesia's Sonic model offers the fastest voice cloning on the planet—just record 10 to 15 seconds of audio, and you're all done. To clone your own voice, you can head over to the Cartesia playground at play.cartesia.ai.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enhance-audio"
                checked={enhanceAudio}
                onCheckedChange={setEnhanceAudio}
              />
              <label htmlFor="enhance-audio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enhance audio for cloning
              </label>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recommended</span>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Sound clip</h3>
              <Input type="file" accept="audio/*" className="w-full" />
              <p className="text-sm text-gray-500 mt-2">
                Aim for 10-15 seconds of audio. The max audio length is 30 seconds and max file size is 4 MB.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enhance-audio-upload"
                checked={enhanceAudio}
                onCheckedChange={setEnhanceAudio}
              />
              <label htmlFor="enhance-audio-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enhance audio for cloning
              </label>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recommended</span>
            </div>
          </TabsContent>
        </Tabs>
        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              placeholder="Optional. A brief description of the voice's characteristics: accent, tone, gender, and so on."
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="w-full mt-1">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">The language the voice is intended to work with.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={setAgreed}
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I have consent to clone these voice samples and that I will not use anything generated on Cartesia for illegal or harmful purposes.
            </label>
          </div>
        </div>
        <Button onClick={handleSave} className="w-full mt-4" disabled={!agreed}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CloneVoicePopup;