import { AnyFontFacet } from '@our-tools/world-shared';


const fontSize = (font: AnyFontFacet) => {
  const { size: { type, value } } = font;
  switch (type) {
    case 'font-unit:pt': {
      return `${value}pt`;
    }
    case 'font-unit:inch': {
      return `${value}in`;
    }
    case 'font-unit:px': {
      return `${value}px`;
    }
  }
};

const fontWeight = (font: AnyFontFacet) => {
  const { weight: { type } } = font
  switch (type) {
    case "font-weight:bold":
      return "bold"
    case "font-weight:italic":
      return "italic"
    case "font-weight:regular":
       return "regular"
  }
};

const fontFamily = (font: AnyFontFacet) => {
  return "Helvetica"
}

const fontColor = (font: AnyFontFacet) => {
  return font.color.value
}


const svgFont = (font: AnyFontFacet) => {
  return {
    fontSize: fontSize(font),
    fontWeight: fontWeight(font),
    fontFamily: fontFamily(font),
  };
};

// ---

export {
  svgFont
};
