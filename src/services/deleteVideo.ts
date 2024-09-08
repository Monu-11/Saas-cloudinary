import axios from 'axios';

export const deleteVideo = async (publicId: string) => {
  const response = await axios.delete('/api/delete-video', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      publicId,
    },
  });

  return response.data;
};
