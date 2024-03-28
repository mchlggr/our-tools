/*
This file is selector and transformations of JsonApi Request (Query, Params, Etc) and Response data
*/

import { isArray, isString, merge, mergeWith } from 'lodash';
import {JsonApiQuery} from "../endpoints/jsonapiTypes";
// import { typeOf } from '../extensions/typeOf';

// ---

//TODO: move to jsonapi param merge.ts and param prepare.ts?

const mergeSort = (...sorts) => {
  return sorts[0];
};

const mergePage = (...pages) => {
  return pages[0];
};

const mergeIncludes = (...includes) => {
  return includes[0];
};

const mergeFilters = (obj, src) => {
  //TODO: prepareFilters first
  const merged = mergeWith({ ...obj }, { ...src }, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    } else if (isString(srcValue)) {
      return srcValue;
    } else if (srcValue !== undefined) {
      return srcValue;
    } else {
      return srcValue;
    }
  });
  return merged;
};

const mergeParams = (objValue: JsonApiQuery = {}, srcValue: JsonApiQuery = {}) : JsonApiQuery=> {
  const {
    sort: objSort = [],
    page: objPage = {},
    include: objInclude = [],
    filter: objFilter = {},
  } = objValue;

  const {
    sort: srcSort = [],
    page: srcPage = {},
    include: srcInclude = [],
    filter: srcFilter = {},
  } = srcValue;

  return {
    ...objValue,
    ...srcValue,
    sort: mergeSort(objSort, srcSort),
    page: mergePage(objPage, srcPage),
    include: mergeIncludes(objInclude, srcInclude),
    filter: mergeFilters(objFilter, srcFilter),
  };
};

// ---

export { mergeFilters, mergeIncludes, mergePage, mergeSort, mergeParams };
