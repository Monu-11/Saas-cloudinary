import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideo } from '@/services/fetchVideo';
import { QUERY_KEYS } from '@/constants';
import { Video } from '@/types';
import { toast } from 'react-toastify';

const useGetVideo = () => {
  const { data, isError, isLoading, isSuccess } = useQuery<Video[]>({
    queryKey: [
      QUERY_KEYS.VIDEOS,
      QUERY_KEYS.VIDEO_UPLOAD,
      QUERY_KEYS.DELETE_VIDEO,
    ],
    queryFn: fetchVideo,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Fetch Video Failed');
    }
  }, [isError]);

  return {
    data,
    isError,
    isLoading,
    isSuccess,
  };
};
export default useGetVideo;
