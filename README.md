
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

```javascript
  import { useGet } from 'react-api-handling';
```
```javascript
import React from 'react';
import { useApi } from 'react-api-handling';

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
