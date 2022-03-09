import React, {memo} from 'react';

// Components
import ViewModelDisplay from "./ViewModelDisplay";
import PointerDisplay from "./PointerDisplay";

// Styles
import s from '../styles/stage.module.css'

// ---

const StageDisplay = (props) => {
    const {
        onPointerDown,
        onPointerMove,
        onPointerUp
    } = props

    return <>
        <svg className={s["design-stage"]}
             onPointerDown={onPointerDown}
             onPointerMove={onPointerMove}
             onPointerUp={onPointerUp}
        >
            <ViewModelDisplay/>
            <PointerDisplay/>
        </svg>
    </>
}

StageDisplay.propTypes = {};

const StageDisplayMemo = memo(StageDisplay)
StageDisplayMemo.displayName = "StageDisplay"

export default StageDisplayMemo;