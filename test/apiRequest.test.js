import { apiRequest } from '../src/apiRequest.js';
import apiClient from '../src/apiClient.js';

jest.mock('../src/apiClient.js');

describe('apiRequest', () => {
  it('should return data on success', async () => {
    apiClient.mockResolvedValue({ data: { success: true } });
    
    const result = await apiRequest('GET', '/endpoint');
    expect(result.data).toEqual({ success: true });
    expect(result.error).toBeNull();
  });

  it('should return error on failure', async () => {
    apiClient.mockRejectedValue({ response: { data: 'Error occurred' } });
    
    const result = await apiRequest('GET', '/endpoint');
    expect(result.data).toBeNull();
    expect(result.error).toEqual('Error occurred');
  });
});
