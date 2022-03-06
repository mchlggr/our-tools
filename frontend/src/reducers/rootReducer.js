// Dependencies
import {combineReducers} from "redux";

// Utilities
import mergeReducers from "../utils/reducerUtils";

// Slice Reducers
import designReducer from "./designReducer";
import resourceReducer from "./resourceReducer";
import authReducer from "./authReducer";

// ---

const rootReducer = () => {
    return combineReducers({
            auth: authReducer,
            resource: mergeReducers(resourceReducer, "designs", designReducer),
        }
    )
}

export default rootReducer