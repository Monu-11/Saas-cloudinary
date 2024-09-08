import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-screen items-center justify-center bg-base-200'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-primary'>404</h1>
        <h2 className='mt-4 text-4xl font-semibold text-base-content'>
          Page Not Found
        </h2>
        <p className='mt-2 text-base-content'>
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className='mt-6'>
          <Link href='/'>
            <button className='btn btn-primary btn-md'>Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
