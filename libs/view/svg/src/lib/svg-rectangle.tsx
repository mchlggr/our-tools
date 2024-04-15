import './layer.css'

import { EngagedProps, UserColorMapping, ViewLayerProps, ViewRectangleProps } from '@our-tools/view-shared';
import {
  AnyLayerTypeTag,
  Color,
  colorTag, engagedKey, engagingKeys, FillFacet,
  isColor, isEngagedKey,
  isFillFacet,
  isRectangleLayer,
  isStrokeFacet, StrokeFacet, strokeTag,
  typeSuffix,
  uuid
} from '@our-tools/world-shared';
import { cn } from '@our-tools/util-css';
import { flatten, get, keys, pick } from 'lodash';
import { cnLayer } from './classNames';


const fillColor = ({ color }: FillFacet) => {
  console.assert(isColor(color));
  return color.value
}

const strokeGuard = (selector) => (stroke: StrokeFacet) => {
  // We ignore the rest of the stroke facet params for 'stroke:none'
  // Another extra effect of this is that if the user re-enables the stroke
  // There previous stroke settings will still exist and be applied again
  // This is helpful in case the user accidentally sets the stroke none
  // It also helps keep the element attributes cleaner for inspecting, debugging, etc
  if(stroke.type === strokeTag.none) {
    return undefined
  } else {
   return selector(stroke)
  }
}

const strokeColor = strokeGuard(({ color }: StrokeFacet) => {
  console.assert(isColor(color));
  return color;
})

const strokeDashArray = strokeGuard((stroke: StrokeFacet) => stroke.dashArray)
const strokeDashOffset = strokeGuard((stroke: StrokeFacet) => stroke.dashOffset)
const strokeLineCap = strokeGuard((stroke: StrokeFacet) => stroke.lineCap)
const strokeLineJoin = strokeGuard((stroke: StrokeFacet) => stroke.lineJoin)
const strokeMiterLimit = strokeGuard((stroke: StrokeFacet) => stroke.miterLimit)
const strokeOpacity = strokeGuard((stroke: StrokeFacet) => stroke.opacity)
const strokeWidth = strokeGuard((stroke: StrokeFacet) => stroke.width)

export function SvgRectangle(props: ViewRectangleProps) {
  console.assert(isRectangleLayer(props), 'Incorrect prop for react');
  // console.assert(ensureFacets(props, ), 'Incorrect prop for react');
  console.assert(isFillFacet(props.fill), 'Incorrect prop/facet for react');
  console.assert(isStrokeFacet(props.stroke), 'Incorrect prop/facet for react');

  const { fill, stroke } = props;

  return (<>
      <rect key={props.id}
            x={props.pts[0].x}
            y={props.pts[0].y}
            width={props.pts[1].x - props.pts[0].x}
            height={props.pts[1].y - props.pts[0].y}
            fill={fillColor(fill)}
            stroke={strokeColor(stroke)}
            strokeDasharray={strokeDashArray(stroke)}
            strokeDashoffset={strokeDashOffset(stroke)}
            strokeLinecap={strokeLineCap(stroke)}
            strokeLinejoin={strokeLineJoin(stroke)}
            strokeMiterlimit={strokeMiterLimit(stroke)}
            strokeOpacity={strokeOpacity(stroke)}
            strokeWidth={strokeWidth(stroke)}
            className={cnLayer(props)}
      />
      {/* TODO: <SvgAnnotations {...props}></SvgAnnotations>*/}
    </>
  );
}

export default SvgRectangle;
