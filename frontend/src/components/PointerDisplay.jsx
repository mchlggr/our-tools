import React, {memo, useMemo} from 'react';
import PropTypes from 'prop-types';
import PointerContext from "../contexts/PointerContext";
import {useContextSelector} from "use-context-selector";
import {
    getPointerDownX,
    getPointerDownY,
    getPointerDragX,
    getPointerDragY, getPointerPath,
    getPointerUpX,
    getPointerUpY
} from "../selectors/pointer";
import {isEmpty} from "lodash";
import {roughPathD} from "../utils/pathUtils";


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

    const path = useContextSelector(PointerContext, getPointerPath)

    const d = useMemo(() => {
        if (!isEmpty(path)) {
            return roughPathD(path)
        } else {
            return null
        }
    }, [path])

    // console.log("!!!/d", d)

    return (
        <>
            {isDown && <circle className={'pointer-down-circle'} cx={downX} cy={downY} r={"2"} strokeWidth={1}/>}
            {isUp && !isDown && <circle className={'pointer-up-circle'} cx={upX} cy={upY} r={"2"} strokeWidth={1}/>}
            {isUp && !isDown &&
            <text className={'pointer-up-text'} x={upX + 8} y={upY - 8}>{`{x: ${upX}, y: ${upY}}`}</text>}
            {isDragging &&
            <line className={'pointer-drag-line'} x1={downX} y1={downY} x2={dragX} y2={dragY} strokeWidth={1}
                  strokeDasharray="1 8"/>}}
            {d && <path className={'pointer-drag-path'} d={d} strokeDasharray="1 8" strokeWidth={1}/>}
        </>
    );
}

PointerDisplay.propTypes = {};

const PointerDisplayMemo = memo(PointerDisplay)
PointerDisplayMemo.displayName = "PointerDisplay"

export default PointerDisplayMemo;