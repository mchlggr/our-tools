import { method, multi } from '@penumbra/extension';
import { WorldModel } from '@penumbra/world-shared';
import { StageStore } from '@penumbra/edit-shared';
import { AnyToolTag } from './types';

//---

interface ToolDispatch {
  (tool: AnyToolTag, model: WorldModel, stage: StageStore, evt: Event): AnyToolTag;
}

interface ToolMethod {
  (tool: AnyToolTag, model: WorldModel, stage: StageStore, evt: Event): WorldModel;
}

//---

const dispatch: ToolDispatch = (tool /* model, stage, evt */) => tool;
const fallback: ToolMethod = (_tool, model /* stage, evt */) => model;

//---

const clickTool = multi(dispatch, method(fallback));
const doubleClickTool = multi(dispatch, method(fallback));
const tripleClickTool = multi(dispatch, method(fallback));
const middleClickTool = multi(dispatch, method(fallback));
const rightClickTool = multi(dispatch, method(fallback));
const deleteTool = multi(dispatch, method(fallback));
const dragTool = multi(dispatch, method(fallback));
const inputTool = multi(dispatch, method(fallback));
const wheelTool = multi(dispatch, method(fallback));
const placeTool = multi(dispatch, method(fallback));
const nudgeTool = multi(dispatch, method(fallback));
const copyTool = multi(dispatch, method(fallback));
const cutTool = multi(dispatch, method(fallback));
const pasteTool = multi(dispatch, method(fallback));
const tickTool = multi(dispatch, method(fallback));

//---

export {
  ToolDispatch,
  ToolMethod,
  clickTool,
  doubleClickTool,
  tripleClickTool,
  middleClickTool,
  rightClickTool,
  deleteTool,
  dragTool,
  inputTool,
  wheelTool,
  placeTool,
  nudgeTool,
  copyTool,
  cutTool,
  pasteTool,
  tickTool
  // panTool
  // pinchTool
  // shakeTool
  // voiceTool "talk voice commands"
};

