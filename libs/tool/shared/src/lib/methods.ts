import { method, multi } from '@penumbra/extension';
import { WorldModel } from '@penumbra/world-shared';
import { StageStore } from '@penumbra/edit-shared';

//---

// Standard Tools
type HandTool = 'tool:hand'
type SelectTool = 'tool:select'
type RectangleTool = 'tool:rectangle'
type LineTool = 'tool:line'
type TextTool = 'tool:text'
type PencilTool = 'tool:pencil'

type AnyTool = HandTool | SelectTool | RectangleTool | LineTool | TextTool | PencilTool

interface ToolDispatch {
  (tool: AnyTool, model: WorldModel, stage: StageStore, evt: Event): AnyTool;
}

interface ToolMethod {
  (tool: AnyTool, model: WorldModel, stage: StageStore, evt: Event): WorldModel;
}

//---

const dispatch: ToolDispatch = (tool) => tool;
const fallback: ToolMethod = (_tool, model) => model;

//---

const clickTool = multi(dispatch, method(fallback));
const doubleClickTool = multi(dispatch, method(fallback));
const deleteTool = multi(dispatch, method(fallback));
const dragTool = multi(dispatch, method(fallback));
const inputTool = multi(dispatch, method(fallback));
const wheelTool = multi(dispatch, method(fallback));
const placeTool = multi(dispatch, method(fallback));
const nudgeTool = multi(dispatch, method(fallback));
const copyTool = multi(dispatch, method(fallback));
const cutTool = multi(dispatch, method(fallback));
const pasteTool = multi(dispatch, method(fallback));

//---

export {
  HandTool,
  SelectTool,
  RectangleTool,
  LineTool,
  TextTool,
  PencilTool,
  AnyTool,
  ToolDispatch,
  ToolMethod,
  clickTool,
  doubleClickTool,
  deleteTool,
  dragTool,
  inputTool,
  wheelTool,
  placeTool,
  nudgeTool,
  copyTool,
  cutTool,
  pasteTool,
  // panTool
  // pinchTool
  // shakeTool
  // voiceTool "talk voice commands"
};

