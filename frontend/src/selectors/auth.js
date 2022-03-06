import {get} from 'lodash'
import { createSelector } from '@reduxjs/toolkit'

const getActiveUserId = state => get(state, ["claims", "user_id"])

export const selectActiveUserId = createSelector(getActiveUserId, id => id)