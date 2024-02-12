// Uncomment the code below and write your tests
import * as partialModule from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

const consoleLogMock = jest.spyOn(console, 'log');

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    partialModule.mockOne();
    partialModule.mockTwo();
    partialModule.mockThree();
    expect(consoleLogMock).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    partialModule.unmockedFunction();
    expect(consoleLogMock).toHaveBeenCalled();
  });
});
