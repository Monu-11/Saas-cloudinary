import { QUERY_KEYS } from '@/constants';
import { imageUpload } from '@/services/imageUpload';
import { useQuery } from '@tanstack/react-query';

const useImageUpload = (formData: File) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.IMAGE_UPLOAD],
    queryFn: () => imageUpload(formData),
    enabled: !!formData,
  });

  return {
    data,
    isError,
    isLoading,
    isSuccess,
  };
};
export default useImageUpload;
