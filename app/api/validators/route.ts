import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.solanabeach.io/v1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!process.env.SOLANA_BEACH_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  const headers = {
    'Authorization': `Bearer ${process.env.SOLANA_BEACH_API_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    const endpoint = type === 'all' ? '/validators/all' : '/validators/top';
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch validators' },
      { status: 500 }
    );
  }
} 