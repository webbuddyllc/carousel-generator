import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { carouselTemplates } from "../templates/carousel-templates";
import { DocumentFormReturn } from "../document-form-types";
import { useImageGenerator } from "./use-image-generator";
import { ImageInputType } from "../validation/image-schema";

export function useTemplateHandler() {
  const form: DocumentFormReturn = useFormContext();
  const { generateImage } = useImageGenerator();

  const generateImagesForSlide = async (slide: any) => {
    const newElements = await Promise.all(
      slide.elements.map(async (element: any) => {
        if (element.type === "ContentImage" && element.source.generatePrompt) {
          const imageUrl = await generateImage(element.source.generatePrompt);
          if (imageUrl) {
            return {
              ...element,
              source: {
                ...element.source,
                src: imageUrl,
                type: ImageInputType.Generated,
              },
            };
          }
        }
        return element;
      })
    );
    return { ...slide, elements: newElements };
  };

  const applyTemplate = useCallback(
    async (templateId: string) => {
      const selectedTemplate = carouselTemplates.find(
        (template) => template.id === templateId
      );

      if (selectedTemplate) {
        // Generate images for slides that have generatePrompt
        const slidesWithGeneratedImages = await Promise.all(
          selectedTemplate.slides.map(generateImagesForSlide)
        );

        // Reset the form with the template data while preserving the config
        const currentConfig = form.getValues("config");
        form.reset({
          config: currentConfig,
          slides: slidesWithGeneratedImages,
        });
      }
    },
    [form, generateImage]
  );

  return {
    applyTemplate,
  };
} 