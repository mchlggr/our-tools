import { ViewPencileProps } from '@our-tools/view-shared';
import { userColors } from './user';

const pencilIdA = 'pencil:xf1uK5vHoTtHafvHYR-706'

const viewPencilNormal: ViewPencileProps = {
  type: "layer:pencil",
  id: pencilIdA,
  facets: ['stroke', 'path'],
  pts: [{ x: 10, y: 10 }, { x: 20, y: 20 },   { x: 30, y: 10 }, { x: 50, y: 20 }],
  path: {
    type: 'path:rough'
  },
  stroke: {
    type: 'stroke:solid',
    color: { type: 'color:named', value: 'blue' },
    opacity: 1.0,
    width: 2
  },
  // selecting: [],
  // locking: [],
  // packing: [],
  // hinting: [],
  // editing: [],
  // cropping: [],
  // focusing: [],
  // userColors
}


// ---

export {
  viewPencilNormal
}
