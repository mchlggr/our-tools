import { twMerge  } from 'tailwind-merge';
import { clsx } from 'clsx';

// Types

type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

// ---

const cn = (...args: ClassValue[]) => twMerge(clsx(args))

// ---

export { cn }
