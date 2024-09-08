import Link from 'next/link';

const Page = async () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600'>
      <div className='text-center'>
        <h1 className='mb-8 text-5xl font-bold text-white'>
          Welcome to Our Website
        </h1>
        <h1 className='mb-8 text-3xl font-bold text-white'>
          Convert image as social media uses and compress the video
        </h1>
        <div className='space-x-4'>
          <Link href={'/home'}>
            <button className='btn btn-primary'>Dashboard</button>
          </Link>
          <Link href={'/sign-in'}>
            <button className='btn btn-secondary'>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
