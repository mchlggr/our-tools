import React, {memo, useCallback, useMemo} from 'react';

// Dependencies
import {connect, useDispatch} from "react-redux";
import {debounce} from "lodash";

// Components
import StageDisplay from "./StageDisplay";
import StageHotkeys from "./StageHotkeys";

// Hooks
import {
    useOnPointerDown,
    useOnPointerMove,
    useOnPointerPinch,
    useOnPointerUp,
    useOnPointerWheel
} from "../contexts/pointerStore";
import {useRenderModel} from "../contexts/modelStore";

// Actions
import {designCommit} from "../actions/design";

// Selectors
import {selectActiveModel} from "../selectors/design";

// ---

export const useDispatchModel = (designId) => {
    const dispatch = useDispatch()

    return useCallback(debounce((newModel) => {
        dispatch(designCommit(newModel, {designId}))
    }, 1), [designId, dispatch])
}

const mapStateToProps = (state) => {
    const currentModel = selectActiveModel(state)
    return {currentModel}
}

const StageContainer = (props) => {
    const {designId, currentModel} = props

    const {tool} = currentModel // is current model from store

    const renderModel = useRenderModel()
    const dispatchModel = useDispatchModel(designId)

    const onPointerDown = useOnPointerDown()
    const onPointerMove = useOnPointerMove(tool, currentModel, renderModel) // speculative
    const onPointerWheel = useOnPointerWheel(tool, currentModel, renderModel) // speculative
    const onPointerPinch = useOnPointerPinch(tool, currentModel, renderModel) // speculative
    const onPointerUp = useOnPointerUp(tool, currentModel, dispatchModel) // commit

    return <>
        <StageHotkeys designId={designId}>
            <StageDisplay
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerWheel={onPointerWheel}
                onPointerPinch={onPointerPinch}
                onPointerUp={onPointerUp}
                designId={designId}
            />
        </StageHotkeys>
    </>
}


StageContainer.propTypes = {};

const StageContainerMemo = memo(StageContainer)
StageContainerMemo.displayName = "StageContainer"

export default connect(mapStateToProps)(StageContainerMemo);