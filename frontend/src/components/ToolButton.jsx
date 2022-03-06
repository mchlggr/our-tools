import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {selectActiveModel} from "../selectors/design";
import {designSetTool} from "../actions/design";
import classNames from "classnames";


const ToolButton = (props) => {
    const {tool, designId, isActive} = props
    const [name, label] = tool

    const dispatch = useDispatch()
    const setTool = useCallback((e) => {
        dispatch(designSetTool(name, {designId}))
    }, [name, dispatch, designId])

    return (
        <button className={classNames("design-tool-button", {
            "design-tool-button--active": isActive
        })} type={'button'} onClick={setTool}>
            {label}
        </button>
    );
}

ToolButton.propTypes = {};

const ToolButtonMemo = memo(ToolButton)
ToolButtonMemo.displayName = "ToolButton"

export default ToolButtonMemo;