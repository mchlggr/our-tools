import React, {memo} from 'react';
import PropTypes from 'prop-types';
import ToolButton from "./ToolButton";
import {useSelector} from "react-redux";
import {selectActiveTool} from "../selectors/design";


export const TOOLS = [
    ["tool:select", "V"],
    ["tool:rectangle", "R"],
    ["tool:ellipse", "O"],
    ["tool:line", "L"],
    ["tool:text", "T"],
    ["tool:path", "P"],
    ["tool:polygon", "S"]
]

const ToolbarContainer = (props) => {
    const {designId} = props

    const activeTool =  useSelector(selectActiveTool)

    return (
        <div className={"design-toolbar"}>
            {TOOLS.map((tool, index) => {
                const [name] = tool
                const isActive = name === activeTool
                return <ToolButton key={index} tool={tool} designId={designId} isActive={isActive}/>
            })}
        </div>
    );
}

ToolbarContainer.propTypes = {};

const ToolbarContainerMemo = memo(ToolbarContainer)
ToolbarContainerMemo.displayName = "ToolbarContainer"

export default ToolbarContainerMemo;