import { chain, keys, values, zipObject } from 'lodash';
import { anyDeserializer } from './deserialization';
import {JsonApiResponse, JsonApiDocument} from "./jsonapiTypes";
import {typeOf} from "../extensions/typeOf";
import {ResourceRecord} from "../resources/resourceTypes";

interface Normalization {
  (recordType: string, data: object): object;
}

interface NormalizedRecords {
    [recordType: string]: ResourceRecord[]
}

export interface NormalizedResponse {
    data: any,
    included: any,
    normalized?: NormalizedRecords,
    url?: string,
    params?: any,
    record?: ResourceRecord | {},
    records?: (ResourceRecord | {})[],
    // [key as string]: any
}

export const normalizeItem: Normalization = (recordType : string, data : object) => {
  return anyDeserializer.deserialize(data);
};

// ---

export const normalizePayload = async ({
  data = [],
  included = [],
  ...rest
}: JsonApiResponse) : Promise<NormalizedResponse> => {
  const dataByType = chain(data)
    .castArray()
    .concat(included)
    .groupBy('type')
    .value();

  const normalizedItems = await Promise.all(
    values(dataByType).map(async (items = []) =>
      Promise.all(
        items.map((i: JsonApiDocument) => normalizeItem(i.type, { data: i, included }))
      )
    )
  );

  const normalized  = zipObject(keys(dataByType), normalizedItems) as NormalizedRecords;

    let record = {}
    if (typeOf(data) == "object") {
        const {type, id} = data as JsonApiDocument
        record = normalized[type].find((i) => i.id === id)
    }

    let records = []
    if (typeOf(data) == "array") {
        for (const item of data as JsonApiDocument[]) {
            records.push(normalized[item.type].filter((i) => i.id === item.id))
        }
    }

  return { ...rest, data, included, normalized, record, records };
};

// ---

//TODO: remove this 'denormalize' function
export const denormalize: Normalization = (recordType, data) => {
  // const serializer = null

  // if(!serializer) {
  throw new Error(`No Serializer Found for ${recordType}`);
  // }
  //  console.log('denormalize/data',data);

  // const result = serializer.serialize(data)
  // console.log('denormalize/result', result);
  // if (result) {
  //     return result
  // }
};

// ---
