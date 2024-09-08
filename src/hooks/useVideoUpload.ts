import { useQuery } from '@tanstack/react-query';
import { videoUpload } from '@/services/videoUpload';
import { QUERY_KEYS, videoUploadFormProps } from '@/constants';

const useVideoUpload = (formData: videoUploadFormProps) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.VIDEO_UPLOAD],
    queryFn: () => videoUpload(formData),
    enabled: !!formData,
  });

  return {
    data,
    isError,
    isLoading,
    isSuccess,
  };
};
export default useVideoUpload;
