// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createMock = jest.spyOn(axios, 'create');
    (jest.spyOn(axios.Axios.prototype, 'get') as jest.Mock).mockResolvedValue({
      data: { id: 1, title: 'Test Title' },
    });
    const pathFile = 'posts/1';
    await throttledGetDataFromApi(pathFile);
    jest.runAllTimers();
    expect(createMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create');
    const getMock = (
      jest.spyOn(axios.Axios.prototype, 'get') as jest.Mock
    ).mockResolvedValue({ data: { id: 1, title: 'Test Title' } });
    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create');
    (jest.spyOn(axios.Axios.prototype, 'get') as jest.Mock).mockResolvedValue({
      data: { id: 1, title: 'Test Title' },
    });
    const relativePath = '/posts/1';
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toEqual({ id: 1, title: 'Test Title' });
  });
});
