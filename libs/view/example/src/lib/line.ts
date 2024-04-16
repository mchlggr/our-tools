import { ViewLineProps } from '@our-tools/view-shared';
import { userColors } from './user';

const lineIdA = 'line:706-f1uK5vHoTtHafvHYR'

const viewLineNormal: ViewLineProps = {
  type: "layer:line",
  id: lineIdA,
  facets: ['fill', 'stroke'],
  pts: [{ x: 10, y: 10 }, { x: 50, y: 20 }],
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
  viewLineNormal
}
