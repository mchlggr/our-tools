import {multi, method} from '@arrows/multimethod'
import produce from "immer";
import {filterLayers, filterSelectionLayers} from "../selectors/layer";
import {find, set, update, each} from "lodash";
import moveLayer from "./moveLayer";
import {findSelected} from "./overlapLayer";
import {emptyObject} from "../utils/empty";

const dragSelect = (tool, model, p1, p2, e) => produce(model, (draft) => {
    // //debugger
    const {selection, entities} = draft
    const delta = {x: p2.x - p1.x, y: p2.y - p1.y}

    const allLayers = filterLayers(entities)
    const layer = findSelected(allLayers, p1)
    const {uuid} = layer || emptyObject
    console.log("onPointerMove/dragSelect/uuid",uuid)

    // Poor man's pattern matching
    switch (true) {
        case selection.has(uuid): {
            // Moves all selection layers
            const selectionLayers = filterSelectionLayers(draft)
            each(selectionLayers, (layer) => moveLayer(layer, delta))
            break;
        }
        case !!layer: {
            //update(model)
            // debugger
            set(draft, "selection", new Set([uuid]))
            // set(draft, ["entities", 0], moveLayer(layer, delta)
            // console.log("onPointerMove/dragSelect/delta",delta)
            // console.log("onPointerMove/layer/before",JSON.parse(JSON.stringify(layer)))
            moveLayer(layer, delta)
            // console.log("onPointerMove/layer/after",JSON.parse(JSON.stringify(layer)))
            break;
        }
        default: {
            // This will avoid a use-less re-render
            return null
        }
    }
})

const dragNewLayer = (tool, model, p1, p2, e) => produce(model, (draft) => {

})

const dragTool = multi(
    (tool) => tool,
    method('tool:select', dragSelect),
    method('tool:rectangle', dragNewLayer),
    method('tool:line', dragNewLayer),
    method('tool:text', dragNewLayer),
    method('tool:path', dragNewLayer),
    method((tool, model, p1, p2, e) => null)
)

export default dragTool