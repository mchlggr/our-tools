/*
This file is selector and transformations of ResourceState
*/
import { produce } from 'immer';
import {
  keys,
  isArray,
  isObject,
  updateWith,
  mergeWith,
  set,
  pick,
  isString,
  isNumber,
  isBoolean,
} from 'lodash';
import { ResourceReference } from './resourceTypes';

const upsertResource = (payload: any, upserter: any) => {
  keys(payload.normalized).forEach((key) => {
    payload.normalized[key].forEach((item: any) => {
      upserter(key, item);
    });
  });
};

const mergeCustomizer = (
  objValue: ResourceReference | ResourceReference[],
  srcValue: ResourceReference | ResourceReference[]
) => {
  // debugger;
  if (isArray(objValue)) {
    // Override array completely
    return srcValue;
  } else if (isObject(objValue)) {
    return srcValue;
  } else if (isString(objValue) || isNumber(objValue)) {
    return srcValue;
  } else if (objValue === srcValue) {
    return srcValue;
  } else if (
    objValue === undefined ||
    objValue === null ||
    isBoolean(objValue)
  ) {
    return srcValue;
  } else {
    throw new Error(
      `Can NOT merge this objValue type: ${objValue} with srcValue: ${srcValue}`
    );
  }
};

const mergeWithResource = (state: any, key: any, id: any, entity: any) => {
  updateWith(
    state,
    [key, 'byId', id],
    (i) => {
      // eslint-disable-next-line no-extra-boolean-cast
      return !!i ? mergeWith(i, entity, mergeCustomizer) : entity;
    },
    Object
  );
};

const addNormalized = (state: any, payload: any) => {
  // const timeInMs = Date.now() //TODO: save the time which resource was aquired
  upsertResource(
    payload,
    produce((key: string, item: ResourceReference) => {
      const { id } = item;
      if (id) {
        mergeWithResource(state, key, id, item);
      }
    })
  );
};

const addLinks = (state: any, payload: any) => {
  const { links, data } = payload;
  if (data.id) {
    set(state, [data.type, 'links', `${data.id}`], links);
  }
};

const makeAlias = (value: any) => {
  const { data = {}, links = {}, meta = {} } = value;
  const params = pick(value.params, ['page', 'filter', 'sort', 'include']);
  return {
    id: data.id,
    loading: false,
    params,
    links,
    meta,
  };
};

const makeAliasList = (value: any) => {
  const { data = [], links = {}, meta = {} } = value;
  const params = pick(value.params, ['page', 'filter', 'sort', 'include']);
  return {
    ids: data.map(({ id }: any) => id),
    loading: false,
    params,
    links,
    meta,
  };
};

// ---

export {
  addLinks,
  addNormalized,
  makeAliasList,
  makeAlias,
  mergeCustomizer,
  mergeWithResource,
};
