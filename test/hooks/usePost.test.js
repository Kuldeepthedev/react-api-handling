import { renderHook, act } from '@testing-library/react-hooks';
import { usePost } from '../../src/hooks/usePost';
import { QueryClientProvider } from '../../src/QueryClientProvider';
import { apiRequest } from '../../src/apiRequest';

jest.mock('../../src/apiRequest');

describe('usePost', () => {
  it('should perform a post request and handle loading and error states', async () => {
    apiRequest.mockResolvedValue({ data: { success: true } });

    const { result, waitFor } = renderHook(() => usePost('https://your-secure-api.com/api/post', {}, 'cacheKey'), {
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
    expect(apiRequest).toHaveBeenCalledWith('POST', 'https://your-secure-api.com/api/post', { data: 'test' }, {}, {});
  });

  it('should handle error state', async () => {
    apiRequest.mockRejectedValue({ response: { data: 'Error occurred' } });

    const { result, waitFor } = renderHook(() => usePost('https://your-secure-api.com/api/post', {}, 'cacheKey'), {
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
