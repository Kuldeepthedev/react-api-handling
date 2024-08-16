import { renderHook, act } from '@testing-library/react';
import { useGet } from '../../src/hooks/useGet.js';
import { QueryClientProvider } from '../../src/QueryClientProvider.js';
import { apiRequest } from '../../src/apiRequest.js';

jest.mock('../../src/apiRequest.js');

describe('useGet', () => {
  it('should fetch data and handle loading and error states', async () => {
    apiRequest.mockResolvedValue({ data: { key: 'value' } });

    const { result, waitFor } = renderHook(() => useGet('https://your-secure-api.com/api/data', {}, {}, {}), {
      wrapper: QueryClientProvider,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({ key: 'value' });
    expect(result.current.error).toBeNull();
    expect(apiRequest).toHaveBeenCalledWith('GET', 'https://your-secure-api.com/api/data', {}, {}, {});
  });

  it('should handle error state', async () => {
    apiRequest.mockRejectedValue({ response: { data: 'Error occurred' } });

    const { result, waitFor } = renderHook(() => useGet('https://your-secure-api.com/api/data', {}, {}, {}), {
      wrapper: QueryClientProvider,
    });

    await waitFor(() => result.current.isError);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual('Error occurred');
  });
});
