import { parse } from '../src/stackTraceParser';

describe('parse', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });

  afterAll(() => {
    console.warn.mockRestore();
  });

  test('returns empty sources and stack for error without stack', async () => {
    const error = new Error('Test error');
    error.stack = undefined;

    const result = await parse(error);

    expect(result).toEqual([]);
  });

  test('parses stack trace correctly', () => {
    const error = new Error('Test error');
    error.stack = `Error: Test error
    at Object.<anonymous> (/path/to/file.js:1:1)
    at Module._compile (internal/modules/cjs/loader.js:1137:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)`;

    const result = parse(error);

    result.then(res => {
      expect(res.sources).toHaveLength(3);

      expect(res.sources[0]).toEqual({
        function: 'Object.<anonymous>',
        file: '/path/to/file.js',
        line: '1',
        column: '1',
      });

      expect(res.stack).toBe(error.stack);
    });
  });
});