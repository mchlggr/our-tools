import { typeOf } from './type-of';
import 'jest';

describe('typeOf function tests', () => {
  it('should return "string" when input is of type string', () => {
    expect(typeOf('hello')).toBe('string');
  });

  it('should return "number" when input is of type number', () => {
    expect(typeOf(123)).toBe('number');
  });

  it('should return "boolean" when input is of type boolean', () => {
    expect(typeOf(true)).toBe('boolean');
  });

  it('should return "object" when input is of type object', () => {
    expect(typeOf({})).toBe('object');
  });

  it('should return "array" when input is of type array', () => {
    expect(typeOf([])).toBe('array');
  });

  it('should return "null" when input is null', () => {
    expect(typeOf(null)).toBe('null');
  });

  it('should return "undefined" when input is undefined', () => {
    expect(typeOf(undefined)).toBe('undefined');
  });
});
