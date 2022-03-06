import {selectActiveDesignId} from "../selectors/design";
import {emptyObject} from "../utils/empty";
import {drop, update, get} from "lodash";
import produce, {original, current} from "immer";
import {DESIGN_GO_TO, DESIGN_SET_TOOL} from "../actions/design";

const {DESIGN_COMMIT, DESIGN_REDO, DESIGN_UNDO} = require("../actions/design");

const emptyDesign = {
    at: 0,
    history: new Array(0),
    selection: new Set()
}

const initialDesignState = {}

// window._original = original
// window._current = current

const designReducer = (baseState = initialDesignState, action) => {

    const {type, meta: {designId} = emptyObject} = action

    const designPath = ["byId", designId]

    switch (type) {
        // --- Core Actions ---
        case DESIGN_COMMIT: {
            const {payload: next} = action
            const design = get(baseState, designPath)
            const {at, history} = design
            const current = history[at]
            const shouldCommit = next.entities !== original(current.entities)

            return update(baseState, designPath, (design) => produce(design, (draft) => {
                const {at, history} = draft
                if (shouldCommit) {
                    draft.history = draft.history.slice(0, at + 1)
                    draft.history.push(next)
                    draft.at = at + 1

                    const clip = history.length - 50
                    if (clip > 0) {
                        draft.history = drop(draft.history, clip)
                        draft.at = at - clip
                    }
                } else {
                    // Edit history at current position
                    draft.history[at] = next
                }
            }))
        }
        case DESIGN_UNDO: {
            return update(baseState, designPath, (design) => produce(design, (draft) => {
                const {at} = draft
                if (at > 0) {
                    draft.at -= 1
                }
            }))
        }
        case DESIGN_REDO: {
            return update(baseState, designPath, (design) => produce(design, (draft) => {
                const {at, history} = draft
                if (at < history.length - 1) draft.at += 1
            }))
        }

        // --- Extra Actions ---
        case DESIGN_GO_TO: {
            const {payload: jump} = action

            return update(baseState, designPath, (design) => produce(design, (draft) => {
                if (jump <= draft.history.length - 1) {
                    draft.at = jump
                }
            }))
        }
        case DESIGN_SET_TOOL: {
            const {payload: tool} = action

            return update(baseState, designPath, (design) => produce(design, (draft) => {
                const {at, history} = draft
                const current = history[at]
                current.tool = tool
            }))
        }
        default: {
            return baseState
        }
    }
}

export default designReducer