import Link from 'next/link';

const Page = async () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600'>
      <div className='animate-fade-in text-center'>
        <h1 className='mb-8 animate-pulse text-5xl font-bold text-white'>
          Welcome to Our Website
        </h1>
        <h2 className='mb-8 text-3xl font-semibold text-white opacity-90'>
          Convert images for social media & compress videos
        </h2>
        <div className='space-x-4'>
          <Link href={'/home'}>
            <button className='btn btn-primary btn-lg animate-bounce'>
              Dashboard
            </button>
          </Link>
          <Link href={'/sign-in'}>
            <button className='btn btn-secondary btn-lg transition duration-300 ease-in-out hover:scale-110'>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
