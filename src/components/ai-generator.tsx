"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Wand2, ImagePlus, Lightbulb, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

interface AIGeneratorProps {
  onGenerate?: (images: string[]) => void;
  onGenerating?: (isGenerating: boolean) => void;
  className?: string;
}

const PROMPT_SUGGESTIONS = [
  {
    icon: ImagePlus,
    text: "Professional LinkedIn banner with tech icons"
  },
  {
    icon: Lightbulb,
    text: "Creative workspace with laptop and coffee"
  },
  {
    icon: Bot,
    text: "AI and machine learning concept illustration"
  }
];

export function AIGenerator({ onGenerate, onGenerating, className }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    onGenerating?.(true);

    try {
      console.log('Sending request with prompt:', prompt.trim());
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images');
      }

      console.log('Received response:', data);

      if (!data.images || !Array.isArray(data.images)) {
        throw new Error('Invalid response format from server');
      }

      const imageUrls = data.images.map((img: any) => img.url);
      console.log('Image URLs:', imageUrls);
      
      onGenerate?.(imageUrls);
      
      toast({
        title: "Success",
        description: "Images generated successfully!",
      });
    } catch (error: any) {
      console.error("Failed to generate images:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      onGenerating?.(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Generate with AI</h2>
            <p className="text-sm text-muted-foreground">Create professional carousel images using AI</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Describe the images you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="pr-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isGenerating) {
                    handleGenerate();
                  }
                }}
              />
              <Sparkles className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="min-w-[100px]"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-pulse" />
                  Creating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="group"
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                <suggestion.icon className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                {suggestion.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 