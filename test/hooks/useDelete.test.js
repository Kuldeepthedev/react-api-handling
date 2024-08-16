import { renderHook, act } from '@testing-library/react-hooks';
import { useDelete } from '../../src/hooks/useDelete';
import { QueryClientProvider } from '../../src/QueryClientProvider';
import { apiRequest } from '../../src/apiRequest';

jest.mock('../../src/apiRequest');

describe('useDelete', () => {
  it('should perform a delete request and handle loading and error states', async () => {
    apiRequest.mockResolvedValue({ data: { success: true } });

    const { result, waitFor } = renderHook(() => useDelete('https://your-secure-api.com/api/delete', {}, 'cacheKey'), {
      wrapper: QueryClientProvider,
    });

    act(() => {
      result.current.mutate({ id: 1 });
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({ success: true });
    expect(result.current.error).toBeNull();
    expect(apiRequest).toHaveBeenCalledWith('DELETE', 'https://your-secure-api.com/api/delete', {}, {}, { id: 1 });
  });

  it('should handle error state', async () => {
    apiRequest.mockRejectedValue({ response: { data: 'Error occurred' } });

    const { result, waitFor } = renderHook(() => useDelete('https://your-secure-api.com/api/delete', {}, 'cacheKey'), {
      wrapper: QueryClientProvider,
    });

    act(() => {
      result.current.mutate({ id: 1 });
    });

    await waitFor(() => result.current.isError);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual('Error occurred');
  });
});
