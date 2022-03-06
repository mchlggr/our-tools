import { omit } from 'lodash'

import {createAsyncRequestAction, createAsyncResourceActionType} from "../utils/actionUtils";
import gateway from "../services/gateway";
import {denormalize, normalizeEndpointError, normalizeErrors, normalizeResponse} from "../services/normalization";

export const GET_ONE = createAsyncResourceActionType('GET_ONE');
export const GET_LIST = createAsyncResourceActionType('GET_LIST');
export const GET_MANY = createAsyncResourceActionType('GET_MANY');
export const CREATE = createAsyncResourceActionType('CREATE');
export const UPDATE = createAsyncResourceActionType('UPDATE');
export const DELETE = createAsyncResourceActionType('DELETE');
export const ACTION = createAsyncResourceActionType('ACTION');

export const fetchOne = createAsyncRequestAction(GET_ONE, (payload, meta) => gateway({
  url: `${meta.url}/${payload.id}`,
  params: { include: meta.include, ...omit(payload, 'id') },
  method: 'GET',
  data: JSON.stringify(payload),
}).then(normalizeResponse).catch(normalizeEndpointError));

export const fetchList = createAsyncRequestAction(GET_LIST, (payload, meta) => {
  const params = { include: meta.include, ...payload };
  return gateway({
    url: meta.url,
    params,
    method: 'GET',
    data: JSON.stringify(payload),
  }).then(normalizeResponse).then(res => ({ ...res, params }));
});

export const createOne = createAsyncRequestAction(CREATE, (payload, meta) => gateway({
  url: meta.url,
  params: { include: meta.include },
  method: 'POST',
  data: denormalize(meta.key, payload),
}).then(normalizeResponse).catch(normalizeErrors));

export const updateOne = createAsyncRequestAction(UPDATE, (payload, meta) => gateway({
  url: `${meta.url}/${payload.id}`,
  params: { include: meta.include },
  method: 'PUT',
  data: denormalize(meta.key, payload),
}).then(normalizeResponse).catch(normalizeErrors));

export const deleteOne = createAsyncRequestAction(DELETE, (payload, meta) => gateway({
  url: `${meta.url}/${payload.id}`,
  method: 'DELETE',
}).then(() => ({ data: payload })));

export const oneAction = createAsyncRequestAction(ACTION, (payload, meta = {}) => gateway({
  url: meta.url,
  params: { include: meta.include },
  method: meta.method || 'PUT',
  data: JSON.stringify(payload),
}).then(normalizeResponse).catch(normalizeErrors));