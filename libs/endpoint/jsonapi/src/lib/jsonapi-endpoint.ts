// Types
import {
  Client,
  EndpointOptions,
  HttpHeaders,
  HttpMethod,
  HttpRequest,
  Token,
} from './endpointTypes';

// Helpers
import { makeSuccess, makeFail, ResultResponse } from './resultResponse';
import { normalizePayload, NormalizedResponse } from './normalization';
import { JsonApiResponse } from './jsonapiTypes';
import { EndpointError } from './EndpointError';

// ---

interface ResponseError extends Error {
    response: any
}

// ---

// Refactor as JsonApiEndpoint
class JsonApiEndpoint {
  public client: Client;

  constructor({ client }: EndpointOptions) {
    this.client = client;
  }

  // ---

  protected async response(
    method: HttpMethod,
    url: string,
    tokens: Token = {},
    params: any = {}
  ): Promise<ResultResponse<Error, NormalizedResponse>> {
      // debugger
    try {
      const headers = this.makeHeaders(tokens);
      const request: HttpRequest = { url, method, headers, params };
      const response = await this.client.fetch(request);
      const value : NormalizedResponse = await this.normalizeData(response.data);

      return makeSuccess({url,  params, ...value });
    } catch (e) {
      // debugger;
      return makeFail(this.processError(e));
    }
  }

  private async normalizeData(
    resp: JsonApiResponse
  ): Promise<NormalizedResponse> {

    const normalPayload = await normalizePayload(resp); //, included);

    // Normalize response
    return {
      ...normalPayload,
    };
  }

  private processError(error: ResponseError): EndpointError {
    if (error?.response && error?.response?.status === 401) {
      console.warn('error.response.status', error.response.status);
    }
    return new EndpointError(error.message);
  }

  private makeHeaders(tokens: Token) {
    const headers: HttpHeaders = {};
    // if (tokens.bearerToken) {
    //   headers['Authorization'] = `Bearer ${tokens.bearerToken}`;
    // } else {
    //   console.warn('No bearer token found');
    // }
    return headers;
  }
}

// ---

export { JsonApiEndpoint };
