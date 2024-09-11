import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const MixVoicesPopup = ({ isOpen, onClose, voices }) => {
  const [isMixingEnabled, setIsMixingEnabled] = useState(false);
  const [mixedVoices, setMixedVoices] = useState([
    { id: 1, name: '', percentage: 50 },
    { id: 2, name: '', percentage: 50 },
  ]);

  const handleAddVoice = () => {
    if (mixedVoices.length < 5) {
      setMixedVoices([...mixedVoices, { id: Date.now(), name: '', percentage: 50 }]);
    }
  };

  const handleRemoveVoice = (id) => {
    setMixedVoices(mixedVoices.filter(voice => voice.id !== id));
  };

  const handleVoiceChange = (id, field, value) => {
    setMixedVoices(mixedVoices.map(voice => 
      voice.id === id ? { ...voice, [field]: value } : voice
    ));
  };

  const handleMoveVoice = (index, direction) => {
    const newVoices = [...mixedVoices];
    const temp = newVoices[index];
    newVoices[index] = newVoices[index + direction];
    newVoices[index + direction] = temp;
    setMixedVoices(newVoices);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mix voices <span className="text-sm font-normal text-gray-500">Alpha</span></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-base">Enable mixing</span>
            <Switch checked={isMixingEnabled} onCheckedChange={setIsMixingEnabled} />
          </div>
          <p className="text-sm text-gray-500">
            Use mixing to create a new voice that resembles the selected source voices.
          </p>
          {mixedVoices.map((voice, index) => (
            <div key={voice.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Select value={voice.name} onValueChange={(value) => handleVoiceChange(voice.id, 'name', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Slider
                  value={[voice.percentage]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleVoiceChange(voice.id, 'percentage', value[0])}
                  className="w-32"
                />
                <span className="w-8 text-right">{voice.percentage}%</span>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveVoice(voice.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                {index > 0 && (
                  <Button variant="ghost" size="icon" onClick={() => handleMoveVoice(index, -1)}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                )}
                {index < mixedVoices.length - 1 && (
                  <Button variant="ghost" size="icon" onClick={() => handleMoveVoice(index, 1)}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {mixedVoices.length < 5 && (
            <Button onClick={handleAddVoice} className="mt-2">
              Add to mix
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MixVoicesPopup;