import { client } from '@/lib/sanity.client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic connection
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

    console.log('Project ID:', projectId);
    console.log('Dataset:', dataset);

    // Test fetching all news
    const news = await client.fetch(`*[_type == "news"]`);
    
    // Test fetching all document types
    const allTypes = await client.fetch(`*[]{_type}`);
    const uniqueTypes = [...new Set(allTypes.map((doc: any) => doc._type))];

    return NextResponse.json({
      success: true,
      projectId,
      dataset,
      newsCount: news.length,
      news,
      availableTypes: uniqueTypes,
    });
  } catch (error) {
    console.error('Sanity test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}