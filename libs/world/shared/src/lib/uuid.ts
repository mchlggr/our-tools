import { nanoid } from 'nanoid';

// ---

const uuid = (type:string) => `${type}:${nanoid()}`

// ---

export { uuid };
