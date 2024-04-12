// import styled from 'tailwind';

/* eslint-disable-next-line */
// export interface SvgRectangleProps {}

// const StyledSvgRectangle = styled.div`
//   color: pink;
// `;

import { ViewRectangleProps } from '@our-tools/view-shared';
import { emptyArray } from '@our-tools/extension';

export function SvgRectangle(props: ViewRectangleProps) {
  // const {
  //   type,
  //   id,
  //   facets,
  //   x1,
  //   y1,
  //   z1,
  //   x2,
  //   y2,
  //   z2,
  //   parent: {},
  //   children: [],
  //   selecting = emptyArray,
  //   locking = emptyArray,
  //   packing = emptyArray,
  //   hinting = emptyArray,
  //   editing = emptyArray,
  //   cropping = emptyArray,
  //   focusing = emptyArray
  // } = props;

  const fill = 'blue';
  const stroke = 'red';
  return (
    <>
      <rect key={props.id}
            x={props.x1}
            y={props.y1}
            width={props.x2 - props.x1}
            height={props.x2 - props.x1}
            fill={fill}
            stroke={stroke}
        // className={layerClassNames(layer, selected)}
      />
    </>
  );
}

export default SvgRectangle;
