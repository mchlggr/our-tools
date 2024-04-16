
// ---

import { Color } from './color-types';

type PatternBackgroundTypeTag = 'background:pattern'
type ImageBackgroundTypeTag = 'background:image'
type SolidBackgroundTypeTag = 'background:solid'
type ScenicBackgroundTypeTag = 'background:scenic'

type AnyBackgroundTypeTag = PatternBackgroundTypeTag | ImageBackgroundTypeTag | SolidBackgroundTypeTag

type Background = {
  type: string
}

type PatternBackground = Background & {
  patternName: string
  foregroundColor: Color
  backgroundColor: Color
  foregroundOpacity: number
}

// ---

export {
  PatternBackgroundTypeTag,
  ImageBackgroundTypeTag,
  SolidBackgroundTypeTag,
  AnyBackgroundTypeTag,
  PatternBackground,
  Background
};
