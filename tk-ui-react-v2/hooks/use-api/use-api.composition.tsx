import { useState } from 'react';
import { useApi, ApiQueryClientProvider } from './use-api.js';

function MyComponent() {
  const [postId, setPostId] = useState<number>(1)
  const { isLoading, data, isError, apiError } = useApi(['dataKey', { postId }], () => fetch(`https://jsonplaceholder.typicode.com/posts/${postId ?? ''}`));
  return (
    <div>
      <button onClick={() => setPostId(id => id + 1)}>Next post</button>
      {isLoading && <span>Loading...</span>}
      {isError && <span>Got an error.</span>}
      {apiError && <span>{apiError.response.data}</span>}
      {data?.title && <h3>{data.title}</h3>}
      {data?.body && <p>{data.body}</p>}
    </div>
  );
}

export function Wrapper() {
  return (
    <ApiQueryClientProvider>
      <MyComponent />
    </ApiQueryClientProvider>
  )
}
