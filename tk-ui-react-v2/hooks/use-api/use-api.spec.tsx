import { renderHook, waitFor } from '@testing-library/react';
import { useApi, ApiQueryClientProvider, ApiError } from './use-api.js';

it('should provide acquired data when no error occurred', async () => {
  const wrapper = ({ children }) => (
    <ApiQueryClientProvider>{children}</ApiQueryClientProvider>
  )
  const mockResponse = new Response(JSON.stringify({ data: 'mock data' }), { status: 200 })
  const { result } = renderHook(() => useApi('dataKey1', () => Promise.resolve(mockResponse)), { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false))
  await waitFor(() => expect(result.current.isError).toBe(false))
  await waitFor(() => expect(result.current.apiError).toBe(null))
  await waitFor(() => expect(result.current.data).toEqual({ data: 'mock data' }))
})

it('should return apiError when getting server error response', async () => {
  const wrapper = ({ children }) => (
    <ApiQueryClientProvider>{children}</ApiQueryClientProvider>
  )
  const mockResponse = new Response(JSON.stringify({ error: 'mock error' }), { status: 500 })
  const apiError = new ApiError()
  apiError.response = mockResponse
  const { result } = renderHook(() => useApi('dataKey2', () => Promise.resolve(mockResponse)), { wrapper })
  await waitFor(() => expect(result.current.isLoading).toBe(false))
  await waitFor(() => expect(result.current.isError).toBe(true))
  await waitFor(() => expect(result.current.apiError).toEqual(apiError))
  await waitFor(() => expect(result.current.apiError.response.data).toEqual({ error: 'mock error' }))
  await waitFor(() => expect(result.current.data).toBe(undefined))
})

it('should return error when getting network error', async () => {
  const wrapper = ({ children }) => (
    <ApiQueryClientProvider>{children}</ApiQueryClientProvider>
  )
  /**
   * fetch() rejected when getting... AbortError / NotAllowedError / new Response gets TypeError / NetworkError
   * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions
   */
  const { result } = renderHook(() => useApi('dataKey3', () => Promise.reject()), { wrapper })
  await waitFor(() => expect(result.current.isLoading).toBe(false))
  await waitFor(() => expect(result.current.isError).toBe(true))
  await waitFor(() => expect(result.current.apiError).toBe(undefined))
  await waitFor(() => expect(result.current.data).toBe(undefined))
})

it('should return loading states when fetching', async () => {
  const wrapper = ({ children }) => (
    <ApiQueryClientProvider>{children}</ApiQueryClientProvider>
  )
  const { result } = renderHook(() => useApi('dataKey3', () => new Promise(() => {})), { wrapper })
  await waitFor(() => expect(result.current.isLoading).toBe(true))
  await waitFor(() => expect(result.current.isError).toBe(false))
  await waitFor(() => expect(result.current.apiError).toBe(undefined))
  await waitFor(() => expect(result.current.data).toBe(undefined))
})
