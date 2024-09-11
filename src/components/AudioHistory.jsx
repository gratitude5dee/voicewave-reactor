import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Download, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AudioHistory = ({ history, onDelete }) => {
  return (
    <ScrollArea className="h-full bg-white">
      <div className="space-y-4 p-4">
        {history.map((item, index) => (
          <div key={index} className="group relative flex items-center space-x-2 bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(index)}
            >
              <X size={16} className="text-red-500" />
            </Button>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{item.voice}</p>
              <p className="text-xs text-gray-500 truncate">{item.text}</p>
              {item.speedEmotion && (
                <p className="text-xs text-blue-500">
                  Speed: {item.speedEmotion.speed}, 
                  {Object.entries(item.speedEmotion.emotions).map(([emotion, value]) => 
                    `${emotion}: ${value}`
                  ).join(', ')}
                </p>
              )}
            </div>
            <div className="hidden group-hover:flex space-x-2">
              <button className="text-green-600 hover:text-green-700 transition-colors">
                <Play size={16} />
              </button>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AudioHistory;