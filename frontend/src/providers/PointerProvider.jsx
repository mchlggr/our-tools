import React, {memo, useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useImmer} from "use-immer";
import {getMousePos} from "../selectors/pointer";
import PointerContext from "../contexts/PointerContext";
import {isEqual, throttle} from "lodash";
import {connect, useDispatch, useSelector} from "react-redux";
import {selectActiveModel} from "../selectors/design";
import {useContextSelector} from "use-context-selector";
import ModelContext from "../contexts/ModelContext";
import {designCommit} from "../actions/design";
import dragTool from "../methods/dragTool";
import clickTool from "../methods/clickTool";
import {original} from "immer";

const mapStateToProps = (state) => {
    const currentModel = selectActiveModel(state)
    return {currentModel}
}

const PointerProvider = (props) => {
    const {children, designId, currentModel} = props

    const dispatch = useDispatch()

    //TODO: thunk pointer callbacks to improve performance and avoid USE-LESS RE-RENDERING
    const {tool} = currentModel // is current model from store

    const renderModel = useContextSelector(ModelContext, ({renderModel}) => renderModel)

    const [down, setDown] = useImmer(undefined)
    const [up, setUp] = useImmer(undefined)
    const [drag, setDrag] = useImmer(undefined)

    //TODO: const [trace, setTrace] = useImmer([])

    const onPointerDown = useCallback((e) => {
        const pos = getMousePos(e)
        setDown(pos)
    }, [setDown])

    const onPointerMove = useCallback((e) => {
        const pos = getMousePos(e)

        if (!!down && (!!drag || !isEqual(down, pos))) {
            setDrag(pos)

            const newModel = dragTool(tool, currentModel, down, pos, e)

            if (!!newModel && newModel !== currentModel) {
                renderModel(newModel)
            }
        }
    }, [down, drag, setDrag, currentModel, renderModel, tool])

    const onPointerUp = useCallback((e) => {
        const pos = getMousePos(e)
        setUp(pos)

        // Poor man's pattern matching
        switch (true) {
            case !!down && !!drag: {
                const newModel = dragTool(tool, currentModel, down, pos, e)

                if (!!newModel && newModel !== currentModel) {
                    dispatch(designCommit(newModel, {designId}))
                    renderModel(undefined)
                }
                break;
            }
            case !!down: {
                dispatch((dispatch, getState) => {
                    const model = selectActiveModel(getState())
                    const newModel = clickTool(tool, model, down, e)

                    if (!!newModel && newModel !== model) {
                        dispatch(designCommit(newModel, {designId}))
                        renderModel(undefined)
                    }
                })
                break;
            }
        }

        // Reset other pointer coordinates
        setDown(undefined)
        setDrag(undefined)
    }, [setUp, setDown, setDrag, tool, down, drag, dispatch, designId, currentModel, renderModel])

    const contextValue = useMemo(() => {
        return {
            down,
            up,
            drag,
            onPointerDown: throttle(onPointerDown, 10),
            onPointerMove: throttle(onPointerMove, 10),
            onPointerUp: throttle(onPointerUp, 10)
        }
    }, [
        down,
        up,
        drag,
        onPointerDown,
        onPointerMove,
        onPointerUp
    ])


    return (
        <PointerContext.Provider value={contextValue}>
            {children}
        </PointerContext.Provider>
    );
}

PointerProvider.propTypes = {};

const PointerProviderMemo = memo(PointerProvider)
PointerProviderMemo.displayName = "PointerProvider"

export default connect(mapStateToProps)(PointerProviderMemo);

//TODO: spanTo: "10px",
