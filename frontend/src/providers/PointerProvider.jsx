import React, {memo, useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useImmer} from "use-immer";
import {getMousePos} from "../selectors/pointer";
import PointerContext from "../contexts/PointerContext";
import {isEqual, throttle} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveModel} from "../selectors/design";
import {useContextSelector} from "use-context-selector";
import ModelContext from "../contexts/ModelContext";
import {designCommit} from "../actions/design";
import dragTool from "../methods/dragTool";
import clickTool from "../methods/clickTool";


const PointerProvider = (props) => {
    const {children, designId} = props

    const dispatch = useDispatch()

    const model = useSelector(selectActiveModel)
    const {tool} = model // is current model from store

    const renderModel = useContextSelector(ModelContext, ({renderModel}) => renderModel)

    const [down, setDown] = useImmer(undefined)
    const [up, setUp] = useImmer(undefined)
    const [drag, setDrag] = useImmer(undefined)

    const onPointerDown = useCallback((e) => {
        const pos = getMousePos(e)
        setDown(pos)
        // console.log("onPointerDown/pos", pos)

    }, [setDown])

    const onPointerMove = useCallback((e) => {
        const pos = getMousePos(e)

        if (!!down && (!!drag || !isEqual(down, pos))) {
            setDrag(pos)

            // console.log("onPointerMove/pos", pos)
            // console.log("onPointerMove/down", down)

            const newModel = dragTool(tool, model, down, pos, e)
            if (newModel) {
                console.log("only///onPointerMove/newModel", newModel)
                renderModel(newModel)
            }
        }
    }, [down, drag, setDrag, model, renderModel, tool])

    const onPointerUp = useCallback((e) => {
        const pos = getMousePos(e)
        setUp(pos)

        // console.log("///onPointerUp/pos", pos)
        // console.log("///onPointerUp/down", down)
        // console.log("///onPointerUp/drag", drag)
        // debugger
        // Poor man's pattern matching
        switch (true) {
            case !!down && !!drag: {
                // debugger
                const newModel = dragTool(tool, model, down, pos, e)
                if (newModel) {
                    //debugger
                    console.log("only///onPointerUp/newModel/drag", newModel)
                    dispatch(designCommit(newModel, {designId}))
                    renderModel(undefined)
                }
                break;
            }
            case !!down: {
                ////// debugger
                const newModel = clickTool(tool, model, down, pos, e)
                if (newModel) {
                    //debugger
                    console.log("only///onPointerUp/newModel/click", newModel)
                    //dispatch(designCommit(newModel, {designId}))
                    renderModel(undefined)
                }
                break;
            }
        }

        // Reset other pointer coordinates
        setDown(undefined)
        setDrag(undefined)
    }, [setUp, setDown, setDrag, tool, down, drag, dispatch, designId, model, renderModel])

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

export default PointerProviderMemo;

//TODO: spanTo: "10px",
