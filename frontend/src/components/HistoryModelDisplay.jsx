// Deps
import React, {useCallback, memo} from 'react';
import {useDispatch} from "react-redux";
import classNames from 'classnames'

// Components
import ModelDisplay from "./ModelDisplay";

// Actions
import {designGoTo} from "../actions/design";

// Styles
import s from "../styles/history.module.css"

// ---

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
                className={classNames(s["history-model"], {
                    [s["history-model--past"]]: index < at,
                    [s["history-model--present"]]: index === at,
                    [s["history-model--future"]]: index > at
                })}
    >
        <ModelDisplay entities={entities} selection={selection}/>
    </svg>
}

HistoryModelDisplay.propTypes = {};

const HistoryModelDisplayMemo = memo(HistoryModelDisplay)
HistoryModelDisplayMemo.displayName = "HistoryModelDisplay"

export default HistoryModelDisplayMemo;