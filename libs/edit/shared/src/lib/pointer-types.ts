import { AnyTool } from '@penumbra/tool-shared';
import { ModelTransaction, Point2D, Time1D, WorldModel } from '@penumbra/world-shared';

type PointerState = {
  down: Point2D,
  up: Point2D,
  drag: Point2D,
  movement: Point2D, // TODO: rename to delta?
  time: Time1D,
  path: Path2D,
}

interface PointerFunction {
  (evt: Event, tool: AnyTool, model: WorldModel, transact: ModelTransaction): void;
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
