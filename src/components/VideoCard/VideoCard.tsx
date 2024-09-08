import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Download, Clock, FileDown, FileUp, Delete } from 'lucide-react';
import dayjs from 'dayjs';
import realtiveTime from 'dayjs/plugin/relativeTime';
import { filesize } from 'filesize';
import useDeleteVideo from '@/hooks/useDeleteVideo';
import { Video } from '@/types';

dayjs.extend(realtiveTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [previewError, setPreviewError] = useState<boolean>(false);

  const { deleteVideo } = useDeleteVideo();

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: 'fill',
      gravity: 'auto',
      format: 'jpg',
      quality: 'auto',
      assetType: 'video',
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1'],
    });
  }, []);

  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const handleDelete = () => {
    deleteVideo(video.publicId);
  };

  return (
    <div
      className='card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className='relative aspect-video'>
        {isHovered ? (
          previewError ? (
            <div className='flex h-full w-full items-center justify-center bg-gray-200'>
              <p className='text-red-500'>Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              className='h-full w-full object-cover'
              onError={handlePreviewError}
            />
          )
        ) : (
          <Image
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className='h-full w-full object-cover'
            fill={true}
            sizes='(max-width: 768px) 100vw, 33vw'
            priority={true}
          />
        )}
        <div className='absolute bottom-2 right-2 flex items-center rounded-lg bg-base-100 bg-opacity-70 px-2 py-1 text-sm'>
          <Clock size={16} className='mr-1' />
          {formatDuration(video.duration)}
        </div>
      </figure>
      <div className='card-body p-4'>
        <h2 className='card-title text-lg font-bold'>{video.title}</h2>
        <p className='mb-4 text-sm text-base-content opacity-70'>
          {video.description}
        </p>
        <p className='mb-4 text-sm text-base-content opacity-70'>
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div className='flex items-center'>
            <FileUp size={18} className='mr-2 text-primary' />
            <div>
              <div className='font-semibold'>Original</div>
              <div>{formatSize(Number(video.originalSize))}</div>
            </div>
          </div>
          <div className='flex items-center'>
            <FileDown size={18} className='mr-2 text-secondary' />
            <div>
              <div className='font-semibold'>Compressed</div>
              <div>{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <div className='text-sm font-semibold'>
            Compression:{' '}
            <span className='text-accent'>{compressionPercentage}%</span>
          </div>
          <div className='flex items-center justify-around space-x-3'>
            <button className='btn btn-error btn-sm' onClick={handleDelete}>
              <Delete size={16} />
            </button>
            <button
              className='btn btn-primary btn-sm'
              onClick={() =>
                onDownload(getFullVideoUrl(video.publicId), video.title)
              }
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
