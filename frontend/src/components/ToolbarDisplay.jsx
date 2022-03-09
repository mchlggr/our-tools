import React, {memo} from 'react';

// Components
import ToolButton from "./ToolButton";

// Styles
import s from '../styles/toolbar.module.css'

// ---

const ToolbarDisplay = (props) => {
    const {designId, tools, activeTool} = props

    return (
        <>
            <div className={s["design-toolbar"]}>
                {tools.map((tool, index) => {
                    const [name] = tool
                    const isActive = name === activeTool
                    return <ToolButton key={index} tool={tool} designId={designId} isActive={isActive}/>
                })}
            </div>
        </>
    );
}

ToolbarDisplay.propTypes = {};

const ToolbarDisplayMemo = memo(ToolbarDisplay)
ToolbarDisplayMemo.displayName = "ToolbarDisplay"

export default ToolbarDisplayMemo;