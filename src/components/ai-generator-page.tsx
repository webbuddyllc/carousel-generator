"use client";

import React, { useState } from 'react';
import { AIGenerator } from './ai-generator';
import { GeneratedImages } from './generated-images';
import { useFormContext } from 'react-hook-form';
import { DocumentSchema } from '@/lib/validation/document-schema';
import { ElementType } from '@/lib/validation/element-type';
import { ImageInputType, ObjectFitType, DEFAULT_BACKGROUND_IMAGE_INPUT } from '@/lib/validation/image-schema';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ImagePlus } from 'lucide-react';
import { useToast } from './ui/use-toast';

export function AIGeneratorPage() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const form = useFormContext<z.infer<typeof DocumentSchema>>();
  const router = useRouter();
  const { toast } = useToast();

  const handleGenerate = (images: string[]) => {
    setGeneratedImages(images);
    setSelectedImages(new Set());
  };

  const handleToggleSelect = (image: string) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(image)) {
        newSet.delete(image);
      } else {
        newSet.add(image);
      }
      return newSet;
    });
  };

  const addImagesToCarousel = (imagesToAdd: string[]) => {
    const currentSlides = form.getValues("slides");
    const newSlides = imagesToAdd.map(image => ({
      elements: [{
        type: ElementType.enum.ContentImage,
        style: {
          opacity: 100,
          objectFit: ObjectFitType.enum.Cover
        },
        source: {
          type: ImageInputType.Url,
          src: image
        }
      }],
      backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT
    }));

    form.setValue("slides", [...currentSlides, ...newSlides]);
    
    // Show success message
    toast({
      title: "Success",
      description: `Added ${imagesToAdd.length} ${imagesToAdd.length === 1 ? 'image' : 'images'} to your carousel`,
    });

    // Switch to editor tab
    const editorTab = document.querySelector('[data-tab-value="editor"]') as HTMLElement;
    if (editorTab) {
      editorTab.click();
    }
  };

  const handleSelectImage = (image: string) => {
    addImagesToCarousel([image]);
  };

  const handleSelectAllImages = (images: string[]) => {
    addImagesToCarousel(images);
  };

  const handleUseSelectedImages = () => {
    addImagesToCarousel(Array.from(selectedImages));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <AIGenerator 
        onGenerate={handleGenerate} 
        onGenerating={setIsGenerating}
      />
      <GeneratedImages 
        images={generatedImages} 
        onSelectImage={handleSelectImage}
        onSelectAllImages={handleSelectAllImages}
        isLoading={isGenerating}
        selectedImages={selectedImages}
        onToggleSelect={handleToggleSelect}
      />
      {selectedImages.size > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={handleUseSelectedImages}
            className="gap-2"
            variant="default"
          >
            <ImagePlus className="w-4 h-4" />
            Add {selectedImages.size} Selected {selectedImages.size === 1 ? 'Image' : 'Images'}
          </Button>
        </div>
      )}
    </div>
  );
} 