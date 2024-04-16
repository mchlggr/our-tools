import { ViewRectangleProps, ViewTextProps } from '@our-tools/view-shared';
import { colorTag, fontUnitTag, fontWeightTag, uuid } from '@our-tools/world-shared';
import { userColors, userIdA } from './user';

// ---

const textIdA = 'text:706-f1uK5vHoTtHafvHYR'
const fontIdA = 'font:706-f1uK5vHoTtHafvHYR'

const strokeIdA = 'stroke:706-f1uK5vHoTtHafvHYR'
const fillIdA = 'fill:706-f1uK5vHoTtHafvHYR'

const viewTextNormal: ViewTextProps = {
  type: 'layer:text',
  id: textIdA,
  facets: ['font', 'fill', 'stroke'],
  pts: [{ x: 10, y: 10 }],
  text: "Hello World",
  font: {
    id: fontIdA,
    type: "font:point",
    size: { type: 'font-unit:px', value: "14" },
    weight: { type: 'font-weight:regular' },
  },
  fill: {
    id: fillIdA,
    type: 'fill:solid',
    color: { type: colorTag.named, value: 'blue' }
  },
  stroke: {
    id: strokeIdA,
    type: 'stroke:solid',
    color: { type: 'color:named', value: 'red' },
    opacity: 0.5,
    width: 1
  },
}

// ---

export {
  viewTextNormal,
  textIdA
 }
