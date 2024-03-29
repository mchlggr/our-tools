import { nanoid } from 'nanoid';

// ---

const uuid = (type:string) => `${type}_:${nanoid()}`

// ---

export { uuid };
