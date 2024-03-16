import { renderHook, waitFor } from '@testing-library/react';
import { useApi, ApiQueryClientProvider } from './use-api.js';

it('should get data', async () => {
  const wrapper = ({ children }) => (
    <ApiQueryClientProvider>{children}</ApiQueryClientProvider>
  )

  const { result } = renderHook(() => useApi('dataKey', () => Promise.resolve('mock data')), { wrapper });

  await waitFor(() => expect(result.current.data).toBe('mock data'))
})
