import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const SpeedEmotionPopup = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Speed/Emotion <span className="text-sm font-normal text-gray-500">Alpha</span></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-controls" className="text-base">Enable speed/emotion controls</Label>
            <Switch id="enable-controls" />
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
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            {['Anger', 'Curiosity', 'Positivity', 'Surprise', 'Sadness'].map((emotion) => (
              <div key={emotion}>
                <Label htmlFor={emotion.toLowerCase()}>{emotion}</Label>
                <Slider id={emotion.toLowerCase()} defaultValue={[0]} max={100} step={1} />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpeedEmotionPopup;