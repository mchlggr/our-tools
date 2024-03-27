import React, {memo} from "react";

// Dependencies
import PropTypes from 'prop-types';


const CircleMarker = (props) => {
    const {cx, cy, stroke, fill, color, character} = props
    return <>
        <circle
            id={"helper__stage-view-center"}
            cx={cx}
            cy={cy}
            stroke={stroke}
            fill={fill}
            r={"16"}
            opacity={0.5}
        />
        <text x={cx - 12} y={cy + 5} fontWeight={'bold'} fill={color} opacity={0.5}>
            {character}
        </text>
    </>
}

CircleMarker.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    stroke: PropTypes.string,
    fill: PropTypes.string,
    color: PropTypes.string,
    character: PropTypes.string.isRequired,
}

const CircleMarkerMemo = memo(CircleMarker)
CircleMarkerMemo.displayName = "CircleMarker"

export default CircleMarkerMemo