
# react-api-handling

Prerequisites
To use the react-api-handling library, you'll need to have the following installed on your development environment:

Node.js: Ensure that Node.js (v14 or higher) is installed. This is required to run the JavaScript runtime and package manager (npm or yarn).

Download Node.js
npm or Yarn: A package manager is necessary to install the library and its dependencies. npm comes with Node.js, but you can also use Yarn if preferred.

Install npm
Install Yarn
React: The react-api-handling library is designed to work with React. Make sure you have a React project set up.

Create a React app with Create React App if you don't have a React project already.
Basic Knowledge of React: Familiarity with React and its component-based architecture will help you integrate and use this library effectively.

React Documentation
With these prerequisites in place, you’ll be ready to install and use the react-api-handling library in your React project.


## Installation

Installation
To get started with the react-api-handling library, follow these steps to install it in your React project:

Using npm
Open your terminal and navigate to your React project directory.

Install the react-api-handling library using npm:

```bash
  npm install react-api-handling
```
    
Using Yarn
Open your terminal and navigate to your React project directory.

Install the react-api-handling library using Yarn:    

```javascript
 yarn add react-api-handling
```
## Demo
## Update index.js in your react app 

```javascript 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClientProvider } from 'react-api-handling'; // Import from  library

// Wrap your App component with QueryClientProvider
ReactDOM.render(
  <QueryClientProvider>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
```
```javascript
  import { useGet } from 'react-api-handling';
```
```javascript
import React from 'react';
import { useGet } from 'react-api-handling';

const MyComponent = () => {
  const { data, error, loading } = useApi('https://api.example.com/data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
```
## Documentation

```react-api-handling``` provides custom hooks to simplify 
 API interactions in React. 
 

 This documentation covers the usage of the useGet, usePost, usePut, and useDelete hooks.

import { useDelete } from 'react-api-handling'; ```

### Function Signature 
 ```javascript 
const {
  delete,
  error,
  isLoading,
  isSuccess,
  data
} = useDelete(
  apiUrlWithEndpoint,
  headers = {},
  queryKey = null,
  cacheOptions = {},
  interceptors = {},
  retryOptions = {},
  optimisticUpdate = null
);
```

####  Parameters 

```apiUrlWithEndpoint (string)``` :  The full URL for the API including the endpoint. This is required.

```headers (Object, optional)``` : Optional headers to include in the DELETE request.

```queryKey (string | null, optional)``` : Optional query key to invalidate the cache upon a successful request. This helps keep the data in sync with the server.

```cacheOptions (Object, optional)``` : Custom options for cache and stale time. This allows fine-tuning of caching behavior.

```interceptors (Object, optional)``` : Contains request and response interceptors. Functions to modify the request before it is sent and handle the response after it is received.

```retryOptions (Object, optional)``` : Custom retry and backoff strategies. Includes:

```retryCount (number)``` : Number of retry attempts. Default is 3.

```retryDelay (number)``` : Delay between retries in milliseconds. Default is 1000.

```optimisticUpdate (function, optional)``` : Function for optimistic updates. This function will be called before the DELETE request completes to update the UI immediately.

#### Returns

The hook returns an object with the following properties:

```delete (function)``` : Function to trigger the DELETE request. Call this with the parameters needed for the request.

```error (Error | null)``` : Contains error information if the request fails.

```isLoading (boolean)``` : true if the request is in progress, otherwise false.

```isSuccess (boolean)``` : true if the request was successful, otherwise false.

```data (any)```: Response data from the API if the request was successful.

#### Example Usage 

```javascript
import React from 'react';
import { useDelete } from 'react-api-handling';

const MyComponent = () => {
  const {
    delete: deleteItem,
    error,
    isLoading,
    isSuccess,
    data
  } = useDelete(
    'https://your-secure-api.com/api/delete',
    { 'Authorization': 'Bearer token' },
    'myQueryKey',
    { staleTime: 5000 },
    {
      request: (req) => {
        // Modify request
        return req;
      },
      response: (res) => {
        // Handle response
        return res;
      }
    },
    {
      retryCount: 5,
      retryDelay: 2000
    },
    (data) => {
      // Optimistic update function
      console.log('Optimistic update:', data);
    }
  );

  if (isLoading) return <p>Deleting...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return <p>Deleted successfully! Data: {JSON.stringify(data)}</p>;

  return (
    <div>
      <button onClick={() => deleteItem({ id: 1 })}>Delete Item</button>
    </div>
  );
};

export default MyComponent;
```




```import { useGet } from 'react-api-handling'```

### Function Signature

```javascript 
 const {
  fetchData,
  error,
  isLoading,
  isSuccess,
  data
} = useGet(
  apiUrlsWithEndpoints,
  params = {},
  headers = {},
  queryOptions = {},
  paginationOptions = {},
  cacheOptions = {},
  interceptors = {},
  transformData = (data) => data,
  retryOptions = {}
); 

```


####  Parameters 

```apiUrlsWithEndpoints (string | string[])```
: The full URL or an array of URLs for the API including the endpoint(s). This is required.

```params (Object, optional)```: Optional query parameters to include in the GET request.

```headers (Object, optional)```: Optional headers to include in the GET request.

```queryOptions (Object, optional)```: Optional configuration for the query, such as enabled, refetchOnWindowFocus, etc.

```paginationOptions (Object, options```: Options for handling pagination or infinite queries. Includes:

```isInfinite (boolean)```: Whether to use infinite scrolling.

```getNextPageParam (function)```: Function to determine the next page parameter for infinite queries.

```cacheOptions (Object, optional)```: Custom cache and stale time options.

```cacheTime (number)```: Time (in milliseconds) to keep the data in cache.

```staleTime (number)```: Time (in milliseconds) after which the data is considered stale.

```interceptors (Object, optional)```: Contains request and response interceptors. Functions to modify the request before it is sent and handle the response after it is received.

```transformData (function, optional)```: Function to transform or normalize the fetched data. The function receives the data and should return the transformed data.

```retryOptions (Object, optional)```: Custom retry and backoff strategies.

```retryCount (number)```: Number of retry attempts. Default is 3.
retryDelay (number): Delay between retries in milliseconds. Default is 1000. 

#### Returns 

The hook returns an object with the following properties:

```fetchData (function)```: Function to trigger the refetch of data. This is useful for manual refreshes.

```error (Error | null)```: Contains error information if the request fails.

```isLoading (boolean)```: true if the request is in progress, otherwise false.

```isSuccess (boolean)```: true if the request was successful, otherwise false.

```data (any)```: Response data from the API if the request was successful.

#### Example Usage 

##### Single URL with Basic Query

```javascript
import React from 'react';
import { useGet } from 'react-api-handling';

const MyComponent = () => {
  const {
    fetchData,
    error,
    isLoading,
    isSuccess,
    data
  } = useGet('https://your-secure-api.com/api/data', { param1: 'value1' });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return <p>Data: {JSON.stringify(data)}</p>;

  return (
    <div>
      <button onClick={fetchData}>Refresh Data</button>
    </div>
  );
};

export default MyComponent;

```


##### Multiple URLs with Batching

```javascript
import React from 'react';
import { useGet } from 'react-api-handling';

const MyComponent = () => {
  const {
    fetchData,
    error,
    isLoading,
    isSuccess,
    data
  } = useGet(
    ['https://your-secure-api.com/api/data1', 'https://your-secure-api.com/api/data2'],
    { param1: 'value1' }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return (
    <div>
      <p>Data 1: {JSON.stringify(data[0])}</p>
      <p>Data 2: {JSON.stringify(data[1])}</p>
    </div>
  );

  return null;
};

export default MyComponent;


```

#### Infinite Query with Pagination 

```javascript 
import React from 'react';
import { useGet } from 'react-api-handling';

const MyComponent = () => {
  const {
    fetchData,
    error,
    isLoading,
    isSuccess,
    data,
  } = useGet(
    'https://your-secure-api.com/api/data',
    { param1: 'value1' },
    {},
    {},
    { isInfinite: true, getNextPageParam: (lastPage) => lastPage.nextPage }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return (
    <div>
      {data.pages.map((page, index) => (
        <div key={index}>
          {page.items.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      ))}
      <button onClick={fetchData}>Load More</button>
    </div>
  );

  return null;
};

export default MyComponent;
```




```import { usePost } from 'react-api-handling'```

### Function Signature

```javascript 
const {
  submitData,
  error,
  isLoading,
  isSuccess,
  data
} = usePost(
  apiUrlWithEndpoint,
  headers = {},
  queryKey = null,
  cacheOptions = {},
  interceptors = {},
  retryOptions = {},
  optimisticUpdate = null
);


```


####  Parameters 

```apiUrlWithEndpoint (`string`)```: The full URL for the API including the endpoint. This is required.

```headers (Object, optional)```: Optional headers to include in the POST request.

```queryKey (string | null, optional)```: Optional query key to invalidate the cache upon a successful request. This helps keep the data in sync with the server.

```cacheOptions (Object, optional)```: Custom cache and stale time options. Includes:

```cacheTime (number)```: Time (in milliseconds) to keep the data in cache.

```staleTime (number)```: Time (in milliseconds) after which the data is considered stale.

```interceptors (Object, optional)```: Contains request and response interceptors. Functions to modify the request before it is sent and handle the response after it is received.

```retryOptions (Object, optional)```: Custom retry and backoff strategies. Includes:

```retryCount (number)```: Number of retry attempts. Default is 3.

```retryDelay (number)```: Delay between retries in milliseconds. Default is 1000.

```optimisticUpdate (function, optional)```: Function for optimistic updates. This function will be called before the POST request completes to update the UI immediately.

#### Returns 

The hook returns an object with the following properties:

```submitData (function)```: Function to trigger the POST request. Call this with the data payload you want to send.

```error (Error | null)```: Contains error information if the request fails.

````isLoading (boolean)```: true if the request is in progress, otherwise false.

```isSuccess (boolean)```: true if the request was successful, otherwise false.

```data (any)```: Response data from the API if the request was successful.
#### Example Usage 

##### Basic POST Request

```javascript
import React, { useState } from 'react';
import { usePost } from 'react-api-handling';

const MyComponent = () => {
  const [formData, setFormData] = useState({ name: '' });

  const {
    submitData,
    error,
    isLoading,
    isSuccess,
    data
  } = usePost('https://your-secure-api.com/api/post', { 'Authorization': 'Bearer token' });

  const handleSubmit = async () => {
    await submitData(formData);
  };

  if (isLoading) return <p>Submitting...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return <p>Success! Data: {JSON.stringify(data)}</p>;

  return (
    <div>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ name: e.target.value })}
        placeholder="Enter name"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;

```


##### Using Optimistic Updates

```javascript
import React, { useState } from 'react';
import { usePost } from 'react-api-handling';

const MyComponent = () => {
  const [formData, setFormData] = useState({ name: '' });

  const {
    submitData,
    error,
    isLoading,
    isSuccess,
    data
  } = usePost(
    'https://your-secure-api.com/api/post',
    { 'Authorization': 'Bearer token' },
    null,
    {},
    {},
    {},
    (newData) => {
      console.log('Optimistic update:', newData);
    }
  );

  const handleSubmit = async () => {
    await submitData(formData);
  };

  if (isLoading) return <p>Submitting...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return <p>Success! Data: {JSON.stringify(data)}</p>;

  return (
    <div>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ name: e.target.value })}
        placeholder="Enter name"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;



```



```import { usePut } from 'react-api-handling'```

### Function Signature

```javascript 
const {
  updateData,
  error,
  isLoading,
  isSuccess,
  data
} = usePut(
  apiUrlWithEndpoint,
  headers = {},
  queryKey = null,
  cacheOptions = {},
  interceptors = {},
  retryOptions = {},
  optimisticUpdate = null
);


```


####  Parameters 

```apiUrlWithEndpoint (`string`)```: The full URL for the API including the endpoint. This is required.

```headers (Object, optional)```: Optional headers to include in the POST request.

```queryKey (string | null, optional)```: Optional query key to invalidate the cache upon a successful request. This helps keep the data in sync with the server.

```cacheOptions (Object, optional)```: Custom cache and stale time options. Includes:

```cacheTime (number)```: Time (in milliseconds) to keep the data in cache.

```staleTime (number)```: Time (in milliseconds) after which the data is considered stale.

```interceptors (Object, optional)```: Contains request and response interceptors. Functions to modify the request before it is sent and handle the response after it is received.

```retryOptions (Object, optional)```: Custom retry and backoff strategies. Includes:

```retryCount (number)```: Number of retry attempts. Default is 3.

```retryDelay (number)```: Delay between retries in milliseconds. Default is 1000.

```optimisticUpdate (function, optional)```: Function for optimistic updates. This function will be called before the POST request completes to update the UI immediately.

#### Returns 

The hook returns an object with the following properties:

```submitData (function)```: Function to trigger the POST request. Call this with the data payload you want to send.

```error (Error | null)```: Contains error information if the request fails.

````isLoading (boolean)```: true if the request is in progress, otherwise false.

```isSuccess (boolean)```: true if the request was successful, otherwise false.

```data (any)```: Response data from the API if the request was successful.
#### Example Usage 

##### Basic PUT Request

```javascript
import React, { useState } from 'react';
import { usePut } from 'react-api-handling;

const MyComponent = () => {
  const [formData, setFormData] = useState({ id: 1, name: '' });

  const {
    updateData,
    error,
    isLoading,
    isSuccess,
    data
  } = usePut('https://your-secure-api.com/api/put', { 'Authorization': 'Bearer token' });

  const handleSubmit = async () => {
    await updateData(formData);
  };

  if (isLoading) return <p>Updating...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return <p>Success! Data: {JSON.stringify(data)}</p>;

  return (
    <div>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter name"
      />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default MyComponent;


```


##### Using Optimistic Updates

```javascript
import React, { useState } from 'react';
import { usePut } from 'react-api-handling';

const MyComponent = () => {
  const [formData, setFormData] = useState({ id: 1, name: '' });

  const {
    updateData,
    error,
    isLoading,
    isSuccess,
    data
  } = usePut(
    'https://your-secure-api.com/api/put',
    { 'Authorization': 'Bearer token' },
    null,
    {},
    {},
    {},
    (updatedData) => {
      console.log('Optimistic update:', updatedData);
    }
  );

  const handleSubmit = async () => {
    await updateData(formData);
  };

  if (isLoading) return <p>Updating...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isSuccess) return <p>Success! Data: {JSON.stringify(data)}</p>;

  return (
    <div>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter name"
      />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default MyComponent;


```

