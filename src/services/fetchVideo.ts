import axios from 'axios';

export const fetchVideo = async () => {
  try {
    const response = await axios.get('/api/videos');

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
