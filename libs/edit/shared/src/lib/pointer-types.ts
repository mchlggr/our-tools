import { ModelTransaction, Point2D, Time1D, UnknownToolTag, WorldModel } from '@penumbra/world-shared';

type PointerState = {
  // active: boolean,
  down: Point2D,
  up: Point2D,
  drag: Point2D,
  movement: Point2D, // TODO: rename to delta?
  time: Time1D,
  path: Path2D,
}

interface PointerFunction {
  (evt: Event, tool: UnknownToolTag, model: WorldModel, transact: ModelTransaction): void;
}

type PointerHandlers = {
  onPointerDown: PointerFunction
  onPointerMove: PointerFunction
  onPointerWheel: PointerFunction
  onPointerPinch: PointerFunction
  onPointerUp: PointerFunction
}

type PointerStore = PointerState & PointerHandlers

// ---

export {
  PointerState,
  PointerFunction,
  PointerHandlers,
  PointerStore
};
