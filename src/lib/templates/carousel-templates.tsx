import { CommonSlideSchema } from "../validation/slide-schema";
import { z } from "zod";
import { ImageInputType, ObjectFitType } from "../validation/image-schema";
import { ElementType } from "../validation/element-type";

export type CarouselTemplate = {
  id: string;
  name: string;
  description: string;
  category: "Product" | "Portfolio" | "Testimonial" | "Gallery" | "Story" | "Wellness" | "Mental Health";
  slides: z.infer<typeof CommonSlideSchema>[];
  thumbnail?: string;
};

// Enhanced image placeholders with better default styling
const DEFAULT_PRODUCT_IMAGE = {
  type: "ContentImage" as const,
  style: { opacity: 100, objectFit: "Cover" as const },
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/product.jpg"
  }
};

const DEFAULT_HERO_IMAGE = {
  type: "ContentImage" as const,
  style: { opacity: 100, objectFit: "Cover" as const },
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/hero.jpg"
  }
};

const DEFAULT_PORTFOLIO_IMAGE = {
  type: "ContentImage" as const,
  style: { opacity: 100, objectFit: "Cover" as const },
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/portfolio.jpg"
  }
};

const DEFAULT_TESTIMONIAL_IMAGE = {
  type: "ContentImage" as const,
  style: { opacity: 100, objectFit: "Cover" as const },
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/avatar.jpg"
  }
};

const DEFAULT_EMPTY_BACKGROUND = {
  type: "Image" as const,
  style: { opacity: 15 }, // Subtle background
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/pattern.jpg"
  }
};

const DEFAULT_WELLNESS_IMAGE = {
  type: "ContentImage" as const,
  style: { opacity: 100, objectFit: "Cover" as const },
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/wellness-placeholder.jpg",
    generatePrompt: {
      type: "wellness",
      style: "natural",
      mood: "peaceful"
    }
  }
};

const DEFAULT_MEDITATION_IMAGE = {
  type: "ContentImage" as const,
  style: { opacity: 100, objectFit: "Cover" as const },
  source: {
    type: ImageInputType.Url,
    src: "/placeholders/meditation-placeholder.jpg",
    generatePrompt: {
      type: "meditation",
      style: "minimal",
      mood: "calm"
    }
  }
};

export const carouselTemplates: CarouselTemplate[] = [
  {
    id: "modern-product",
    name: "Modern Product Showcase",
    description: "A modern, clean design for showcasing products with style",
    category: "Product",
    slides: [
      {
        elements: [
          {
            type: "Title",
            text: "Experience Innovation",
            style: { fontSize: "Large", align: "Left" }
          },
          {
            type: "Subtitle",
            text: "Discover our latest collection",
            style: { fontSize: "Medium", align: "Left" }
          },
          DEFAULT_HERO_IMAGE,
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 10 }
        }
      },
      {
        elements: [
          {
            type: "Title",
            text: "Premium Quality",
            style: { fontSize: "Large", align: "Center" }
          },
          DEFAULT_PRODUCT_IMAGE,
          {
            type: "Description",
            text: "Crafted with precision and care",
            style: { fontSize: "Medium", align: "Center" }
          }
        ],
        backgroundImage: DEFAULT_EMPTY_BACKGROUND
      },
      {
        elements: [
          {
            type: "Title",
            text: "Key Features",
            style: { fontSize: "Medium", align: "Left" }
          },
          {
            type: "Description",
            text: "• Premium Materials\n• Sustainable Design\n• Lifetime Warranty\n• Expert Craftsmanship",
            style: { fontSize: "Medium", align: "Left" }
          },
          DEFAULT_PRODUCT_IMAGE
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 5 }
        }
      }
    ]
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Showcase your creative work with impact",
    category: "Portfolio",
    slides: [
      {
        elements: [
          {
            type: "Title",
            text: "Creative Vision",
            style: { fontSize: "Large", align: "Center" }
          },
          {
            type: "Description",
            text: "Transforming ideas into reality",
            style: { fontSize: "Medium", align: "Center" }
          },
          DEFAULT_HERO_IMAGE
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 8 }
        }
      },
      {
        elements: [
          DEFAULT_PORTFOLIO_IMAGE,
          {
            type: "Title",
            text: "Project Spotlight",
            style: { fontSize: "Large", align: "Left" }
          },
          {
            type: "Description",
            text: "Award-winning design that captures attention",
            style: { fontSize: "Medium", align: "Left" }
          }
        ],
        backgroundImage: DEFAULT_EMPTY_BACKGROUND
      }
    ]
  },
  {
    id: "impact-story",
    name: "Impact Story",
    description: "Tell your story with impact and emotion",
    category: "Story",
    slides: [
      {
        elements: [
          {
            type: "Title",
            text: "Making a Difference",
            style: { fontSize: "Large", align: "Center" }
          },
          DEFAULT_HERO_IMAGE,
          {
            type: "Description",
            text: "Our journey of positive change",
            style: { fontSize: "Medium", align: "Center" }
          }
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 12 }
        }
      },
      {
        elements: [
          {
            type: "Title",
            text: "Our Impact",
            style: { fontSize: "Large", align: "Left" }
          },
          {
            type: "Description",
            text: "• 1M+ Lives Touched\n• 100+ Communities Served\n• 50+ Countries Reached",
            style: { fontSize: "Medium", align: "Left" }
          }
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 8 }
        }
      }
    ]
  },
  {
    id: "testimonial-gallery",
    name: "Testimonial Gallery",
    description: "Showcase reviews with style and authenticity",
    category: "Testimonial",
    slides: [
      {
        elements: [
          {
            type: "Title",
            text: "What Our Clients Say",
            style: { fontSize: "Large", align: "Center" }
          },
          {
            type: "Description",
            text: "Real stories from real customers",
            style: { fontSize: "Medium", align: "Center" }
          }
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 10 }
        }
      },
      {
        elements: [
          DEFAULT_TESTIMONIAL_IMAGE,
          {
            type: "Description",
            text: "The attention to detail and quality of service exceeded all our expectations. Truly remarkable!",
            style: { fontSize: "Medium", align: "Center" }
          },
          {
            type: "Title",
            text: "Sarah Johnson",
            style: { fontSize: "Small", align: "Center" }
          },
          {
            type: "Description",
            text: "CEO, Innovation Labs",
            style: { fontSize: "Small", align: "Center" }
          }
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 5 }
        }
      }
    ]
  },
  {
    id: "mental-health-journey",
    name: "Mental Health Journey",
    description: "Empower your inner journey with mindfulness and self-care practices",
    category: "Mental Health",
    slides: [
      {
        elements: [
          {
            type: "Title",
            text: "Mental Health and Self-Care",
            style: { fontSize: "Medium", align: "Left" }
          },
          {
            type: "Description",
            text: "Nurturing Your Mind, Body, and Soul for Inner Peace",
            style: { fontSize: "Small", align: "Left" }
          },
          DEFAULT_WELLNESS_IMAGE,
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 8 }
        }
      },
      {
        elements: [
          {
            type: "Title",
            text: "Mindfulness Meditation",
            style: { fontSize: "Medium", align: "Center" }
          },
          DEFAULT_MEDITATION_IMAGE,
          {
            type: "Description",
            text: "Practice mindful meditation to reduce stress and increase self-awareness.",
            style: { fontSize: "Small", align: "Center" }
          }
        ],
        backgroundImage: DEFAULT_EMPTY_BACKGROUND
      },
      {
        elements: [
          {
            type: "Title",
            text: "Daily Self-Care Practices",
            style: { fontSize: "Small", align: "Left" }
          },
          {
            type: "Description",
            text: "• Morning Meditation - 10 minutes\n• Mindful Movement\n• Gratitude Journaling\n• Digital Detox Time\n• Evening Reflection",
            style: { fontSize: "Small", align: "Left" }
          },
          DEFAULT_WELLNESS_IMAGE
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 5 }
        }
      }
    ]
  },
  {
    id: "wellness-journey",
    name: "Wellness Journey",
    description: "Guide for holistic wellness and mindful living",
    category: "Wellness",
    slides: [
      {
        elements: [
          {
            type: "Title",
            text: "Your Wellness Journey",
            style: { fontSize: "Medium", align: "Center" }
          },
          DEFAULT_WELLNESS_IMAGE,
          {
            type: "Description",
            text: "Embark on a transformative journey to holistic well-being",
            style: { fontSize: "Small", align: "Center" }
          }
        ],
        backgroundImage: {
          ...DEFAULT_EMPTY_BACKGROUND,
          style: { opacity: 10 }
        }
      },
      {
        elements: [
          {
            type: "Title",
            text: "Mindful Living Practices",
            style: { fontSize: "Small", align: "Left" }
          },
          {
            type: "Description",
            text: "• Mindful Breathing\n• Present Moment Awareness\n• Body Scan Meditation\n• Walking Meditation\n• Mindful Eating",
            style: { fontSize: "Small", align: "Left" }
          },
          DEFAULT_MEDITATION_IMAGE
        ],
        backgroundImage: DEFAULT_EMPTY_BACKGROUND
      }
    ]
  }
]; 