import { ViewLineProps } from '@our-tools/view-shared';

const lineIdA = 'line:706-f1uK5vHoTtHafvHYR'
const strokeIdA = 'line:706-f1uK5vHoTtHafvHYR'

const viewLineNormal: ViewLineProps = {
  type: "layer:line",
  id: lineIdA,
  facets: ['stroke'],
  pts: [{ x: 10, y: 10 }, { x: 50, y: 20 }],
  stroke: {
    id: strokeIdA,
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
  viewLineNormal
}
