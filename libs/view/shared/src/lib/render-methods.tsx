import { method, multi } from '@our-tools/extension';
import { Entity, WorldModel } from '@our-tools/world-shared';
import { ReactNode } from 'react';
import { AnyRender } from './render-types';

// ---

type RenderDocOpts = {
  //TODO: background:
  //TODO: grid:
}

interface RenderDocDispatch {
  (render: AnyRender, model: WorldModel): string;
}

interface RenderDocMethod {
  (render: AnyRender, model: WorldModel): ReactNode | null;
}


const dispatchDoc: RenderDocDispatch = (render /* model */) => render
const fallbackDoc: RenderDocMethod = (render /* model */) => {
  console.error(`No Doc Render Method Found for: ${render}`);
  return null;
};

const renderDoc = multi(dispatchDoc, method(fallbackDoc));

// ---

// TODO: convert to slot params form methods if caching is needed for renderEntity methods
type RenderOpts = {
  selecting: boolean
  locking: boolean
  packing: boolean
  hinting: boolean
  editing: boolean
  cropping: boolean
  focusing: boolean
}

interface RenderEntityDispatch {
  (entity: Entity, opts: RenderOpts): string;
}

interface RenderEntityMethod {
  (entity: Entity, opts: RenderOpts): ReactNode | null;
}

// ---

const dispatchEntity: RenderEntityDispatch = (entity /* opts */) => entity.type;
const fallbackEntity: RenderEntityMethod = (entity /* opts */) => {
  console.error(`No Entity Render Method Found for: ${entity?.type}`);
  return null;
};

const renderEntity = multi(dispatchEntity, method(fallbackEntity));

// const renderEdge = multi(dispatch, method(fallback));
// TODO: this may not be necessary instead back it into "render:svg" const renderDoc = multi(dispatch, method(fallback));
// TODO: should this be moved to editor? const renderPointer = multi(dispatch, method(fallback));

// ---

export {
  renderDoc,
  renderEntity,
  // renderEdge,
  RenderEntityDispatch,
  RenderEntityMethod
};
