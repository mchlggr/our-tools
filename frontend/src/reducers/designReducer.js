import {selectActiveDesignId} from "../selectors/design";
import {emptyObject} from "../utils/empty";
import {chain, drop, update, get, compact, flatten} from "lodash";
import produce, {original, current} from "immer";
import {DESIGN_GO_TO, DESIGN_SET_TOOL} from "../actions/design";

const {DESIGN_COMMIT, DESIGN_REDO, DESIGN_UNDO} = require("../actions/design");

const emptyDesign = {
    at: 0,
    history: new Array(0),
    selection: new Set()
}

const initialDesignState = {}

const boundaryPadding = 25

const entityLatitudes = ({x, x1, x2, cx, width, path, boundary}) => {
    let dims = compact([x, x1, x2, cx])
    if (width) {
        dims = [...dims, ...dims.map(d => d + width)]
    }
    if (path) {
        dims.push(...path.map(({x}) => x))
    }
    if (boundary) {
        const {minX, maxX} = boundary
        dims.push(...[minX, maxX])
    }
    return dims
}

const entityLongitibutes = ({y, y1, y2, cy, height, path, boundary}) => {
    const dims = compact([y, y1, y2, cy])
    if (height) {
        dims.push(...dims.map(d => d + height))
    }
    if (path) {
        dims.push(...path.map(({y}) => y))
    }
    if (boundary) {
        const {minY, maxY} = boundary
        dims.push(...[minY, maxY])
    }
    return dims
}

const updateMetadata = (model) => produce(model, (draft) => {
    const {entities} = draft

    // --- Handle Bounding Box ---
    const longitudes = chain(entities)
        .map(entityLongitibutes)
        .flatten()
        .compact()
        .value()

    const latitudes = chain(entities)
        .map(entityLatitudes)
        .flatten()
        .compact()
        .value()

    const minX = Math.min(...latitudes)
    const minY = Math.min(...longitudes)

    const maxX = Math.max(...latitudes)
    const maxY = Math.max(...longitudes)

    draft.boundary = {
        minX: minX - boundaryPadding,
        minY: minY - boundaryPadding,
        maxX: maxX + boundaryPadding,
        maxY: maxY + boundaryPadding
    }
})

const designReducer = (baseState = initialDesignState, action) => {

    const {type, meta: {designId} = emptyObject} = action

    const designPath = ["byId", designId]

    switch (type) {
        // --- Core Actions ---
        case DESIGN_COMMIT: {
            const {payload: model} = action
            const design = get(baseState, designPath)
            const {at, history} = design
            const current = history[at]
            const shouldCommit = model.entities !== original(current.entities)

            return update(baseState, designPath, (design) => produce(design, (draft) => {
                const {at, history, entities} = draft
                // if (shouldCommit) {
                //     let next = updateMetadata(model)
                //
                //     // --- Handle History ---
                //     draft.history = draft.history.slice(0, at + 1)
                //     draft.history.push(next)
                //     draft.at = at + 1
                //
                //     const clip = history.length - 50
                //     if (clip > 0) {
                //         draft.history = drop(draft.history, clip)
                //         draft.at = at - clip
                //     }
                // } else {
                    // Edit history at current position
                    draft.history[at] = model
                // }
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