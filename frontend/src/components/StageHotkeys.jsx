import React, {memo, useMemo} from 'react';
import PropTypes from 'prop-types';
import {designRedo, designUndo} from "../actions/design";
import {useDispatch} from "react-redux";
import {emptyObject} from "../utils/empty";
import {GlobalHotKeys} from "react-hotkeys";
import {DEFAULT_DESIGN_KEYMAP} from "../pages/design/constants/designKeymaps";


const StageHotkeys = (props) => {
    const {designId, children} = props


    const dispatch = useDispatch()
    const handlers = useMemo(() => {
        return {
            // History Hotkeys
            UNDO: (e) => {
                // default key stroke is ctrl+z
                dispatch(designUndo(emptyObject, {designId}))
            },
            REDO: (e) => {
                // default key stroke is ctrl+shift+z
                dispatch(designRedo(emptyObject, {designId}))
            }
        }
    }, [dispatch, designId])

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