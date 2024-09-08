export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import {
  cloudinary,
  checkCloudinaryCredentials,
} from '@/utils/cloudinaryConfig';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkCloudinaryCredentials()) {
      return NextResponse.json(
        { error: 'Cloudinary credentials not found' },
        { status: 500 }
      );
    }

    // Parse the request body as JSON
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID Not Provided' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: 'video' },
        (error, result) => {
          if (error) reject(error);
          else resolve();
        }
      );
    });

    // Delete from Prisma database
    await prisma.video.deleteMany({
      where: { publicId },
    });

    return NextResponse.json(
      { message: 'Video deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Video Deletion failed', error);
    return NextResponse.json(
      { error: 'Video Deletion Failed' },
      { status: 500 }
    );
  }
}
