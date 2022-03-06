import {get, update} from 'lodash'
import produce from "immer";

// MODIFIED FROM https://github.com/kuy/redux-merge-reducers/blob/master/src/index.js
const mergeReducers = (originalReducer, statePath, otherReducer) => {
    return (state, action) => produce(state, (draft) => {
        const newState = update(draft, statePath, (otherState) => otherReducer(otherState, action))
        if (typeof state === 'undefined') {
            // Merge initial state
            const initial = originalReducer(undefined, {type: undefined});
            return {...initial, ...newState};
        } else {
            return originalReducer(newState, action);
        }
    })
}

export default mergeReducers