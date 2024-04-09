import {
  Client,
  EndpointOptions,
  HttpHeaders,
  HttpMethod,
  HttpRequest,
  Token,
  EndpointTransform,
  NormalizedResponse,
  ResponseError
} from '@our-tools/endpoint-shared';

// Helpers
import { makeSuccess, makeFail, Result, EndpointError } from '@our-tools/endpoint-shared';
import { JsonApiResponse, JsonApiTransform } from './types';

// ---



// Refactor as JsonApiEndpoint
class JsonApiEndpoint<RecordEntry> {
  public client: Client;
  public transform: JsonApiTransform<RecordEntry>

  constructor({ client, transform }: EndpointOptions<JsonApiTransform<RecordEntry>>) {
    this.client = client;
    this.transform = transform;
  }

  // ---

  protected async response(
    method: HttpMethod,
    url: string,
    tokens: Token = {},
    params: any = {}
  ): Promise<Result<EndpointError, NormalizedResponse<RecordEntry>>> {
    try {
      const headers = this.makeHeaders(tokens);
      const request = { url, method, headers, params };
      const response = await this.client.fetch(request);
      const value = await this.normalizeData(response.data);

      return makeSuccess({url,  params, ...value });
    } catch (e: unknown) {
      if(e instanceof Error) {
        return makeFail(this.processError(e));
      }
      return makeFail(new EndpointError("Unknown Type from Catch"));
    }
  }

  private async normalizeData(
    resp: JsonApiResponse
  ): Promise<NormalizedResponse<RecordEntry>> {

    const normalPayload = await this.transform(resp); //, included);

    // Normalize response
    return {
      ...normalPayload,
    };
  }

  private processError(error: Error): EndpointError {
    console.error(error);
    // if (error?.response && error?.response?.status === 401) {
    //   console.warn('error.response.status', error.response.status);
    // }
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
