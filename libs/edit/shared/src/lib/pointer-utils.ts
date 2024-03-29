import { PointerFunction, PointerStore, StageStore } from '@penumbra/edit-shared';
import {  Point2D } from '@penumbra/world-shared';

// ---


type IdentitySelector = (pointer: PointerStore) => PointerStore
type HandlerSelector = (pointer: PointerStore) => PointerFunction
type Path2DSelector = (pointer: PointerStore) => Point2D[]
type PointSelector = (pointer: PointerStore) => Point2D
type NumberSelector = (pointer: PointerStore) => number

// ---

type MouseStageTransform = (evt: MouseEvent, stage: StageStore) => Point2D

// ---

export const getPointer: IdentitySelector = (pointer) => pointer;

export const getPointerDown: PointSelector = ({ down }) => down;
export const getPointerDownX: NumberSelector = ({ down: { x } }) => x;
export const getPointerDownY: NumberSelector = ({ down: { y } }) => y;

export const getPointerUp: PointSelector = ({ up }) => up;
export const getPointerUpX: NumberSelector = ({ up: { x } }) => x;
export const getPointerUpY: NumberSelector = ({ up: { y } }) => y;

export const getPointerDrag: PointSelector = ({ drag }) => drag;
export const getPointerDragX: NumberSelector = ({ drag: { x } }) => x;
export const getPointerDragY: NumberSelector = ({ drag: { y } }) => y;

export const getPointerPath: Path2DSelector = ({ path }) => path;

export const getMousePos: MouseStageTransform = (e, { offset, center }) => {
  e.preventDefault(); // Skip if selection exempt "design-layer"
  // const offset = e.target.getBoundingClientRect()
  const x = e.clientX - offset.x; //- offset.left
  const y = e.clientY - offset.y; //- offset.top
  return {
    x: 8 * Math.round(x / 8),
    y: 8 * Math.round(y / 8)
  };
};

export const getOnPointerDown: HandlerSelector = ({ onPointerDown }) => onPointerDown
export const getOnPointerMove: HandlerSelector = ({ onPointerMove }) => onPointerMove
export const getOnPointerWheel: HandlerSelector = ({ onPointerWheel }) => onPointerWheel
export const getOnPointerPinch: HandlerSelector = ({ onPointerPinch }) => onPointerPinch
export const getOnPointerUp: HandlerSelector = ({ onPointerUp }) => onPointerUp
