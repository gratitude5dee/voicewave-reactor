import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Download, Star, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AudioHistory = ({ history, onDelete, favorites, onToggleFavorite }) => {
  const formatEmotions = (emotions) => {
    return Object.entries(emotions)
      .filter(([_, value]) => value > 0)
      .map(([emotion, value]) => (
        <Badge key={emotion} variant="secondary" className="mr-1 mb-1">
          {emotion}: {value}
        </Badge>
      ));
  };

  return (
    <ScrollArea className="h-full bg-white">
      <div className="space-y-4 p-4">
        {history.map((item, index) => (
          <div key={index} className="group relative bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100 hover:shadow-md">
            <div className="mb-2 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{item.voice}</h3>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-100 transition-colors duration-300">
                  <Play size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-colors duration-300">
                  <Download size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onToggleFavorite(item.voice)}
                  className={`${favorites.includes(item.voice) ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600 hover:bg-yellow-100 transition-colors duration-300`}
                >
                  <Star size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(index)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-100 transition-colors duration-300"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">{item.text}</p>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.speedEmotion && (
                <div className="mb-2">
                  <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-600 border-blue-200">
                    Speed: {item.speedEmotion.speed}
                  </Badge>
                  {formatEmotions(item.speedEmotion.emotions)}
                </div>
              )}
              {item.mixedVoices && (
                <div className="text-xs text-purple-600 mt-2">
                  Mixed: {item.mixedVoices.map(v => `${v.name} (${v.percentage}%)`).join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AudioHistory;