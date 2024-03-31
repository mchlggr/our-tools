import { EndpointReference, EndpointTransform } from '@penumbra/endpoint-shared';
import { NormalizedResponse } from '@penumbra/endpoint-shared';

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

interface JsonApiQuery {
  include?: string;
  fields?: {
    [key: string]: string;
  };
  filter?: {
    [key: string]: string;
  };
  page?: number;
  per_page?: number;
  sort?: number;
}

type JsonApiReference = EndpointReference

// ---

type JsonApiTransform<RecordEntry> = EndpointTransform<JsonApiResponse, NormalizedResponse<RecordEntry>>;

// ---

export {
  JsonApiDocument,
  JsonApiReference,
  JsonApiQuery,
  JsonApiOneResponse,
  JsonApiListResponse,
  JsonApiResponse,
  JsonApiTransform
};
