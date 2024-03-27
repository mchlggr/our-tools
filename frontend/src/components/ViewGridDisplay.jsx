import React, {memo} from 'react';
import PropTypes from 'prop-types';


const ViewGridDisplay = (props) => {

    const bgFill = "none" // #f2f2f2
    const crossStroke = "#d6d6d6"
    const minorStroke = "rgba(0, 0, 0, .05)"
    const majorStroke = "rgba(0, 0, 0, .04)"

    return (
        <>
            <defs>
                <pattern id="majorGridPattern"
                         x="0"
                         y="0"
                         width="80"
                         height="80"
                         patternUnits="userSpaceOnUse"
                >
                    <line x1="0" y1="0" x2="0" y2="80px" stroke={majorStroke} fill={"none"} strokeWidth={'3'}/>
                    <line x1="0" y1="0" x2="80px" y2="0px" stroke={majorStroke} fill={"none"} strokeWidth={'3'}/>
                </pattern>
                <pattern id="minorGridPattern"
                         x="0"
                         y="0"
                         width="8"
                         height="8"
                         patternUnits="userSpaceOnUse"
                >
                    <line x1="0" y1="0" x2="0" y2="8px" stroke={minorStroke} fill={"none"}/>
                    <line x1="0" y1="0" x2="8px" y2="0px" stroke={minorStroke} fill={"none"}/>
                </pattern>
                <pattern id="crossGridPattern"
                         x="0" y="0"
                         width="80"
                         height="80"
                         patternUnits="userSpaceOnUse"
                >
                    <line x1="0" y1="0" x2="0" y2="4px" stroke={crossStroke} fill={"none"} strokeWidth={'3'}/>
                    <line x1="0" y1="0" x2="4px" y2="0px" stroke={crossStroke} fill={"none"} strokeWidth={'3'}/>
                    <line x1="0px" y1="80px" x2="0px" y2="76px" stroke={crossStroke} fill={"none"} strokeWidth={'3'}/>
                    <line x1="80px" y1="0px" x2="76px" y2="0px" stroke={crossStroke} fill={"none"} strokeWidth={'3'}/>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" stroke={"none"} fill={bgFill}/>
            <rect x="0" y="0" width="100%" height="100%" stroke={"none"} fill={"url(#minorGridPattern)"}/>
            <rect x="0" y="0" width="100%" height="100%" stroke={"none"} fill={"url(#majorGridPattern)"}/>
            <rect x="0" y="0" width="100%" height="100%" stroke={"none"} fill={"url(#crossGridPattern)"}/>
        </>
    );
}

ViewGridDisplay.propTypes = {};

const ViewGridDisplayMemo = memo(ViewGridDisplay)
ViewGridDisplayMemo.displayName = "ViewGridDisplay"

export default ViewGridDisplayMemo;