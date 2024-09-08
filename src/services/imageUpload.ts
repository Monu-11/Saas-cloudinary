import axios from 'axios';

export const imageUpload = async (formData: File) => {
  const response = await axios.post('/api/image-upload', formData);

  return response.data;
};
