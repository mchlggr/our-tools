// Logic for Design History

import React, {memo, useCallback} from 'react';

import classNames from 'classnames'

import {selectActiveAt, selectActiveHistory, selectActiveModel} from "../selectors/design";
import {useDispatch, useSelector} from "react-redux";
import ModelDisplay from "./ModelDisplay";
import {designGoTo} from "../actions/design";

const HistoryModelDisplay = (props) => {
    const {model, index, at, designId} = props
    const {entities, selection} = model

    const isCurrent = index === at

    const dispatch = useDispatch()
    const goToModel = useCallback(() => {
        dispatch(designGoTo(index, {designId}))
    }, [index])


    return <svg key={index}
                onClick={goToModel}
                className={classNames("history-model", {
                    "history-model--current": isCurrent
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
        <div className={"penumbra__design-history"}>
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