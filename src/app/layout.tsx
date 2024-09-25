import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { PublicEnvScript } from 'next-runtime-env';
import Providers from '@/context/Providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Saas Cloudinary',
  description: 'Resize and compress image or video',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <PublicEnvScript />
        <body className={inter.className}>
          <Providers>
            {children}
            <ToastContainer
              position='bottom-right'
              autoClose={10000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
