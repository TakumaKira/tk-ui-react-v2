import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const apiQueryClient = new QueryClient()

export function ApiQueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={apiQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

/**
 * A useApi React hook.
 */
export function useApi<Data>(queryKey: string | unknown[], queryFn: () => Promise<Data>) {
  const { isLoading, error, data } = useQuery(queryKey, queryFn)
  return { isLoading, error, data };
}
