import { parse } from '../src/stackTraceParser';

describe('parse', () => {
  test('returns empty sources and stack for error without stack', () => {
    const error = new Error('Test error');
    error.stack = undefined;

    const result = parse(error);

    expect(result).toEqual({ sources: [], stack: '' });
  });

  test('parses stack trace correctly', () => {
    const error = new Error('Test error');
    error.stack = `Error: Test error
    at Object.<anonymous> (/path/to/file.js:1:1)
    at Module._compile (internal/modules/cjs/loader.js:1137:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)`;

    const result = parse(error);

    expect(result.sources).toHaveLength(3);
    expect(result.sources[0]).toEqual({
      function: 'Object.<anonymous>',
      file: '/path/to/file.js',
      line: '1',
      column: '1',
    });
    expect(result.stack).toBe(error.stack);
  });
});