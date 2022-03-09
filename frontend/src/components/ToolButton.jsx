// Deps
import React, {memo, useCallback} from 'react';
import {useDispatch} from "react-redux";
import classNames from "classnames";

// Actions
import {designSetTool} from "../actions/design";

// Utils
import {typePattenSuffix} from "../utils/stringUtils";

// Styles
import s from "../styles/toolbar.module.css"

// ---

const ToolButton = (props) => {
    const {tool, designId, isActive} = props
    const [name, label] = tool

    const dispatch = useDispatch()
    const setTool = useCallback(() => {
        dispatch(designSetTool(name, {designId}))
    }, [name, dispatch, designId])

    const [suffix] = name.match(typePattenSuffix)

    return (
        <button className={classNames(s["design-tool-button"], {
            [s["design-tool-button--active"]]: isActive,
            [s[`design-tool-button--${suffix}`]]: !!suffix
        })} type={'button'} onClick={setTool}>
            {label}
        </button>
    );
}

ToolButton.propTypes = {};

const ToolButtonMemo = memo(ToolButton)
ToolButtonMemo.displayName = "ToolButton"

export default ToolButtonMemo;