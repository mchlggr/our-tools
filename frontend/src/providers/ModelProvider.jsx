import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {connect} from "react-redux";
import {selectActiveModel} from "../selectors/design";
import {createModelStore, useRenderModel, ModelStoreProvider} from "../contexts/modelStore";


const mapStateToProps = (state) => {
    const currentModel = selectActiveModel(state)
    return {
        currentModel
    }
}

const SetCurrentModel = connect(mapStateToProps)((props) => {
    const {currentModel} = props

    const renderModel = useRenderModel()

    useEffect(() => {
        // Resets speculative model to current model
        renderModel(currentModel)
    }, [currentModel])

    return null
})


const ModelProvider = (props) => {
    const {children} = props

    return (<>
            <ModelStoreProvider createStore={createModelStore}>
                <SetCurrentModel/>
                {children}
            </ModelStoreProvider>
        </>
    );
}

ModelProvider.propTypes = {};

const NextModelProviderMemo = memo(ModelProvider)
NextModelProviderMemo.displayName = "ModelProvider"

export default NextModelProviderMemo;