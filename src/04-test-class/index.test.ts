// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeAll(() => {
    account = getBankAccount(0);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(0);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(1);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const transferAccount = new BankAccount(0);
    expect(() => {
      account.transfer(1, transferAccount);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(1, account);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(10);
    expect(account.getBalance()).toBe(10);
  });

  test('should withdraw money', () => {
    account.withdraw(5);
    expect(account.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const transferAccount = new BankAccount(0);
    account.transfer(1, transferAccount);
    expect(transferAccount.getBalance()).toBe(1);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
