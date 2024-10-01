import { Context } from '../src/context';

describe('Context', () => {
  let context;

  beforeEach(() => {
    context = new Context();
  });

  test('setError sets the error and returns this', () => {
    const error = new Error('Test error');
    const result = context.setError(error);
    expect(result).toBe(context);
    expect(context.error).toBe(error);
  });

  test('setRequest sets the request and returns this', () => {
    const request = { method: 'GET', params: {} };
    const result = context.setRequest(request);
    expect(result).toBe(context);
    expect(context.request).toBe(request);
  });

  test('setUser sets the user and returns this', () => {
    const user = { id: 1, name: 'Test User' };
    const result = context.setUser(user);
    expect(result).toBe(context);
    expect(context.user).toBe(user);
  });

  test('setEnvironment sets the environment and returns this', () => {
    const environment = { environment: 'test', debug: true };
    const result = context.setEnvironment(environment);
    expect(result).toBe(context);
    expect(context.environment).toBe(environment);
  });

  test('checkOperationSystem returns correct OS', () => {
    context.process.platform = 'win32';
    expect(context.checkOperationSystem()).toBe('Windows');

    context.process.platform = 'darwin';
    expect(context.checkOperationSystem()).toBe('Unknown');
  });

  test('payload returns combined data', () => {
    const user = { id: 1, name: 'Test User' };
    const environment = { environment: 'test', debug: true };
    context.setUser(user);
    context.setEnvironment(environment);

    const payload = context.payload();
    expect(payload).toHaveProperty('user');
    expect(payload).toHaveProperty('environment');
  });
});
