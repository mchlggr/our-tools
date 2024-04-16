import { FillFacet } from '@our-tools/world-shared';

// ---
const svgFill = (fill: FillFacet) => {
  return {
    fill: fill.color.value
  }
}

// ---

export { svgFill }
