// Logic for Design History

import React, {memo, useCallback} from 'react';

import classNames from 'classnames'

import {selectActiveAt, selectActiveHistory, selectActiveModel} from "../selectors/design";
import {useDispatch, useSelector} from "react-redux";
import ModelDisplay from "./ModelDisplay";
import {designGoTo} from "../actions/design";

const HistoryModelDisplay = (props) => {
    const {model, index, at, designId} = props
    const {entities, selection, boundary} = model

    const dispatch = useDispatch()
    const goToModel = useCallback(() => {
        dispatch(designGoTo(index, {designId}))
    }, [index])


    const {
        minX,
        minY,
        maxX,
        maxY
    } = boundary

    const width = maxX - minX
    const height = maxY - minY

    const viewBox = `${minX} ${minY} ${width} ${height}`

    return <svg key={index}
                viewBox={viewBox}
                onClick={goToModel}
                className={classNames("history-model", {
                    "history-model--past":   index < at,
                    "history-model--present": index === at,
                    "history-model--future":   index > at
                })}
    >
        <ModelDisplay entities={entities} selection={selection}/>
    </svg>
}


const HistoryContainer = (props) => {
    const {designId} = props

    const history = useSelector(selectActiveHistory)
    const at = useSelector(selectActiveAt)

    return (
        <div className={"design-history"}>
            {history.map((model, index) => {
                return <HistoryModelDisplay key={index} model={model} index={index} at={at} designId={designId}/>
            })}
        </div>
    );
}

HistoryContainer.propTypes = {};

const HistoryContainerMemo = memo(HistoryContainer)
HistoryContainerMemo.displayName = "HistoryContainer"

export default HistoryContainerMemo;