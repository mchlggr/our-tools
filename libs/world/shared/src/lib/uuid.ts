import { nanoid } from 'nanoid';

// ---

const uuid = (abbreviatedType:string) => `${abbreviatedType}_${nanoid()}`

// ---

export { uuid };
