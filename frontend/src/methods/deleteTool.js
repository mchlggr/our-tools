import {multi, method} from "@arrows/multimethod";
import produce from "immer";
import {reject, update} from "lodash";

const deleteSelection = (tool, model, e) => produce(model, (draft) => {
    const {selection} = draft
    if (selection.size > 0) {
        update(draft, "entities", (entities) => reject(entities, ({uuid}) => selection.has(uuid)))
        draft.selection = new Set([])
    } else {
        // Avoid use-less re-rendering
        return null
    }
})


const deleteTool = multi(
    (tool) => tool,
    method("tool:select", deleteSelection),
    method("tool:rectangle", deleteSelection),
    method("tool:ellipse", deleteSelection),
    method("tool:line", deleteSelection),
    method("tool:text", deleteSelection),
    method("tool:path", deleteSelection),
    method((tool, model) => null)
)

export default deleteTool