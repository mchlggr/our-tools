import { NonEmptyString } from '@our-tools/extension';

interface Client {
  fetch: (request: HttpRequest) => Promise<{ data: any }>;
}

// Generic normalizer
interface EndpointTransform<DenormalizedInput, NormalizedOutput> {
  (response: DenormalizedInput): Promise<NormalizedOutput>;
}

interface EndpointOptions<Transform = EndpointTransform<never, never>> {
  client: Client;
  transform: Transform;
}

type HttpMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
const HTTP_METHOD: { [key: string]: HttpMethod } = {
  get: 'GET',
  delete: 'DELETE',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH'
};

interface Token {
  bearerToken?: string;
}

//---

interface HttpHeaders {
  Authorization?: string;
}

interface HttpRequest {
  url: string;
  params: object;
  headers: HttpHeaders;
  method: HttpMethod;
}

interface EndpointReference {
  id: string;
  type: string;
}

// ---

interface Normalization {
  (recordType: string, data: object): object;
}

interface NormalizedRecords<RecordEntry> {
  [recordType: NonEmptyString]: RecordEntry[];
}

type UnknownRecordEntry = {
  id: NonEmptyString
}

type UnkownDataEntry = {
  id: NonEmptyString
}

type UnkownParamsEntry = {
  id?: NonEmptyString
  ids?: NonEmptyString[]
}

type UnknownIncludedEntries = {
  [recordType: NonEmptyString]: any
}

interface NormalizedResponse<RecordEntry extends UnknownRecordEntry, DataEntry extends UnkownDataEntry, ParamsEntry extends UnkownParamsEntry, IncludedEntries = any> {
  normalized?: NormalizedRecords<RecordEntry>,
  record?: RecordEntry,
  records?: RecordEntry[],
  data: DataEntry,
  included: IncludedEntries,
  params?: ParamsEntry,
  url?: string,
}

// ---

export {
  Client,
  EndpointOptions,
  HttpMethod,
  Token,
  HttpRequest,
  // ---
  HTTP_METHOD,
  // ---
  HttpHeaders,
  // ---
  EndpointReference,
  // ---
  EndpointTransform,
  // ---
  Normalization,
  NormalizedRecords,
  NormalizedResponse
};

export function types(): string {
  return 'endpoint-shared';
}
