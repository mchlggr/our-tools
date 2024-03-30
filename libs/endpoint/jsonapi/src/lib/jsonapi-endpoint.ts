// Types
import {
  Client,
  EndpointOptions,
  HttpHeaders,
  HttpMethod,
  HttpRequest,
  Token,
} from '@penumbra/endpoint-shared';

// Helpers
import { makeSuccess, makeFail, Result, EndpointError } from '@penumbra/endpoint-shared';
import { normalizePayload, NormalizedResponse } from '@penumbra/endpoint-transform';
import { JsonApiResponse } from './types';

// ---

interface ResponseError extends EndpointError {
    response: any
}

// Generic normalizer 
interface Normalizer<DenormalizedInput, NormalizedOutput> {
  (response: DenormalizedInput): Promise<NormalizedOutput>
}

// ---

// Refactor as JsonApiEndpoint
class JsonApiEndpoint<Normalizer> {
  public client: Client;
  public tranform: Client;

  constructor({ client, transform }: EndpointOptions) {
    this.client = client;
    this.transform = transform;
  }

  // ---

  protected async response(
    method: HttpMethod,
    url: string,
    tokens: Token = {},
    params: any = {}
  ): Promise<Result<EndpointError, NormalizedResponse>> {
      // debugger
    try {
      const headers = this.makeHeaders(tokens);
      const request: HttpRequest = { url, method, headers, params };
      const response = await this.client.fetch(request);
      const value : NormalizedResponse = await this.transform(response.data);

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
