export const socialFormats = {
  'Instagram Square (1:1)': { width: 1080, height: 1080, aspectRatio: '1:1' },
  'Instagram Portrait (4:5)': { width: 1080, height: 1350, aspectRatio: '4:5' },
  'Twitter Post (16:9)': { width: 1200, height: 675, aspectRatio: '16:9' },
  'Twitter Header (3:1)': { width: 1500, height: 500, aspectRatio: '3:1' },
  'Facebook Cover (205:78)': { width: 820, height: 312, aspectRatio: '205:78' },
};

export const QUERY_KEYS = {
  IMAGE_UPLOAD: 'ImageUpload',
  VIDEO_UPLOAD: 'VideoUpload',
  VIDEOS: 'Videos',
  DELETE_VIDEO: 'deleteVideo',
};

export interface videoUploadFormProps {
  title: string;
  description?: string;
  file: File;
  originalSize: string;
}

//max file size of 60 mb

export const MAX_FILE_SIZE = 70 * 1024 * 1024;
