export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
// import {
//   cloudinary,
//   checkCloudinaryCredentials,
// } from '@/utils/cloudinaryConfig';
import { auth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: 'Cloudinary credentials not found' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = (formData.get('file') as File) || null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const originalSize = formData.get('originalSize') as string;

    if (!file) {
      return NextResponse.json({ error: 'File Not Found' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStrem = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'next-cloudinary-video-uploads',
            transformation: [{ quality: 'auto', fetch_format: 'mp4' }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStrem.end(buffer);
      }
    );

    const video = await prisma.video.create({
      data: {
        title,
        description,
        originalSize,
        compressedSize: String(result.bytes),
        publicId: result.public_id,
        duration: result.duration || 0,
      },
    });

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.log('Image Upload failed', error);
    return NextResponse.json({ error: 'Upload Image Failed' }, { status: 500 });
  }
}
