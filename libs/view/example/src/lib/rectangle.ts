import { ViewRectangleProps } from '@our-tools/view-shared';
import { colorTag, uuid } from '@our-tools/world-shared';
import { userColors, userIdA } from './user';

// ---

const rectIdA = 'rect:706-f1uK5vHoTtHafvHYR'

const renderRectangleNormal: ViewRectangleProps = {
  type: 'layer:rectangle',
  id: rectIdA,
  facets: ['fill', 'stroke'],
  pts: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
  //
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
  //
  selecting: [],
  locking: [],
  packing: [],
  hinting: [],
  editing: [],
  cropping: [],
  focusing: [],
  userColors
}

// const renderRectangleSelected = (userId = userIdA) => ({
const renderRectangleSelected = ({
  ...renderRectangleNormal,
  selecting: [userIdA],
})

// ---

export {
  renderRectangleNormal,
  renderRectangleSelected,
  rectIdA
 }
