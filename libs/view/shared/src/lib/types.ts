import { ComponentType } from 'react';
import { AnyRender } from './render-types';

const viewTag = {
  layer: 'view:layer',
  surface: 'view:surface',
  scene: 'view:scene'
};

type ViewLayerTypeTag = 'view:layer'
type ViewSurfaceTypeTag = 'view:surface'
type ViewSceneTypeTag = 'view:scene'
type AnyViewTag = ViewLayerTypeTag | ViewSurfaceTypeTag | ViewSceneTypeTag

type View = {
  type: AnyViewTag,
  resizable: string, // ('x' | 'y' | 'z')[]
  rotatable: string, //string[]
  unlisted: boolean // TODO: move to entity
  components: {
    [render in AnyRender]: ComponentType
  }
}

// ---

export {
  viewTag,
  ViewLayerTypeTag,
  ViewSurfaceTypeTag,
  ViewSceneTypeTag,
  AnyViewTag,
  View
};
