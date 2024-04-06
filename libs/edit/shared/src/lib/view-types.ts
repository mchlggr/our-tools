import { Boundary, EntityReference, Point2D } from '@penumbra/world-shared';

// ---

type ViewportState = {
  size: {
    width: number,
    height: number
  }
  target: EntityReference,
  boundary: Boundary,
  minZoom: number,
  maxZoom: number,
  zoom: number,
  scale: number,
  offset: Point2D,
  origin: Point2D,
  wheel: number,
  center: Point2D, // TODO: is this still needed?
}

type ViewHanlders = {
  setViewport: (target: EventTarget) => void
  viewZoomInc: (inc: number) => void
  viewZoomTo: (v: number) => void
  viewMove: ({ x, y }: Point2D) => void
  viewMoveTo: ({ x, y }: Point2D) => void
}

type ViewportStore = ViewportState & ViewHanlders

// ---

export { ViewportStore, ViewportState };
