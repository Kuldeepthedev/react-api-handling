import React from 'react';
import { useGet, usePost, usePut, useDelete } from 'your-library'; // Import your custom hooks

const MyComponent = () => {
  // Example usage of useGet hook
  const { data, error, isLoading } = useGet('https://your-secure-api.com/api/data');

  // Example usage of usePost hook
  const { mutate: postData, data: postDataResponse, error: postDataError, isLoading: isPosting } = usePost('https://your-secure-api.com/api/post');

  // Example usage of usePut hook
  const { mutate: putData, data: putDataResponse, error: putDataError, isLoading: isPutting } = usePut('https://your-secure-api.com/api/put');

  // Example usage of useDelete hook
  const { mutate: deleteData, data: deleteDataResponse, error: deleteDataError, isLoading: isDeleting } = useDelete('https://your-secure-api.com/api/delete');

  if (isLoading || isPosting || isPutting || isDeleting) return <p>Loading...</p>;
  if (error || postDataError || putDataError || deleteDataError) return <p>Error: {error?.message || postDataError?.message || putDataError?.message || deleteDataError?.message}</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => postData({ name: 'New Item' })}>Post Data</button>
      <button onClick={() => putData({ id: 1, name: 'Updated Item' })}>Put Data</button>
      <button onClick={() => deleteData({ id: 1 })}>Delete Data</button>
    </div>
  );
};

export default MyComponent;
