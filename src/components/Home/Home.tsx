'use client';

import { useCallback, useEffect } from 'react';
import useGetVideo from '@/hooks/useGetVideo';
import VideoCard from '../VideoCard';
import axios from 'axios';

const Home = () => {
  const { data, isLoading } = useGetVideo();

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.mp4`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Videos</h1>
      {data?.length === 0 ? (
        <div className='text-center text-lg text-gray-500'>
          No videos available
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {isLoading ? (
            <>
              <div className='w-100 flex flex-col gap-4'>
                <div className='skeleton h-52 w-full'></div>
                <div className='skeleton h-4 w-28'></div>
                <div className='skeleton h-8 w-full'></div>
                <div className='skeleton h-8 w-full'></div>
              </div>
            </>
          ) : (
            <>
              {data?.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onDownload={handleDownload}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
