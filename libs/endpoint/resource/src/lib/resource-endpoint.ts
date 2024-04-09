import {JsonApiQuery, JsonApiResponse, JsonApiEndpoint} from '@our-tools/endpoint-jsonapi';
import { HTTP_METHOD, Token } from '@our-tools/endpoint-shared';
// import {  } from '';
// import { Result } from './resultResponse'

// ----

class ResourceEndpoint<Reocord> extends JsonApiEndpoint<Reocord> {
  // ---

  public recordType(): string {
    throw new Error(
      `Please define an instance method 'recordType()' for ${this.constructor.name}`
    );
  }

  protected async serialize(data: object): Promise<JsonApiResponse> {
    throw new Error(
      `Please define an instance method 'serialize(data)' for ${this.constructor.name}`
    );
  }

  // ---

  public async create<JsonApiResponse>(token: Token, params: object, url = "") {
    const payload = await this.denormalizeData(params);
    if(url === "") url = `/api/v2/${this.recordType()}`;
    return await this.response(
      HTTP_METHOD.post,
      url,
      token,
      payload
    );
  }

  public async list<JsonApiResponse>(token: Token, params: JsonApiQuery = {}, url = "") {
    // debugger
    if(url === "") url = `/api/v2/${this.recordType()}`;
    return await this.response(
      HTTP_METHOD.get,
      url,
      token,
      params
    );
  }

  public async find<JsonApiResponse>(id: string, token: Token, _params: JsonApiQuery = {}, url = "") {
    if(url === "") url = `/api/v2/${this.recordType()}`;
    return await this.response(
      HTTP_METHOD.get,
      `${url}/${id}`,
      token,
      _params
    );
  }

  public async update<JsonApiResponse>(
    id: string,
    token: Token,
    params: object,
    url = ""
  ) {
    const payload = await this.denormalizeData(params);
    if(url === "") url = `/api/v2/${this.recordType()}`;
    return await this.response(
      HTTP_METHOD.put,
      `${url}/${id}`,
      token,
      payload
    );
  }

  public async destroy<JsonApiResponse>(
    id: string,
    token: Token,
    _params: JsonApiQuery = {},
    url = ""
  ) {
    if(url === "") url = `/api/v2/${this.recordType()}`;
    return await this.response(

      HTTP_METHOD.delete,
      `${url}/${id}`,
      token,
      _params
    );
  }

  // ----

  protected async denormalizeData<ResponseType>(
    data: object
  ): Promise<JsonApiResponse> {
    return this.serialize(data);
  }
}

// ----

export { ResourceEndpoint };
