type Primitive = string | number | boolean | null
type Value = Primitive | ValueObject | ValueArray
type ValueObject = { [member: string]: Value }
type ValueArray = Array<Value>

// ---

type Snapshot = ValueObject | ValueArray

// ---

export {
  Primitive,
  Value,
  ValueObject,
  ValueArray,
  Snapshot
};
