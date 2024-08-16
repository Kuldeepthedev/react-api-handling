import { apiRequest } from '../src/apiRequest.js';
import apiClient from '../src/apiClient.js';

jest.mock('../src/apiClient.js');

describe('apiRequest', () => {
  it('should make a successful API call and return data', async () => {
    apiClient.mockResolvedValue({ data: { key: 'value' } });

    const result = await apiRequest('GET', '/api/data', {}, {}, {}, 'https://your-secure-api.com');
    
    expect(result.data).toEqual({ key: 'value' });
    expect(result.error).toBeNull();
    expect(apiClient).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://your-secure-api.com/api/data',
      data: {},
      headers: {},
      params: {},
    });
  });

  it('should handle errors from API calls', async () => {
    apiClient.mockRejectedValue({ response: { data: 'Error occurred' } });

    const result = await apiRequest('GET', '/api/data', {}, {}, {}, 'https://your-secure-api.com');
    
    expect(result.data).toBeNull();
    expect(result.error).toEqual('Error occurred');
  });
});
