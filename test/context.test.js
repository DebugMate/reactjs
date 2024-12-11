import { Context } from '../src/context';

describe('Context', () => {
  let context;

  beforeEach(() => {
    context = new Context();
  });

  test('setError sets the error property', () => {
    const error = new Error('Test error');
    context.setError(error);
    expect(context.error).toBe(error);
  });

  test('setRequest sets the request property', () => {
    const request = { method: 'GET', params: {} };
    context.setRequest(request);
    expect(context.request).toBe(request);
  });

  test('setUser sets the user property', () => {
    const user = { id: 1, name: 'Test User' };
    context.setUser(user);
    expect(context.user).toBe(user);
  });

  test('setEnvironment sets the environment property', () => {
    const environment = { environment: 'test', debug: true };
    context.setEnvironment(environment);
    expect(context.environment).toBe(environment);
  });
});