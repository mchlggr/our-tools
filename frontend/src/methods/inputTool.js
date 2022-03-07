import {multi, method} from '@arrows/multimethod'
import produce from "immer";

const inputSelect = (tool, model, content, e) => produce(model, (draft) => {
    const {selection} = draft
    return null
})

const inputTool = multi(
    (tool) => tool,
    method("tool:select", inputSelect),
    method((tool, model, content, e) => null)
)

export default inputTool