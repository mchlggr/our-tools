import { pick } from 'lodash';

import { client } from '../../api';
import {createAsyncRequestAction, createAsyncResourceActionType} from "../utils/actionUtils";

export const AUTH_LOGIN = createAsyncResourceActionType('AUTH_LOGIN');
export const AUTH_LOGOUT = createAsyncResourceActionType('AUTH_LOGOUT');

export const login = createAsyncRequestAction(AUTH_LOGIN, payload => client({
  url: 'api/v1/token',
  method: 'POST',
  data: payload,
}).then(response => ({
  ...response.data.data,
  ...pick(response.headers, ['access-token']),
})).catch(({ response }) => {
  throw new Error(response.data.errors.join());
}));

export const logout = createAsyncRequestAction(AUTH_LOGOUT, payload => client({
  url: 'api/v1/sign_out',
  method: 'DELETE',
  data: payload,
}));