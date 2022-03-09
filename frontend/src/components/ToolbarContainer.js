// Deps
import React from 'react';
import {connect} from "react-redux";

// Selectors
import {selectActiveTool} from "../selectors/design";

// Containers
import ToolbarDisplay from "./ToolbarDisplay";


// For now this is a constant at a later iteration
// it will be dynamic and user-defined
export const TOOLS = Object.freeze([
    ["tool:select", "V"],
    ["tool:rectangle", "R"],
    ["tool:ellipse", "O"],
    ["tool:line", "L"],
    ["tool:text", "T"],
    ["tool:path", "P"],
    ["tool:polygon", "S"]
])

const mapStateToProps = (state) => {
    const activeTool =  selectActiveTool(state)

    return {activeTool, tools: TOOLS}
}

export default connect(mapStateToProps)(ToolbarDisplay);