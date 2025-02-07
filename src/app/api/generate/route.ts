import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log('Received prompt:', prompt);

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Calling OpenAI with API key:', process.env.OPENAI_API_KEY?.slice(0, 8) + '...');
    
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 4,
      size: "1024x1024",
      response_format: "url",
    });

    console.log('OpenAI response:', response);

    return NextResponse.json({ images: response.data });
  } catch (error: any) {
    console.error('Detailed error:', error);
    console.error('Error response:', error.response?.data);
    return NextResponse.json(
      { error: error.message || 'Failed to generate images' },
      { status: 500 }
    );
  }
} 