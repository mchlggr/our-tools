import {GET_ONE} from "../actions/resource";
import produce from "immer";


const initialResourceState = {
}

const resourceReducer = (baseState = initialResourceState, action) => {
    const {type}= action

    switch (type) {
        case GET_ONE.STARTED: {
            return produce(baseState)
        }
        default: {
            return baseState
        }
    }
}

export default resourceReducer