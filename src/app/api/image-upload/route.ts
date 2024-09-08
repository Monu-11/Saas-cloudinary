export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import {
  checkCloudinaryCredentials,
  cloudinary,
} from '@/utils/cloudinaryConfig';
import { auth } from '@clerk/nextjs/server';

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const file = (formData.get('file') as File) || null;

    if (!file) {
      return NextResponse.json({ error: 'File Not Found' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStrem = cloudinary.uploader.upload_stream(
          { folder: 'next-cloudinary-images-uploads' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStrem.end(buffer);
      }
    );

    return NextResponse.json(
      {
        public_id: result.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Image Upload failed', error);
    return NextResponse.json({ error: 'Upload Image Failed' }, { status: 500 });
  }
}
