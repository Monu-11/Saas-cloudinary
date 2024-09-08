import axios from 'axios';

export const fetchVideo = async () => {
  const response = await axios.get('/api/videos');

  return response.data;
};
