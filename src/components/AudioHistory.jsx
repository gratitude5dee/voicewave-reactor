import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Download } from 'lucide-react';

const AudioHistory = ({ history }) => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {history.map((item, index) => (
          <div key={index} className="group flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-200">{item.voice}</p>
              <p className="text-xs text-gray-400 truncate">{item.text}</p>
            </div>
            <div className="hidden group-hover:flex space-x-2">
              <Button size="icon" variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-400/20">
                <Play size={16} />
              </Button>
              <Button size="icon" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/20">
                <Download size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AudioHistory;