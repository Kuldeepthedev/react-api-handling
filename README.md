Custom React API Library
A custom React library providing enhanced hooks for API requests. This library offers hooks for performing GET, POST, PUT, and DELETE requests with advanced features including pagination, caching, and data transformation.

Features
GET Requests: Advanced GET requests with support for multiple URLs, pagination, and caching.
POST Requests: Perform POST requests with options for optimistic updates and cache invalidation.
PUT Requests: Handle PUT requests with custom retry and caching strategies.
DELETE Requests: Support DELETE operations with similar advanced features as POST and PUT.
Customizable: Extensive options for headers, interceptors, and data transformation.
Installation
Install the library via npm or yarn:

sh
Copy code
npm install custom-library
or

sh
Copy code
yarn add custom-library
Usage
useGet
The useGet hook allows for performing GET requests with support for multiple URLs, pagination, and advanced caching.

Basic Example
jsx
Copy code
import React from 'react';
import { useGet } from 'custom-library';

const MyComponent = () => {
  const { data, isLoading, error } = useGet(
    'https://api.example.com/data',
    { param1: 'value1' },
    { 'Authorization': 'Bearer token' },
    { enabled: true }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
Advanced Example with Pagination
jsx
Copy code
import React from 'react';
import { useGet } from 'custom-library';

const PaginatedComponent = () => {
  const { data, isLoading, error, fetchData } = useGet(
    'https://api.example.com/data',
    { param1: 'value1' },
    { 'Authorization': 'Bearer token' },
    { enabled: true },
    { isInfinite: true, getNextPageParam: (lastPage) => lastPage.nextPage ?? false }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={fetchData}>Load More</button>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
};
usePost
The usePost hook allows for performing POST requests with options for optimistic updates and query invalidation.

Basic Example
jsx
Copy code
import React from 'react';
import { usePost } from 'custom-library';

const SubmitComponent = () => {
  const { submitData, isLoading, error, isSuccess } = usePost(
    'https://api.example.com/data',
    { 'Authorization': 'Bearer token' },
    'data-query-key', // Invalidate this query upon success
    {},
    {},
    {},
    (data) => console.log('Optimistic update:', data)
  );

  const handleSubmit = () => {
    submitData({ key: 'value' });
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </button>
      {isSuccess && <div>Submission successful!</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
usePut
The usePut hook allows for performing PUT requests with options similar to usePost.

Basic Example
jsx
Copy code
import React from 'react';
import { usePut } from 'custom-library';

const UpdateComponent = () => {
  const { updateData, isLoading, error, isSuccess } = usePut(
    'https://api.example.com/data/1',
    { 'Authorization': 'Bearer token' },
    'data-query-key', // Invalidate this query upon success
    {},
    {},
    {},
    (data) => console.log('Optimistic update:', data)
  );

  const handleUpdate = () => {
    updateData({ key: 'newValue' });
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={isLoading}>
        Update
      </button>
      {isSuccess && <div>Update successful!</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
useDelete
The useDelete hook allows for performing DELETE requests with support for optimistic updates and query invalidation.

Basic Example
jsx
Copy code
import React from 'react';
import { useDelete } from 'custom-library';

const DeleteComponent = () => {
  const { delete: deleteData, isLoading, error, isSuccess } = useDelete(
    'https://api.example.com/data/1',
    { 'Authorization': 'Bearer token' },
    'data-query-key', // Invalidate this query upon success
    {},
    {},
    {},
    () => console.log('Optimistic update: item deleted')
  );

  const handleDelete = () => {
    deleteData();
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isLoading}>
        Delete
      </button>
      {isSuccess && <div>Deletion successful!</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
API
useGet(apiUrlsWithEndpoints, params, headers, queryOptions, paginationOptions, cacheOptions, interceptors, transformData, retryOptions)
Parameters:
apiUrlsWithEndpoints (string | string[]): The URL(s) for the API including the endpoint(s).
params (Object): Optional query parameters.
headers (Object): Optional headers.
queryOptions (Object): Optional configuration for the query.
paginationOptions (Object): Options for pagination or infinite queries.
cacheOptions (Object): Custom cache and stale time options.
interceptors (Object): Request and response interceptors.
transformData (function): Function to transform or normalize the fetched data.
retryOptions (Object): Custom retry and backoff strategies.
Returns:
An object with:

fetchData (function): Function to trigger a refetch.
error (Error | null): Error object, if any.
isLoading (boolean): True if loading.
isSuccess (boolean): True if successful.
data (any): The fetched data.
usePost(apiUrlWithEndpoint, headers, queryKey, cacheOptions, interceptors, retryOptions, optimisticUpdate)
Parameters:
apiUrlWithEndpoint (string): The URL for the API including the endpoint.
headers (Object): Optional headers.
queryKey (string | null): Query key to invalidate upon success.
cacheOptions (Object): Custom cache and stale time options.
interceptors (Object): Request and response interceptors.
retryOptions (Object): Custom retry and backoff strategies.
optimisticUpdate (function): Function for optimistic updates.
Returns:
An object with:

submitData (function): Function to trigger the POST request.
error (Error | null): Error object, if any.
isLoading (boolean): True if loading.
isSuccess (boolean): True if successful.
data (any): The response data.
usePut(apiUrlWithEndpoint, headers, queryKey, cacheOptions, interceptors, retryOptions, optimisticUpdate)
Parameters:
apiUrlWithEndpoint (string): The URL for the API including the endpoint.
headers (Object): Optional headers.
queryKey (string | null): Query key to invalidate upon success.
cacheOptions (Object): Custom cache and stale time options.
interceptors (Object): Request and response interceptors.
retryOptions (Object): Custom retry and backoff strategies.
optimisticUpdate (function): Function for optimistic updates.
Returns:
An object with:

updateData (function): Function to trigger the PUT request.
error (Error | null): Error object, if any.
isLoading (boolean): True if loading.
isSuccess (boolean): True if successful.
data (any): The response data.
useDelete(apiUrlWithEndpoint, headers, queryKey, cacheOptions, interceptors, retryOptions, optimisticUpdate)
Parameters:
apiUrlWithEndpoint (string): The URL for the API including the endpoint.
headers (Object): Optional headers.
queryKey (string | null): Query key to invalidate upon success.
cacheOptions (Object): Custom cache and stale time options.
interceptors (Object): Request and response interceptors.
retryOptions (Object): Custom retry and backoff strategies.
optimisticUpdate (function): Function for optimistic updates.
Returns:
An object with:

delete (function): Function to trigger the DELETE request.
error (Error | null): Error object, if any.
isLoading (boolean): True if loading.
isSuccess (boolean): True if successful.
data (any): The response data.
Contributing
If you'd like to contribute to the library, follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
