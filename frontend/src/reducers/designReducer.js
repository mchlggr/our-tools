import {selectActiveDesignId} from "../selectors/design";
import {emptyObject} from "../utils/empty";
import {drop, update} from "lodash";
import produce, {original} from "immer";
import {DESIGN_GO_TO} from "../actions/design";

const {DESIGN_COMMIT, DESIGN_REDO, DESIGN_UNDO} = require("../actions/design");

const emptyDesign = {
    at: 0,
    history: new Array(0),
    selection: new Set()
}

const initialDesignState = {}

const designReducer = (baseState = initialDesignState, action) => {

    const {type, meta: {designId} = emptyObject} = action

    const designPath = ["byId", designId]

    switch (type) {
        case DESIGN_COMMIT: {
            const {payload: next} = action

            return update(baseState, designPath, (design) => produce(design, (draft) => {
                const {at, history} = draft
                const current = history[at]

                if (next.entities !== original(current.entities)) {
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
        case DESIGN_GO_TO: {
            const {payload: jump} = action

            return update(baseState, designPath, (design) => produce(design, (draft) => {
                if(jump <= draft.history.length - 1) {
                    draft.at = jump
                }
            }))
        }
        default: {
            return baseState
        }
    }
}

export default designReducer