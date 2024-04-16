/* eslint-disable-next-line */
import { svgStroke } from './svg-stroke';
import { ViewPencileProps } from '@our-tools/view-shared';
import { Path2D } from '@our-tools/world-shared';

//TODO: extract to util lib/file
export const roughPathD = (pts: Path2D) => pts.reduce((acc, curr) => {
  const { x, y } = curr;
  acc += `${x} ${y} `;
  return acc;
}, 'M');


export function SvgPencil(props: ViewPencileProps) {
  const { pts, stroke } = props;
  return (
    <path
      fill={'none'}
      d={roughPathD(pts)}
      {...svgStroke(stroke)}
    />
  );
}

export default SvgPencil;
