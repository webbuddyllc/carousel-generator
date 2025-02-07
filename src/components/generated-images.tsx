"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Check, ImagePlus, Sparkles, Image as ImageIcon, Palette, Layout, FileImage } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GeneratedImagesProps {
  images: string[];
  onSelectImage?: (image: string) => void;
  onSelectAllImages?: (images: string[]) => void;
  className?: string;
  isLoading?: boolean;
  selectedImages?: Set<string>;
  onToggleSelect?: (image: string) => void;
}

const LoadingPlaceholders = [
  {
    icon: ImageIcon,
    title: "Generating Visuals",
    description: "Creating stunning imagery..."
  },
  {
    icon: Palette,
    title: "Adding Colors",
    description: "Perfecting the palette..."
  },
  {
    icon: Layout,
    title: "Composing Layout",
    description: "Arranging elements..."
  },
  {
    icon: FileImage,
    title: "Final Touches",
    description: "Polishing details..."
  }
];

export function GeneratedImages({ 
  images, 
  onSelectImage, 
  onSelectAllImages,
  className, 
  isLoading,
  selectedImages = new Set(),
  onToggleSelect
}: GeneratedImagesProps) {
  if (!images.length && !isLoading) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Generated Images</h3>
        {images.length > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelectAllImages?.(images)}
            className="gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            Use All Images
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          // Enhanced loading placeholders
          <>
            {LoadingPlaceholders.map((placeholder, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden border bg-gradient-to-br from-muted/50 to-muted">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2">
                  <div className="relative">
                    <placeholder.icon className="w-8 h-8 opacity-50" />
                    <Sparkles className="w-4 h-4 text-primary absolute -top-2 -right-2 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{placeholder.title}</h4>
                    <p className="text-xs text-muted-foreground">{placeholder.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted-foreground/10">
                    <div 
                      className="h-full bg-primary/50 transition-all duration-1000 ease-in-out animate-progress" 
                      style={{
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          // Actual images
          images.map((image, index) => (
            <div key={index} className="relative group aspect-[4/3] rounded-lg overflow-hidden border">
              <img
                src={image}
                alt={`Generated image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {onToggleSelect && (
                  <Button
                    variant={selectedImages.has(image) ? "default" : "secondary"}
                    size="sm"
                    onClick={() => onToggleSelect(image)}
                    className="gap-2"
                  >
                    {selectedImages.has(image) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Select
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelectImage?.(image)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Now
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 