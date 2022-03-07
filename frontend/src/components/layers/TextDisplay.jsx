import React, {memo, useCallback, useEffect, useRef} from 'react';
import {isString} from 'lodash'
import PropTypes from 'prop-types';
import {layerClassNames} from "../../methods/renderLayer";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveDesignId, selectActiveModel} from "../../selectors/design";
import {designCommit} from "../../actions/design";
import inputTool from "../../methods/inputTool";
import {emptyObject} from "../../utils/empty";


const TextDisplay = (props) => {
    const {layer, selected} = props
    const {x, y, dy, fontSize, uuid, content, boundary} = layer

    const currentModel = useSelector(selectActiveModel)
    const designId = useSelector(selectActiveDesignId)

    const textRef = useRef()
    const rectRef = useRef()

    const dispatch = useDispatch()
    const onBlur = useCallback((e) => {
        // const {current} = rectRef
        // if(current) {
        //     current.focus()
        // }
        const newContent = e.target.innerHTML
        if (isString(newContent) && newContent !== content) {
            const {tool} = currentModel
            const newModel = inputTool(tool, currentModel, newContent, e)
            if (!!newModel && newModel !== currentModel) {
                dispatch(designCommit(newModel, {designId}))
            }
        }
    }, [content, currentModel, dispatch, rectRef.current])

    useEffect(() => {
        const {current} = textRef
        if (current) {
            // noinspection JSUnresolvedFunction
            current.addEventListener("blur", onBlur);
            // current.addEventListener("keyup", (e) => console.log("text/keyup", e));
            // current.addEventListener("paste", (e) => console.log("text/paste", e));
            // current.addEventListener("copy", (e) => console.log("text/copy", e));
            // current.addEventListener("cut", (e) => console.log("text/cut", e));
            // current.addEventListener("delete", (e) => console.log("text/delete", e));
            // current.addEventListener("mouseup", (e) => console.log("text/mouseup", e));
            // current.addEventListener("keydown", (e) => console.log("text/keydown", e));
            // current.addEventListener("input", (e) => console.log("text/input", e));
            // current.addEventListener("textInput", (e) => console.log("text/textInput", e));
            // current.addEventListener("change", (e) => console.log("text/change", e));
            // current.addEventListener("keypress", (e) => console.log("text/keypress", e));

            return () => {
                // noinspection JSUnresolvedFunction
                current.removeEventListener("blur", onBlur);
            }
        }
    }, [textRef.current, onBlur])

    const {minX, minY, maxX, maxY} = boundary || emptyObject

    return (
        <>
            <text id={uuid}
                  ref={textRef}
                //tabIndex="-1"
                  x={x}
                  y={y}
                  dy={dy}
                  //contentEditable={"false"}
                  fontSize={fontSize}
                  className={layerClassNames(layer, selected)}
                  fontFamily="Helvetica"
                  stroke="#000"
                  textAnchor="left"
            >
                {content}
            </text>
            <rect
                ref={rectRef}
                className={layerClassNames(layer, selected)}
                x={minX}
                y={minY}
                width={maxX - minX}
                height={maxY - minY}
                fill={"none"}
                stroke={"#000"}
                strokeDasharray={"4 4"}
            />
        </>
    );
}

TextDisplay.propTypes = {};

const TextDisplayMemo = memo(TextDisplay)
TextDisplayMemo.displayName = "TextDisplay"

export default TextDisplayMemo;