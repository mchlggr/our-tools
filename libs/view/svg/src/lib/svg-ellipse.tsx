/* eslint-disable-next-line */
import { cnLayer } from './classNames';
import { ViewEllipseProps } from '@our-tools/view-shared';
import {
  fillColor,
  strokeColor,
  strokeDashArray,
  strokeDashOffset,
  strokeLineCap,
  strokeLineJoin,
  strokeMiterLimit, strokeOpacity, strokeWidth
} from '@our-tools/world-shared';

export function SvgEllipse(props: ViewEllipseProps) {
  const { pts: [p1, p2], stroke, fill } = props;

  return (
    <>
      <ellipse
        cx={(p1.x + p2.x) / 2}
        cy={(p1.y + p2.y) / 2}
        rx={Math.abs(p2.x - p1.x) / 2}
        ry={Math.abs(p2.y - p1.y) / 2}
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

export default SvgEllipse;
