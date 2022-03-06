import {multi, method} from '@arrows/multimethod'
import produce from "immer";
import {filterLayers, filterSelectionLayers} from "../selectors/layer";
import {find, set, update, each, isEqual} from "lodash";
import moveLayer from "./moveLayer";
import {findSelected} from "./overlapLayer";
import {emptyObject} from "../utils/empty";
import newLayer from "./newLayer";

const dragSelect = (tool, model, p1, p2, e) => produce(model, (draft) => {
    const {selection, entities} = draft
    const delta = {x: p2.x - p1.x, y: p2.y - p1.y}

    const allLayers = filterLayers(entities)
    const layer = findSelected(allLayers, p1)
    const {uuid} = layer || emptyObject

    // Poor man's pattern matching
    switch (true) {
        case selection.has(uuid): {
            // Moves all selection layers
            const selectionLayers = filterSelectionLayers(draft)
            each(selectionLayers, (layer) => moveLayer(layer, delta))
            break;
        }
        case !!layer: {
            set(draft, "selection", new Set([uuid]))
            moveLayer(layer, delta)
            break;
        }
        default: {
            // This will avoid a use-less re-render
            return null
        }
    }
})

const dragNewLayer = (tool, model, p1, p2, e) => produce(model, (draft) => {
    // debugger
    if (!isEqual(p1, p2)) {
        const {tool} = draft
        const instance = newLayer(tool, p1, p2)
        const {uuid} = instance

        set(draft, "selection", new Set([uuid]))
        update(draft, "entities", (entities) => ([instance, ...entities]))
    }
})

const dragTool = multi(
    (tool) => tool,
    method('tool:select', dragSelect),
    method('tool:rectangle', dragNewLayer),
    method('tool:ellipse', dragNewLayer),
    method('tool:line', dragNewLayer),
    method('tool:text', dragNewLayer),
    method('tool:path', dragNewLayer),
    method((tool, model, p1, p2, e) => null)
)

export default dragTool