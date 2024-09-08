export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(videos, {
      status: 201,
      statusText: 'Fetch Video Successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error in fetching video' },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
