import { WorldModel } from '@penumbra/world-shared';
import { chain } from 'lodash';


// const mapEntitites = (entities, fn) => chain(entities)
//   .map(fn)
//   .flatten()
//   .compact()
//   .value()
//
// const entityDim = (attributes, certainAttr, pathAttr, boundaryAttr1, boundaryAttr2) => {
//     let dims = compact(attributes)
//     if (certainAttr) {
//         dims = [...dims, ...dims.map(d => d + certainAttr)]
//     }
//     if (pathAttr) {
//         dims.push(...pathAttr.map(attr => attr))
//     }
//     if (boundaryAttr1 && boundaryAttr2) {
//         dims.push(...[boundaryAttr1, boundaryAttr2])
//     }
//     return dims
// }

// const boundary = ({ entities }: WorldModel) => {
// const longitudes = mapEntitites(entities, en)
//
// }

const change = (model: WorldModel, draft: WorldModel) => {
  const changedEntities = model.entities !== draft.entities
  const changedFacets = model.entities !== draft.entities
  const hasChanged = changedEntities || changedFacets

  // if(hasChanged) {
  // } else {
  //   // In place
  //
  // }
}
