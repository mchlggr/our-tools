import React, {memo} from 'react';
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types';

// Components
import ViewModelDisplay from "./ViewModelDisplay";
import {
    useViewCenterX, useViewCenterY,
    useViewOffsetX, useViewOffsetY, useViewScale,
} from "../contexts/pointerStore";

import s from '../styles/stage.module.css'
import ViewGridDisplay from "./ViewGridDisplay";
import PointerDisplay from "./PointerDisplay";
import CenterDisplay from "./CenterDisplay";

// --

const wheel = 0
const wheelStep = 200
const initialW = 120
const initialH = 80

const ViewModelContainer = (props) => {
    const [{transform}, setAnimation] = useSpring(() => ({
        transform: 'matrix(1 0 0 1 0 0)'
    }))


    // console.log("num/----/----/----/----/----")
    // console.log("num/dragX", dragX)
    // console.log("num/dragY", dragY)
    // console.log("num/centerX", centerX)
    // console.log("num/centerY", centerY)
    // console.log("num/maxZoom", maxZoom)
    // console.log("num/minZoom", minZoom)
    // console.log("num/zoom", zoom)

    const offsetX = useViewOffsetX()
    const offsetY = useViewOffsetY()

    const centerX = useViewCenterX()
    const centerY = useViewCenterY()

    const scale = useViewScale()

    console.log("num/scale", scale)
    console.log("num/offsetX", offsetX)
    console.log("num/offsetY", offsetY)

    const matrix = `matrix(${scale} 0 0 ${scale} ${offsetX} ${offsetY})`
    setAnimation({transform: matrix})

    return (
        <>

            {/*<g transform={matrix}>*/}
            <animated.g transform={transform}>
                <ViewGridDisplay/>
                <ViewModelDisplay/>
                <PointerDisplay/>
                <CenterDisplay/>
            </animated.g>
            {/*</g>*/}
        </>
    );
}

ViewModelContainer.propTypes = {};

const ViewModelContainerMemo = memo(ViewModelContainer)
ViewModelContainerMemo.displayName = "ViewModelContainer"

export default ViewModelContainerMemo;