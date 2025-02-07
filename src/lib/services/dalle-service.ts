import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ImagePrompt = {
  type: 'wellness' | 'meditation' | 'mental-health';
  style?: 'natural' | 'artistic' | 'minimal';
  mood?: 'calm' | 'energetic' | 'peaceful';
};

const PROMPT_TEMPLATES = {
  wellness: {
    natural: {
      calm: "A serene natural setting showing wellness and self-care, soft natural lighting, calming colors, person practicing mindfulness",
      energetic: "A vibrant outdoor scene with people engaging in wellness activities, bright natural lighting",
      peaceful: "A tranquil wellness scene in nature, gentle morning light, soft pastel colors"
    },
    artistic: {
      calm: "An artistic interpretation of wellness and self-care, abstract elements, soothing color palette",
      energetic: "A dynamic artistic composition representing wellness and vitality, vibrant colors",
      peaceful: "An artistic wellness scene with flowing elements, soft edges, peaceful atmosphere"
    },
    minimal: {
      calm: "A minimalist wellness scene, clean lines, plenty of white space, subtle elements",
      energetic: "A minimal composition showing wellness activities, bold simple shapes",
      peaceful: "A simple and clean wellness setting, minimal elements, peaceful composition"
    }
  },
  meditation: {
    natural: {
      calm: "A person meditating in a natural setting, soft lighting, peaceful environment",
      energetic: "A meditation scene at sunrise, dynamic natural lighting, energizing atmosphere",
      peaceful: "A serene meditation scene in nature, gentle lighting, tranquil setting"
    },
    artistic: {
      calm: "An artistic interpretation of meditation, flowing abstract elements, calming colors",
      energetic: "A creative composition of meditation and energy, dynamic artistic elements",
      peaceful: "An artistic meditation scene with gentle flowing elements, peaceful colors"
    },
    minimal: {
      calm: "A minimalist meditation scene, simple shapes, plenty of negative space",
      energetic: "A minimal composition of meditation, bold geometric elements",
      peaceful: "A clean and simple meditation setting, minimal design elements"
    }
  },
  'mental-health': {
    natural: {
      calm: "A natural scene representing mental well-being, soft colors, gentle elements",
      energetic: "A bright and uplifting natural scene showing mental wellness",
      peaceful: "A peaceful natural setting representing mental health and balance"
    },
    artistic: {
      calm: "An artistic interpretation of mental wellness, abstract calming elements",
      energetic: "A creative composition representing mental health and vitality",
      peaceful: "An artistic scene of mental well-being, peaceful flowing elements"
    },
    minimal: {
      calm: "A minimalist scene representing mental health, clean simple elements",
      energetic: "A minimal composition showing mental wellness, bold simple shapes",
      peaceful: "A simple and clean scene representing mental well-being"
    }
  }
};

export async function generateDalleImage(prompt: ImagePrompt): Promise<string | null> {
  try {
    const style = prompt.style || 'natural';
    const mood = prompt.mood || 'calm';
    
    const promptTemplate = PROMPT_TEMPLATES[prompt.type][style][mood];
    const fullPrompt = `${promptTemplate}, professional photography, high quality, 16:9 aspect ratio`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: fullPrompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      style: "natural"
    });

    return response.data[0].url || null;
  } catch (error) {
    console.error('Error generating DALL-E image:', error);
    return null;
  }
} 