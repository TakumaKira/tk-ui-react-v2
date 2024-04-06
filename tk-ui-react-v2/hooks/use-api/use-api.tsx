import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

function isTestEnvironment() {
  return process?.env?.NODE_ENV === 'test'
}

const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isTestEnvironment() ? false : undefined,
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
    isLoading: isLoadingOriginal,
    data: response,
    /**
     * `true` only when queryFn is rejected.
     * fetch() rejected when getting... AbortError / NotAllowedError / new Response gets TypeError / NetworkError
     * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions
     */
    isError: isRejected
  } = useQuery<Response, ApiError, Response, string | unknown[]>({ queryKey, queryFn })
  const [isLoading, setIsLoading] = useState(true)
  const isError = useMemo(() => {
    if (isLoadingOriginal) {
      return false
    }
    if (isRejected) {
      setIsLoading(false)
      return true
    }
    if (!response) {
      setIsLoading(false)
      return true
    }
    if (response.status >= 400) {
      setIsLoading(false)
      return true
    }
    return false
  }, [isRejected, isLoadingOriginal, response])
  const [errorData, setErrorData] = useState()
  const apiError = useMemo<ApiError | null | undefined>(() => {
    if (isLoadingOriginal) {
      return undefined
    }
    if (isRejected) {
      return undefined
    }
    if (!isError) {
      return null
    }
    const apiErrorLocal = new ApiError()
    apiErrorLocal.response = response
    apiErrorLocal.response.data = errorData
    return apiErrorLocal
  }, [isLoadingOriginal, isError, isRejected, response, errorData])
  const [data, setData] = useState<Data | undefined>()
  useEffect(() => {
    if (!response || response.bodyUsed) {
      return
    }
    response.json()
      .then(isError ? setErrorData : setData)
      .then(() => setIsLoading(false))
  }, [isError, response])
  return { isLoading, data, isError, apiError };
}
