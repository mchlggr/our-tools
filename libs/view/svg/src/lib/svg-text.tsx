import { ViewTextProps } from '@our-tools/view-shared';
import { useRef } from 'react';
import { svgFont } from './svg-font';
import { svgFill } from './svg-fill';
import { svgStroke } from './svg-stroke';


export function SvgText(props: ViewTextProps) {
  const { pts: [p1], text, font, fill, stroke } = props;
  // const textRef = useRef()
  return (
    <text
      //ref={textRef}
      //tabIndex="-1"
      x={p1.x}
      y={p1.y}
      textAnchor="left"
      {...svgFill(fill)}
      {...svgFont(font)}
      {...svgStroke(stroke)}
    >
      {text}
    </text>
  );
}

export default SvgText;
