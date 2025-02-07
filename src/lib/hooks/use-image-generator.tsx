import { useState } from 'react';
import { ImagePrompt } from '../services/dalle-service';

export function useImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (prompt: ImagePrompt): Promise<string | null> => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate image');
      }

      const data = await response.json();
      return data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateImage,
    isGenerating,
    error,
  };
} 