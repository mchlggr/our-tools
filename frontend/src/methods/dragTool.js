import {multi, method} from '@arrows/multimethod'
import produce from "immer";
import {filterLayers, filterSelectionLayers} from "../selectors/layer";
import {find, set, update, each, isEqual, map, isEmpty, size, every} from "lodash";
import moveLayer from "./moveLayer";
import {filterSelected, findSelected} from "./overlapLayer";
import {emptyArray, emptyObject} from "../utils/empty";
import newLayer from "./newLayer";
import {nanoid} from "@reduxjs/toolkit";

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


const dragSelect = (tool, model, p1, p2, e, path = emptyArray) => produce(model, (draft) => {
    const {selection, entities} = draft

    const delta = {x: p2.x - p1.x, y: p2.y - p1.y}
    const duplicate = e.altKey
    const lasso = path.map(({x, y}) => [x, y]) // Converted to different format for 'point-in-polygon'
    const multiSelect = size(lasso) > 1

    const allLayers = filterLayers(entities)
    const selectedLayer = findSelected(allLayers, p1)

    // TODO: passing NOWHERE here is a little weird, perhaps there is a better way?
    const lassoedLayers = multiSelect ? filterSelected(allLayers, NOWHERE, lasso) : []

    const alreadyLassoed = every(lassoedLayers, ({uuid}) => selection.has(uuid))
    const alreadySelected = !!selectedLayer ? selection.has(selectedLayer.uuid) : false

    // Poor man's pattern matching
    switch (true) {
        case !selectedLayer && !isEmpty(lassoedLayers) && !alreadyLassoed && multiSelect: {
            each(lassoedLayers, ({uuid}) => selection.add(uuid))
            break;
        }
        case !!selectedLayer && alreadySelected: { //|| selection.size > 0
            moveSelection(draft, delta, duplicate)
            break;
        }
        case !!selectedLayer && !alreadySelected: {
            // set(draft, "selection", new Set(map(selectedLayers, "uuid")))
            // each(selectedLayers, layer => moveLayer(layer, delta))
            set(draft, "selection", new Set([selectedLayer.uuid]))
            moveLayer(selectedLayer, delta)
            break;
        }
        default: {
            // This will avoid a use-less re-render
            return null
        }
    }
})

const dragNewLayer = (tool, model, p1, p2, e, path) => produce(model, (draft) => {
    if (!isEqual(p1, p2)) {
        const {tool} = draft
        const instance = newLayer(tool, p1, p2, path)
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
    method('tool:path', dragNewLayer),
    method((tool, model, p1, p2, e) => null)
)

export default dragTool