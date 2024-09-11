import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeaderBar = ({ onMinimize, isMinimized }) => {
  const handleMinimize = () => {
    onMinimize();
  };

  const handleMaximize = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleClose = () => {
    // Implement close functionality
    console.log('Close');
  };

  return (
    <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
      <div className="text-gray-900 font-semibold">Voice Cloner</div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={handleMinimize} className="text-gray-500 hover:text-gray-700">
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleMaximize} className="text-gray-500 hover:text-gray-700">
          <Square className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HeaderBar;