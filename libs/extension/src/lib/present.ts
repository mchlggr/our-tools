import { isEmpty } from 'lodash';

// ---

const isPresent = (v: unknown): boolean => !isEmpty(v)

// ---

export { isPresent }
