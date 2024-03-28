interface Client {
  fetch: (request: HttpRequest) => Promise<{ data: any }>;
}

interface EndpointOptions {
  client: Client;
}

type HttpMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
const HTTP_METHOD: { [key: string]: HttpMethod } = {
  get: 'GET',
  delete: 'DELETE',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
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
};

export function endpointShared(): string {
  return 'endpoint-shared';
}
