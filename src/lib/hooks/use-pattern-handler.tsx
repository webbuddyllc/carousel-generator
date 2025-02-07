import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { backgroundPatterns } from "../customization/background-patterns";
import { ElementType } from "../validation/element-type";
import { ImageInputType } from "../validation/image-schema";
import { DocumentSchema } from "../validation/document-schema";
import * as z from "zod";

export function usePatternHandler() {
  const form = useFormContext<z.infer<typeof DocumentSchema>>();

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "config.pattern") {
        const pattern = backgroundPatterns.find(p => p.id === value.config?.pattern);
        if (pattern) {
          const slides = form.getValues("slides");
          const updatedSlides = slides.map((slide: any) => ({
            ...slide,
            backgroundImage: {
              type: ElementType.enum.Image,
              style: {
                opacity: 100
              },
              source: {
                type: ImageInputType.Url,
                src: pattern.pattern
              }
            }
          }));
          form.setValue("slides", updatedSlides);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return null;
} 