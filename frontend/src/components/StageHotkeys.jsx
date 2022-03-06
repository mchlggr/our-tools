import React, {memo, useMemo} from 'react';
import PropTypes from 'prop-types';
import {designCommit, designRedo, designSetTool, designUndo} from "../actions/design";
import {useDispatch, useSelector} from "react-redux";
import {emptyObject} from "../utils/empty";
import {GlobalHotKeys} from "react-hotkeys";
import {DEFAULT_DESIGN_KEYMAP} from "../pages/design/constants/designKeymaps";
import {selectActiveModel} from "../selectors/design";
import deleteTool from "../methods/deleteTool";


const StageHotkeys = (props) => {
    const {designId, children} = props

    const currentModel = useSelector(selectActiveModel)

    const dispatch = useDispatch()
    const handlers = useMemo(() => {
        return {
            // Tool keys
            SELECT: (e) => {
                dispatch(designSetTool("tool:select", {designId}))
            },
            RECTANGLE: (e) => {
                dispatch(designSetTool("tool:rectangle", {designId}))
            },
            ELLIPSE: (e) => {
                dispatch(designSetTool("tool:ellipse", {designId}))

            },
            LINE: (e) => {
                dispatch(designSetTool("tool:line", {designId}))

            },
            TEXT: (e) => {
                dispatch(designSetTool("tool:text", {designId}))

            },
            PATH: (e) => {
                dispatch(designSetTool("tool:path", {designId}))
            },
            POLYGON: (e) => {
                dispatch(designSetTool("tool:polygon", {designId}))
            },

            // History keys
            UNDO: (e) => {
                // default key stroke is ctrl+z
                dispatch(designUndo(emptyObject, {designId}))
            },
            REDO: (e) => {
                // default key stroke is ctrl+shift+z
                dispatch(designRedo(emptyObject, {designId}))
            },

            // Edit
            DELETE: (e) => {
                const {tool} = currentModel
                const newModel = deleteTool(tool, currentModel, e)
                if (newModel) {
                    dispatch(designCommit(newModel, {designId}))
                }
            }
        }
    }, [dispatch, designId, currentModel])

    return (
        <>
            <GlobalHotKeys
                allowChanges={true}
                keyMap={DEFAULT_DESIGN_KEYMAP}
                handlers={handlers}
            >
                {children}
            </GlobalHotKeys>
        </>
    );
}

StageHotkeys.propTypes = {};

const StageHotkeysMemo = memo(StageHotkeys)
StageHotkeysMemo.displayName = "StageHotkeys"

export default StageHotkeysMemo;