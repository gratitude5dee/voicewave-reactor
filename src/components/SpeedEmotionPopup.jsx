import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SpeedEmotionPopup = ({ isOpen, onClose, onSave }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [emotions, setEmotions] = useState({
    Anger: 0,
    Curiosity: 0,
    Positivity: 0,
    Surprise: 0,
    Sadness: 0
  });

  const handleSave = () => {
    onSave({ speed, emotions });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Speed/Emotion <span className="text-sm font-normal text-gray-500">Alpha</span></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-controls" className="text-base">Enable speed/emotion controls</Label>
            <Switch id="enable-controls" checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
          <p className="text-sm text-gray-500">
            Adjust the speed/emotions of the voice to match your preferences.
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Slow</span>
                <span>Fast</span>
              </div>
              <Slider 
                value={[speed]} 
                max={100} 
                step={1} 
                onValueChange={(value) => setSpeed(value[0])}
              />
            </div>
            {Object.keys(emotions).map((emotion) => (
              <div key={emotion}>
                <Label htmlFor={emotion.toLowerCase()}>{emotion}</Label>
                <Slider 
                  id={emotion.toLowerCase()} 
                  value={[emotions[emotion]]} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setEmotions(prev => ({ ...prev, [emotion]: value[0] }))}
                />
              </div>
            ))}
          </div>
          <Button onClick={handleSave} className="mt-4">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpeedEmotionPopup;