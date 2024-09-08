'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useVideoUpload from '@/hooks/useVideoUpload';
import { MAX_FILE_SIZE, videoUploadFormProps } from '@/constants';
import { toast } from 'react-toastify';

const VideoUpload = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formData, setFormData] = useState<videoUploadFormProps | null>(null);

  const { data, isError, isLoading, isSuccess } = useVideoUpload(
    formData as videoUploadFormProps
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      //TODO: add notification
      alert('File size too large');
      return;
    }

    const newformData = new FormData();
    newformData.append('file', file);
    newformData.append('title', title);
    newformData.append('description', description);
    newformData.append('originalSize', file.size.toString());
    setFormData(newformData as unknown as videoUploadFormProps);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Video uploaded Successfully');
    }
    if (isError) {
      toast.error('Video uploaded Failed');
    }
    if (!isError && data) {
      router.push('/');
    }
  }, [data, isError, router, isSuccess]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Upload Video</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='label'>
            <span className='label-text'>Title</span>
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered w-full'
            required
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='textarea textarea-bordered w-full'
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Video File</span>
          </label>
          <input
            type='file'
            accept='video/*'
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='file-input file-input-bordered w-full'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary' disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
