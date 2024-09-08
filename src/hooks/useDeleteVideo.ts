'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteVideo } from '@/services/deleteVideo';
import { QUERY_KEYS } from '@/constants';

const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  const { mutate, data } = useMutation({
    mutationFn: (publicId: string) => deleteVideo(publicId),
    onSuccess: () => {
      // Invalidate the fetchVideo query to refetch the video list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VIDEOS],
      });

      toast.success('Video Deleted Successfully');
    },
    onError: () => {
      toast.error('Delete Action Failed');
    },
  });

  return {
    deleteVideo: mutate,
  };
};

export default useDeleteVideo;
