import React, { useState } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeaderBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    // Implement minimize functionality
    console.log('Minimize');
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleClose = () => {
    // Implement close functionality
    console.log('Close');
  };

  return (
    <div className="bg-gray-800 p-2 flex justify-between items-center">
      <div className="text-white font-bold">Voice Cloner</div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={handleMinimize}>
          <Minus className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleMaximize}>
          <Square className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

export default HeaderBar;