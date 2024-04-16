import './layer.css';
import { EngagedProps, UserColorMapping, ViewLayerProps, ViewRectangleProps } from '@our-tools/view-shared';

import {
  fillColor,
  strokeColor,
  strokeDashArray,
  strokeDashOffset,
  strokeLineCap,
  strokeLineJoin,
  strokeMiterLimit, strokeOpacity, strokeWidth
} from '@our-tools/world-shared';

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

export function SvgRectangle(props: ViewRectangleProps) {
  console.assert(isRectangleLayer(props), 'Incorrect prop for react');
  // console.assert(ensureFacets(props, ), 'Incorrect prop for react');
  console.assert(isFillFacet(props.fill), 'Incorrect prop/facet for react');
  console.assert(isStrokeFacet(props.stroke), 'Incorrect prop/facet for react');

  const { pts: [p1, p2], fill, stroke } = props;

  return (<>
      <rect key={props.id}
            x={p1.x}
            y={p1.y}
            width={p2.x - p1.x}
            height={p2.y - p1.y}
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
