// Deps
import { isArray, isDate, isNull } from 'lodash';

// ---

const typeOf = (value: unknown) : string => {
  switch (typeof value) {
    case 'object':
      switch (true) {
        case value instanceof Uint8Array:
          return 'bytes';
        case isDate(value):
          return 'date';
        case isNull(value):
          return 'null';
        case isArray(value):
          return 'array';
        default:
          return 'object';
      }
    case 'boolean':
      return 'boolean';
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'undefined':
      return 'undefined';
    default:
      return typeof value;
  }
};

// ---

export { typeOf };
