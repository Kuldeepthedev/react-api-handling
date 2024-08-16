import React from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 2,
    },
  },
});

/**
 * Provides the QueryClient context to the React component tree.
 * @param {React.PropsWithChildren} props - The component props.
 * @returns {React.ReactElement} - The QueryClientProvider element.
 */
export const QueryClientProvider = (props) => {
  // Use React.createElement to create the ReactQueryClientProvider element
  return React.createElement(
    ReactQueryClientProvider,
    { client: queryClient },
    props.children
  );
};

export { queryClient };
