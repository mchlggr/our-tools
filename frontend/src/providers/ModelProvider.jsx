import React, {memo, useEffect, useMemo} from 'react';
import {connect} from "react-redux";
import {selectActiveModel} from "../selectors/design";
import {useImmer} from "use-immer";
import ModelContext from "../contexts/ModelContext";

const mapStateToProps = (state) => {
    const currentModel = selectActiveModel(state)
    return {
        currentModel
    }
}


const ModelProvider = (props) => {
    const {currentModel, children} = props

    const [nextModel, renderModel] = useImmer(undefined)

    useEffect(() => {
        if (nextModel !== undefined) {
            renderModel(currentModel)
        }
    }, [currentModel])

    const viewModel = nextModel || currentModel

    // TODO: maybe try splitting this up into 2 different contexts (viewModelContext, renderModelContext)
    const contextValue = useMemo(() => {
        return {viewModel, renderModel}
    }, [viewModel, renderModel])

    return (
        <ModelContext.Provider value={contextValue}>
            {children}
        </ModelContext.Provider>
    );
}

ModelProvider.propTypes = {};

const NextModelProviderMemo = memo(ModelProvider)
NextModelProviderMemo.displayName = "ModelProvider"

export default connect(mapStateToProps)(NextModelProviderMemo);