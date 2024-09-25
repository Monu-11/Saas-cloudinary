import { v2 as cloudinary } from 'cloudinary';
import { env } from 'next-runtime-env';

const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = env('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')

cloudinary.config({
  cloud_name: "dmq9ig2eh",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function checkCloudinaryCredentials() {
  if (
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return false;
  }
  return true;
}

export { cloudinary };
