import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { backgroundPatterns } from "../customization/background-patterns";

export function usePatternHandler() {
  const form = useFormContext();

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "config.pattern") {
        const pattern = backgroundPatterns.find(p => p.id === value.config?.pattern);
        if (pattern) {
          const slides = form.getValues("slides");
          const updatedSlides = slides.map(slide => ({
            ...slide,
            backgroundImage: {
              ...slide.backgroundImage,
              source: {
                ...slide.backgroundImage?.source,
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