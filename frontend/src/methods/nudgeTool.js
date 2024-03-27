// Dependencies
import {multi, method} from "@arrows/multimethod";
import produce from "immer";

// Helpers
import {moveSelection} from "./dragTool";

// ---

const nudgeHand = (tool, model, direction, e, draftStage) => produce(model, (draftModel) => {

    const shove = e.shiftKey
    const force = shove ? 36 : 8

    const delta = {...direction}

    delta.x *= force
    delta.y *= force

    draftStage.center.x += delta.x
    draftStage.center.y += delta.y

    draftStage.offset.x -= delta.x
    draftStage.offset.y -= delta.y
})

const nudgeSelection = (tool, model, direction, e, draftStage) => produce(model, (draftModel) => {
    const {selection, entities} = draftModel

    const shove = e.shiftKey
    const duplicate = e.altKey
    const force = shove ? 36 : 8

    if (selection.size > 0) {

        const delta = {...direction}
        delta.x *= force
        delta.y *= force

        moveSelection(draftModel, delta, duplicate)
    } else {
        // This will avoid a use-less re-render
        return null
    }
})

const nudgeTool = multi(
    (tool) => tool,
    method('tool:hand', nudgeHand),
    method('tool:select', nudgeSelection),
    method('tool:rectangle', nudgeSelection),
    method('tool:ellipse', nudgeSelection),
    method('tool:line', nudgeSelection),
    method('tool:path', nudgeSelection),
    method((tool, model, direction, e) => null)
)


export default nudgeTool