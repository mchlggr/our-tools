import { get } from 'lodash';
import { Resource, ResourceHook } from './types';
import { useResourceStore } from './resource-store';
import { ResourceEndpoint } from './resource-endpoint';

// ---

export const useRecord = (recordType: string, id: string) => {
  const store = useResourceStore();
  return get(store, [recordType, 'byId', id], {});
};

export const useAliasId = (recordType: string, alias: string) => {
  const store = useResourceStore();
  return get(store, [recordType, alias, 'id']);
};

export const useRecordAlias = (recordType: string, alias: string) => {
  const store = useResourceStore();
  const id = useAliasId(recordType, alias);
  return useRecord(recordType, id);
};

export const useLinks = (recordType: string, id: string) => {
  const store = useResourceStore();
  return get(store, [recordType, 'links', id], {});
};

//---

const useResource: ResourceHook = (endpoint, options) => {
  const {
    getOne,
    createResource,
    deleteResource,
    updateResource
  } = useResourceStore();

  const recordType = endpoint.recordType();

  // const params = useParams();
  const id = '0';
  const aliasId = '1';

  const recordId = (id !== 'new' && id) || aliasId;
  const record = useRecord(recordType, recordId);
  const links = useLinks(recordType, recordId);

  const paramsId = '';
  const isNew = paramsId === 'new';
  const isLoading = !record && !isNew;

  const token = {};

  return {
    record,
    recordId,
    recordType,
    //---
    isNew,
    isLoading,
    error: {},
    links,
    // ---
    onSubmit: (opts: any) => (payload: any) => {
      const action = payload.id ? updateResource : createResource;
      return action(endpoint, payload, { ...options, ...opts }, token);
    },
    // ---
    fetchResource: (payload: any, opts: any = {}) => {
      return getOne(endpoint, payload, { ...options, ...opts }, token);
    },
    createResource: (payload: any, opts: any = {}) => {
      return createResource(endpoint, payload, { ...options, ...opts }, token);
    },
    updateResource: (payload: any, opts: any = {}) => {
      return updateResource(endpoint, payload, { ...options, ...opts }, token
      );
    },
    deleteResource: (payload: any, opts: any = {}) => {
      return deleteResource(endpoint, payload, { ...options, ...opts }, token);
    },
    // ---
    onDelete: (payload: any, opts: any = {}) => (e) => {
      e.preventDefault();
      deleteResource(endpoint, payload, { ...options, ...opts }, token).then((e) => {
        //TODO: redirectToIndex()
      });
    }
  };
};

//---

export { useResource };
