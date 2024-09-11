import React from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

const StatusBar = () => {
  const latency = 99;
  const isConnected = true;

  const handleDownload = () => {
    console.log('Download functionality not implemented yet');
  };

  return (
    <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <RefreshCw size={12} className="animate-spin" />
          <span>{latency}ms</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      <Button 
        variant="ghost" 
        onClick={handleDownload} 
        className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:bg-gray-100"
      >
        <Download size={16} className="mr-2" />
        <span>Download</span>
      </Button>
    </div>
  );
};

export default StatusBar;