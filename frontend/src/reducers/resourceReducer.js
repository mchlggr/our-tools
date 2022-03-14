import {GET_LIST, GET_ONE} from "../actions/resource";
import produce from "immer";
import {get, compact, isArray, isObject, keys, map, mergeWith, pick, update, updateWith, set} from "lodash";
import {emptyObject} from "../utils/empty";


const initialResourceState = {
}

const upsertResource = (payload, upserter) => {
    keys(payload.normalized).forEach((key) => {
        payload.normalized[key].forEach((item) => {
            upserter(key, item)
        })
    })
}

const mergeCustomizer = (objValue, srcValue) => {
    if (isArray(objValue)) {
        //Override completely array
        return srcValue
    } else if (isObject(objValue)) {
        const { type, id } = objValue
        if (!type && !id) {
            return srcValue
        }
    }
}


const mergeWithResource = (draftState, key, id, entity) => {
    updateWith(
        draftState,
        [key, "byId", id],
        (i) => {
            return !!i ? mergeWith(i, entity, mergeCustomizer) : entity
        },
        Object
    )
}

const addNormalized = (draftState, payload, receivedAt) => {
    upsertResource(
        payload,
        produce((key, item = {}) => {
            const { id } = item
            if (id) {
                mergeWithResource(draftState, key, id, item)
            }
        })
    )
}

const resourceReducer = (baseState = initialResourceState, action) => {
    const {type, payload, meta} = action
    const {list = "list", key} = meta || emptyObject
    const {id: resourceId} = payload || emptyObject
    const timeInMs = Date.now()

    const references =  compact([resourceId, list])

    switch (type) {
        // Get One Actions
        case GET_ONE.STARTED: {
            return produce(baseState, (draftState) => {

            })
        }
        case GET_ONE.SUCCESS: {
            return produce(baseState, (draftState) => {
                addNormalized(draftState, payload, timeInMs)

                if(resourceId) {
                    set(draftState, [key, resourceId], {
                        id: get(payload.data, 'id'),
                        loading: false,
                        ...pick(payload, ['params', 'links', 'meta'])
                    })
                }
            })
        }
        case GET_ONE.FAILED: {
             return baseState
        }
        // Get List Actions
        case GET_LIST.STARTED: {
             return baseState
        }
        case GET_LIST.SUCCESS: {
            return produce(baseState, (draftState)=> {
                addNormalized(draftState, payload, timeInMs)
                debugger;
                set(draftState, [key, list], {
                    ids: map(payload.data, 'id'),
                    loading: false,
                    ...pick(payload, ['params', 'links', 'meta'])
                })
                debugger
            })
        }
        case GET_LIST.FAILED: {
             return baseState
        }
        default: {
            return baseState
        }
    }
}

export default resourceReducer