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

    const [path, updatePath] = useImmer([])

    //console.log("!!!/path",path)

    const onPointerDown = useCallback((e) => {
        const pos = getMousePos(e)
        setDown(pos)
        updatePath([])
    }, [setDown, updatePath])

    const onPointerMove = useCallback((e) => {
        const pos = getMousePos(e)

        if (!!down && (!!drag || !isEqual(down, pos))) {
            setDrag(pos)

            //TODO: Check for drag distance threshold before updating path
            updatePath((draft) => void draft.push(pos))

            const newModel = dragTool(tool, currentModel, down, pos, e, path)

            if (!!newModel && newModel !== currentModel) {
                renderModel(newModel)
            }
        }
    }, [down, drag, setDrag, currentModel, renderModel, tool, path])

    const onPointerUp = useCallback((e) => {
        const pos = getMousePos(e)
        setUp(pos)

        // Poor man's pattern matching
        switch (true) {
            case !!down && !!drag: {
                const newModel = dragTool(tool, currentModel, down, pos, e, path)

                if (!!newModel && newModel !== currentModel) {
                    dispatch(designCommit(newModel, {designId}))
                    renderModel(undefined)
                }
                break;
            }
            case !!down: {
                const newModel = clickTool(tool, currentModel, down, e, path)

                if (!!newModel && newModel !== currentModel) {
                    dispatch(designCommit(newModel, {designId}))
                    renderModel(undefined)
                }
                break;
            }
        }

        // Reset other pointer coordinates
        setDown(undefined)
        setDrag(undefined)
        updatePath([])
    }, [setUp, setDown, setDrag, tool, down, drag, dispatch, designId, currentModel, renderModel, path])

    const contextValue = useMemo(() => {
        return {
            down,
            up,
            drag,
            path,
            onPointerDown: throttle(onPointerDown, 100),
            onPointerMove: throttle(onPointerMove, 100),
            onPointerUp: throttle(onPointerUp, 100)
        }
    }, [
        down,
        up,
        drag,
        path,
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
