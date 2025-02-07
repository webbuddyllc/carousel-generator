import { NextResponse } from 'next/server';
import { generateDalleImage, ImagePrompt } from '@/lib/services/dalle-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, style, mood } = body as ImagePrompt;

    if (!type) {
      return NextResponse.json(
        { error: 'Image type is required' },
        { status: 400 }
      );
    }

    const imageUrl = await generateDalleImage({ type, style, mood });

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Error in generate-image API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 