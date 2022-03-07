import {multi, method} from "@arrows/multimethod";
import produce from "immer";
import {moveSelection} from "./dragTool";


const nudgeSelection = (tool, model, direction, e) => produce(model, (draft) => {
    debugger
    const {selection, entities} = draft

    if (selection.size > 0) {
        const shove = e.shiftKey
        const duplicate = e.altKey

        const force = shove ? 36 : 8

        const delta = {...direction}
        delta.x *= force
        delta.y *= force

        moveSelection(draft, delta, duplicate)
    } else {
        // This will avoid a use-less re-render
        return null
    }
})

const nudgeTool = multi(
    (tool) => tool,
    method('tool:select', nudgeSelection),
    method('tool:rectangle', nudgeSelection),
    method('tool:ellipse', nudgeSelection),
    method('tool:line', nudgeSelection),
    method('tool:path', nudgeSelection),
    method((tool, model, direction, e) => null)
)


export default nudgeTool