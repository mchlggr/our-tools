import {compact, get, isEmpty} from 'lodash'
import {createSelector} from "@reduxjs/toolkit";
import {emptyArray, emptyObject} from "../utils/empty";

// ---

const emptyList = Object.freeze({
    data: [],
    ids: [],
    links: {},
    meta: {},
    params: {page: {}, filter: {}},
    loading: true,
});

// ---

export const getAllResources = (resourceType) => (state) => {
    return get(state, ['resource', resourceType])
}

export const getOneById = (resources, id) => get(resources, ['byId', id])
export const getErrorById = (resources, id) => get(resources, ['error', id])

export const getManyByIds = (resources, ids = emptyArray) => {
    const {byId} = resources

    if (isEmpty(byId)) {
        return emptyArray
    } else {
        return ids.map((id) => byId[id])
    }
}

export const getById = (resources) => get(resources, 'byId')
export const getAlias = (aliasName) => (resources) => {
    return get(resources, ['alias', aliasName])
}

export const getList = (listName) => (resources) => {
    debugger
    const byId = getById(resources)
    // const list = getAlias(listName)(resources) // A list is kind of 'alias'
    const list = get(resources, listName)

    const {ids = emptyArray} = list || emptyObject

    debugger

    if (isEmpty(ids)) {
        return {...emptyList, empty: true}
    } else {
        const data = ids.map((id) => byId[id])
        return {...emptyList, empty: false, ...list, data: compact(data)}
    }
}

// ---

export const selectOne = (resourceType, selectId) => {
    return createSelector(getAllResources(resourceType), selectId, getOneById)
}

export const selectError = (resourceType, selectId) => {
    return createSelector(getAllResources(resourceType), selectId, getErrorById)
}

export const selectMany = (resourceType, selectIds) => {
    return createSelector(getAllResources(resourceType), selectIds, getManyByIds)
}

export const selectList = (resourceType, listName) => {
    return createSelector(getAllResources(resourceType), getList(listName))
}

// ---

export const selectOneError = (resourceType, selectId) => {
    return createSelector(selectOne(resourceType, selectId), )
}