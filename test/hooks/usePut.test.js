import { renderHook, act } from '@testing-library/react-hooks';
import { usePut } from '../../src/hooks/usePut';
import { QueryClientProvider } from '../../src/QueryClientProvider';
import { apiRequest } from '../../src/apiRequest';

jest.mock('../../src/apiRequest');

describe('usePut', () => {
  it('should perform a put request and handle loading and error states', async () => {
    apiRequest.mockResolvedValue({ data: { success: true } });

    const { result, waitFor } = renderHook(() => usePut('https://your-secure-api.com/api/put', {}, 'cacheKey'), {
      wrapper: QueryClientProvider,
    });

    act(() => {
      result.current.mutate({ data: 'test' });
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({ success: true });
    expect(result.current.error).toBeNull();
    expect(apiRequest).toHaveBeenCalledWith('PUT', 'https://your-secure-api.com/api/put', { data: 'test' }, {}, {});
  });

  it('should handle error state', async () => {
    apiRequest.mockRejectedValue({ response: { data: 'Error occurred' } });

    const { result, waitFor } = renderHook(() => usePut('https://your-secure-api.com/api/put', {}, 'cacheKey'), {
      wrapper: QueryClientProvider,
    });

    act(() => {
      result.current.mutate({ data: 'test' });
    });

    await waitFor(() => result.current.isError);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual('Error occurred');
  });
});
