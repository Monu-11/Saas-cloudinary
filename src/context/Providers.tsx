'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      toast.error(`${error}`);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(`${error}`);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1 * 1000, // Adjust as necessary
    },
  },
});

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
