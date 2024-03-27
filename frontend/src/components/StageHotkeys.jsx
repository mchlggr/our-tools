import React, {memo, useCallback, useMemo} from 'react';

// Dependencies
import PropTypes from 'prop-types';
import {GlobalHotKeys} from "react-hotkeys";

// Actions
import {
    designCommit,
    designDeselectAll,
    designRedo,
    designSelectAll,
    designSetTool,
    designUndo
} from "../actions/design";

// Selectors
import {useDispatch, useSelector} from "react-redux";

// Utils
import {emptyObject} from "../utils/empty";

// Constants
import {DEFAULT_DESIGN_KEYMAP} from "../pages/design/constants/designKeymaps";
import {DIRECTION_EAST, DIRECTION_NORTH, DIRECTION_SOUTH, DIRECTION_WEST} from "../constants/direction";

// Selectors
import {selectActiveModel} from "../selectors/design";

// Methods
import deleteTool from "../methods/deleteTool";
import nudgeTool from "../methods/nudgeTool";

// Hooks
import {usePointer, usePointerDown} from "../contexts/pointerStore";
import {useDispatchModel} from "./StageContainer";


// ---

const StageHotkeys = (props) => {
    const {designId, children} = props

    const currentModel = useSelector(selectActiveModel)
    console.log("inf/currentModel",currentModel)

    const dispatch = useDispatch()
    const dispatchModel = useDispatchModel(designId)

    const onDirection = usePointer(({onDirection})=> (onDirection))

    const nudgeDirection = useCallback((e, direction) => {
        const {tool} = currentModel
            onDirection(e, tool, currentModel, dispatchModel, direction)
    }, [dispatchModel, currentModel, onDirection])

    const pointerDown = usePointerDown()

    const setTool = useCallback((tool) => {
        // Don't allow user to change tools while mouse is down
        if (!pointerDown) {
            dispatch(designSetTool(tool, {designId}))
        }
    }, [dispatch, designId, pointerDown])

    const handlers = useMemo(() => {
        return {
            // Tool keys
            HAND: (e) => {
                setTool("tool:hand")
            },
            SELECT: (e) => {
                setTool("tool:select")
            },
            RECTANGLE: (e) => {
                setTool("tool:rectangle")
            },
            ELLIPSE: (e) => {
                setTool("tool:ellipse")

            },
            LINE: (e) => {
                setTool("tool:line")

            },
            TEXT: (e) => {
                setTool("tool:text")

            },
            PATH: (e) => {
                setTool("tool:path")
            },
            POLYGON: (e) => {
                setTool("tool:polygon")
            },

            // History keys
            UNDO: (e) => {
                e.preventDefault()
                // default key stroke is ctrl+z
                dispatch(designUndo(emptyObject, {designId}))
            },
            REDO: (e) => {
                e.preventDefault()
                // default key stroke is ctrl+shift+z
                dispatch(designRedo(emptyObject, {designId}))
            },
            DESELECT_ALL: (e) => {
                e.preventDefault()
                // default key stroke is ctrl+shift+z
                dispatch(designDeselectAll(emptyObject, {designId}))
            },

            SELECT_ALL: (e) => {
                e.preventDefault()
                // default key stroke is ctrl+shift+z
                dispatch(designSelectAll(emptyObject, {designId}))
            },

            // Edit
            DELETE: (e) => {
                e.preventDefault()
                const {tool} = currentModel
                const newModel = deleteTool(tool, currentModel, e)
                if (!!newModel && newModel !== currentModel) {
                    dispatch(designCommit(newModel, {designId}))
                }
            },
            UP: (e) => nudgeDirection(e, DIRECTION_NORTH),
            RIGHT: (e) => nudgeDirection(e, DIRECTION_EAST),
            LEFT: (e) => nudgeDirection(e, DIRECTION_WEST),
            DOWN: (e) => nudgeDirection(e, DIRECTION_SOUTH)
        }
    }, [dispatch, designId, currentModel, nudgeDirection, pointerDown, setTool])

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