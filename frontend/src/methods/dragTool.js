
// Dependencies
import {method, multi} from '@arrows/multimethod'
import produce from "immer";
import {each, every, isEmpty, isEqual, map, set, size, update} from "lodash";
import {nanoid} from "@reduxjs/toolkit";

// Methods
import moveLayer from "./moveLayer";
import newLayer from "./newLayer";

// Utilities
import {getMovement} from "../utils/pointUtils";
import {filterSelected, findSelected} from "./overlapLayer";
import {emptyArray} from "../utils/empty";

// Selectores
import {filterLayers, filterSelectionLayers} from "../selectors/layer";

// Debug
import {debugWatch} from "../services/debug";

// ---

export const moveSelection = (model, delta, duplicate) => {
    // Moves or duplicates and moves all selection layers
    const {entities} = model
    const selectionLayers = filterSelectionLayers(model)
    if (duplicate) {
        const newLayers = selectionLayers.map(produce((layer) => {
            layer.uuid = nanoid()
            moveLayer(layer, delta)
        }))
        set(model, "selection", new Set(map(newLayers, 'uuid')))
        entities.push(...newLayers)
    } else {
        each(selectionLayers, (layer) => moveLayer(layer, delta))
    }
}

const NOWHERE = Object.freeze({x: -9999, y: -9999})

const dragSelect = (tool, model, e, draftStage) => produce(model, (draftModel) => {
    const {down: p1, drag: p2, path = emptyArray} = draftStage

    const {selection, entities} = draftModel

    const delta = getMovement(p1, p2)
    const duplicate = e.altKey
    const lasso = path.map(({x, y}) => [x, y]) // Converted to different format for 'point-in-polygon'
    const multiSelect = size(lasso) > 1
    const newSelect = !e.shiftKey


    const allLayers = filterLayers(entities)
    const selectedLayer = findSelected(allLayers, p1)

    // TODO: passing NOWHERE here is a little weird, perhaps there is a better way?
    const lassoedLayers = multiSelect ? filterSelected(allLayers, NOWHERE, lasso) : []

    const alreadyLassoed = every(lassoedLayers, ({uuid}) => selection.has(uuid))
    const alreadySelected = !!selectedLayer ? selection.has(selectedLayer.uuid) : false

    // Poor man's pattern matching
    switch (true) {
        case !selectedLayer && !isEmpty(lassoedLayers) && !alreadyLassoed && multiSelect: {
            if (newSelect) {
                selection.clear()
            }
            each(lassoedLayers, ({uuid}) => selection.add(uuid))
            break;
        }
        case !!selectedLayer && alreadySelected: {
            moveSelection(draftModel, delta, duplicate)
            break;
        }
        case !!selectedLayer && !alreadySelected: {
            set(draftModel, "selection", new Set([selectedLayer.uuid]))
            moveLayer(selectedLayer, delta)
            break;
        }
        default: {
            // This will avoid a use-less re-render
            return null
        }
    }
})

const dragNewLayer = (tool, model, e, draftStage) => produce(model, (draftModel) => {
    const {down: p1, drag: p2, path = emptyArray} = draftStage
    if (!isEqual(p1, p2)) {
        const {tool} = draftModel
        const instance = newLayer(tool, p1, p2, path)
        const {uuid} = instance

        set(draftModel, "selection", new Set([uuid]))
        update(draftModel, "entities", (entities) => ([instance, ...entities]))
    }
})

const dragHand = (tool, model, e, draftStage) => produce(model, (draftModel) => {
    const {path, down, drag, maxZoom, minZoom, zoom, viewport: {width, height}, movement} = draftStage

    // const [p2, p1] = [...path.reverse(), drag, down]

    // console.log("d/path", window._current(path))
    console.log("d/movement", JSON.parse(JSON.stringify(movement)))
    // debugger

    const delta = getMovement(down, drag)

    draftStage.center.x = draftStage.center.x - movement.x * (0.5 / 1.0)
    draftStage.center.y = draftStage.center.y - movement.y * (0.5 / 1.0)

    draftStage.scale = Math.max(minZoom, Math.min(maxZoom, zoom)) // - wheel / wheelStep ))

    const {scale, center} = draftStage
    // console.log("num/center.x",center.x)
    // console.log("num/center.y",center.y)
    // draftStage.offset.x = (width / 2 - center.x * scale) + drag.x * scale
    // draftStage.offset.y = (height / 2 - center.y * scale) + drag.y * scale
    // draftStage.offset.x = width / 2 +  drag.x * scale
    // draftStage.offset.y = width / 2 +  drag.y * scale

    draftStage.offset.x = (width / 2 - center.x * scale)  //+ movement.x * scale
    draftStage.offset.y = (height / 2 - center.y * scale) // + movement.y * scale

})

const dragTool = multi(
    (tool) => tool,
    method('tool:hand', dragHand),
    method('tool:select', dragSelect),
    method('tool:rectangle', dragNewLayer),
    method('tool:ellipse', dragNewLayer),
    method('tool:line', dragNewLayer),
    method('tool:path', dragNewLayer),
    method((tool, model, p1, p2, e) => null)
)

export default dragTool