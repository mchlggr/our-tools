import { method, fromMulti } from '@our-tools/extension';
import { renderEntity, RenderEntitMethod } from '@our-tools/view-shared';

// ---

const renderSvgRectangle: RenderEntitMethod = (entity, model, opts)  => {
  return <></>
};

// ---

const renderSvgEntity = fromMulti(
  method(renderSvgRectangle)
)(renderEntity)

// ---

export { renderSvgEntity, renderSvgDoc,  }

