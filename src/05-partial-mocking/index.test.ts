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

describe('partial mocking', () => {
  console.log = jest.fn();

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    partialModule.mockOne();
    partialModule.mockTwo();
    partialModule.mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    partialModule.unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
