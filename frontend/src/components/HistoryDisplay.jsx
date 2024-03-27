// Presentation for Design History

// Deps
import React, {memo} from 'react';

// Components
import HistoryModelDisplay from "./HistoryModelDisplay";

// Styles
import s from "../styles/history.module.css"

// ---

const HistoryDisplay = (props) => {
    const {history, at, designId} = props
    return (
        <div className={s["design-history"]}>
            {history.map((model, index) => {
                return <HistoryModelDisplay key={index} model={model} index={index} at={at} designId={designId}/>
            })}
        </div>
    );
}

HistoryDisplay.propTypes = {

};

const HistoryDisplayMemo = memo(HistoryDisplay)
HistoryDisplayMemo.displayName = "HistoryDisplay"

export default HistoryDisplayMemo;