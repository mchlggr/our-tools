import * as Y from 'yjs';
import { typeOf } from '@penumbra/extension';

import { ValueArray, ValueObject, Primitive, Value } from './types';

// ---


const isPrimitive = (v: Value): v is Primitive => {
  const t = typeOf(v);
  return t === 'string' || t === 'number' || t === 'boolean' || v === null;
};

const isValueArray = (v: Value): v is ValueArray => {
  return Array.isArray(v);
};

const isValueObject = (v: Value): v is ValueObject => {
  return !isValueArray(v) && typeOf(v) === 'object';
};

// ---

const applyValueArray = (target: Y.Array<unknown>, source: ValueArray) => {
  target.push(source.map(toYDataType));
  // operation is mutable, no need for return
};

const applyValueObject = (target: Y.Map<unknown>, source: ValueObject) => {
  for (const [k, v] of Object.entries(source)) {
    target.set(k, toYDataType(v));
  }
  // no need for return
};

// ---

const toYDataType = (v: Value) => {
  // poor man's pattern matching
  switch (true) {
    case isPrimitive(v):
      return v;
    case isValueArray(v): {
      const arr = new Y.Array();
      applyValueArray(arr, v);
      return arr;
    }
    case isValueObject(v): {
      const map = new Y.Map();
      applyValueObject(map, v);
      return map;
    }
    default:
      return undefined;
  }
};

// ---

const toPlainValue = (v: Y.Map<any> | Y.Array<any> | Value) => {
  // poor man's pattern matching
  switch (true) {
    case v instanceof Y.Map:
    case v instanceof Y.Array:
      return v.toJSON() as ValueObject | ValueArray;
    default:
      return v;
  }
};

// ---

const notImplemented = () => {
  throw new Error('Not Implemented');
};

// ---

export {
  isPrimitive,
  isValueArray,
  isValueObject,
  applyValueArray,
  applyValueObject,
  toYDataType,
  toPlainValue,
  notImplemented
};
