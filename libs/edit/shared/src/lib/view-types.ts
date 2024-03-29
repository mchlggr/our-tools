import { Boundary, Point2D } from '@penumbra/world-shared';

// ---

type ViewState = {
  viewport: { width: number, height: number }
  setViewport: (target: EventTarget) => void
  boundary: Boundary,
  minZoom: number,
  maxZoom: number,
  zoom: number,
  scale: number,
  offset: Point2D,
  origin: Point2D,
  wheel: number,
  center: Point2D, // TODO: is this still needed
}

type ViewHanlders = {
  viewZoomInc: (inc: number) => void
  viewZoomTo: (v: number) => void
  viewMove: ({ x, y }: Point2D) => void
  viewMoveTo: ({ x, y }: Point2D) => void
}

type ViewStore = ViewState & ViewHanlders

// ---

export { ViewStore };
