import React, {memo} from 'react';

// Dependencies
import PropTypes from 'prop-types';

// Hooks
import {useViewCenterX, useViewCenterY, useViewOffsetX, useViewOffsetY} from "../contexts/pointerStore";

// Components
import CircleMarker from "./CircleMarker";

const CenterDisplay = (props) => {
    const centerX = useViewCenterX()
    const centerY = useViewCenterY()


    const offsetX = useViewOffsetX()
    const offsetY = useViewOffsetY()

    console.log("num/centerX", centerX)
    console.log("num/centerY", centerY)

    return (
        <>
            {centerX && centerY && <CircleMarker
                id={"helper__stage-view-center"}
                cx={centerX}
                cy={centerY}
                fill={"red"}
                character={" C"}
                color={"white"}
            />}
            {offsetX && offsetY && <CircleMarker
                id={"helper__stage-view-center"}
                cx={offsetX}
                cy={offsetY}
                fill={"blue"}
                character={"O"}
                color={"white"}
            />}
        </>
    );
}

CenterDisplay.propTypes = {};

const CenterDisplayMemo = memo(CenterDisplay)
CenterDisplayMemo.displayName = "CenterDisplay"

export default CenterDisplayMemo;