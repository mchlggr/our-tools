// import { Token } from '../endpoint/endpointTypes';
import { JsonApiQuery } from '@penumbra/endpoint-jsonapi';

type Token = {} //TODO: use Token from endpoint-shared

import { ResourceEndpoint } from './resource-endpoint';

interface ResourceRecord {
  id: string;
  [key: string]: any;
}

interface ResourceAction {
  (payload?: object, config?: object): Promise<any>;
}

interface ResourceConfig extends JsonApiQuery {
  alias: string;
  url?: string,
  params?: object;
  id?: string;
}

interface ResourceActions {
  createResource: ResourceAction;
  updateResource: ResourceAction;
  deleteResource: ResourceAction;
  // resourceAction: ResourceAction; // for custom actions
}

// ---

interface Resource<RecordType = ResourceRecord> extends ResourceActions {
  record: RecordType;
  recordId: string;
  recordType: string;

  // ---

  isNew: boolean;
  isLoading: boolean;
  error: object;

  // ---

  links: object;

  // ---

  fetchResource: ResourceAction;

  // ---

  onSubmit: (state: any) => (values: object, config: ResourceConfig) => Promise<any>;
  onDelete: (state: Resource) => (e: any) => void;
}

interface ResourceList<RecordType = ResourceRecord> extends ResourceActions {
  params: any,

  // ---

  records: RecordType[];
  recordType: string,

  // ---

  isNew: Set<string>;
  isLoading: Set<string>;
  error: { [key: string]: object };

  // ---

  fetchResourceList: ResourceAction;
  // onFilter: (state: ResourceState) => (filter: any) => Promise<any>;
  // onSort: (state: ResourceState) => (sort: any) => Promise<any>;
  // onPageSize: (state: ResourceState) => (evt: any) => Promise<any>;
  // onPageNumber: (state: ResourceState) => (number: number) => Promise<any>;
  // onDelete: (state: ResourceState) => (record: ResourceRecord) => (e: any) => void;
}

// TODO: type ResourceState = Resource | ResourceList;

// ---


interface ResourceHook {
  (endpoint: ResourceEndpoint, config: ResourceConfig): Resource;
}

interface ResourceListHook {
  (endpoint: ResourceEndpoint, config: ResourceConfig): ResourceList;
}

// ---

interface ResourceStoreMethod {
  (
    endpoint: ResourceEndpoint,
    payload: object,
    config: ResourceConfig,
    token: Token
  ): Promise<any>;
}

interface ResourceStoreData<RecordData=ResourceRecord> {
  [recordType: string]: { byId: {[id:string]: RecordData} };
}

type ResourceStoreState<T> = ResourceStoreData<T> & {
  // auth: { token: Token };
  // setToken: (token: string) => void;
  getOne: ResourceStoreMethod;
  getList: ResourceStoreMethod;
  getMany: ResourceStoreMethod;
  createResource: ResourceStoreMethod;
  updateResource: ResourceStoreMethod;
  deleteResource: ResourceStoreMethod;
}

// ---

// Same a JsonApiResourceReference
interface ResourceReference {
  id: string;
  type: string;
}

// ---

interface RecordPayload extends JsonApiQuery {
    id: string,
    [key: string]: any
}

// ---

export {
  ResourceRecord,
  ResourceAction,
  ResourceConfig,
  ResourceActions,
  Resource,
  ResourceList,
  // ResourceState,
  ResourceHook,
  ResourceListHook,
  ResourceStoreMethod,
  ResourceStoreState,
  ResourceReference,
  RecordPayload
};
