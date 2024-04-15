import { nanoid } from 'nanoid';

// ---

const uuid = (type:string):string => `${type}:${nanoid()}`

// ---

export { uuid };
