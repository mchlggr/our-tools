import {createAction} from "../utils/actionUtils";

export const DESIGN_COMMIT = "DESIGN_COMMIT"
export const designCommit = createAction(DESIGN_COMMIT)

export const DESIGN_UNDO = "DESIGN_UNDO"
export const designUndo = createAction(DESIGN_UNDO)

export const DESIGN_REDO = "DESIGN_REDO"
export const designRedo = createAction(DESIGN_REDO)

export const DESIGN_GO_TO = "DESIGN_GO_TO"
export const designGoTo = createAction(DESIGN_GO_TO)

export const DESIGN_SET_TOOL = "DESIGN_SET_TOOL"
export const designSetTool = createAction(DESIGN_SET_TOOL)