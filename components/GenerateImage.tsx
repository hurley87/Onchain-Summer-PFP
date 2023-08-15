'use client';

import { useContext, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MintContext } from '@/components/MintContext';

const GenerateImage = () => {
  const { setImage, gender, setGender, status, setStatus } =
    useContext(MintContext);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);

    const prompt = `pfp of a ${gender} ${status} in the middle of summer, digital art, postmodernism, no words, simple`;

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const { image } = await response.json();

    setImage(image);

    toast({
      title: 'PFP generated',
      description: 'You can now mint your NFT.',
    });
  };

  return (
    <>
      <Tabs defaultValue="male" className="space-y-4">
        <TabsList>
          <TabsTrigger
            onClick={() => setGender('male')}
            value="male"
            className="w-full"
          >
            Male
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setGender('female')}
            value="female"
            className="w-full"
          >
            Female
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="Artist" className="space-y-4">
        <TabsList>
          <TabsTrigger
            onClick={() => setStatus('Artist')}
            value="Artist"
            className="w-full"
          >
            Artist
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setStatus('Builder')}
            value="Builder"
            className="w-full"
          >
            Builder
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setStatus('Curator')}
            value="Curator"
            className="w-full"
          >
            Curator
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button disabled={isGenerating} onClick={generateImage} size="lg">
        {isGenerating ? 'Generating ...' : 'Generate PFP →'}
      </Button>
    </>
  );
};

export default GenerateImage;
