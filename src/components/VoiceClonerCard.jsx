import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import VoiceCloner from './VoiceCloner';

const VoiceClonerCard = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 text-white shadow-xl">
      <CardContent className="p-0">
        <VoiceCloner />
      </CardContent>
    </Card>
  );
};

export default VoiceClonerCard;