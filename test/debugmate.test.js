import Debugmate from '../src/debugmate';
import { Context } from '../src/context';

jest.mock('../src/context');

describe('Debugmate', () => {
  let debugmate;

  beforeEach(() => {
    Debugmate.instance = null;

    debugmate = new Debugmate({
      domain: 'https://test.debugmate.com',
      token: 'test-token',
      enabled: true,
    });
  });

  test('constructor initializes with correct values', () => {
    expect(debugmate.domain).toBe('https://test.debugmate.com');
    expect(debugmate.token).toBe('test-token');
    expect(debugmate.enabled).toBe(true);
    expect(debugmate.context).toBeInstanceOf(Context);
  });

  test('setUser calls context.setUser', () => {
    const user = { id: 1, name: 'Test User' };
    debugmate.setUser(user);
    expect(debugmate.context.setUser).toHaveBeenCalledWith(user);
  });

  test('setEnvironment calls context.setEnvironment', () => {
    const environment = { environment: 'test', debug: true };
    debugmate.setEnvironment(environment);
    expect(debugmate.context.setEnvironment).toHaveBeenCalledWith(environment);
  });

  test('setRequest calls context.setRequest', () => {
    const request = { method: 'GET', params: {} };
    debugmate.setRequest(request);
    expect(debugmate.context.setRequest).toHaveBeenCalledWith(request);
  });

  test('isPublishingAllowed returns false when conditions are not met', () => {
    debugmate.enabled = false;
    expect(debugmate.isPublishingAllowed(new Error())).toBe(false);
  });

  test('payload returns correct structure', () => {
    const error = new Error('Test error');
    const request = { method: 'GET', params: {} };
    const payload = debugmate.payload(error, request);

    expect(payload).toHaveProperty('exception');
    expect(payload).toHaveProperty('message');
    expect(payload).toHaveProperty('file');
    expect(payload).toHaveProperty('type');
    expect(payload).toHaveProperty('trace');
  });
});