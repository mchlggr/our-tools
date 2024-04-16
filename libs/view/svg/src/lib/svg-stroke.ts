import {
  strokeColor,
  strokeDashArray,
  strokeDashOffset,
  StrokeFacet,
  strokeLineCap,
  strokeLineJoin, strokeMiterLimit, strokeOpacity, strokeWidth
} from '@our-tools/world-shared';

// ---

const svgStroke = (stroke: StrokeFacet) => {
  console.log("strokeColor(stroke)", strokeColor(stroke))
  return {
    stroke: strokeColor(stroke),
    strokeDasharray: strokeDashArray(stroke),
    strokeDashoffset: strokeDashOffset(stroke),
    strokeLinecap: strokeLineCap(stroke),
    strokeLinejoin: strokeLineJoin(stroke),
    strokeMiterlimit: strokeMiterLimit(stroke),
    strokeOpacity: strokeOpacity(stroke),
    strokeWidth: strokeWidth(stroke)
  };
};

// ---

export { svgStroke }
