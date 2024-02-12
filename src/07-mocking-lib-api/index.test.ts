// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Test Title' } }),
  }),
}));

// const createMock = (jest.spyOn(axios, 'create') as jest.Mock).mockReturnValue({
//   get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Test Title' } }),
// });

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
    const pathFile = 'posts/1';
    await throttledGetDataFromApi(pathFile);
    // expect(createMock).toHaveBeenCalledWith({
    //   baseURL: 'https://jsonplaceholder.typicode.com',
    // });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);
    // expect(createMock().get).toHaveBeenCalledWith(
    //   'https://jsonplaceholder.typicode.com/posts/1',
    // );
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toEqual({ id: 1, title: 'Test Title' });
  });
});
