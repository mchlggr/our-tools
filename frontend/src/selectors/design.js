import {createSelector} from "@reduxjs/toolkit";
import {get, size} from 'lodash'
import {getAlias, getAllResources, getOneById, selectOne} from "./resource";
import {RESOURCE_ALIAS} from "../constants/resource";

export const getHistory = ({history}) => history
export const getHistorySize = ({history}) => size(history)
export const getAt = ({at}) => at

export const getCurrentModel = ({at, history}) => get(history, at)

export const getEntities = ({entities}) => entities
export const getSelection = ({selection}) => selection

export const getView = ({view}) => view
export const getViewTarget = ({view}) => get(view, 'target')

export const getSelf = (i) => i

export const selectAllDesigns = createSelector(getAllResources("designs"), getSelf)

export const selectActiveDesignId = createSelector(selectAllDesigns, getAlias(RESOURCE_ALIAS.ACTIVE_DESIGN))
export const selectActiveDesign = createSelector(selectOne('designs', selectActiveDesignId), getSelf)

export const selectActiveHistory = createSelector(selectActiveDesign, getHistory)
export const selectActiveHistorySize = createSelector(selectActiveDesign, getHistorySize)
export const selectActiveAt = createSelector(selectActiveDesign, getAt)

export const selectActiveModel = createSelector(selectActiveDesign, getCurrentModel)

export const selectActiveEntities = createSelector(selectActiveModel, getEntities)
export const selectActiveSelection = createSelector(selectActiveModel, getSelection)

// export const selectActivePointer = createSelector(selectActiveModel, getPointer)
// export const selectActivePointerDown = createSelector(selectActiveModel, getPointerDown)
// export const selectActivePointerUp = createSelector(selectActiveModel, getPointerUp)
// export const selectActivePointerDrag = createSelector(selectActiveModel, getPointerDrag)

export const selectActiveView = createSelector(selectActiveModel, getView)
export const selectActiveViewTarget = createSelector(selectActiveModel, getViewTarget)