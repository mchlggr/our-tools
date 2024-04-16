/* eslint-disable-next-line */
import { svgStroke } from './svg-stroke';
import { ViewLineProps } from '@our-tools/view-shared';

export function SvgLine(props: ViewLineProps) {
  const { pts: [p1, p2], stroke } = props;

  return (
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        {...svgStroke(stroke)}
      />
  );
}

export default SvgLine;
