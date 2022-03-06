import React, {memo} from 'react';
import PropTypes from 'prop-types';
import PointerContext from "../contexts/PointerContext";
import {useContextSelector} from "use-context-selector";
import {
    getPointerDownX,
    getPointerDownY,
    getPointerDragX,
    getPointerDragY,
    getPointerUpX,
    getPointerUpY
} from "../selectors/pointer";


const PointerDisplay = (props) => {

    const downX = useContextSelector(PointerContext, getPointerDownX)
    const downY = useContextSelector(PointerContext, getPointerDownY)

    const dragX = useContextSelector(PointerContext, getPointerDragX)
    const dragY = useContextSelector(PointerContext, getPointerDragY)

    const upX = useContextSelector(PointerContext, getPointerUpX)
    const upY = useContextSelector(PointerContext, getPointerUpY)

    const isDown = downX && downY
    const isUp = upX && upY
    const isDragging = isDown && dragX && dragY

    return (
        <>
            {isDown && <circle cx={downX} cy={downY} r={"8"} fill={"red"} />}
            {isUp && <circle cx={upX} cy={upY} r={"8"} stroke={"red"} fill={'rgba(0,0,0,0)'} />}
            {isDragging && <line x1={downX} y1={downY} x2={dragX} y2={dragY} stroke={'blue'} strokeWidth={'4px'}/>}
        </>
    );
}

PointerDisplay.propTypes = {};

const PointerDisplayMemo = memo(PointerDisplay)
PointerDisplayMemo.displayName = "PointerDisplay"

export default PointerDisplayMemo;