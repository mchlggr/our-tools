import { values } from 'lodash';

const colorTag: Record<string, AnyColorTypeTag> = {
  hsa: 'color:hsa',
  rgb: 'color:rgb',
  hex: 'color:hex',
  named: 'color:named'
};

type HSAColorTypeTag = 'color:hsa'
type RGBColorTypeTag = 'color:rgb'
type HEXColorTypeTag = 'color:hex'
type NamedColorTypeTag = 'color:named'
type AnyColorTypeTag = HSAColorTypeTag | RGBColorTypeTag | HEXColorTypeTag | NamedColorTypeTag
type Color = { type: AnyColorTypeTag, value: string }

const isColor = ({ type }: Color): boolean => {
  return values(colorTag).includes(type);
};

// ---

export {
  colorTag,
  HSAColorTypeTag,
  RGBColorTypeTag,
  HEXColorTypeTag,
  NamedColorTypeTag,
  AnyColorTypeTag,
  Color,
  isColor
};
