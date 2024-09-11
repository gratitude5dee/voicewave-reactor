import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from 'lucide-react';

const models = [
  { id: 'sonic-english', name: 'Sonic English' },
  { id: 'sonic-multilingual', name: 'Sonic Multilingual [Alpha]' },
];

const ModelSelector = ({ model, setModel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelChange = (modelId) => {
    setModel(modelId);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between text-lg font-normal border border-gray-300 bg-white text-black hover:bg-gray-100">
          {models.find(m => m.id === model)?.name || 'Select Model'}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="bg-white rounded-md shadow-lg">
          {models.map((m) => (
            <Button
              key={m.id}
              className="w-full justify-start rounded-none text-left font-normal text-black hover:bg-gray-100"
              variant={m.id === model ? 'secondary' : 'ghost'}
              onClick={() => handleModelChange(m.id)}
            >
              {m.id === model && <Check className="mr-2 h-4 w-4" />}
              {m.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModelSelector;