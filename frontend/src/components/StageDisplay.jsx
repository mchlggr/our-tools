import React, {memo, useEffect, useMemo, useRef} from 'react';

// Dependencies
import classNames from "classnames";
import {useWheel, usePinch} from "@use-gesture/react";

// Components
import ViewModelContainer from "./ViewModelContainer";
import PointerDisplay from "./PointerDisplay";
import CenterDisplay from "./CenterDisplay";


//  Hooks
import {usePointer, useSetViewport} from "../contexts/pointerStore";

// Styles
import s from '../styles/stage.module.css'

// ---


const StageDisplay = (props) => {
    const {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerWheel,
        onPointerPinch
    } = props

    const svgRef = useRef()

    const gestureConfig = useMemo(()=> ({target: svgRef, event: {passive: false}}), [svgRef])

    const bindWheel = useWheel(onPointerWheel, gestureConfig)
    const bindPinch = usePinch(onPointerPinch, gestureConfig)

    useEffect(() => void bindWheel, [bindWheel])
    // useEffect(() => void bindPinch, [bindPinch])

    const setViewpoint = useSetViewport()

    useEffect(() => {
        const {current} = svgRef
        if (!!current) {
            setViewpoint(current)
            window.addEventListener("resize", () => setViewpoint(current))
            return () => {
                window.removeEventListener("resize", () => setViewpoint(current))
            }
        }
    }, [svgRef.current])

    return <>
        <svg
            ref={svgRef}
            className={classNames(s["design-stage"], s["design-grid"])}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
        >
            <ViewModelContainer/>
        </svg>
    </>
}

StageDisplay.propTypes = {};

const StageDisplayMemo = memo(StageDisplay)
StageDisplayMemo.displayName = "StageDisplay"

export default StageDisplayMemo;