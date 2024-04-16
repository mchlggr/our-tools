import { ViewEllipseProps } from '@our-tools/view-shared';
import { userColors } from '@our-tools/view-example';
import { colorTag } from '@our-tools/world-shared';

const ellipseIdA = 'ellipse:706-f1uK5vHoTtHafvHYR'

const viewEllipseNormal: ViewEllipseProps = {
  type: "layer:ellipse",
  id: ellipseIdA,
  facets: ['fill', 'stroke'],
  pts: [{ x: 10, y: 10 }, { x: 50, y: 20 }],
  fill: {
    type: 'fill:solid',
    color: { type: colorTag.named, value: 'blue' }
  },
  stroke: {
    type: 'stroke:none',
    color: { type: 'color:named', value: 'red' },
    opacity: 0.5,
    width: 0
  },
  selecting: [],
  locking: [],
  packing: [],
  hinting: [],
  editing: [],
  cropping: [],
  focusing: [],
  userColors
}


// ---

export {
  viewEllipseNormal
}
