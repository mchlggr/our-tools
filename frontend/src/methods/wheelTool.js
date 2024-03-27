import {multi, method} from '@arrows/multimethod'
import produce from "immer";

const wheelSelect = (tool, model, point, e, stage) => produce(model, (draft) => {
    //TODO: Move on pointer wheel recipe to here
    return null
})

const wheelHand = (tool, model, point, e, stage) => produce(model, (draft) => {
    //TODO: Move on pointer wheel recipe to here
    return null
})

const wheelTool = multi(
    (tool) => tool,
    method("tool:select", wheelSelect),
    method("tool:hand", wheelHand),
    method(() => null)
)

export default wheelTool