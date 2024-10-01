import setupGlobalErrorHandlers from '../src/errorHandler';

describe('setupGlobalErrorHandlers', () => {
  let mockDebugmate;
  let originalAddEventListener;
  let originalRemoveEventListener;

  beforeEach(() => {
    mockDebugmate = {
      publish: jest.fn(),
    };

    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  test('sets up global error handlers', () => {
    const handlers = setupGlobalErrorHandlers(mockDebugmate);

    expect(typeof window.onerror).toBe('function');
    expect(window.addEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));

    expect(typeof handlers.cleanupErrorHandlers).toBe('function');
  });

  test('cleanup removes global error handlers', () => {
    const handlers = setupGlobalErrorHandlers(mockDebugmate);
    handlers.cleanupErrorHandlers();

    expect(window.onerror).toBeNull();
    expect(window.removeEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
  });
});