import {multi, method} from "@arrows/multimethod";
import produce from "immer";
import {reject, update} from "lodash";

const deleteSelect = (tool, model, e) => produce(model, (draft) => {
    const {selection} = draft
    if (selection.size > 0) {
        update(draft, "entities", (entities) => reject(entities, ({uuid}) => selection.has(uuid)))
    } else {
        // Avoid use-less re-rendering
        return null
    }
})


const deleteTool = multi(
    (tool) => tool,
    method("tool:select", deleteSelect),
    method((tool, model) => null)
)

export default deleteTool