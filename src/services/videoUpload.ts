import axios from 'axios';
import { videoUploadFormProps } from '@/constants';

export const videoUpload = async (formData: videoUploadFormProps) => {
  const response = await axios.post('/api/video-upload', formData);

  return response.data;
};
