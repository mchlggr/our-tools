import {multi, method} from '@arrows/multimethod'
import produce from "immer";
import {findSelected} from "./overlapLayer";
import {filterLayers} from "../selectors/layer";
import {set, update} from 'lodash'
import {emptyObject} from "../utils/empty";
import newLayer from "./newLayer";

const clickSelect = (tool, model, point, e) => produce(model, (draft) => {
    const {entities, selection} = draft
    const multiSelect = e.shiftKey
    const layers = filterLayers(entities)

    const layer = findSelected(layers, point)
    const {uuid} = layer || emptyObject

    // Poor man's pattern matching
    switch (true) {
        case layer && multiSelect && selection.has(uuid) : {
            selection.delete(uuid)
            break;
        }
        case layer && multiSelect && !selection.has(uuid) : {
            selection.add(uuid)
            break;
        }
        case layer && !multiSelect : {
            set(draft, "selection", new Set([uuid]))
            break;
        }
        case !layer && !multiSelect && selection.size > 0: {
            set(draft, "selection", new Set([]))
            break;
        }
        case !layer && !multiSelect && selection.size === 0: {
            // This will avoid a use-less re-render
            return null
        }
    }
})

const clickNewLayer = (tool, model, point, e) => produce(model, (draft) => {
    const {tool} = draft
    const instance = newLayer(tool, point, point)
    const {uuid} = instance

    set(draft, "selection", new Set([uuid]))
    update(draft, "entities", (entities) => ([instance, ...entities]))
})

const clickLayer = (tool, model, point, e) => produce(model, (draft) => {
    // Avoids use-less re-rendering
    return null
})

const clickTool = multi(
    (tool) => tool,
    method('tool:select', clickSelect),
    method('tool:rectangle', clickLayer),
    method('tool:line', clickLayer),
    method('tool:text', clickNewLayer),
    method('tool:path', clickLayer),
    method((tool, model, point, e) => null)
)

export default clickTool