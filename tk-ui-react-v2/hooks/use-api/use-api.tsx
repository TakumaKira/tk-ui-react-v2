import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === 'test' ? false : undefined,
    },
  }
})

export function ApiQueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={apiQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

export class ApiErrorResponse<ErrorData extends Record<string, any> = any> extends Response {
  data?: ErrorData
}

export class ApiError<ErrorData extends Record<string, any> = any> extends Error {
  response?: ApiErrorResponse<ErrorData>
}

/**
 * A useApi React hook.
 */
export function useApi<Data extends any = any>(queryKey: string | unknown[], queryFn: () => Promise<Response>): { isLoading: boolean, isError: boolean, apiError: ApiError | null | undefined, data: Data | undefined } {
  const {
    isLoading,
    data: response,
    /**
     * `true` only when queryFn is rejected.
     * fetch() rejected when getting... AbortError / NotAllowedError / new Response gets TypeError / NetworkError
     * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions
     */
    isError: isRejected
  } = useQuery<Response, ApiError, Response, string | unknown[]>({ queryKey, queryFn })
  const isError = useMemo(() => {
    if (isRejected) {
      return true
    }
    if (!response) {
      return !isLoading
    }
    return response.status >= 400
  }, [isRejected, isLoading, response])
  const [errorData, setErrorData] = useState()
  const apiError = useMemo<ApiError | null | undefined>(() => {
    if (isLoading) {
      return undefined
    }
    if (!isError) {
      return null
    }
    if (isRejected) {
      return undefined
    }
    const apiErrorLocal = new ApiError()
    apiErrorLocal.response = response
    apiErrorLocal.response.data = errorData
    return apiErrorLocal
  }, [isError, isRejected, response, errorData])
  const [data, setData] = useState<Data | undefined>()
  useEffect(() => {
    if (!response) {
      return undefined
    }
    response.json().then(isError ? setErrorData : setData)
  }, [isError, response])
  return { isLoading, data, isError, apiError };
}
