import React, {memo, useMemo} from 'react';
import {isEmpty} from "lodash";
import classNames from 'classnames';
import {useSelector} from "react-redux";
import {useContextSelector} from "use-context-selector";

// Contexts
import PointerContext from "../contexts/PointerContext";

// Selectors
import {
    getPointerDownX,
    getPointerDownY,
    getPointerDragX,
    getPointerDragY, getPointerPath,
    getPointerUpX,
    getPointerUpY
} from "../selectors/pointer";

import {selectActiveTool} from "../selectors/design";

// Utils
import {typePattenSuffix} from "../utils/stringUtils";
import {roughPathD} from "../utils/pathUtils";

// Styles
import s from '../styles/pointer.module.css'

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


    const tool = useSelector(selectActiveTool)
    const [toolSuffix] = tool.match(typePattenSuffix)

    return (
        <>
            {isDown && <circle className={s['pointer-down-circle']} cx={downX} cy={downY} r={"2"} strokeWidth={1}/>}
            {isUp && !isDown && <circle className={s['pointer-up-circle']} cx={upX} cy={upY} r={"2"} strokeWidth={1}/>}
            {isUp && !isDown &&
            <text className={s['pointer-up-text']} x={upX + 8} y={upY - 8}>{`{x: ${upX}, y: ${upY}}`}</text>}
            {isDragging &&
            <line className={classNames(s['pointer-drag-line'], {[s[`pointer-drag-line--${toolSuffix}`]]: toolSuffix})}
                  x1={downX}
                  y1={downY}
                  x2={dragX}
                  y2={dragY}
                  />}}
            {d && <path className={classNames(s['pointer-drag-path'], {[s[`pointer-drag-path--${toolSuffix}`]]: toolSuffix})}
                        d={d}
                        strokeDasharray="1 8"
                        strokeWidth={1}/>}
        </>
    );
}

PointerDisplay.propTypes = {};

const PointerDisplayMemo = memo(PointerDisplay)
PointerDisplayMemo.displayName = "PointerDisplay"

export default PointerDisplayMemo;