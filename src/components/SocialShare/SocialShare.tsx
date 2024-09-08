'use client';

import { useEffect, useRef, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import useImageUpload from '@/hooks/useImageUpload';
import { socialFormats } from '@/constants';
import { SocialFormat } from './types';
import { toast } from 'react-toastify';

const SocialShare = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    'Instagram Square (1:1)'
  );
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [formData, setFormData] = useState<File | null>(null);

  const { data, isError, isLoading, isSuccess } = useImageUpload(
    formData as File
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData as unknown as File);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Image uploaded Successfully');
    }
    if (isError) {
      toast.error('Image uploaded Failed');
      setUploadedImage(null);
    }
    if (data) {
      setUploadedImage(data.public_id);
      setFormData(null);
    }
  }, [data, isError, isSuccess]);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, '_')
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className='container mx-auto max-w-4xl p-4'>
      <h1 className='mb-6 text-center text-3xl font-bold'>
        Social Media Image Creator
      </h1>

      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title mb-4'>Upload an Image</h2>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Choose an image file</span>
            </label>
            <input
              type='file'
              onChange={handleFileUpload}
              className='file-input file-input-bordered file-input-primary w-full'
            />
          </div>

          {isLoading && !isError && (
            <div className='mt-4'>
              <progress className='progress progress-primary w-full'></progress>
            </div>
          )}

          {uploadedImage && (
            <div className='mt-6'>
              <h2 className='card-title mb-4'>Select Social Media Format</h2>
              <div className='form-control'>
                <select
                  className='select select-bordered w-full'
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div className='relative mt-6'>
                <h3 className='mb-2 text-lg font-semibold'>Preview:</h3>
                <div className='flex justify-center'>
                  {isTransforming && (
                    <div className='absolute inset-0 z-10 flex items-center justify-center bg-base-100 bg-opacity-50'>
                      <span className='loading loading-spinner loading-lg'></span>
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes='100vw'
                    alt='transformed image'
                    crop='fill'
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity='auto'
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className='card-actions mt-6 justify-end'>
                <button className='btn btn-primary' onClick={handleDownload}>
                  Download for {selectedFormat}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
