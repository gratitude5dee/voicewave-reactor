import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from 'lucide-react';

const models = [
  { id: 'sonic-english', name: 'Sonic English' },
  { id: 'sonic-multilingual', name: 'Sonic Multilingual [Alpha]' },
];

const ModelSelector = ({ model, setModel }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-600">
          {models.find(m => m.id === model)?.name || 'Select Model'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <div className="bg-gray-800 rounded-md shadow-lg">
          {models.map((m) => (
            <Button
              key={m.id}
              className="w-full justify-start rounded-none text-left font-normal"
              variant={m.id === model ? 'secondary' : 'ghost'}
              onClick={() => setModel(m.id)}
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