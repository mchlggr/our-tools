import {pick} from 'lodash';

import gateway from '../services/gateway';
import {createAsyncRequestAction, createAsyncResourceActionType} from "../utils/actionUtils";

export const AUTH_LOGIN = createAsyncResourceActionType('AUTH_LOGIN');
export const AUTH_LOGOUT = createAsyncResourceActionType('AUTH_LOGOUT');

export const login = createAsyncRequestAction(AUTH_LOGIN, payload => gateway({
    url: 'token',
    method: 'POST',
    data: payload,
}).then(response => {
    // debugger
    return {
        ...response.data,
        ...pick(response.headers, ['access-token']),
    }
}).catch(({response}) => {
    // debugger
    throw new Error(response.data.errors.join());
}));

export const logout = createAsyncRequestAction(AUTH_LOGOUT, payload => gateway({
    url: 'sign_out',
    method: 'DELETE',
    data: payload,
}));