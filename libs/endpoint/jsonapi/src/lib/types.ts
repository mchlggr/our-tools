import { EndpointReference, EndpointTransform } from '@our-tools/endpoint-shared';
import { NormalizedResponse } from '@our-tools/endpoint-shared';

interface JsonApiDocument {
  id: string;
  type: string;
  attributes: object;
  relationships: object;
}

interface JsonApiResponse {
  data: JsonApiDocument | JsonApiDocument[];
  included?: JsonApiDocument[];
  normalized?: { [key: string]: JsonApiDocument[] };
}

interface JsonApiListResponse extends JsonApiResponse {
  data: JsonApiDocument[];
  meta?: {
    total_pages: number;
    total_count: number;
    count: number;
  };
}

interface JsonApiOneResponse extends JsonApiResponse {
  data: JsonApiDocument;
}

type JsonApiInclude = Set<string>
type JsonApiSort = string[]

interface JsonApiQuery {
  include?: JsonApiInclude;
  fields?: {
    [key: string]: string;
  };
  filter?: {
    [key: string]: string;
  };
  page?: number;
  per_page?: number;
  sort?: JsonApiSort
}

type JsonApiReference = EndpointReference

// ---

type JsonApiTransform<RecordEntry> = EndpointTransform<JsonApiResponse, NormalizedResponse<RecordEntry>>;

// ---

export {
  JsonApiSort,
  JsonApiInclude,
  JsonApiDocument,
  JsonApiReference,
  JsonApiQuery,
  JsonApiOneResponse,
  JsonApiListResponse,
  JsonApiResponse,
  JsonApiTransform
};
